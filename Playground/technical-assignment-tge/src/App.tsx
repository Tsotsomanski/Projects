import { Counter } from './features/counter/Counter';
import UserList from './features/users-list/userList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Counter />
      <UserList />
     </div>
  );
}

export default App;
