import { SelectHTMLAttributes } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options?: (string | SelectOption)[];
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
}

export declare function Select(props: SelectProps): JSX.Element;
