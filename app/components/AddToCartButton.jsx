import {useFetcher} from 'react-router';
import {CartForm} from '@shopify/hydrogen';

/**
 * @param {{
 *   analytics?: unknown;
 *   children: React.ReactNode;
 *   disabled?: boolean;
 *   lines: Array<OptimisticCartLineInput>;
 *   onClick?: () => void;
 *   className?: string;
 *   wrapperClassName?: string;
 *   redirectTo?: string;
 * }}
 */
export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
  className = '',
  wrapperClassName = '',
  redirectTo,
}) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      method="post"
      action="/cart"
      className={wrapperClassName}
    >
      <input
        type="hidden"
        name={CartForm.INPUT_NAME}
        value={JSON.stringify({
          action: CartForm.ACTIONS.LinesAdd,
          inputs: {lines},
        })}
      />
      <input
        name="analytics"
        type="hidden"
        value={JSON.stringify(analytics)}
      />
      {redirectTo && (
        <input
          name="redirectTo"
          type="hidden"
          value={redirectTo}
        />
      )}
      <button
        type="submit"
        onClick={onClick}
        disabled={Boolean(disabled) || fetcher.state !== 'idle'}
        className={className}
      >
        {fetcher.state !== 'idle' ? 'Memproses...' : children}
      </button>
    </fetcher.Form>
  );
}

/** @typedef {import('react-router').FetcherWithComponents} FetcherWithComponents */
/** @typedef {import('@shopify/hydrogen').OptimisticCartLineInput} OptimisticCartLineInput */
