import { redirect } from 'react-router';

export async function loader() {
  throw redirect('/collections/all', 301);
}

export default function LayananSeragamRedirect() {
  return null;
}
