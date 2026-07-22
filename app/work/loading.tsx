import { BakingLoader } from "@/components/dough/baking-loader";

export default function WorkLoading() {
  return (
    <BakingLoader className="fixed inset-0 z-[100] min-h-[100dvh] w-full" />
  );
}
