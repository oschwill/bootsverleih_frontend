import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Form from '../components/main/Form';
import { BoatTypeContext, MaterialContext } from '../context/Context';
import { fetchData, manipulateData } from '../utils/fetchDataModel';

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
      console.log('first');
      setEditBoatData(data);
    }
  };

  const deleteBoat = async (id) => {
    if (!id) {
      return;
    }

    setSuccess(null);

    const response = await manipulateData(`boats/data/${id}`, 'DELETE', null);

    setRefresh(crypto.randomUUID());
    setSuccess(response.message);
  };

  return (
    <>
      <div className="pl-[10%] pr-[5%] pt-[1%] flex gap-20">
        <h2 className="text-[3rem]">Alle Boote</h2>
        <button
          className="bg-colorFour rounded-3xl p-6 hover:opacity-75"
          onClick={() => handleShowForm('POST', null)}
        >
          Neues Boot anlegen
        </button>
      </div>
      <section className="grid grid-cols-3 gap-[5%] pl-[10%] pr-[5%] pt-[1%] bg-colorThree">
        {boatData && boatData.length > 0 ? (
          boatData.map((boat) => {
            return (
              <article key={boat._id} className="text-center">
                <Link to={`/details/${boat._id}`}>
                  {' '}
                  <img
                    src={
                      boat.imagePath
                        ? `${import.meta.env.VITE_IMAGE_URL}/${boat.imagePath}`
                        : '/images/Placeholder_Boat.jpg'
                    }
                    alt="boat image"
                    className="h-[50%] w-full object-cover"
                  />
                  <h2 className="text-center text-[4rem]">{boat.name}</h2>
                  <p>Baujahr: {boat.constructionYear}</p>
                  <p>Seriennummer: {boat.serialNumber}</p>
                  <p>Material: {boat.material.name}</p>
                  <p>Bootstyp: {boat.boatType.typeName}</p>
                </Link>
                <div className="mt-6 flex justify-around">
                  <button
                    className="bg-colorFour rounded-3xl h-12 w-[150px] hover:opacity-75"
                    onClick={() => handleShowForm('PUT', boat)}
                  >
                    EDIT
                  </button>
                  <button
                    className="bg-colorFour rounded-3xl h-12 w-[150px]  hover:opacity-75"
                    onClick={() => deleteBoat(boat._id)}
                  >
                    REMOVE
                  </button>
                </div>
              </article>
            );
          })
        ) : (
          <p>KEINE BOOTE VERFÜGBAR!</p>
        )}
        {success && (
          <p className="fixed left-[40%] bg-green-300 p-4 rounded-lg text-[1.5rem]">{success}</p>
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
  );
};

export default Boats;
