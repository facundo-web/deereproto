import { ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  /** line: underline active tab (default) · pill: segmented pill background */
  variant?: 'line' | 'pill';
  style?: React.CSSProperties;
}

export declare function Tabs(props: TabsProps): JSX.Element;
