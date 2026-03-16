import { defineArrayMember, defineField, defineType } from 'sanity';
import { SunIcon } from '@sanity/icons';

export const featureSection = defineType({
  name: 'featureSection',
  title: 'Feature Section',
  type: 'object',
  icon: SunIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'images',
      title: 'Image Gallery',
      description: 'Multiple images for card-deck or carousel layouts',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'cta',
    }),
  ],
});
