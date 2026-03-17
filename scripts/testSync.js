const fetch = require('node-fetch');

const payload = {
  id: "gid://shopify/Product/123456789",
  title: "Test Snowboard - Manual Sync",
  handle: "test-snowboard-manual-sync",
  status: "active",
  body_html: "<p>A high-performance snowboard for testing sync.</p>",
  vendor: "Impactshop",
  productType: "Snowboard",
  tags: ["Snowboard", "Test"],
  featuredImage: {
    src: "https://picsum.photos/seed/testsnw/1200/1500"
  },
  variants: [
    {
      id: "gid://shopify/ProductVariant/987654321",
      title: "Default Title",
      price: "499.99",
      available: true
    }
  ]
};

async function testSync() {
  const url = 'http://localhost:3000/api/revalidate?secret=cf327ec5a27d482c6cdff922154d6fd17c26666c21e5656aad1a59e38845ac13';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-shopify-topic': 'products/update'
      },
      body: JSON.stringify(payload)
    });
    
    const result = await response.json();
    console.log('Sync Test Result:', result);
  } catch (err) {
    console.error('Sync Test Failed:', err.message);
    console.log('Note: Ensure the dev server is running at localhost:3000');
  }
}

testSync();
