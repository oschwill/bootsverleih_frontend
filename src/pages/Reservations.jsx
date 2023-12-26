import { useEffect, useState } from 'react';
import { handleStartDateField, lockDateInput } from '../utils/dateFieldHelper';
import { fetchData, manipulateData } from '../utils/fetchDataModel';
import { Link } from 'react-router-dom';

const lockStartField = lockDateInput(new Date());
let lockEndField = '';

const Reservations = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hasStartDate, setHasStartDate] = useState(false);
  const [message, setMessage] = useState(null);
  const [freeBoats, setFreeBoats] = useState(null);
  const [reservedBoats, setReservedBoats] = useState(null);
  const [refresh, setRefresh] = useState(null);

  // const queryParameters = new URLSearchParams(window.location.search);
  // const boat = queryParameters.get('boat');

  useEffect(() => {
    if (hasStartDate && endDate) {
      getFreeBoats();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDate]);

  useEffect(() => {
    async function fetchSingleData() {
      const data = await fetchData('reservation/data');
      setReservedBoats(data);
    }

    fetchSingleData();
  }, [refresh]);

  const getFreeBoats = async () => {
    setMessage(null);

    if (!startDate || !endDate) {
      setMessage('Bitte füllen Sie beide Datumsfelder aus!');
      return;
    }
    // Nun fetchen wir alle free boats für den Zeitraum
    const searchObject = {
      startDate,
      endDate,
    };

    const data = await manipulateData(
      'reservation/free',
      'POST',
      JSON.stringify(searchObject),
      setMessage,
      true
    );

    setFreeBoats(data);
  };

  const handleBootReservation = async (e) => {
    e.preventDefault();
    const postBoatData = {
      boatId: e.target.boats && e.target.boats.value,
      startDate: e.target.startDate && e.target.startDate.value,
      endDate: e.target.endDate && e.target.endDate.value,
    };

    const hasNoValues = Object.values(postBoatData).some((value) => value === '');

    if (!postBoatData || hasNoValues) {
      setMessage('Bitte füllen Sie alle Felder aus!');
      return;
    }

    // save Reservation
    const response = await manipulateData(
      'reservation/data',
      'POST',
      JSON.stringify(postBoatData),
      setMessage,
      true
    );

    if (response) {
      setMessage({
        msg: 'Das Boot wurde reserviert!',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
      });

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }

    // REFRESH
    setStartDate('');
    setEndDate('');
    setFreeBoats(null);
    setRefresh(crypto.randomUUID());
  };

  return (
    <section className="grid grid-cols-2 pl-[15%] pr-[5%] pt-[5%]">
      <article className="flex flex-col gap-6">
        <h2 className="text-[3rem]">Boot ausleihen</h2>
        <form className="flex flex-col gap-4 text-[1.5rem]" onSubmit={handleBootReservation}>
          <div>
            <label htmlFor="startDate" className="pr-2">
              Von:
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={startDate}
              {...lockStartField}
              onKeyDown={(e) => e.preventDefault()}
              onChange={(e) =>
                (lockEndField = handleStartDateField(e, setStartDate, setHasStartDate))
              }
            />
          </div>
          <div>
            <label htmlFor="endDate" className="pr-2">
              Bis:
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              {...lockEndField}
              value={endDate}
              disabled={!hasStartDate}
              onKeyDown={(e) => e.preventDefault()}
              onChange={(e) => {
                setEndDate(e.target.value);
                getFreeBoats();
              }}
            />
          </div>
          <div>
            <div className="grid grid-cols-2 gap-2 w-[65%] border-2 p-2">
              {freeBoats && freeBoats.length > 0 ? (
                freeBoats.map((boat) => {
                  return (
                    <div className="flex items-center gap-2 mr" key={crypto.randomUUID()}>
                      <label htmlFor="test" className="whitespace-nowrap">
                        <Link to={`/details/${boat._id}`} className="underline text-blue-500 ">
                          {boat.name}
                        </Link>
                      </label>
                      <input type="radio" name="boats" value={boat._id} />
                    </div>
                  );
                })
              ) : (
                <p>
                  {startDate && endDate && 'Aktuelle keine Boote für diesen Zeitraum verfügbar'}
                </p>
              )}
            </div>
            {message && (
              <p
                className={`${message.bgColor ? message.bgColor : 'bg-red-100'} ${
                  message.textColor ? message.textColor : 'text-red-800'
                }  text-[1.5rem]`}
              >
                {message.msg ? message.msg : message}
              </p>
            )}
          </div>
          <button className="bg-colorFour p-2 w-[25%] rounded-3xl">Ausleihen</button>
        </form>
      </article>
      <article className="flex flex-col gap-6 h-50vh overflow-scroll h-[750px]">
        <h2 className="text-[3rem]">Aktuelle Reservierungen:</h2>
        {reservedBoats && reservedBoats.length > 0 ? (
          reservedBoats.map((reserved) => {
            return (
              <div className="border-2 p-2" key={reserved._id}>
                <p>RNR: {reserved.reservationNumber}</p>
                <p>Boot: {reserved.reservedBoat.name}</p>
                <p>Baujahr: {reserved.reservedBoat.constructionYear}</p>
                <p>Seriennummer: {reserved.reservedBoat.serialNumber}</p>
                <p>Von: {new Date(reserved.reservedStartDate).toLocaleDateString('de-DE')}</p>

                <p>Bis: {new Date(reserved.reservedEndDate).toLocaleDateString('de-DE')}</p>
              </div>
            );
          })
        ) : (
          <p>Keine Reservierungen vorhanden</p>
        )}
      </article>
    </section>
  );
};

export default Reservations;
