import React from 'react';
import { useNonce } from '@shopify/hydrogen';

/**
 * Renders an inline JSON-LD structured data script block
 * adhering to strict W3C JSON-LD standards and Content Security Policy nonce.
 *
 * @param {{ schema: Record<string, any> | Array<Record<string, any>> | null | undefined }} props
 */
export function JsonLd({ schema }) {
  const nonce = useNonce();

  if (!schema) return null;

  const validSchema = Array.isArray(schema)
    ? schema.filter(Boolean)
    : schema;

  if (Array.isArray(validSchema) && validSchema.length === 0) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(validSchema),
      }}
    />
  );
}
