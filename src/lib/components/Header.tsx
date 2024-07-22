import '@/public/css/header.css';
import Logo from '@/public/img/logo.svg';
import { Link } from '@chakra-ui/react';
import { LeftMenu } from '@/lib/components/LeftMenu';

const Header = () => {
  return (
    <header>
      <div className={'header'}>
        {/*左側のエリア*/}
        <div className={'header_area header_left_area'}>
          {/*ロゴ*/}
          <Logo className={'header_image'} />
        </div>

        {/*中央のリンク*/}
        <div className={'header_nav'}>
          {/*ナビゲーション*/}
          <Link className={'header_link'} href={'/'}>
            予約
          </Link>
          <Link className={'header_link'} href={'/'}>
            利用規約
          </Link>
          <Link className={'header_link'} href={'/'}>
            プライバシーポリシー
          </Link>
        </div>
        <div className={'header_area header_right_area'}>
          <LeftMenu />
        </div>
      </div>
    </header>
  );
};

export { Header };
