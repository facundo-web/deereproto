import { HTMLAttributes } from 'react';

export interface ToggleProps extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export declare function Toggle(props: ToggleProps): JSX.Element;
