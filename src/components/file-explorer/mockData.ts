
import { FileItem } from './types';

// Mock file structure data with proper typing
export const mockFileStructure: FileItem[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    expanded: true,
    children: [
      {
        id: '2',
        name: 'components',
        type: 'folder',
        expanded: true,
        children: [
          { id: '3', name: 'Button.tsx', type: 'file', size: '2.4KB', selected: false },
          { id: '4', name: 'Card.tsx', type: 'file', size: '3.1KB', selected: false }
        ]
      },
      {
        id: '5',
        name: 'utils',
        type: 'folder',
        expanded: false,
        children: [
          { id: '6', name: 'helpers.ts', type: 'file', size: '1.2KB', selected: false },
          { id: '7', name: 'format.ts', type: 'file', size: '0.8KB', selected: false }
        ]
      },
      { id: '8', name: 'App.tsx', type: 'file', size: '4.2KB', selected: true },
      { id: '9', name: 'index.tsx', type: 'file', size: '0.5KB', selected: false }
    ]
  },
  {
    id: '10',
    name: 'public',
    type: 'folder',
    expanded: false,
    children: [
      { id: '11', name: 'index.html', type: 'file', size: '1.8KB', selected: false },
      { id: '12', name: 'favicon.ico', type: 'file', size: '4.3KB', selected: false }
    ]
  }
];
