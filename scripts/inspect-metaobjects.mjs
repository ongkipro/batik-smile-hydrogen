import 'dotenv/config';

const domain = process.env.PUBLIC_STORE_DOMAIN;
const adminToken = process.env.PRIVATE_STOREFRONT_API_TOKEN;

async function checkMetaobjects() {
  if (!domain || !adminToken) {
    console.error('Missing domain or token in environment.');
    return;
  }

  const query = `
    query {
      metaobjectDefinitions(first: 10) {
        nodes {
          name
          type
          fieldDefinitions {
            name
            key
            type {
              name
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(`https://${domain}/admin/api/2026-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminToken,
      },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    console.log('Admin API Response Status:', res.status);
    if (data.errors) {
      console.log('Errors:', JSON.stringify(data.errors));
    } else {
      console.log('Existing Metaobject Definitions:', JSON.stringify(data.data?.metaobjectDefinitions?.nodes || [], null, 2));
    }
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

checkMetaobjects();
