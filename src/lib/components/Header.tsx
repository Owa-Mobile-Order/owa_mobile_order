"use client"
import '@/public/css/header.css';
import Logo from '@/public/img/logo.svg';
import { Link } from '@chakra-ui/react';
import { LeftMenu } from '@/lib/components/LeftMenu';

const Header = () => {
  return (
    <header>
      <div className={'header'}>
        {/*左側のエリア*/}
        <div className={'header-area header-left-area'}>
          {/*ロゴ*/}
          <Logo className={'header-image'} />
        </div>

        {/*中央のリンク*/}
        <div className={'header-nav'}>
          {/*ナビゲーション*/}
          <Link className={'header-link'} href={'/'}>
            予約
          </Link>
          <Link className={'header-link'} href={'/'}>
            利用規約
          </Link>
          <Link className={'header-link'} href={'/'}>
            プライバシーポリシー
          </Link>
        </div>
        <div className={'header-area header-right-area'}>
          <LeftMenu />
        </div>
      </div>
    </header>
  );
};

export { Header };
