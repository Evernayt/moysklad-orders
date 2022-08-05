import { Button, Loader, Textbox } from 'components';
import { MOYSKLAD_ICON } from 'constants/icons';
import { authorizationAPI } from 'http/authorizationAPI';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTE } from 'constants/routes';
import './AuthPage.css';
import { enterPressHandler } from 'helpers';

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('login') !== null) {
      const localLoginData = JSON.parse(localStorage.getItem('login'));
      const login = localLoginData[0];
      const password = localLoginData[1];

      authorization(login, password);
    }
  }, []);

  const authorization = (login, password) => {
    setError('');
    setIsLoading(true);
    authorizationAPI(login, password)
      .then(() => {
        const loginData = [login, password];
        localStorage.setItem('login', JSON.stringify(loginData));

        navigate(MAIN_ROUTE);
      })
      .catch((e) => {
        setError(e.message ? e.message : 'Ошибка');
      })
      .finally(() => setIsLoading(false));
  };

  const onEnterPress = (event) => {
    if (login !== '' || password !== '') {
      enterPressHandler(event, () => authorization(login, password));
    }
  };

  return (
    <div className="auth-page-container">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="auth-page-container">
          <img src={MOYSKLAD_ICON} style={{ marginBottom: '24px' }} />
          <div className="card">
            <Textbox
              label="Логин"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <Textbox
              label="Пароль"
              type="password"
              containerStyle={{ margin: '12px 0' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={onEnterPress}
            />
            <Button
              appearance="primary"
              disabled={login === '' || password === ''}
              onClick={() => authorization(login, password)}
            >
              Авторизоваться
            </Button>
          </div>
          <span className="auth-page-error">{error}</span>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
