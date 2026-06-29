import { HTMLAttributes, ReactNode } from 'react';

/**
 * Container with optional header and footer. Primary surface for content grouping.
 * @startingPoint section="Core" subtitle="Content card — default, raised, bordered, flat variants with header/footer" viewport="700x220"
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual elevation style */
  variant?: 'default' | 'raised' | 'bordered' | 'flat';
  /** Internal padding preset */
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  /** Header content — renders above children with divider */
  header?: ReactNode;
  /** Footer content — renders below children with divider and gray bg */
  footer?: ReactNode;
}

export declare function Card(props: CardProps): JSX.Element;
