import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  useDisclosure,
  Button,
  Flex,
  Spacer,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import React from 'react';
import '@/public/css/lastchild.css';

const HistoryCard = ({
  name,
  timestamp,
  isPending,
  order_id,
}: {
  name: string;
  timestamp: Date;
  isPending: boolean;
  order_id: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  return (
    <Card
      width={{ base: '100%', md: '250px' }}
      minW={{ md: '250px' }}
      mr={'40px'}
      className={'card'}
      mb={'40px'}
    >
      <CardBody>
        <Heading fontSize={'3xl'}>{order_id ?? 'Null'}</Heading>
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
          <Text color="blue.600">
            {timestamp.getFullYear()}/{timestamp.getMonth()}/
            {timestamp.getDate()} {timestamp.getHours()}:
            {timestamp.getMinutes()}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Flex>
          <Text color={!isPending ? 'green.400' : 'orange.400'} m={'auto 16px'}>
            {!isPending ? '受け取り済' : '保留中'}
          </Text>
          <Spacer />
          <Button
            backgroundColor={'rgba(0,0,0,0)'}
            onClick={onOpen}
            m={'auto 0'}
          >
            拡大して表示
          </Button>
        </Flex>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>{name}</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <Heading fontSize={'2xl'} color={'gray.800'}>
                注文番号:{' '}
                <Text fontSize={'5xl'} color="orange.400">
                  {order_id}
                </Text>
              </Heading>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                閉じる
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export { HistoryCard };
