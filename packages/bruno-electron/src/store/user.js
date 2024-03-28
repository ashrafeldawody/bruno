const Store = require('electron-store');

class UserStore {
  constructor() {
    this.store = new Store({
      name: 'user',
      clearInvalidConfig: true
    });
  }

  getUser() {
    return this.store.get('user');
  }

  getToken() {
    const user = this.getUser();
    return user ? user.token : null;
  }

  saveUser(user) {
    return this.store.set('user', user);
  }
}

const userStore = new UserStore();
const getUser = () => {
  return userStore.getUser();
};
const saveUser = (user) => {
  return userStore.saveUser(user);
};
const getToken = () => {
  return userStore.getToken();
};
module.exports = {
  getUser,
  saveUser,
  getToken
};
