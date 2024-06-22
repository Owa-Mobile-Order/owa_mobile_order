import { Avatar, Box, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';

const LoginMenu = () => {
  const { data: session } = useSession();

  if (!session) return null;
  if (!session.user) return null;
  if (!session.user.image || !session.user.name) return null;

  return (
    <Box display={'flex'}>
      <Avatar size="md" name={session.user.name} src={session.user.image} />
      <Text my={'auto'} mx={'10px'} fontSize={'xl'}>
        {session.user.name}
      </Text>
    </Box>
  );
};

export { LoginMenu };
