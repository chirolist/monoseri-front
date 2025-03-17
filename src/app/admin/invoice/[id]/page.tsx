import { InvoiceTemplate } from 'components/template/invoice';

export default async function Index({ params }: { params: { id: number } }) {
  const { id } = await params;
  return <InvoiceTemplate id={id} />;
}
