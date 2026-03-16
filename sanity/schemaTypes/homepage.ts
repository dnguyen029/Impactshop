import { defineField, defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons';

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'Used for internal reference',
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
    }),
    defineField({
      name: 'tiles',
      title: 'Feature Tiles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, fields: [
              defineField({
                name: 'alt',
                type: 'string',
                title: 'Alternative Text',
                validation: (rule) => rule.required(),
              }),
            ] }),
            defineField({ name: 'link', title: 'Link', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Main Homepage',
        subtitle: 'Index Page',
        media: HomeIcon,
      };
    },
  },
});
