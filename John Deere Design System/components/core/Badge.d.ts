import { HTMLAttributes } from 'react';

/**
 * Status and category label chip. Always renders in ALL CAPS.
 * Use for field/equipment status, crop types, operation categories.
 * @startingPoint section="Core" subtitle="Status badge — success, warning, error, info, green, yellow" viewport="700x100"
 */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Color variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'green' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
  /** Show colored dot prefix (use for live/pulsing status) */
  dot?: boolean;
}

export declare function Badge(props: BadgeProps): JSX.Element;
