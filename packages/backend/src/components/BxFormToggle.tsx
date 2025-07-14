import { InputSwitch } from 'primereact/inputswitch';

interface BxFormToggleProps {
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  'checked'?: boolean;
  'className'?: string;
  'disabled'?: boolean;
  'error'?: string;
  'helper'?: string;
  'id': string;
  'label': string;
  'name': string;
  'onChange'?: (value: boolean) => void;
}

const BxFormToggle = ({
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  checked = false,
  className = '',
  disabled = false,
  error,
  helper,
  id,
  label,
  name,
  onChange,
}: BxFormToggleProps) => {
  const errorId = useMemo(() => `${id}-error`, [id]);
  const helperId = useMemo(() => `${id}-helper`, [id]);
  const hasError = useMemo(() => Boolean(error), [error]);

  const describedBy = useMemo(() => {
    const ids = [ariaDescribedBy, hasError ? errorId : helper ? helperId : null]
      .filter(Boolean)
      .join(' ');
    return ids || undefined;
  }, [ariaDescribedBy, errorId, helper, helperId, hasError]);

  const handleChange = useCallback(
    (event: { value: boolean }) => {
      onChange?.(event.value);
    },
    [onChange],
  );

  return (
    <div className={`bx-form-input ${className}`}>
      <label htmlFor={id}>{label}</label>
      <InputSwitch
        aria-describedby={describedBy}
        aria-invalid={ariaInvalid ?? hasError}
        checked={checked}
        className="bx-input-switch"
        disabled={disabled}
        inputId={id}
        name={name}
        onChange={handleChange}
      />

      {hasError && (
        <small
          className="bx-error text-red-500"
          id={errorId}
          role="alert"
        >
          {error}
        </small>
      )}

      {helper && !hasError && (
        <small
          className="bx-helper"
          id={helperId}
        >
          {helper}
        </small>
      )}
    </div>
  );
};

BxFormToggle.displayName = 'BxFormToggle';

export default BxFormToggle;
