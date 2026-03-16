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
              type: 'reference', 
              to: [{ type: 'productVariant' }],
              weak: true 
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

export const productVariant = defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'store',
      title: 'Store',
      type: 'object',
      fields: [
        defineField({ name: 'id', type: 'number', title: 'ID' }),
        defineField({ name: 'gid', type: 'string', title: 'GID' }),
        defineField({ name: 'title', type: 'string', title: 'Title' }),
        defineField({ name: 'sku', type: 'string', title: 'SKU' }),
        defineField({ name: 'price', type: 'number', title: 'Price' }),
        defineField({ name: 'compareAtPrice', type: 'number', title: 'Compare At Price' }),
        defineField({ name: 'inventory', type: 'object', title: 'Inventory', fields: [
          defineField({ name: 'isAvailable', type: 'boolean', title: 'Is Available' }),
          defineField({ name: 'management', type: 'string', title: 'Management' }),
          defineField({ name: 'policy', type: 'string', title: 'Policy' }),
        ]}),
        defineField({ name: 'option1', type: 'string', title: 'Option 1' }),
        defineField({ name: 'option2', type: 'string', title: 'Option 2' }),
        defineField({ name: 'option3', type: 'string', title: 'Option 3' }),
        defineField({ name: 'status', type: 'string', title: 'Status' }),
        defineField({ name: 'isDeleted', type: 'boolean', title: 'Is Deleted' }),
        defineField({ name: 'createdAt', type: 'datetime', title: 'Created At' }),
        defineField({ name: 'updatedAt', type: 'datetime', title: 'Updated At' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'store.title',
      subtitle: 'store.price',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || 'Untitled Variant',
        subtitle: subtitle ? `$${subtitle}` : 'No price',
      };
    },
  },
});
