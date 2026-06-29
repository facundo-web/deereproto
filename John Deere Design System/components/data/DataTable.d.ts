import React from 'react';

export interface TableColumn {
  key: string;
  label: string;
  /** Default true — pass false to disable sort on this column */
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  /** Custom cell renderer */
  render?: (value: any, row: any) => React.ReactNode;
}

export interface DataTableProps {
  columns: TableColumn[];
  rows: any[];
  onRowClick?: (row: any) => void;
  emptyMessage?: string;
  style?: React.CSSProperties;
}

export declare function DataTable(props: DataTableProps): JSX.Element;
