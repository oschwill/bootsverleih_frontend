import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import NavBar from '../components/aside/NavBar';
import Footer from '../components/footer/Footer';

const RootLayout = () => {
  return (
    <>
      <Header />
      <NavBar />
      <main className="bg-colorThree h-[100%]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
