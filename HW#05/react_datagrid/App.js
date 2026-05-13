import CGU_Login from './cgu_login';
import './App.css';
import MultiButton from './cgu_multiButton'
import HelloCGU  from './cgu_hello';
import Data from  './datagrid';
function App() {
  return (
    <div className="App">
      <div>
        {Data()}
      </div>
      
    </div>
  );
}

export default App;
