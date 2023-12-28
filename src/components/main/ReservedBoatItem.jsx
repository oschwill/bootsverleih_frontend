import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const ReservedBoatItem = ({ reserved, deleteReservation }) => {
  return (
    <div className="flex items-center justify-between w-full border-2 p-4">
      <div>
        <p>RNR: {reserved.reservationNumber}</p>
        <p>Boot: {reserved.reservedBoat.name}</p>
        <p>Baujahr: {reserved.reservedBoat.constructionYear}</p>
        <p>Seriennummer: {reserved.reservedBoat.serialNumber}</p>
        <p>Von: {new Date(reserved.reservedStartDate).toLocaleDateString('de-DE')}</p>
        <p>Bis: {new Date(reserved.reservedEndDate).toLocaleDateString('de-DE')}</p>
        <p>reserviert für: {reserved.userName.userName}</p>
      </div>
      <div>
        <FontAwesomeIcon
          icon={faX}
          style={{ height: '100px' }}
          className="text-red-700 font-semibold cursor-pointer hover:text-red-300"
          onClick={() => deleteReservation(reserved.reservationNumber)}
        />
      </div>
    </div>
  );
};

ReservedBoatItem.propTypes = {
  reserved: PropTypes.object,
  deleteReservation: PropTypes.func,
};

export default ReservedBoatItem;
