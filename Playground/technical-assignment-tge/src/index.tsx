import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from './features/shared/components/errorPage';
import UserMenu from "./features/shared/components/userMenu";
import Loading from "./features/shared/components/loading";
import Posts from './features/user-posts/posts';
import reportWebVitals from './reportWebVitals';
import Tasks from './features/tasks/tasks';
import { store } from './app/store';
import App from './App';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    // loader: <Loading />
  },
  {
    path: "/posts",
    element: <Posts />,
  },
  {
    path: "/tasks",
    element: <Tasks />,
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
