import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BoatItem = ({ boat, handleShowForm, deleteBoat }) => {
  return (
    <article className="text-center h-[500px]">
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
        <h2 className="text-center text-[3rem]">{boat.name}</h2>
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
};

BoatItem.propTypes = {
  boat: PropTypes.object,
  handleShowForm: PropTypes.func,
  deleteBoat: PropTypes.func,
};

export default BoatItem;
