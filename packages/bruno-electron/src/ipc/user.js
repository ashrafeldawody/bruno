const { ipcMain } = require('electron');
const { getUser, saveUser } = require('../store/user');

const registerUserIpc = (mainWindow) => {
  ipcMain.handle('renderer:load-user', async (event) => {
    mainWindow.webContents.send('main:load-user', getUser());
  });

  ipcMain.on('main:open-user', () => {
    mainWindow.webContents.send('main:open-user');
  });

  ipcMain.handle('renderer:save-user', async (event, user) => {
    try {
      await saveUser(user);
    } catch (error) {
      return Promise.reject(error);
    }
  });
};

module.exports = registerUserIpc;
