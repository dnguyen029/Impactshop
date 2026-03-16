import { type SchemaTypeDefinition } from 'sanity';
import { product } from './product';
import { shopifyProductVariant } from './shopifyProductVariant';
import { home } from './home';
import { collection } from './collection';
import { page } from './page';
import { colorTheme } from './colorTheme';
import { settings } from './settings';
import { cta } from './objects/cta';
import { hero } from './objects/hero';
import { collectionGrid } from './objects/collectionGrid';
import { featureSection } from './objects/featureSection';
import { productGrid } from './objects/productGrid';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    home, 
    page, 
    collection, 
    product, 
    shopifyProductVariant, 
    colorTheme, 
    settings, 
    cta, 
    hero, 
    collectionGrid, 
    featureSection,
    productGrid
  ],
};
