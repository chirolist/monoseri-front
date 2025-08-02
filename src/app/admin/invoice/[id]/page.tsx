import { InvoiceTemplate } from 'components/template/invoice';

export default async function Index({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <InvoiceTemplate id={Number(id)} />;
}
