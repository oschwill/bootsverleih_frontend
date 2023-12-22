import { useLoaderData } from 'react-router-dom';

const Home = () => {
  const { reservationCount, shipCount } = useLoaderData();

  return (
    <section className="grid grid-cols-2 gap-[10%] pl-[15%] pr-[5%] pt-[10%]">
      <article className="border-4 border-colorFour p-4 flex flex-col gap-12">
        <h2 className="text-[3rem] text-center">Reservierungen Gesamt:</h2>
        <p className="text-[10rem] text-center">{reservationCount}</p>
      </article>
      <article className="border-4 border-colorFour p-4 flex flex-col gap-12">
        <h2 className="text-[3rem] text-center">Boote Gesamt:</h2>
        <p className="text-[10rem] text-center">{shipCount}</p>
      </article>
    </section>
  );
};

export default Home;
