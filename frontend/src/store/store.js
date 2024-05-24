// src/store/store.js
// Sử dụng redux-persist cho store, thay cho zustand
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const initialState = {
  user: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CURRENT_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
