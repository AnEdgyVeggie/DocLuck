import './App.css';
import Docs from './Components/Docs/docs'
import { app, database } from './Components/Firebase/firebaseConfig'

function App() {

  return (
    <div className="App">

      <Docs database={database}/>
    </div>
  );
}

export default App;
