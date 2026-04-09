type OfflineBannerProps = {
  pendingCount: number;
};

export function OfflineBanner({ pendingCount }: OfflineBannerProps) {
  return (
    <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900">
      You are offline. Answers are saved locally and will sync automatically when connection returns.
      {pendingCount > 0 ? ` Pending sync: ${pendingCount}` : ""}
    </div>
  );
}
