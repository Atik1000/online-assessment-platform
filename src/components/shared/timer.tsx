type TimerProps = {
  secondsLeft: number;
};

export function Timer({ secondsLeft }: TimerProps) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="rounded-xl bg-secondary px-3 py-2 text-sm font-medium">
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
}
