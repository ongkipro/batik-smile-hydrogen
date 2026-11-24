import assert from 'node:assert/strict';
import {test} from 'node:test';
import {applyOxygenCacheHeaders} from '../app/lib/cache-headers.js';

test('public anonymous GET receives Oxygen-Cache-Control and Vary', () => {
  const headers = new Headers();
  applyOxygenCacheHeaders(new Request('https://batiksmile.com/collections/all'), 200, headers);

  assert.equal(headers.get('Cache-Control'), 'public, max-age=1, stale-while-revalidate=9');
  assert.equal(headers.get('Oxygen-Cache-Control'), 'public, max-age=1, stale-while-revalidate=9');
  assert.equal(headers.get('Vary'), 'Accept-Encoding, Accept-Language');
});

test('/cart and /account routes are always private, no-store without Oxygen-Cache-Control', () => {
  for (const path of ['/cart', '/cart/123:1', '/account', '/account/orders']) {
    const headers = new Headers({'Oxygen-Cache-Control': 'public, max-age=60'});
    applyOxygenCacheHeaders(new Request(`https://batiksmile.com${path}`), 200, headers);

    assert.equal(headers.get('Cache-Control'), 'private, no-store', path);
    assert.equal(headers.get('Oxygen-Cache-Control'), null, path);
  }
});

test('responses with Set-Cookie never receive Oxygen-Cache-Control', () => {
  const headers = new Headers({'Set-Cookie': 'session=abc; Path=/; HttpOnly'});
  applyOxygenCacheHeaders(new Request('https://batiksmile.com/'), 200, headers);

  assert.equal(headers.get('Oxygen-Cache-Control'), null);
});

test('404 responses set X-Robots-Tag and are not cached on Oxygen FPC', () => {
  const headers = new Headers();
  applyOxygenCacheHeaders(new Request('https://batiksmile.com/does-not-exist'), 404, headers);

  assert.equal(headers.get('X-Robots-Tag'), 'noindex, nofollow');
  assert.equal(headers.get('Cache-Control'), 'private, no-store');
  assert.equal(headers.get('Oxygen-Cache-Control'), null);
});
