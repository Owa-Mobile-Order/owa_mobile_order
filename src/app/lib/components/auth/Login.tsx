import React from 'react'
import { useSession, signIn } from 'next-auth/react'
import { Button } from '@chakra-ui/react'

const Login = () => {
  const { data: _session, status } = useSession()

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
    )
  }
  return null
}

export { Login }
