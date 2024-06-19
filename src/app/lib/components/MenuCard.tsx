import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
} from '@chakra-ui/react'
import React from 'react'
import { LoginBuyMenu } from './buy_menu/LoginBuyMenu'

const MenuCard = ({
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
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={img}
          alt={name}
          boxSize="100px"
          objectFit="cover"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
          <Text color="blue.600">{price}円</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <LoginBuyMenu id={id} name={name} price={price} img={img} />
          <Button variant="ghost" colorScheme="blue" isDisabled={true}>
            カートに追加
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export { MenuCard }
