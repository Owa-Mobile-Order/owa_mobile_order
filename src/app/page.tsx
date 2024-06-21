'use client';
import { NextPage } from 'next';
import { Header } from '@/app/lib/components/Header';
import '@/app/public/css/reset.css';
import { Flex, Heading, Spinner } from '@chakra-ui/react';
import { MenuCard } from './lib/components/MenuCard';
import { useEffect, useState } from 'react';

interface MenuItem {
  name: string;
  img: string;
  price: number;
}

const Page: NextPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/data/menu`
        ); // 実際のAPIエンドポイントに変更
        const data: MenuItem[] = await response.json();
        setMenuItems(data);
        setLoading(false);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Heading m={'40px'}>商品を購入する</Heading>
      <Flex m={'20px'} key={1}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          display={isLoading ? 'block' : 'none'}
        />
        {menuItems.map((item) => (
          <MenuCard
            key={item.name}
            name={item.name}
            img={item.img}
            price={item.price}
          />
        ))}
      </Flex>
    </>
  );
};

export default Page;
