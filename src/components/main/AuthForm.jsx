import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { manipulateData } from '../../utils/fetchDataModel';

const AuthForm = ({ type, setShowForm, onHandleLogin }) => {
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const validateFields = [
      type === 'register' ? e.target.userName.value : 'placeholder',
      e.target.email.value,
      e.target.password.value,
    ].filter((item) => item === '');

    if (validateFields.length > 0) {
      console.log('ERROR, BITTE FÜLLEN SIE ALLE FELDER AUS!!');
      setMessage('ERROR, BITTE FÜLLEN SIE ALLE FELDER AUS!!');
      return;
    }

    const formData = new FormData(e.target);
    switch (type) {
      case 'register': {
        const response = await manipulateData('user/register', 'POST', formData, setMessage, {
          'Method-Information': 'POST',
        });

        if (response) {
          setMessage({
            msg: 'Der User wurde erfolgreich angelegt',
            bgColor: 'bg-green-100',
            textColor: 'text-green-800',
          });

          e.target.reset();
        }

        break;
      }
      case 'login':
        {
          const response = await manipulateData('user/login', 'POST', null, setMessage, {
            'Method-Information': 'POST',
            authorization: 'Basic ' + btoa(`${formData.get('email')}:${formData.get('password')}`),
          });

          if (response && response.success === true) {
            // set session
            onHandleLogin({
              email: formData.get('email'),
              password: formData.get('password'),
              userName: response.userName,
            });
            // close login window
            setShowForm(false);
          }
        }

        break;

      default:
        setMessage('FEHLER BEIM VALIDIEREN UND AUSFÜHREN DER DATEN!!');
        break;
    }
  };

  return (
    <section className="relative">
      <article className="fixed top-0 right-0 h-[100vh] w-[100vw] bg-gray-800/85">
        <FontAwesomeIcon
          icon={faX}
          style={{ height: '75px' }}
          onClick={() => setShowForm(false)}
          className="text-white absolute top-[15%] right-[15%] cursor-pointer hover:text-gray-200"
        />
        <form
          className="flex flex-col justify-center items-center mt-[10%] gap-8"
          onSubmit={handleSubmit}
        >
          <h2 className="text-white text-center mb-[5%] text-[3rem]">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </h2>
          {type === 'register' && (
            <div className="grid grid-cols-authForm w-[50%]">
              <label htmlFor="userName" className="text-white text-right pr-6 text-[1.5rem]">
                Username:
              </label>
              <input type="text" name="userName" id="userName" className="pl-2" />
            </div>
          )}
          <div className="grid grid-cols-authForm w-[50%]">
            <label htmlFor="email" className="text-white text-right pr-6 text-[1.5rem]">
              Email:
            </label>
            <input type="text" name="email" id="email" className="pl-2" />
          </div>
          <div className="grid grid-cols-authForm w-[50%]">
            <label htmlFor="password" className="text-white text-right pr-6 text-[1.5rem]">
              Password:
            </label>
            <input type="password" name="password" id="password" className="pl-2" />
          </div>
          <button className="bg-colorFour p-4 w-[25%] rounded-3xl text-[1.5rem] hover:opacity-75">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        </form>
        {message && (
          <p
            className={`${message.bgColor ? message.bgColor : 'bg-red-100'} ${
              message.textColor ? message.textColor : 'text-red-800'
            }  text-[1.5rem] text-center mt-12`}
          >
            {message.msg ? message.msg : message}
          </p>
        )}
      </article>
    </section>
  );
};

AuthForm.propTypes = {
  type: PropTypes.string,
  setShowForm: PropTypes.func,
  onHandleLogin: PropTypes.func,
};
export default AuthForm;
