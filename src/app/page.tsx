'use client';
import { NextPage } from 'next';
import { Header } from '@/app/lib/components/Header';
import '@/app/public/css/reset.css';
import { Flex, Heading, Spinner } from '@chakra-ui/react';
import { MenuCard } from './lib/components/MenuCard';
import { useEffect, useState } from 'react';

interface MenuItem {
  id: number;
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
        const response = await fetch('http://omo.ktrnds.com/api/data/menu'); // 実際のAPIエンドポイントに変更
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
      <Flex m={'30px'} p={'10px'}>
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
            key={item.id}
            id={item.id}
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
