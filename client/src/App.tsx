import { observer } from 'mobx-react-lite';
import { FC, useContext, useEffect, useState } from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm';
import { User } from './models/User';
import UserService from './services/UserService';

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  const onLogoutClickHandler = () => {
    store.logout();
  };
  const onGetUsersClickHandler = async () => {
    try {
      const res = await UserService.fetchUsers();
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (store.isLoading) {
    return <div>loading...</div>;
  }

  if (!store.isAuth) {
    return (
      <>
        <h1>user unauthorized</h1>
        <LoginForm />
      </>
    );
  }

  return (
    <div>
      <div>
        <h1>user authorized as {store.user.email}</h1>
        <h1>
          {store.user.isActivated ? 'acc activated' : 'acc not activated'}
        </h1>
        <button onClick={onLogoutClickHandler}>logout</button>
      </div>
      <div>
        <button onClick={onGetUsersClickHandler}>get users</button>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default observer(App);
