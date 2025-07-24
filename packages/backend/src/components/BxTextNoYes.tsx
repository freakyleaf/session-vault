import { TEXT_NO, TEXT_YES } from '@shared-src/lib/constants';

interface BxTextNoYesProps {
  value: boolean;
}

function BxTextNoYes({ value }: BxTextNoYesProps) {
  const text = value ? TEXT_YES : TEXT_NO;
  const iconClass = value
    ? 'pi pi-check text-green-500'
    : 'pi pi-times text-red-500';

  return (
    <div className="bx-text-no-yes">
      {text}
      <span className={iconClass} />
    </div>
  );
}

export default BxTextNoYes;
