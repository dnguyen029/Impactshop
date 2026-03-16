import { defineField, defineType } from 'sanity';

export const shopifyProductVariant = defineType({
  name: 'shopifyProductVariant',
  title: 'Product Variant',
  type: 'object',
  fields: [
    defineField({ name: 'id', type: 'number', title: 'ID' }),
    defineField({ name: 'gid', type: 'string', title: 'GID' }),
    defineField({ name: 'productId', type: 'number', title: 'Product ID' }),
    defineField({ name: 'productGid', type: 'string', title: 'Product GID' }),
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'sku', type: 'string', title: 'SKU' }),
    defineField({ name: 'price', type: 'number', title: 'Price' }),
    defineField({ name: 'compareAtPrice', type: 'number', title: 'Compare At Price' }),
    defineField({ name: 'isDeleted', type: 'boolean', title: 'Is Deleted' }),
    defineField({ name: 'status', type: 'string', title: 'Status' }),
    defineField({ name: 'option1', type: 'string', title: 'Option 1' }),
    defineField({ name: 'option2', type: 'string', title: 'Option 2' }),
    defineField({ name: 'option3', type: 'string', title: 'Option 3' }),
    defineField({
      name: 'inventory',
      type: 'object',
      title: 'Inventory',
      fields: [
        defineField({ name: 'isAvailable', type: 'boolean', title: 'Is Available' }),
        defineField({ name: 'management', type: 'string', title: 'Management' }),
        defineField({ name: 'policy', type: 'string', title: 'Policy' }),
      ],
    }),
    defineField({ name: 'createdAt', type: 'datetime', title: 'Created At' }),
    defineField({ name: 'updatedAt', type: 'datetime', title: 'Updated At' }),
  ],
});
