import { NextPage } from 'next';
import { Header } from '@/app/lib/components/Header';
import '@/app/public/css/reset.css';
import { Flex, Heading } from '@chakra-ui/react';
import { MenuCard } from './lib/components/MenuCard';

const Page: NextPage = () => {
  return (
    <>
      <Header />
      <Heading m={'40px'}>商品を購入する</Heading>
      <Flex m={'30px'} p={'10px'}>
        <MenuCard
          id={1}
          name={'カレーライス'}
          img={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ34gVZxzlB59Nn4Rn9rvpohIXktT2IdnGyL9u5qhu8VajKMibFQ7lmOIc&s=10'
          }
          price={300}
        />
      </Flex>
    </>
  );
};

export default Page;
