import type { ReactNode } from 'react';

interface SxContainerProps {
  children: ReactNode;
}

function SxContainer({ children }: SxContainerProps) {
  return <div className="sx-container">{children}</div>;
}

export default SxContainer;
