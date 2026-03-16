import { defineArrayMember, defineField, defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons';

export const home = defineType({
  name: 'home',
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
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({ type: 'hero' }),
        defineArrayMember({ type: 'collectionGrid' }),
        defineArrayMember({ type: 'featureSection' }),
        defineArrayMember({ type: 'productGrid' }),
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
