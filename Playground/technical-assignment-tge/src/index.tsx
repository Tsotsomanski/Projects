import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Posts from './features/user-posts/posts';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';
import App from './App';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
]);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
