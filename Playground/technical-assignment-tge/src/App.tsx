
import './App.css';
import UserList from './features/users-list/userList';
import UserMenu from './features/shared/components/userMenu';

function App() {


  return (
    <div className="App">
      <UserMenu />
      <UserList />
     </div>
  );
}

export default App;
