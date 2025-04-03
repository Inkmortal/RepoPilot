export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  size?: string;
  selected?: boolean;
  expanded?: boolean;
  children?: FileItem[];
}
