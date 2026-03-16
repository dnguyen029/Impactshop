import { defineField, defineType } from 'sanity';
import { TagIcon } from '@sanity/icons';

export const productGrid = defineType({
  name: 'productGrid',
  title: 'Product Grid',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Featured Gear',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'The Collection',
    }),
  ],
});
