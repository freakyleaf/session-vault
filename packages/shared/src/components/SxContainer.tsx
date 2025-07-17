import type { ReactNode } from 'react';

interface SxContainerProps {
  children: ReactNode;
  className?: string;
}

function SxContainer({ children, className }: SxContainerProps) {
  return <div className={`sx-container ${className}`.trim()}>{children}</div>;
}

export default SxContainer;
