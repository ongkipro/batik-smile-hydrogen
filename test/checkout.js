import assert from 'node:assert/strict';
import {test} from 'node:test';
import {getCartCheckoutRedirect} from '../app/lib/checkout.js';

const cart = {checkoutUrl: 'https://example.myshopify.com/cart/c/synthetic'};

test('a successful add redirects to the configured Shopify checkout domain', () => {
  assert.equal(
    getCartCheckoutRedirect({cart}, 'checkout.example.test'),
    'https://checkout.example.test/cart/c/synthetic',
  );
});

test('GraphQL and cart mutation errors both block an existing checkout URL', () => {
  for (const field of ['errors', 'userErrors']) {
    assert.equal(getCartCheckoutRedirect({cart, [field]: [{message: 'Unavailable'}]}), null, field);
  }
});

test('an out-of-stock or reduced-quantity add cannot advance to checkout', () => {
  for (const code of ['MERCHANDISE_OUT_OF_STOCK', 'MERCHANDISE_NOT_ENOUGH_STOCK']) {
    assert.equal(getCartCheckoutRedirect({cart, warnings: [{code}]}), null, code);
  }
});

test('a missing cart or checkout URL is not a successful handoff', () => {
  assert.equal(getCartCheckoutRedirect({cart: null}), null);
  assert.equal(getCartCheckoutRedirect({cart: {}}), null);
});

test('a discount warning does not block a successful add', () => {
  assert.equal(
    getCartCheckoutRedirect({cart, warnings: [{code: 'DISCOUNT_NOT_FOUND'}]}),
    'https://checkout.batiksmile.com/cart/c/synthetic',
  );
});
