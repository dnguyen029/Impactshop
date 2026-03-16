import type { StructureResolver } from 'sanity/structure';
import { HomeIcon, CogIcon, BasketIcon, TiersIcon, DocumentIcon, ColorWheelIcon } from '@sanity/icons';

// https://www.sanity.io/docs/structure-builder-introduction
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Marketing Group
      S.listItem()
        .title('Marketing')
        .child(
          S.list()
            .title('Marketing')
            .items([
              S.listItem()
                .title('Homepage')
                .icon(HomeIcon)
                .child(
                  S.document()
                    .schemaType('homepage')
                    .documentId('homepage')
                ),
              S.documentTypeListItem('page').title('Pages').icon(DocumentIcon),
            ])
        ),
      S.divider(),
      
      // Store Group
      S.listItem()
        .title('Shopify Store')
        .icon(BasketIcon)
        .child(
          S.list()
            .title('Store')
            .items([
              S.documentTypeListItem('shopifyProduct').title('Products').icon(BasketIcon),
              S.documentTypeListItem('shopifyCollection').title('Collections').icon(TiersIcon),
            ])
        ),
      S.divider(),

      // Configuration Group
      S.listItem()
        .title('Global Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Site settings')
                .icon(CogIcon)
                .child(
                  S.document()
                    .schemaType('settings')
                    .documentId('settings')
                ),
              S.documentTypeListItem('colorTheme').title('Color Themes').icon(ColorWheelIcon),
            ])
        ),
    ]);
