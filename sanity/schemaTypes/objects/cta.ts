import { defineField, defineType } from 'sanity';
import { LinkIcon } from '@sanity/icons';

export const cta = defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Outline', value: 'outline' },
        ],
      },
    }),
  ],
});
