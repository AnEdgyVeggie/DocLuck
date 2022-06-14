import './App.css';
import Docs from './Components/Docs/docs'
import EditDocs from './Components/EditDocs/EditDocs'
import { database } from './Components/Firebase/firebaseConfig';
import { Routes, Route } from 'react-router-dom';

export default function App() {

  return (
    <Routes>
      <Route path='/' element={<Docs database={database} />} />
      <Route path='/editDocs/:id' element={<EditDocs database={database}/>} />
    </Routes>

  );
}
