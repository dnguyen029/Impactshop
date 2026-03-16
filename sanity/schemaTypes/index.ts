import { type SchemaTypeDefinition } from 'sanity';
import { product, productVariant } from './product';
import { homepage } from './homepage';
import { collection } from './collection';
import { page } from './page';
import { colorTheme } from './colorTheme';
import { settings } from './settings';
import { cta } from './objects/cta';
import { hero } from './objects/hero';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, page, collection, product, productVariant, colorTheme, settings, cta, hero],
};
