import { HTMLAttributes } from 'react';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** Full name — used to generate initials and pick background color */
  name?: string;
  /** Image URL — falls back to initials on error */
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export declare function Avatar(props: AvatarProps): JSX.Element;
