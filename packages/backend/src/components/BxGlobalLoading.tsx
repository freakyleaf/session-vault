interface SxContainerProps {
  className?: string;
}

function BxGlobalLoading({ className }: SxContainerProps) {
  return (
    <div className={`bx-global-loading ${className}`.trim()}>
      <SxProgressSpinner />
    </div>
  );
}

export default BxGlobalLoading;
