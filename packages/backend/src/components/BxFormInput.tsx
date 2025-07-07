import { forwardRef, useCallback, useMemo } from 'react';

import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

import {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'onChange'?: (value: any) => void;
  'passwordFeedback'?: boolean;
  'placeholder'?: string;
  'required'?: boolean;
  'type': TInputType;
  'value'?: number | string;
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
    // Memoize computed values
    const hasError = useMemo(() => Boolean(error), [error]);
    const helperId = useMemo(() => `${id}-helper`, [id]);
    const errorId = useMemo(() => `${id}-error`, [id]);
    const describedBy = useMemo(() => {
      const ids = [
        ariaDescribedBy,
        hasError ? errorId : helper ? helperId : null,
      ]
        .filter(Boolean)
        .join(' ');
      return ids || undefined;
    }, [ariaDescribedBy, hasError, errorId, helper, helperId]);

    // Memoize common props
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

    // Use useCallback for change handlers to prevent unnecessary re-renders
    const handleTextChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
      },
      [onChange],
    );

    const handleNumberChange = useCallback(
      (e: InputNumberChangeEvent) => {
        onChange?.(e.value ?? 0);
      },
      [onChange],
    );

    const renderFormInput = useCallback(() => {
      switch (type) {
        case INPUT_TYPE_EMAIL:
          return (
            <InputText
              {...commonProps}
              id={id}
              onChange={handleTextChange}
              ref={ref as React.Ref<HTMLInputElement>}
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
              value={Number(value) || null}
            />
          );
        case INPUT_TYPE_PASSWORD:
          return (
            <Password
              {...commonProps}
              inputId={id}
              onChange={handleTextChange}
              feedback={passwordFeedback}
              value={String(value ?? '')}
            />
          );
        case INPUT_TYPE_TEXT:
          return (
            <InputText
              {...commonProps}
              id={id}
              onChange={handleTextChange}
              ref={ref as React.Ref<HTMLInputElement>}
              value={String(value ?? '')}
            />
          );
        default:
          return null;
      }
    }, [
      commonProps,
      handleNumberChange,
      handleTextChange,
      id,
      passwordFeedback,
      ref,
      type,
      value,
    ]);

    return (
      <div className={`bx-form-input mb-3 ${className}`}>
        <label htmlFor={id}>
          {label}
          {required && <span className="text-red-500 ml-1">(required)</span>}
        </label>
        {renderFormInput()}
        {hasError && (
          <small
            id={errorId}
            className="bx-error text-red-500"
            role="alert"
          >
            {error}
          </small>
        )}
        {helper && !hasError && (
          <small
            id={helperId}
            className="bx-helper"
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
