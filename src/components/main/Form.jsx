import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { BoatTypeContext, MaterialContext } from '../../context/Context';
import { manipulateData } from '../../utils/fetchDataModel';

const Form = ({ method, boatData, setSuccess, setRefresh, setShowForm }) => {
  const [input, setInput] = useState({
    name: boatData && method === 'PUT' ? boatData.name : '',
    constructionYear: boatData && method === 'PUT' ? boatData.constructionYear : '',
    serialNumber: boatData && method === 'PUT' ? boatData.serialNumber : '',
    material: boatData && method === 'PUT' ? boatData.material.name : '',
    boatType: boatData && method === 'PUT' ? boatData.boatType.typeName : '',
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const materials = useContext(MaterialContext);
  const boatTypes = useContext(BoatTypeContext);

  const handleForm = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    // validate
    const validateFields = Object.values(input).filter((item) => item === '');

    console.log(validateFields);

    if (validateFields.length > 0) {
      console.log('ERROR');
      setErrorMessage('Bitte füllen Sie alle Felder aus!!');
      return;
    }

    const form = new FormData(e.target);

    const response = await manipulateData(
      `boats/data/${boatData ? boatData._id : ''}`,
      method,
      form,
      setErrorMessage
    );

    if (!response) {
      return;
    }

    setSuccess(response.message);
    setShowForm((cur) => !cur);
    setRefresh(crypto.randomUUID());
  };

  return (
    <>
      <article className="fixed top-0 h-full bg-gray-800/85 w-full z-5 flex justify-center pt-[10%]">
        <form className="flex flex-col gap-6 text-[2rem]" onSubmit={handleForm}>
          <div className="flex gap-6">
            <label htmlFor="name" className="w-[35%] text-white">
              Schiffsname:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="pl-2"
              value={input.name && input.name}
              onChange={(e) => {
                setInput({
                  ...input,
                  name: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex gap-6">
            <label htmlFor="constructionYear" className="w-[35%] text-white">
              Baujahr:
            </label>
            <input
              type="text"
              name="constructionYear"
              id="constructionYear"
              className="pl-2"
              value={input.constructionYear && input.constructionYear}
              onChange={(e) => {
                setInput({
                  ...input,
                  constructionYear: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex gap-6">
            <label htmlFor="serialNumber" className="w-[35%] text-white">
              Seriennummer:
            </label>
            <input
              type="text"
              name="serialNumber"
              id="serialNumber"
              className="pl-2"
              value={input.serialNumber && input.serialNumber}
              onChange={(e) => {
                setInput({
                  ...input,
                  serialNumber: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex gap-6">
            <label htmlFor="material" className="w-[35%] text-white">
              Schiffsmaterial:
            </label>
            <select
              name="material"
              id="material"
              className="w-[60%]"
              value={input.material && input.material}
              onChange={(e) => {
                setInput({
                  ...input,
                  material: e.target.value,
                });
              }}
            >
              <option value="">WÄHLE EIN BOOTSMATERIAL</option>
              {materials &&
                materials.map((m) => {
                  return (
                    <option key={m._id} value={m.name}>
                      {m.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="flex gap-6">
            <label htmlFor="type" className="w-[35%] text-white">
              Bootstyp:
            </label>
            <select
              name="type"
              id="type"
              value={input.boatType && input.boatType}
              onChange={(e) => {
                setInput({
                  ...input,
                  boatType: e.target.value,
                });
              }}
            >
              <option value="">WÄHLE EINEN BOOTS TYP</option>
              {boatTypes &&
                boatTypes.map((b) => {
                  return (
                    <option key={b._id} value={b.typeName}>
                      {b.typeName}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <label htmlFor="boat_img" className="w-[35%] text-white">
              Bootsbild:{' '}
            </label>
            <input type="file" name="boat_img" id="boat_img" className="pl-48" />
          </div>
          <button className="bg-colorFour rounded-3xl p-6 hover:opacity-75">SENDEN</button>
        </form>
        {errorMessage && (
          <p className="bg-red-200 ml-[25%] p-4 text-[1.5rem] w-full text-center font-bold text-red-700 absolute bottom-[15%]">
            {errorMessage}
          </p>
        )}
      </article>
    </>
  );
};

Form.propTypes = {
  method: PropTypes.string,
  boatData: PropTypes.object,
  setSuccess: PropTypes.func,
  setRefresh: PropTypes.func,
  setShowForm: PropTypes.func,
};

export default Form;
