import { RouterProvider } from 'react-router-dom';
import router from './pages';

import './App.css';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
