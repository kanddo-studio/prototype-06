import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableWebGL2: true,
      accelerator: "gpu",
    },
    transparent: false,
    frame: true,
    icon: path.join(
      path.join(
        __dirname,
        "..",
        "..",
        "..",
        "dist",
        "assets",
        "images",
        "icons",
        "icon.png",
      ),
    ),
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(
      path.join(__dirname, "..", "..", "..", "dist", "index.html"),
    );
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
