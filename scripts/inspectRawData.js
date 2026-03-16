const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '25mbwlje',
  dataset: 'production',
  apiVersion: '2025-03-15',
  token: 'skg5JogUjV6bwKvIgMK2nsRjjtC5AvrKax2aQpi98TMa9nwGpWWI4c1kMRD3h5Jb3NAWsr0ick2aYVtyg84WyUjwrkGFmhHbDIiGNNtlFr5A5CqIkSyzBXAAs0v0xm7SVHkZXAD7jOzpq1VERIe2QYGpFLtHcDj25Yq7p3WTsnt2vaVZqey4',
  useCdn: false,
});

async function inspectData() {
  try {
    const product = await client.fetch('*[_type == "product"][0]');
    const collection = await client.fetch('*[_type == "collection"][0]');
    
    console.log('--- Sample Product ---');
    console.log(JSON.stringify(product, null, 2));
    
    console.log('--- Sample Collection ---');
    console.log(JSON.stringify(collection, null, 2));
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

inspectData();
