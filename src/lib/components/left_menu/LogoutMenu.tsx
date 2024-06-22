import { Button } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';

const LogoutMenu = () => {
  const { data: _session, status } = useSession();

  if (status !== 'authenticated') {
    return (
      <Button
        mx={'5px'}
        borderRadius={'30px'}
        colorScheme={'gray'}
        onClick={() => signIn('google', {}, { prompt: 'login' })}
      >
        ログイン
      </Button>
    );
  }
  return null;
};

export { LogoutMenu };
