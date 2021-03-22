import './App.css';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import { Toast } from 'react-bootstrap';
import { useState } from 'react';

// Importar paginas
import Login from './pages/login/Login'

// Verificar que la API esta cargada

function App() {
  const [show, setShow ] = useState(false);
  
  const connect = () => axios.get('/api').catch(() => setShow(true));

  connect()
  
  return (
    <div className="App">
      <Toast id="info" show={show} animation={true} onClose={() => setShow(!show)}>
          <Toast.Header  className="bg-danger" style={{ color: '#fff' }}>
          <strong className="mr-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>El servidor del API se encuentra caido</Toast.Body>
      </Toast>
      <Switch>
        <Route
          path = '/login'
          component = { Login }
          setShow={setShow}
        />
        <Route
          path = '/'
        />
      </Switch>
    </div>
  );
}

export default App;