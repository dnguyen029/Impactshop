import { defineArrayMember, defineField, defineType } from 'sanity';
import { ThListIcon } from '@sanity/icons';

export const collectionGrid = defineType({
  name: 'collectionGrid',
  title: 'Collection Grid',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'tiles',
      title: 'Collection Tiles',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'tile',
          fields: [
            defineField({ name: 'title', title: 'Display Title', type: 'string' }),
            defineField({
              name: 'collection',
              title: 'Linked Collection',
              type: 'reference',
              to: [{ type: 'collection' }],
            }),
            defineField({
              name: 'image',
              title: 'Custom Image',
              description: 'Overrides the Shopify collection image if provided',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
        }),
      ],
    }),
  ],
});
