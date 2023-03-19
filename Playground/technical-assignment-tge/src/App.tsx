import { Outlet } from "react-router-dom";

import './App.css';
import UserMenu from './features/shared/components/userMenu';

function App() {
  return (
    <div className="App">
      <UserMenu />
      <Outlet />
     </div>
  );
}

export default App;
