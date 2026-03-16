const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '25mbwlje',
  dataset: 'production',
  apiVersion: '2025-03-15',
  token: 'skg5JogUjV6bwKvIgMK2nsRjjtC5AvrKax2aQpi98TMa9nwGpWWI4c1kMRD3h5Jb3NAWsr0ick2aYVtyg84WyUjwrkGFmhHbDIiGNNtlFr5A5CqIkSyzBXAAs0v0xm7SVHkZXAD7jOzpq1VERIe2QYGpFLtHcDj25Yq7p3WTsnt2vaVZqey4',
  useCdn: false,
});

async function inspectHome() {
  try {
    const published = await client.fetch('*[_id == "home"][0]');
    const draft = await client.fetch('*[_id == "drafts.home"][0]');
    
    console.log('--- Published Home ---');
    console.log(JSON.stringify(published?.sections?.map(s => s._type), null, 2));
    
    console.log('--- Draft Home ---');
    console.log(JSON.stringify(draft?.sections?.map(s => s._type), null, 2));

    console.log('--- Raw Published ---');
    console.log(JSON.stringify(published, null, 2));
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

inspectHome();
