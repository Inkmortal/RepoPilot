import fs from 'fs';
import path from 'path';

// Define the structure based on the frontend type, assuming it's similar to this.
// Ideally, this type would be shared between main and renderer processes.
interface FileItem {
  id: string; // Using full path as unique ID
  name: string;
  type: 'file' | 'folder';
  path: string; // Store the full path
  children?: FileItem[];
  // Add other properties expected by the frontend like 'selected', 'expanded', 'size'
  // Initialize them to default values (e.g., false, undefined)
  selected?: boolean;
  expanded?: boolean;
  size?: string; // Represent size as string for simplicity, or number in bytes
}

// Basic error handler for file system operations
const handleFSError = (err: NodeJS.ErrnoException, filePath: string): null => {
  console.error(`Error reading path ${filePath}:`, err);
  // Optionally, you could return a specific error object or throw
  return null;
};

// Recursive function to read directory structure
export const readDirectoryStructure = (directoryPath: string): FileItem[] => {
  try {
    const dirents = fs.readdirSync(directoryPath, { withFileTypes: true });
    const files: FileItem[] = [];

    for (const dirent of dirents) {
      const fullPath = path.join(directoryPath, dirent.name);
      let stats: fs.Stats | null = null;
      try {
        stats = fs.statSync(fullPath);
      } catch (statErr) {
        handleFSError(statErr as NodeJS.ErrnoException, fullPath);
        continue; // Skip this entry if stat fails
      }

      if (dirent.isDirectory()) {
        // Recursively read subdirectory
        const children = readDirectoryStructure(fullPath);
        files.push({
          id: fullPath,
          name: dirent.name,
          type: 'folder',
          path: fullPath,
          children: children,
          expanded: false, // Default collapsed state
          selected: false, // Default unselected state
        });
      } else if (dirent.isFile()) {
        files.push({
          id: fullPath,
          name: dirent.name,
          type: 'file',
          path: fullPath,
          size: `${(stats.size / 1024).toFixed(1)}KB`, // Example size formatting
          selected: false, // Default unselected state
        });
      }
      // Ignore other types like symbolic links for now
    }
    return files;
  } catch (err) {
    handleFSError(err as NodeJS.ErrnoException, directoryPath);
    return []; // Return empty array on error reading the directory itself
  }
}; 