import { defineArrayMember, defineField, defineType } from 'sanity';
import { TiersIcon } from '@sanity/icons';
import React from 'react';

export const collection = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  icon: TiersIcon,
  fields: [
    defineField({
      name: 'store',
      title: 'Store',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string', title: 'Title' }),
        defineField({ name: 'slug', type: 'slug', title: 'Slug' }),
        defineField({ name: 'imageUrl', type: 'url', title: 'Image URL' }),
        defineField({ name: 'isDeleted', type: 'boolean', title: 'Is Deleted' }),
      ],
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        defineArrayMember({ type: 'reference', to: [{ type: 'product' }] })
      ],
    }),
  ],
  preview: {
    select: {
      title: 'store.title',
      mediaUrl: 'store.imageUrl',
    },
    prepare(selection) {
      const { title, mediaUrl } = selection;
      return {
        title: title || 'Untitled Collection',
        media: mediaUrl ? React.createElement('img', { src: mediaUrl, alt: title || 'Collection image', style: { objectFit: 'cover', width: '100%', height: '100%' } }) : undefined,
      };
    },
  },
});
