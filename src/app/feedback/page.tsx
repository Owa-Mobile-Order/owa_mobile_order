'use client';
import { Header } from '@/lib/components/Header';
import {
  Box,
  Button,
  Card,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useState } from 'react';

const Page: NextPage = () => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmit, setSubmit] = useState(false);

  const isTitleError = title === '';
  const isDescriptionError = description === '';

  const handleTitleInput = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleDescriptionInput = (e: ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);

  const handleSubmit = () => {
    setSubmit(true);
    fetch('https://omo.ktrnds.com/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        description: description,
        uuid: session?.user.email,
      }),
    }).then(() => {});
  };

  if (status !== 'authenticated') {
    return (
      <>
        <Header />
        <Box textAlign={'center'} m="40px">
          <Heading>フィードバックを送信</Heading>
          <Text>アプリの機能性向上にご協力頂きありがとうございます。</Text>
          <Text>
            アプリの感想・バグ報告・「こんな機能を追加してほしい」などをお聞かせください
          </Text>
          <Card m={'30px auto'} p={'10px 40px'} maxWidth={'450px'}>
            <FormControl isInvalid={isTitleError} m="10px">
              <FormLabel>タイトル</FormLabel>
              <Input onChange={(e) => handleTitleInput(e)} />
              {!isTitleError ? (
                <FormHelperText>例）〇〇が使いにくい</FormHelperText>
              ) : (
                <FormErrorMessage>タイトルは必須です</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={isDescriptionError} m="10px">
              <FormLabel>詳細</FormLabel>
              <Textarea onChange={(e) => handleDescriptionInput(e)} />
              {!isDescriptionError ? (
                <FormHelperText>
                  例）〇〇の部分が〇〇なので使いづらい
                </FormHelperText>
              ) : (
                <FormErrorMessage>詳細は必須です</FormErrorMessage>
              )}
            </FormControl>
            <Button onClick={handleSubmit} isLoading={isSubmit} m="0 auto">
              回答を送信
            </Button>
          </Card>
        </Box>
      </>
    );
  } else {
    return <Header />;
  }
};

export default Page;
