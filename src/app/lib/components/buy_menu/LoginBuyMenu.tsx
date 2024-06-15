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
  TableCaption,
  TableContainer,
  Text,
} from '@chakra-ui/react'
import React from 'react'

const LoginBuyMenu = ({
  id,
  name,
  price,
  img,
}: {
  id: number
  name: string
  price: number
  img: string
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef(null)

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>商品を予約する</DrawerHeader>

          <DrawerBody>
            <TableContainer>
              <Table variant="simple">
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
                    <Td>{price}¥</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            <Divider />
            <Text>合計: {price}¥</Text>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export { LoginBuyMenu }
