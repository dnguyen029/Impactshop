import { defineField, defineType } from 'sanity';
import { ImageIcon } from '@sanity/icons';

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'brandingTitle',
      title: 'Branding Title/Badge',
      type: 'string',
      description: 'e.g. "NEW RELEASE" or "IMPACT"',
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
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
      name: 'cta',
      title: 'Primary Call to Action',
      type: 'cta',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary Call to Action',
      type: 'cta',
    }),
  ],
});
