import { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Primary action element. Maps to every user-initiated action in JD digital products.
 * Primary variant uses JD Green; warning variant uses JD Yellow.
 * @startingPoint section="Core" subtitle="Action button — primary (green), secondary, ghost, danger, warning variants" viewport="700x200"
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'warning';
  /** Component height */
  size?: 'sm' | 'md' | 'lg';
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Icon element to display alongside label (Heroicon SVG recommended) */
  icon?: ReactNode;
  /** Icon position relative to label text */
  iconPosition?: 'left' | 'right';
  /** Stretch to fill container width */
  fullWidth?: boolean;
}

export declare function Button(props: ButtonProps): JSX.Element;
