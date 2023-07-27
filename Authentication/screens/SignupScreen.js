import { useContext } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const authContext = useContext(AuthContext);

  function registerHandler({email, password}) {
    authContext.register(email, password);
  }
  return <AuthContent onAuthenticate={registerHandler}/>;
}

export default SignupScreen;
