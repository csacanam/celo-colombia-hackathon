import { DemoDayDeck } from "@/components/DemoDayDeck";

export const dynamic = "force-dynamic";

export default async function DemoDaySlidesPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return <DemoDayDeck token={token ?? null} />;
}
