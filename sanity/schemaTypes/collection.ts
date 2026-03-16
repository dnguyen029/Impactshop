import { defineArrayMember, defineField, defineType } from 'sanity';
import { TiersIcon } from '@sanity/icons';
import React from 'react';

export const collection = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  icon: TiersIcon,
  fields: [
    defineField({ name: 'id', type: 'number', title: 'ID' }),
    defineField({ name: 'gid', type: 'string', title: 'GID' }),
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'handle', type: 'string', title: 'Handle' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug' }),
    defineField({ name: 'imageUrl', type: 'url', title: 'Image URL' }),
    defineField({ name: 'isDeleted', type: 'boolean', title: 'Is Deleted' }),
    defineField({ name: 'updatedAt', type: 'datetime', title: 'Updated At' }),
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
      title: 'title',
      mediaUrl: 'imageUrl',
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
