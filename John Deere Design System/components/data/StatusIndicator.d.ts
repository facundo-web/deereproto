import { HTMLAttributes } from 'react';

/**
 * Pulsing dot + ALL CAPS label for equipment, field, and operation status.
 * Active, warning, and error statuses pulse to indicate live state.
 * @startingPoint section="Data" subtitle="Status indicator for equipment, fields, and operations" viewport="700x120"
 */
export interface StatusIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  status?: 'active' | 'idle' | 'stored' | 'connected' | 'warning' | 'error' | 'offline' | 'complete' | 'planned' | 'growing' | 'spraying' | 'planting';
  /** Override the default status label text */
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export declare function StatusIndicator(props: StatusIndicatorProps): JSX.Element;
