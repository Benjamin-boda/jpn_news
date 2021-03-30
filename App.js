import React from 'react';
import AppRouter from "./src/routers/AppRouter";
import { Provider } from 'react-redux';
import configureStore from "./src/store/configureStore";
import { login, logout } from "./src/actions/auth";
import { firebase } from "./src/firebase/firebase";
import { startSetWords } from "./src/actions/words";

export default function App() {
  const store = configureStore()

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetWords());
    } else {
        store.dispatch(logout());
    }
  });

  return ( 
    <Provider store={store}>
      <AppRouter/> 
    </Provider>
  );
};
