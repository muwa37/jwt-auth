import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC, useContext, useState } from 'react';
import { Context } from '..';

const LoginForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { store } = useContext(Context);

  const onEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onLoginClickHandler = () => {
    store.login(email, password);
  };
  const onRegistrationClickHandler = () => {
    store.registration(email, password);
  };

  return (
    <div>
      <div>
        <input
          onChange={onEmailChangeHandler}
          value={email}
          type='text'
          placeholder='email'
        />
        <input
          onChange={onPasswordChangeHandler}
          value={password}
          type='password'
          placeholder='password'
        />
      </div>
      <div>
        <button onChange={onLoginClickHandler}>login</button>
        <button onChange={onRegistrationClickHandler}>register</button>
      </div>
    </div>
  );
};

export default observer(LoginForm);
