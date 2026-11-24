import assert from 'node:assert/strict';
import {test} from 'node:test';
import {
  generateHomeMeta,
  generateCollectionMeta,
  getSeoTitle,
  getSeoDescription,
} from '../app/lib/seo.js';

test('homepage SEO satisfies owner length, separator, author, and publisher rules', () => {
  const meta = generateHomeMeta({name: 'BATIK SMILE', description: ''});
  const title = meta.find((m) => 'title' in m)?.title || '';
  const desc = meta.find((m) => m.name === 'description')?.content || '';

  assert.ok(title.length >= 55 && title.length <= 70, `title length ${title.length}`);
  assert.ok(!/[—|]/.test(title), 'title must not use em-dash or pipe');
  assert.ok(desc.length >= 120 && desc.length <= 155, `desc length ${desc.length}`);
  assert.ok(desc.endsWith('.'), 'description must end with full stop');
  assert.equal(meta.find((m) => m.name === 'author')?.content, 'Batik Smile');
  assert.equal(meta.find((m) => m.name === 'publisher')?.content, 'Batik Smile');
});

test('single collection SEO dynamically reads Shopify collection.seo fields without duplicating brand', () => {
  const meta = generateCollectionMeta({
    handle: 'luxury-series',
    title: 'Luxury Series',
    description: 'Fallback desc',
    seo: {
      title: 'Koleksi Batik Luxury Series Sutra & Sarimbit - Batik Smile',
      description:
        'Koleksi batik Luxury Series berbahan sutra ATBM dan lapisan trikot halus untuk sarimbit keluarga, resepsi resmi, dan seragam butik Semarang.',
    },
  });
  const title = meta.find((m) => 'title' in m)?.title || '';
  const desc = meta.find((m) => m.name === 'description')?.content || '';

  assert.equal(title, 'Koleksi Batik Luxury Series Sutra & Sarimbit - Batik Smile');
  assert.ok(desc.length >= 120 && desc.length <= 155);
  assert.equal(meta.find((m) => m.rel === 'canonical')?.href, 'https://batiksmile.com/collections/luxury-series');
});

test('getSeoTitle normalizes legacy separators and appends single brand suffix', () => {
  assert.equal(getSeoTitle('Kemeja Batik Tulis'), 'Kemeja Batik Tulis - Batik Smile');
  assert.equal(getSeoTitle('Kain Tulis | Batik Smile'), 'Kain Tulis - Batik Smile');
});

test('getSeoDescription trims cleanly at word boundary within 155 chars', () => {
  const long = 'Koleksi batik '.repeat(25);
  const res = getSeoDescription(long);
  assert.ok(res.length <= 155);
  assert.ok(res.endsWith('.'));
});
