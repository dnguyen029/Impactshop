const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '25mbwlje',
  dataset: 'production',
  apiVersion: '2025-03-15',
  token: 'skg5JogUjV6bwKvIgMK2nsRjjtC5AvrKax2aQpi98TMa9nwGpWWI4c1kMRD3h5Jb3NAWsr0ick2aYVtyg84WyUjwrkGFmhHbDIiGNNtlFr5A5CqIkSyzBXAAs0v0xm7SVHkZXAD7jOzpq1VERIe2QYGpFLtHcDj25Yq7p3WTsnt2vaVZqey4',
  useCdn: false,
});

async function listTypes() {
  try {
    const types = await client.fetch('array::unique(*._type)');
    console.log('All types in dataset:', types);
    
    for (const type of types) {
        if (type.includes('product') || type.includes('Product') || type.includes('collection')) {
            const count = await client.fetch(`count(*[_type == "${type}"])`);
            console.log(`Type "${type}" has ${count} documents.`);
        }
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

listTypes();
