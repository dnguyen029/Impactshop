import { defineField, defineType } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO & Social',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Meta Title',
      type: 'string',
      description: 'Title used for search engines and social media. Recommended under 60 characters.',
      validation: (rule) => rule.max(60).warning('Titles longer than 60 characters may be truncated by search engines.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description used for search engines and social media. Recommended under 160 characters.',
      validation: (rule) => rule.max(160).warning('Descriptions longer than 160 characters may be truncated by search engines.'),
    }),
    defineField({
      name: 'image',
      title: 'Social Image',
      type: 'image',
      description: 'Image used for social media sharing (Open Graph). Recommended size: 1200x630px.',
    }),
  ],
});
