import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchData } from '../utils/fetchDataModel';
import { LoginContext } from '../context/Context';

const Details = () => {
  const [singleData, setSingleData] = useState(null);
  const { id } = useParams();

  const userLogin = useContext(LoginContext);

  useEffect(() => {
    async function fetchSingleData() {
      const data = await fetchData(`boats/data/${id}`);
      setSingleData(data);
    }

    fetchSingleData();
  }, [id]);

  return (
    <>
      {userLogin ? (
        <section className="pl-[15%] pr-[5%] pt-[5%]">
          {singleData && singleData.data ? (
            <article className="flex flex-col">
              <h2 className="text-[3rem] text-center">{singleData.data.name}</h2>
              <img
                src={
                  singleData.data.imagePath
                    ? `${import.meta.env.VITE_IMAGE_URL}/${singleData.data.imagePath}`
                    : '/images/Placeholder_Boat.jpg'
                }
                alt="Boat Image"
                className="h-[50vh] object-cover"
              />
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div>
                  <p>Baujahr: {singleData.data.constructionYear}</p>
                  <p>Seriennummer: {singleData.data.serialNumber}</p>
                </div>
                <div>
                  <p>Material: {singleData.data.material.name}</p>
                  <p>Bootstyp: {singleData.data.boatType.typeName}</p>
                </div>
                <div>
                  <h2 className="text-[1.5rem]">Aktuelle Reservierungen</h2>
                  {singleData.reservations.length > 0 ? (
                    singleData.reservations.map((item) => {
                      return (
                        <div key={item.reservationNumber} className="w-full">
                          <p>
                            RNR: {item.reservationNumber}, von:{' '}
                            {new Date(item.reservedStartDate).toLocaleDateString('de-DE')}, bis:
                            {new Date(item.reservedEndDate).toLocaleDateString('de-DE')}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <p>Aktuell keine Reservierungen für dieses Boot vorhanden</p>
                  )}
                </div>
                <div className="flex gap-16">
                  <Link to="/reservation" className="underline text-blue-500">
                    Zu den Reservierungen
                  </Link>
                  <Link to={`/reservation?boat=${id}`} className="underline text-blue-500">
                    Dieses Boot reservieren
                  </Link>
                </div>
              </div>
            </article>
          ) : (
            <div>
              <p className="text-[2rem]">NO BOAT DATA AVAILABLE!</p>
              <Link to="/" className="underline text-blue-500">
                Zurück zu Home
              </Link>
            </div>
          )}
        </section>
      ) : (
        <p className="text-center text-[1.5rem]">Bitte Loggen Sie sich ein!</p>
      )}
    </>
  );
};

export default Details;
