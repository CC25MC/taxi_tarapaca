import { useLogin } from '../../hooks/useAuth';
import { useNotify } from '../../utils';

const Action = () => {
  const { signIn, errorSigningIn, isLoadingSigningIn } = useLogin();

  useNotify(errorSigningIn, 'error', errorSigningIn?.response?.data?.message);

  return {
    signIn,
    isLoadingSigningIn,
  };
};

export default Action;
