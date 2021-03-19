import './App.css';

import { Route, Switch } from 'react-router-dom';

// Importar paginas
import Login from './pages/login/Login.js'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          path = '/login'
          component = { Login }
        />
        <Route
          path = '/'
        />
      </Switch>
    </div>
  );
}

export default App;
