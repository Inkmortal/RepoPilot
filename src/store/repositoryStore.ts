import { create } from 'zustand';
import { FileItem } from '@/components/file-explorer/types'; // Assuming types.ts exists here

interface RepositoryState {
  repositoryPath: string | null;
  fileStructure: FileItem[];
  loadRepository: (path: string, structure: FileItem[]) => void;
  toggleItemExpansion: (itemId: string) => void;
  toggleItemSelection: (itemId: string) => void;
  // Add other actions as needed (e.g., search, filter)
}

// Helper function to recursively update expansion state
const updateExpansion = (items: FileItem[], itemId: string): FileItem[] => {
  return items.map(item => {
    if (item.id === itemId) {
      return { ...item, expanded: !item.expanded };
    }
    if (item.children) {
      return { ...item, children: updateExpansion(item.children, itemId) };
    }
    return item;
  });
};

// Helper function to recursively update selection state
const updateSelection = (items: FileItem[], itemId: string): FileItem[] => {
  return items.map(item => {
    if (item.id === itemId) {
      return { ...item, selected: !item.selected };
    }
    if (item.children) {
      return { ...item, children: updateSelection(item.children, itemId) };
    }
    return item;
  });
};

export const useRepositoryStore = create<RepositoryState>((set) => ({
  repositoryPath: null,
  fileStructure: [],
  loadRepository: (path, structure) => set({ repositoryPath: path, fileStructure: structure }),
  toggleItemExpansion: (itemId) => set((state) => ({
    fileStructure: updateExpansion(state.fileStructure, itemId)
  })),
  toggleItemSelection: (itemId) => set((state) => ({
    fileStructure: updateSelection(state.fileStructure, itemId)
  })),
})); 