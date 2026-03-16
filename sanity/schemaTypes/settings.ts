import { defineArrayMember, defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons';

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' })
      ],
    }),
    defineField({
      name: 'shippingTitle',
      title: 'Global Shipping Title',
      description: 'The title shown in the shipping info box below the buy buttons (e.g. "Fast shipping")',
      type: 'string',
      initialValue: 'Fast shipping',
    }),
    defineField({
      name: 'shippingDescription',
      title: 'Global Shipping Description',
      description: 'The description shown in the shipping info box (e.g. "Place your order before 12:00pm...")',
      type: 'text',
      initialValue: 'Place your order before 12:00pm and receive it by tomorrow',
    }),
    defineField({
      name: 'seo',
      title: 'Global SEO',
      description: 'Used as default SEO for all pages unless overridden.',
      type: 'seo',
    }),
  ],
});
