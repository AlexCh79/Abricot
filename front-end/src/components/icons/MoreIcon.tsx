type IconProps = {
  className?: string;
};

export default function MoreIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 16"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="4" cy="8" r="1.5" fill="currentColor" />
      <circle cx="10" cy="8" r="1.5" fill="currentColor" />
      <circle cx="16" cy="8" r="1.5" fill="currentColor" />
    </svg>
  );
}
