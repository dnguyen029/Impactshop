import { defineArrayMember, defineField, defineType } from 'sanity';
import { BasketIcon, TagIcon } from '@sanity/icons';
import React from 'react';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: BasketIcon,
  fields: [
    defineField({
      name: 'store',
      title: 'Store',
      type: 'object',
      readOnly: true,
      fields: [
        defineField({ name: 'id', type: 'number', title: 'ID' }),
        defineField({ name: 'gid', type: 'string', title: 'GID' }),
        defineField({ name: 'title', type: 'string', title: 'Title' }),
        defineField({ name: 'handle', type: 'string', title: 'Handle' }),
        defineField({ name: 'slug', type: 'slug', title: 'Slug' }),
        defineField({ name: 'status', type: 'string', title: 'Status' }),
        defineField({ name: 'isDeleted', type: 'boolean', title: 'Is Deleted' }),
        defineField({ name: 'descriptionHtml', type: 'text', title: 'HTML Description' }),
        defineField({ name: 'vendor', type: 'string', title: 'Vendor' }),
        defineField({ name: 'productType', type: 'string', title: 'Product Type' }),
        defineField({ name: 'tags', type: 'string', title: 'Tags' }),
        defineField({ name: 'priceRange', type: 'object', title: 'Price Range', fields: [
          defineField({ name: 'minVariantPrice', type: 'number', title: 'Min Variant Price' }),
          defineField({ name: 'maxVariantPrice', type: 'number', title: 'Max Variant Price' }),
        ]}),
        defineField({ name: 'previewImageUrl', type: 'url', title: 'Preview Image URL' }),
        defineField({
          name: 'shop',
          type: 'object',
          title: 'Shop',
          fields: [defineField({ name: 'domain', type: 'string', title: 'Domain' })],
        }),
        defineField({ 
          name: 'images', 
          type: 'array', 
          title: 'Images', 
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'id', type: 'string', title: 'ID' }),
                defineField({ name: 'altText', type: 'string', title: 'Alt Text' }),
                defineField({ name: 'src', type: 'url', title: 'Source URL' }),
                defineField({ name: 'width', type: 'number', title: 'Width' }),
                defineField({ name: 'height', type: 'number', title: 'Height' }),
              ]
            })
          ]
        }),
        defineField({ 
          name: 'options', 
          type: 'array', 
          title: 'Options', 
          of: [
            defineArrayMember({
              name: 'option',
              type: 'object',
              fields: [
                defineField({ name: 'name', type: 'string', title: 'Name' }),
                defineField({ name: 'values', type: 'array', title: 'Values', of: [{ type: 'string' }] }),
              ]
            })
          ]
        }),
        defineField({ 
          name: 'variants', 
          type: 'array', 
          title: 'Variants', 
          of: [
            defineArrayMember({ 
              type: 'shopifyProductVariant',
            })
          ] 
        }),
        defineField({ name: 'createdAt', type: 'datetime', title: 'Created At' }),
        defineField({ name: 'updatedAt', type: 'datetime', title: 'Updated At' }),
        defineField({ name: 'publishedAt', type: 'datetime', title: 'Published At' }),
      ],
    }),
    defineField({
      name: 'details',
      title: 'Rich Details (Sanity Only)',
      description: 'Add rich text, images, and custom details for this product here. This will not be overwritten by Shopify.',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social',
      type: 'seo',
    }),
    // Root level fields for sync compatibility
    defineField({ name: 'title', type: 'string', hidden: true }),
    defineField({ name: 'handle', type: 'string', hidden: true }),
    defineField({ name: 'isDeleted', type: 'boolean', hidden: true }),
    defineField({ name: 'updatedAt', type: 'datetime', hidden: true }),
    defineField({ name: 'createdAt', type: 'datetime', hidden: true }),
    defineField({ name: 'publishedAt', type: 'datetime', hidden: true }),
  ],
  preview: {
    select: {
      title: 'store.title',
      subtitle: 'store.status',
      mediaUrl: 'store.previewImageUrl',
    },
    prepare(selection) {
      const { title, subtitle, mediaUrl } = selection;
      return {
        title: title || 'Untitled Product',
        subtitle: subtitle ? subtitle.charAt(0).toUpperCase() + subtitle.slice(1) : 'Unknown status',
        media: mediaUrl ? React.createElement('img', { src: mediaUrl, alt: title || 'Product image', style: { objectFit: 'cover', width: '100%', height: '100%' } }) : undefined,
      };
    },
  },
});

