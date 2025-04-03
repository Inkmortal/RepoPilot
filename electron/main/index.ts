import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron';
import { release } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
// import { update } from './update'; // Commented out as it doesn't exist yet
import { readDirectoryStructure } from './fileReader'; // Import our file reader

console.log('>>> Electron Main: Starting execution...');

// Define __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(`>>> Electron Main: __dirname = ${__dirname}`);

// The built directory structure
//
// ├── dist-electron
// │   ├── main.js
// │   ├── preload.js
// │   └── uninstaller.exe
// └── dist
//     ├── index.html
//     ├── ...other-assets
//     └──
process.env.DIST_ELECTRON = join(__dirname, '..');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST;

console.log(`>>> Electron Main: DIST_ELECTRON = ${process.env.DIST_ELECTRON}`);
console.log(`>>> Electron Main: DIST = ${process.env.DIST}`);
console.log(`>>> Electron Main: VITE_PUBLIC = ${process.env.VITE_PUBLIC}`);

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  console.log('>>> Electron Main: Failed to acquire single instance lock, quitting.');
  app.quit();
  process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null;
// Correct the path to the *built* preload script
const preload = join(__dirname, 'preload.js');
const url = process.env.VITE_DEV_SERVER_URL;
// The indexHtml path depends on whether it's dev or prod
const indexHtml = join(process.env.DIST, 'index.html');

console.log(`>>> Electron Main: Preload path = ${preload}`);
console.log(`>>> Electron Main: Dev Server URL = ${url}`);
console.log(`>>> Electron Main: Index HTML path = ${indexHtml}`);

async function createWindow() {
  console.log('>>> Electron Main: createWindow() called.');
  try {
    win = new BrowserWindow({
      title: 'RepoPilot',
      icon: join(process.env.VITE_PUBLIC, 'favicon.ico'),
      width: 1200,
      height: 800,
      webPreferences: {
        preload,
        nodeIntegration: false,
        contextIsolation: true,
      },
    });
    console.log('>>> Electron Main: BrowserWindow created.');

    win.on('closed', () => {
      console.log('>>> Electron Main: Window closed event.');
      win = null;
    });

    if (url) {
      console.log(`>>> Electron Main: Loading URL: ${url}`);
      await win.loadURL(url);
      console.log('>>> Electron Main: URL loaded.');
      win.webContents.openDevTools();
    } else if (indexHtml) {
      console.log(`>>> Electron Main: Loading File: ${indexHtml}`);
      await win.loadFile(indexHtml);
      console.log('>>> Electron Main: File loaded.');
    } else {
      console.error('>>> Electron Main: Cannot load window content: No URL or HTML path.');
    }

    // Test actively push message to the Electron-Renderer
    win.webContents.on('did-finish-load', () => {
      win?.webContents.send('main-process-message', new Date().toLocaleString());
    });

    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith('https:')) shell.openExternal(url);
      return { action: 'deny' };
    });

    // Apply electron-updater (Placeholder)
    // update(win);

    // Setup IPC handler
    ipcMain.handle('ipc-file-system:open-dialog', async () => {
      console.log('>>> Electron Main: IPC received: ipc-file-system:open-dialog');
      if (!win) return { error: 'Browser window not available.' };

      const result = await dialog.showOpenDialog(win, {
        properties: ['openDirectory'],
      });

      if (result.canceled || result.filePaths.length === 0) {
        return { canceled: true };
      }

      const directoryPath = result.filePaths[0];
      try {
        const fileStructure = readDirectoryStructure(directoryPath);
        return { path: directoryPath, structure: fileStructure };
      } catch (error: any) {
        console.error('Error reading directory structure:', error);
        return { error: error.message || 'Failed to read directory structure.' };
      }
    });
    console.log('>>> Electron Main: IPC handler registered.');

  } catch (error) {
    console.error('>>> Electron Main: Error in createWindow():', error);
  }
}

app.whenReady().then(() => {
  console.log('>>> Electron Main: App is ready.');
  createWindow();
});

app.on('window-all-closed', () => {
  win = null;
  if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Ensure childWindow was created before loading content
  if (childWindow) {
    if (process.env.VITE_DEV_SERVER_URL) {
       // Assuming url is defined if VITE_DEV_SERVER_URL is set based on previous checks
      childWindow.loadURL(`${process.env.VITE_DEV_SERVER_URL}#${arg}`);
    } else if (indexHtml) { // Check if indexHtml is defined
      childWindow.loadFile(indexHtml, { hash: arg });
    } else {
      console.error('Could not load child window file: index.html path is not defined.');
      childWindow.close(); // Close the window if content can't be loaded
    }
  }
}); 