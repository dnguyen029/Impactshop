import { type SchemaTypeDefinition } from 'sanity';
import { product, productVariant } from './product';
import { homepage } from './homepage';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, productVariant, homepage],
};
