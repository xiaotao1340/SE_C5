import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// 导入redux-persist提供PersistGate组件
// import { PersistGate } from 'redux-persist/integration/react';
// 导入React Redux 提供的Provider 组件
// import { Provider } from 'react-redux';
// import { store, persistor } from './component/store/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
// 			<PersistGate loading={null} persistor={persistor}>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
// 			</PersistGate>
// 		</Provider>
//   </React.StrictMode>
// );

