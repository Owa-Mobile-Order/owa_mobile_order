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
} from '@chakra-ui/react';
import React from 'react';
import { LoginBuyMenu } from './buy_menu/LoginBuyMenu';

const MenuCard = ({
  name,
  price,
  img,
}: {
  name: string;
  price: number;
  img: string;
}) => {
  return (
    <Card
      width={{ base: '100%', md: '250px' }}
      mr={'40px'}
      className={'card'}
      mb={'40px'}
    >
      <CardBody>
        <Image
          src={img}
          alt={name}
          height={{ base: '100px', md: '150px' }}
          objectFit="cover"
          borderRadius="lg"
          m={'0 auto'}
        />
        <Stack mt="6" spacing="3" textAlign={'center'}>
          <Heading size="md">{name}</Heading>
          <Text color="blue.600">{price}円</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2" m={'0 auto'}>
          <LoginBuyMenu name={name} price={price} img={img} />
          {/* <Button variant="ghost" colorScheme="blue" isDisabled={true}>
            カートに追加
          </Button> */}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export { MenuCard };
