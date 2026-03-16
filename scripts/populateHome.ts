import { createClient } from '@sanity/client';
import { projectId, dataset, apiVersion } from '../sanity/env';

const client = createClient({
  projectId: '25mbwlje',
  dataset: 'production',
  apiVersion: '2025-03-15',
  useCdn: false,
  token: 'skOzpuhvTaVNJIztrzV3qPvzuaVkIVHohOC3u97lKlD1A4cM4PU199qPtijPzfsvqmRTJD7zCKQawR9oYR28E8vVNa7T5f0lkfGcg2JoSUocVmQ76GYc3G4Tr4HHCHXCG3XvEwM3ChvQ8s3jBVmab1tYtPaZXSzvwhm9DMi92QbaViR9tNEg',
});

async function populate() {
  const homepageDoc = {
    _id: 'home',
    _type: 'home',
    title: 'Impact Shopify Homepage',
    sections: [
      {
        _key: 'hero1',
        _type: 'hero',
        brandingTitle: 'NEW RELEASE Custom Camber',
        eyebrow: 'HIGH-PERFORMANCE GEAR',
        heading: 'HIGH-PERFORMANCE SNOWBOARDS',
        cta: {
          _type: 'cta',
          title: 'DISCOVER COLLECTION',
          link: '/collections/all'
        },
        secondaryCta: {
          _type: 'cta',
          title: 'WATCH STORY',
          link: '/about'
        }
      },
      {
        _key: 'grid1',
        _type: 'collectionGrid',
        title: 'Featured Categories',
        tiles: [
          {
            _key: 'tile1',
            _type: 'tile',
            title: "MEN'S BOARDS",
          },
          {
            _key: 'tile2',
            _type: 'tile',
            title: "WOMEN'S BOARDS",
          },
          {
            _key: 'tile3',
            _type: 'tile',
            title: "BINDINGS",
          },
          {
            _key: 'tile4',
            _type: 'tile',
            title: "STEP ON® BOOTS",
          }
        ]
      },
      {
        _key: 'feature1',
        _type: 'featureSection',
        eyebrow: 'ABOUT US',
        title: 'DESIGNED & DEVELOPED IN VERMONT',
        description: "Born in the mountains, Impact was founded by riders who demanded more from their gear. We obsess over every edge, core, and camber profile to build boards that elevate your ride, whether you're carving groomers or floating in deep powder."
      }
    ]
  };

  try {
    const result = await client.createOrReplace(homepageDoc);
    console.log('Homepage populated successfully:', result._id);
  } catch (err) {
    console.error('Error populating homepage:', err);
  }
}

populate();
