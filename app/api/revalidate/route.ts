import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

// This secret should match the one configured in the Sanity webhook settings
const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | { current: string };
    }>(req, SANITY_WEBHOOK_SECRET);

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    // Extract slug string regardless of format
    const slug = typeof body.slug === 'string' ? body.slug : body.slug?.current;

    // Revalidate paths using tags
    const tags = [body._type];
    if (slug) {
      tags.push(`${body._type}:${slug}`);
    }

    // Import revalidateTag from next/cache
    const { revalidateTag } = await import('next/cache');
    
    for (const tag of tags) {
      revalidateTag(tag);
      console.log(`Revalidated tag: ${tag}`);
    }

    console.log(`Revalidation complete for: ${body._type} ${slug || ''}`);

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (err) {
    const error = err as Error;
    console.error(error);
    return new NextResponse(error.message, { status: 500 });
  }
}
