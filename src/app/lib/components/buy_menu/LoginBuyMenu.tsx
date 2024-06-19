'use client'
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
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

const LoginBuyMenu = ({
  id,
  name,
  price,
}: {
  id: number
  name: string
  price: number
  img: string
}) => {
  // Toast
  const toast = useToast()

  // メニューの状態
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef(null)

  // 予約ボタンのロード
  const [isLoading, setLoading] = useState(false)

  // ユーザー情報の取得
  const { data: session } = useSession()

  if (!session) return null
  if (!session.user) return null
  if (!session.user.image || !session.user.name) return null

  const handleSubmit = () => {
    setLoading(true)
    // WSに接続
    const connection = new WebSocket('ws://133.18.202.177:3001')
    connection.addEventListener('open', () => {
      // 接続完了時、データを送信
      connection.send(
        JSON.stringify({
          id: id,
          user: session.user,
        })
      )
    })

    connection.addEventListener('message', (message) => {
      // メッセージを取得し、trueの場合に完了メッセージを表示
      const data = JSON.parse(message.data)
      if (data.message === 'A message has been recived successfully.') {
        onClose()
        setLoading(false)
        toast({
          title: '予約を受け付けました',
          description: `${name}を予約しました！ありがとうございます！`,
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      }
    })
  }

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
    </>
  )
}

export { LoginBuyMenu }
