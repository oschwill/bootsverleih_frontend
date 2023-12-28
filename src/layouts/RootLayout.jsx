import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import NavBar from '../components/aside/NavBar';
import Footer from '../components/footer/Footer';
import { useState } from 'react';
import { LoginContext } from '../context/Context';

const RootLayout = () => {
  const [login, setLogin] = useState(false);

  const handleLogin = (loginData) => {
    if (!loginData) {
      return;
    }

    setLogin(loginData);
    sessionStorage.setItem('userLogin', JSON.stringify(loginData));
  };

  const handleLogout = () => {
    setLogin(false);
    sessionStorage.clear();
  };

  return (
    <>
      <LoginContext.Provider
        value={
          sessionStorage.getItem('userLogin')
            ? JSON.parse(sessionStorage.getItem('userLogin'))
            : login
        }
      >
        <Header onHandleLogin={handleLogin} onHandleLogout={handleLogout} />
        <NavBar />
        <main className="bg-colorThree h-[100%]">
          <Outlet />
        </main>
        <Footer />
      </LoginContext.Provider>
    </>
  );
};

export default RootLayout;
