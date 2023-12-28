import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import AuthForm from '../main/AuthForm';
import { LoginContext } from '../../context/Context';

const Header = ({ onHandleLogin, onHandleLogout }) => {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('register');

  const userLogin = useContext(LoginContext);

  return (
    <>
      <header>
        <section className="pt-4 bg-colorTwo p-4 grid grid-cols-2 items-center">
          <article className="flex justify-center ">
            <h1 className="text-[2rem] font-bold">Helges Bootsverleih</h1>
          </article>
          {userLogin ? (
            <article className="ml-auto pr-8 flex gap-6">
              <p className="">
                eingeloggt als:{' '}
                <span className="text-colorFive font-bold">{userLogin.userName}</span>{' '}
              </p>
              <p>||</p>
              <p className="font-bold cursor-pointer hover:opacity-75" onClick={onHandleLogout}>
                Logout
              </p>
            </article>
          ) : (
            <article className="ml-auto pr-8 flex gap-6">
              <p
                className="cursor-pointer"
                onClick={() => {
                  setShowForm(true);
                  setFormType('login');
                }}
              >
                Login
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  setShowForm(true);
                  setFormType('register');
                }}
              >
                Register
              </p>
            </article>
          )}
        </section>
      </header>
      {showForm && (
        <AuthForm type={formType} setShowForm={setShowForm} onHandleLogin={onHandleLogin} />
      )}
    </>
  );
};

Header.propTypes = {
  onHandleLogin: PropTypes.func,
  onHandleLogout: PropTypes.func,
};

export default Header;
