import { Header } from '@/lib/components/Header';
import '@/public/css/home.css';
import Logo from "@/public/img/logo.svg";

const Page = () => {
  return (
    <>
      <Header />
      <div className={"container"}>
        <div className={'main-container'}>
          <div className={'logo-area'}>
            <Logo className={"logo-image"}/>
          </div>
          <div className={'title-area'}>
            <h1>OWA MOBILE ORDER</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;