import React from 'react';
import { SarimbitBentoSection } from './SarimbitBentoSection';

/**
 * FeaturedCollections (Alias / Backward-Compatible Adapter)
 * Renders the Signature Sarimbit Asymmetric Bento Grid Section.
 */
export function FeaturedCollections(props) {
  return <SarimbitBentoSection {...props} />;
}

export { SarimbitBentoSection };
