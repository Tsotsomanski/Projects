import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import './index.css';
import App from './App';
import { store } from './app/store';
import Tasks from './features/tasks/tasks';
import Posts from './features/user-posts/posts';
import UserList from './features/users-list/userList';
import ErrorPage from './features/shared/components/errorPage';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<UserList />}/>
    <Route path="tasks" element={<Tasks />}/>
    <Route path="posts" element={<Posts />}/>

    <Route path="*" element={<ErrorPage />}/>
  </Route>
  
));

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
);
