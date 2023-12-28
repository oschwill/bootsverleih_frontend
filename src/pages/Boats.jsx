import { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Form from '../components/main/Form';
import { BoatTypeContext, LoginContext, MaterialContext } from '../context/Context';
import { fetchData, manipulateData } from '../utils/fetchDataModel';
import BoatItem from '../components/main/BoatItem';

const materials = await fetchData('boats/materials');
const boatTypes = await fetchData('boats/boat-types');

const Boats = () => {
  let boats = useLoaderData();
  const [boatData, setBoatData] = useState(boats);
  const [editBoatData, setEditBoatData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [method, setMethod] = useState(null);
  const [refresh, setRefresh] = useState(null);
  const [success, setSuccess] = useState(null);

  const userLogin = useContext(LoginContext);

  useEffect(() => {
    async function refreshData() {
      const data = await fetchData('boats/data');
      setBoatData(data);
    }

    refreshData();

    setTimeout(() => {
      setSuccess(null);
    }, 5000);
  }, [refresh]);

  const handleShowForm = (_method, data) => {
    setShowForm(!showForm);
    setMethod(_method);

    if (data) {
      setEditBoatData(data);
    }
  };

  const deleteBoat = async (id) => {
    if (!id) {
      return;
    }

    setSuccess(null);

    const response = await manipulateData(`boats/data/${id}`, 'DELETE', null, setSuccess, {
      'Method-Information': 'DELETE',
      authorization: 'Basic ' + btoa(`${userLogin.email}:${userLogin.password}`),
    });

    setRefresh(crypto.randomUUID());
    setSuccess(response.message);
  };

  return (
    <>
      {userLogin ? (
        <>
          <div className="pl-[15%] pr-[5%] pt-[1%] flex items-center gap-20">
            <h2 className="text-[3rem]">Alle Boote</h2>
            <button
              className="bg-colorFour rounded-3xl  h-12 w-[200px] hover:opacity-75"
              onClick={() => handleShowForm('POST', null)}
            >
              Neues Boot anlegen
            </button>
          </div>
          <section className="grid grid-cols-3 gap-[5%] pl-[15%] pr-[5%] pt-[1%] mb-[125px] bg-colorThree">
            {boatData && boatData.length > 0 ? (
              boatData.map((boat) => {
                return (
                  <BoatItem
                    key={boat._id}
                    boat={boat}
                    handleShowForm={handleShowForm}
                    deleteBoat={deleteBoat}
                  />
                );
              })
            ) : (
              <p>KEINE BOOTE VERFÜGBAR!</p>
            )}
            {success && (
              <p className="fixed left-[40%] bg-green-300 p-4 rounded-lg text-[1.5rem]">
                {success}
              </p>
            )}
          </section>
          <MaterialContext.Provider value={materials}>
            <BoatTypeContext.Provider value={boatTypes}>
              {showForm && (
                <Form
                  method={method}
                  boatData={editBoatData}
                  setSuccess={setSuccess}
                  setRefresh={setRefresh}
                  setShowForm={setShowForm}
                />
              )}
            </BoatTypeContext.Provider>
          </MaterialContext.Provider>
        </>
      ) : (
        <p className="text-center text-[1.5rem]">Bitte Loggen Sie sich ein!</p>
      )}
    </>
  );
};

export default Boats;
