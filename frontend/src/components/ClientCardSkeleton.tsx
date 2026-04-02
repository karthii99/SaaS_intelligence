import { Skeleton } from "@/components/ui/skeleton";

export const ClientCardSkeleton = () => (
  <div className="rounded-xl bg-card border border-card-border p-5 space-y-3">
    <div className="flex items-start justify-between">
      <div className="space-y-2 flex-1">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <div className="space-y-2 flex flex-col items-end">
        <Skeleton className="h-8 w-12 rounded-lg" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </div>
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <div className="flex gap-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-28" />
    </div>
    <Skeleton className="h-10 w-full rounded-b-xl" />
  </div>
);

export const ClientCardListSkeleton = () => (
  <div className="flex items-center gap-4 rounded-xl bg-card border border-card-border px-5 py-3.5">
    <Skeleton className="h-4 w-32 flex-1" />
    <Skeleton className="h-5 w-20 rounded-full" />
    <Skeleton className="h-5 w-8" />
    <Skeleton className="h-5 w-16 rounded-full" />
  </div>
);
