
import { LucideProps } from 'lucide-react';

export const ChocolateIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <line x1="8" y1="2" x2="8" y2="22" />
    <line x1="14" y1="2" x2="14" y2="22" />
    <line x1="2" y1="8" x2="22" y2="8" />
    <line x1="2" y1="14" x2="22" y2="14" />
  </svg>
);
