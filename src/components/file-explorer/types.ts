
export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  selected?: boolean;
  expanded?: boolean;
  children?: FileItem[];
}
