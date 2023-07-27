import { useContext } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
  const authContext = useContext(AuthContext);

  function loginHandler({email, password}) {
    authContext.login(email, password);
  }

  return <AuthContent isLogin={true} onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
