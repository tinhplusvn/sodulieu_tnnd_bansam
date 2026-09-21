import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-9 shrink-0", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="9" fill="currentColor" className="text-primary" />
      <path
        d="M8 10.5h7.2c.6 0 1.1.5 1.1 1.1v11.2c0 .4-.4.7-.8.6l-6.7-1.2a1.1 1.1 0 0 1-.9-1.1V10.5Z"
        fill="currentColor"
        className="text-primary-fg"
        opacity="0.92"
      />
      <path
        d="M24 10.5h-7.2c-.6 0-1.1.5-1.1 1.1v11.2c0 .4.4.7.8.6l6.7-1.2c.5-.1.9-.5.9-1.1V10.5Z"
        fill="currentColor"
        className="text-primary-fg"
        opacity="0.72"
      />
      <path
        d="M16 12.2v10.2"
        stroke="currentColor"
        className="text-primary"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M22.6 8.2c0 1.4-1.1 2-1.8 2.6.8.2 1.5.8 1.5 1.8 0-1-.4-1.4-1.1-1.7.8.1 1.4-.6 1.4-1.4 0-.6-.4-1-.8-1.3.4.1.8.0.8 0Z"
        fill="currentColor"
        className="text-primary-soft"
      />
    </svg>
  );
}
