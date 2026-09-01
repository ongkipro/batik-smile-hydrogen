import 'dotenv/config';

const domain = process.env.PUBLIC_STORE_DOMAIN;
const adminToken = process.env.PRIVATE_STOREFRONT_API_TOKEN;

/**
 * Definitions to provision in Shopify Admin
 */
const DEFINITIONS = [
  {
    name: 'Hero Banner',
    type: 'hero_banner',
    description: 'Dynamic banners and hero sliders for Batik Smile storefront.',
    fieldDefinitions: [
      { name: 'Headline Title', key: 'title', type: 'single_line_text_field', required: true },
      { name: 'Subtitle Narrative', key: 'subtitle', type: 'single_line_text_field' },
      { name: 'Tier Badge', key: 'tier_badge', type: 'single_line_text_field' },
      { name: 'Lookbook Image (4:5)', key: 'image', type: 'file_reference' },
      { name: 'CTA Button Text', key: 'cta_text', type: 'single_line_text_field' },
      { name: 'CTA Destination URL', key: 'cta_link', type: 'single_line_text_field' },
      { name: 'Is Active', key: 'is_active', type: 'boolean' },
    ],
  },
  {
    name: 'Announcement Bar',
    type: 'announcement_bar',
    description: 'Top notification announcement bar with WhatsApp link.',
    fieldDefinitions: [
      { name: 'Promo Message', key: 'message', type: 'single_line_text_field', required: true },
      { name: 'Highlight Text', key: 'highlight_text', type: 'single_line_text_field' },
      { name: 'Link URL', key: 'link_url', type: 'single_line_text_field' },
      { name: 'WhatsApp Number', key: 'whatsapp_number', type: 'single_line_text_field' },
    ],
  },
  {
    name: 'Lookbook Spotlight',
    type: 'lookbook_spotlight',
    description: 'Interactive family lookbook photoshoot with product pins.',
    fieldDefinitions: [
      { name: 'Lookbook Headline', key: 'headline', type: 'single_line_text_field', required: true },
      { name: 'Family Lifestyle Photo', key: 'family_photo', type: 'file_reference' },
      { name: 'Hotspots JSON Array', key: 'hotspots_json', type: 'json' },
    ],
  },
  {
    name: 'Showroom Info',
    type: 'showroom_info',
    description: 'Physical showroom and gallery branch information.',
    fieldDefinitions: [
      { name: 'City Name', key: 'city', type: 'single_line_text_field', required: true },
      { name: 'Showroom Name', key: 'name', type: 'single_line_text_field', required: true },
      { name: 'Address Details', key: 'address', type: 'multi_line_text_field' },
      { name: 'Operating Hours', key: 'hours', type: 'single_line_text_field' },
      { name: 'Facilities List', key: 'facilities', type: 'single_line_text_field' },
      { name: 'Google Maps Link', key: 'google_maps_url', type: 'single_line_text_field' },
    ],
  },
];

async function provisionMetaobject(def) {
  const mutation = `
    mutation CreateMetaobjectDefinition($definition: MetaobjectDefinitionCreateInput!) {
      metaobjectDefinitionCreate(definition: $definition) {
        metaobjectDefinition {
          id
          name
          type
        }
        userErrors {
          field
          message
          code
        }
      }
    }
  `;

  const variables = {
    definition: {
      name: def.name,
      type: def.type,
      description: def.description,
      access: {
        storefront: 'PUBLIC_READ',
      },
      fieldDefinitions: def.fieldDefinitions.map((f) => ({
        name: f.name,
        key: f.key,
        type: f.type,
        required: f.required || false,
      })),
    },
  };

  try {
    const res = await fetch(`https://${domain}/admin/api/2026-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminToken,
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    const data = await res.json();
    if (data.errors) {
      console.error(`❌ Error creating ${def.name}:`, JSON.stringify(data.errors));
      return;
    }

    const result = data.data?.metaobjectDefinitionCreate;
    if (result?.userErrors?.length) {
      console.warn(`⚠️ Warning for ${def.name}:`, JSON.stringify(result.userErrors));
    } else {
      console.log(`✅ Successfully provisioned Metaobject definition: ${def.name} (${def.type})`);
    }
  } catch (err) {
    console.error(`❌ Network error for ${def.name}:`, err.message);
  }
}

async function run() {
  console.log(`🚀 Starting Metaobject provisioning on ${domain}...`);
  for (const def of DEFINITIONS) {
    await provisionMetaobject(def);
  }
  console.log('🎉 Done provisioning Metaobjects!');
}

run();
