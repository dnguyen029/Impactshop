import { createClient } from '@sanity/client';
import { projectId, dataset, apiVersion } from '../sanity/env';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

async function findContent() {
  const query = '* { _type }';
  const docs = await client.fetch(query);
  const types = [...new Set(docs.map((d: any) => d._type))];
  console.log('Document Types in Dataset:', types);
}

findContent();
