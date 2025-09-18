import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { cn } from "@/lib/utils";

export default function ScreenLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-background",
        className,
      )}
    >
      <LoadingSpinner className="h-16 w-16" />
      <p className="text-base font-medium text-center mt-2">Please wait...</p>
    </div>
  );
}
