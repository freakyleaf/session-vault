import { ProgressSpinner } from 'primereact/progressspinner';

interface SxContainerProps {
  className?: string;
}

function BxGlobalLoading({ className }: SxContainerProps) {
  return (
    <div className={`bx-global-loading ${className}`.trim()}>
      <ProgressSpinner />
    </div>
  );
}

export default BxGlobalLoading;
