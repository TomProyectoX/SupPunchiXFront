import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import storageModule from 'redux-persist/lib/storage/index.js';
import productosSlice from './productosSlice';
import registerSlice from './registerSlice';
import authSlice from './authSlice';
import categoriasSlice from './categoriasSlice';
import marcasSlice from './marcasSlice';
import saboresSlice from './saboresSlice';
import variantesSlice from './variantesSlice';
import carritoSlice from './carritoSlice';
import cartWidgetSlice from './cartWidgetSlice';
import ordenSlice from './ordenSlice';
import pagosSlice from './pagosSlice';
import promosSlice from './promosSlice';
import cuponesSlice from './cuponesSlice';

// Adaptador explícito para Vite ESM. Evita que redux-persist reciba el
// namespace del módulo CommonJS en lugar del storage con getItem/setItem.
// Vite expone redux-persist (CommonJS) como namespace en algunas versiones.
// La normalización mantiene toda la persistencia detrás de Redux Persist.
const storage = storageModule.default ?? storageModule;

const omitRequestState = createTransform(
  ({ loading: _loading, status: _status, historyStatus: _historyStatus, error: _error, ...data }) => data,
  (data) => data,
  { whitelist: ['carrito', 'orden'] },
);

const rootReducer = combineReducers({
    productos: productosSlice,
    register: registerSlice,
    auth: authSlice,
    categorias: categoriasSlice,
    marcas: marcasSlice,
    sabores: saboresSlice,
    variantes: variantesSlice,
    carrito: carritoSlice,
    cartWidget: cartWidgetSlice,
    orden: ordenSlice,
    pagos: pagosSlice,
    promos: promosSlice,
    cupones: cuponesSlice,
});

const persistedReducer = persistReducer({
  key: 'punchis',
  version: 1,
  storage,
  whitelist: ['auth', 'carrito', 'orden'],
  transforms: [omitRequestState],
}, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
