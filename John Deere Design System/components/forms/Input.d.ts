import { InputHTMLAttributes, ReactNode } from 'react';

/**
 * Text input with label, validation, prefix/suffix decorators.
 * @startingPoint section="Forms" subtitle="Text field with label, error state, prefix/suffix" viewport="700x200"
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  /** Error message — renders below input in red */
  error?: string;
  /** Leading decorator (icon, currency symbol, unit) */
  prefix?: ReactNode;
  /** Trailing decorator */
  suffix?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export declare function Input(props: InputProps): JSX.Element;
