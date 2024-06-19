import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, Icon } from '@chakra-ui/icons';
import React from 'react';
import { useSession } from 'next-auth/react';
import { LoginMenu } from './left_menu/LoginMenu';
import { LogoutMenu } from './left_menu/LogoutMenu';

const LeftMenu = () => {
  // メニューの状態
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  // ユーザー情報を取得
  const { data: _session, status } = useSession();

  return (
    <>
      <IconButton
        my={'auto'}
        mx={'10px'}
        backgroundColor={'rgba(0,0,0,0)'}
        aria-label="メニュー"
        icon={<Icon as={HamburgerIcon} boxSize={6} />}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={'sm'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            {status === 'authenticated' ? <LoginMenu /> : <LogoutMenu />}
            <DrawerCloseButton />
          </DrawerHeader>

          <DrawerBody></DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { LeftMenu };
