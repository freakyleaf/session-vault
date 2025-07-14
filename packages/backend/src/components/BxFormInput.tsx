import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

import {
  INPUT_TYPE_CALENDAR,
  INPUT_TYPE_EMAIL,
  INPUT_TYPE_NUMBER,
  INPUT_TYPE_PASSWORD,
  INPUT_TYPE_TEXT,
} from '@shared-src/lib/constants';

import type { InputNumberChangeEvent } from 'primereact/inputnumber';
import type { TInputType } from '@shared-src/lib/types';

interface BxFormInputProps {
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  'className'?: string;
  'disabled'?: boolean;
  'error'?: string;
  'helper'?: string;
  'id': string;
  'label': string;
  'name': string;
  'onChange'?: (value: unknown) => void;
  'passwordFeedback'?: boolean;
  'placeholder'?: string;
  'required'?: boolean;
  'type': TInputType;
  'value'?: Date | number | string | null;
}

const BxFormInput = forwardRef<HTMLInputElement, BxFormInputProps>(
  (
    {
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      className = '',
      disabled = false,
      error,
      helper,
      id,
      label,
      name,
      onChange,
      passwordFeedback = false,
      placeholder,
      required = false,
      type,
      value,
      ...rest
    },
    ref,
  ) => {
    const errorId = useMemo(() => `${id}-error`, [id]);
    const helperId = useMemo(() => `${id}-helper`, [id]);
    const hasError = useMemo(() => Boolean(error), [error]);

    const describedBy = useMemo(() => {
      const ids = [
        ariaDescribedBy,
        hasError ? errorId : helper ? helperId : null,
      ]
        .filter(Boolean)
        .join(' ');
      return ids || undefined;
    }, [ariaDescribedBy, errorId, hasError, helper, helperId]);

    const commonProps = useMemo(
      () => ({
        'aria-describedby': describedBy,
        'aria-invalid': ariaInvalid ?? hasError,
        'aria-required': required,
        disabled,
        name,
        placeholder,
        ...rest,
      }),
      [
        ariaInvalid,
        describedBy,
        disabled,
        hasError,
        name,
        placeholder,
        required,
        rest,
      ],
    );

    const handleCalendarChange = useCallback(
      (event: { value?: Date | null }) => {
        onChange?.(event.value ?? null);
      },
      [onChange],
    );

    const handleNumberChange = useCallback(
      (event: InputNumberChangeEvent) => {
        onChange?.(event.value ?? null);
      },
      [onChange],
    );

    const handleTextChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value);
      },
      [onChange],
    );

    const renderFormInput = () => {
      switch (type) {
        case INPUT_TYPE_CALENDAR:
          return (
            <Calendar
              dateFormat="dd.mm.yy"
              inputId={id}
              onChange={handleCalendarChange}
              showButtonBar
              showIcon
              value={value ? new Date(value) : null}
            />
          );
        case INPUT_TYPE_EMAIL:
          return (
            <InputText
              {...commonProps}
              id={id}
              onChange={handleTextChange}
              ref={ref}
              type="email"
              value={String(value ?? '')}
            />
          );

        case INPUT_TYPE_NUMBER:
          return (
            <InputNumber
              {...commonProps}
              id={id}
              onChange={handleNumberChange}
              value={typeof value === 'number' ? value : null}
            />
          );

        case INPUT_TYPE_PASSWORD:
          return (
            <Password
              {...commonProps}
              feedback={passwordFeedback}
              inputId={id}
              onChange={handleTextChange}
              value={String(value ?? '')}
            />
          );

        case INPUT_TYPE_TEXT:
          return (
            <InputText
              {...commonProps}
              id={id}
              onChange={handleTextChange}
              ref={ref}
              value={String(value ?? '')}
            />
          );

        default:
          return null;
      }
    };

    return (
      <div className={`bx-form-input ${className}`.trim()}>
        <label htmlFor={id}>
          {label}
          {required && <span className="text-red-500 ml-1">(required)</span>}
        </label>

        {renderFormInput()}

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
  },
);

BxFormInput.displayName = 'BxFormInput';

export default BxFormInput;
