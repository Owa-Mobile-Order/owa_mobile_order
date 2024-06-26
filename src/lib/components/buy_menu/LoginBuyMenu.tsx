'use client';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  useToast,
  Box,
  Slide,
  CloseButton,
  Flex,
  Link,
  Spacer,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

const LoginBuyMenu = ({
  name,
  price,
}: {
  name: string;
  price: number;
  img: string;
}) => {
  // Toast
  const toast = useToast();

  // メニューの状態
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  // 予約ボタンのロード
  const [isLoading, setLoading] = useState(false);

  // ユーザー情報の取得
  const { data: session } = useSession();

  // フィードバッグの状態
  const {isOpen: isFBOpen, onToggle: onFBToggle} = useDisclosure()

  if (!session) return null;
  if (!session.user) return null;
  if (!session.user.image || !session.user.name) return null;

  const handleSubmit = async () => {
    setLoading(true);
    // WSに接続
    const connection = new WebSocket(process.env.NEXT_PUBLIC_WS_URI);
    connection.addEventListener('open', () => {
      // 接続完了時、データを送信
      connection.send(
        JSON.stringify({
          name: name,
          user: session.user,
        })
      );
    });

    const order = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/orders`,
      {
        method: 'POST',
        body: JSON.stringify({
          token: session.user.token,
          name: name,
          user_name: session.user.name,
        }),
      }
    );

    if (order.status === 200) {
      setLoading(false);
      onClose();
      toast({
        title: '予約を受け付けました',
        description: `${name}を予約しました！ありがとうございます！`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    } else {
      setLoading(false);
      toast({
        title: 'エラーが発生しました',
        description: `予期せぬエラーが発生しました。もう一度お試しください。`,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        予約
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={'sm'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>商品を予約する</DrawerHeader>

          <DrawerBody>
            <TableContainer>
              <Table variant="simple" maxWidth={'100%'}>
                <Thead>
                  <Tr>
                    <Th>名前</Th>
                    <Th>個数</Th>
                    <Th isNumeric>値段</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{name}</Td>
                    <Td>1</Td>
                    <Td>¥{price}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            <Divider />
            <Text my={'10px'}>合計: ¥{price}</Text>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              キャンセル
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              予約
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>



      {/* フィードバック送信部分 */}
      <Slide direction='bottom' in={!isFBOpen} style={{ zIndex: 999 }}>
        <Box
          color='white'
          mt='4'
          bg='teal.500'
          shadow='md'
          padding='10px'
        >
          <Flex>
            <CloseButton onClick={onFBToggle} m={"auto 0"} />
            <Box m={"auto 0"}>
              ご注文ありがとうございます。機能改善のために良ければフィードバックをお願いします。
            </Box>
            <Spacer />
            <Button as={Link} href='feedback'>評価する</Button>
          </Flex>
        </Box>
      </Slide>
    </>
  );
};

export { LoginBuyMenu };
