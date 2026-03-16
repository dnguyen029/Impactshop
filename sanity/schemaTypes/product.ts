import { defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'store',
      title: 'Store',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string', title: 'Title' }),
        defineField({ name: 'slug', type: 'slug', title: 'Slug' }),
        defineField({ name: 'status', type: 'string', title: 'Status' }),
        defineField({ name: 'isDeleted', type: 'boolean', title: 'Is Deleted' }),
        defineField({ name: 'priceRange', type: 'object', title: 'Price Range', fields: [
          defineField({ name: 'minVariantPrice', type: 'object', title: 'Min Variant Price', fields: [
            defineField({ name: 'amount', type: 'string', title: 'Amount' }),
            defineField({ name: 'currencyCode', type: 'string', title: 'Currency Code' }),
          ]}),
        ]}),
        defineField({ name: 'previewImageUrl', type: 'url', title: 'Preview Image URL' }),
        defineField({ name: 'options', type: 'array', title: 'Options', of: [{ type: 'object', fields: [
          defineField({ name: 'name', type: 'string', title: 'Name' }),
          defineField({ name: 'values', type: 'array', title: 'Values', of: [{ type: 'string' }] }),
        ]}]}),
      ],
    }),
    defineField({ name: 'variants', type: 'array', title: 'Variants', of: [{ type: 'reference', to: [{ type: 'productVariant' }] }] }),
    defineField({
      name: 'details',
      title: 'Rich Details (Sanity Only)',
      description: 'Add rich text, images, and custom details for this product here. This will not be overwritten by Shopify.',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
});

export const productVariant = defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'document',
  fields: [
    defineField({
      name: 'store',
      title: 'Store',
      type: 'object',
      fields: [
        defineField({ name: 'id', type: 'number', title: 'ID' }),
        defineField({ name: 'title', type: 'string', title: 'Title' }),
        defineField({ name: 'price', type: 'number', title: 'Price' }),
        defineField({ name: 'inventory', type: 'object', title: 'Inventory', fields: [
          defineField({ name: 'isAvailable', type: 'boolean', title: 'Is Available' }),
        ]}),
        defineField({ name: 'option1', type: 'string', title: 'Option 1' }),
        defineField({ name: 'option2', type: 'string', title: 'Option 2' }),
        defineField({ name: 'option3', type: 'string', title: 'Option 3' }),
      ],
    }),
  ],
});
