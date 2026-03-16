import { type SchemaTypeDefinition } from 'sanity';
import { product, productVariant } from './product';
import { home } from './home';
import { collection } from './collection';
import { page } from './page';
import { colorTheme } from './colorTheme';
import { settings } from './settings';
import { cta } from './objects/cta';
import { hero } from './objects/hero';
import { collectionGrid } from './objects/collectionGrid';
import { featureSection } from './objects/featureSection';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    home, 
    page, 
    collection, 
    product, 
    productVariant, 
    colorTheme, 
    settings, 
    cta, 
    hero, 
    collectionGrid, 
    featureSection
  ],
};
