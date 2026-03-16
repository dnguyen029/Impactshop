import { type SchemaTypeDefinition } from 'sanity';
import { shopifyProduct, shopifyProductVariant } from './product';
import { homepage } from './homepage';
import { shopifyCollection } from './collection';
import { page } from './page';
import { colorTheme } from './colorTheme';
import { settings } from './settings';
import { cta } from './objects/cta';
import { hero } from './objects/hero';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, page, shopifyCollection, shopifyProduct, shopifyProductVariant, colorTheme, settings, cta, hero],
};
