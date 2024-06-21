'use client';
import { NextPage } from 'next';
import { Header } from '../lib/components/Header';
import { Flex, Heading, Spinner } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { HistoryCard } from '../lib/components/HistoryCard';

const Page: NextPage = () => {
  const { data: session, status } = useSession();
  const [isLoading, setLoading] = useState(true);

  const [histories, setHistories] = useState<
    {
      name: string;
      timestamp: Date;
      isPending: boolean;
      order_id: string;
    }[]
  >([]);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchData = async () => {
        const user = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`,
          {
            method: 'POST',
            body: JSON.stringify({
              token: session?.user.token,
            }),
          }
        );

        const data = await user.json();

        if (user.status === 200) {
          const histories = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/orders/${data.uuid}`
          );
          const response = await histories.json();

          setHistories(response.history);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [status, session?.user.token]);

  if (status === 'authenticated') {
    return (
      <>
        <Header />
        <Heading m={'40px'}>注文履歴</Heading>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          display={isLoading ? 'block' : 'none'}
          m="auto"
        />
        <Flex m="20px">
          {histories.map((history) => (
            <HistoryCard
              key={history.name}
              name={history.name}
              timestamp={new Date(history.timestamp)}
              isPending={history.isPending}
              order_id={history.order_id}
            />
          ))}
        </Flex>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <Heading m={'40px'}>注文履歴</Heading>
      </>
    );
  }
};

export default Page;
