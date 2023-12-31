import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Home from './pages/Home';
import Loading from './components/loading/Loading';
import { fetchData, getDataLength } from './utils/fetchDataModel';
import Boats from './pages/Boats';
import Details from './pages/Details';
import Reservations from './pages/Reservations';
import RootLayout from './layouts/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        index
        element={<Home />}
        loader={async () => {
          return {
            shipCount: await getDataLength(fetchData('boats/data')),
            reservationCount: await getDataLength(fetchData('reservation/data')),
          };
        }}
      />
      <Route path="/ships" element={<Boats />} loader={() => fetchData('boats/data')} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/reservation/" element={<Reservations />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} fallbackElement={<Loading />} />;
}

export default App;
