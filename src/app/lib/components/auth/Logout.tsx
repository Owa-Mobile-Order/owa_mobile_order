import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@chakra-ui/react'

const Logout = () => {
  const { data: _session, status } = useSession()

  if (status === 'authenticated') {
    return (
      <Button
        mx={'5px'}
        borderRadius={'30px'}
        colorScheme={'red'}
        onClick={() => signOut()}
      >
        ログアウト
      </Button>
    )
  }
  return null
}

export { Logout }
