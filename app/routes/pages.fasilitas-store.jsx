import { redirect } from 'react-router';

export async function loader() {
  throw redirect('/pages/lokasi-toko', 301);
}

export default function FasilitasStoreRedirect() {
  return null;
}
