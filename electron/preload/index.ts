import { contextBridge, ipcRenderer } from 'electron';

console.log('>>> Preload: Script executing...');

// --------- Expose Node.js APIs to Renderer process --------- //
// contextBridge.exposeInMainWorld('nodeCrypto', {
//   sha256sum: (data: string) => require('crypto').createHash('sha256').update(data).digest('hex'),
// });

// --------- Expose Electron APIs to Renderer process --------- //
try {
  contextBridge.exposeInMainWorld('electronAPI', {
    openDirectoryDialog: () => ipcRenderer.invoke('ipc-file-system:open-dialog'),
    // You can expose other functions here as needed
    // Example: send: (channel, data) => ipcRenderer.send(channel, data),
    // Example: on: (channel, func) => {
    //   const subscription = (event, ...args) => func(...args);
    //   ipcRenderer.on(channel, subscription);
    //   // Return a cleanup function
    //   return () => ipcRenderer.removeListener(channel, subscription);
    // },
  });
  console.log('>>> Preload: electronAPI exposed successfully.');
} catch (error) {
  console.error('>>> Preload: Error exposing electronAPI:', error);
} 