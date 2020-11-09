import React, { useEffect, useState } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./src/modules";
import AppContainer from "./src/containers/AppContainer";

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
