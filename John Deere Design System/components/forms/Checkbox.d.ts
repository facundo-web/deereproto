import { HTMLAttributes } from 'react';

export interface CheckboxProps extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  hint?: string;
  disabled?: boolean;
  /** Three-state indeterminate display (parent of mixed selection) */
  indeterminate?: boolean;
}

export declare function Checkbox(props: CheckboxProps): JSX.Element;
