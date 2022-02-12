import './App.css';

import {Home} from './Home';
import {Department} from './Department';
import {Employee} from './Employee';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
//import { tab } from '@testing-library/user-event/dist/tab';

function App() {
  return (
    <BrowserRouter>
    <div className='container'>
      <h3 className='m-3, d-flex justify-content-center'>
      <h6>(Frontend)</h6>React JS / AspNet Core API <h6>(Backend)</h6>
      </h3>
      <Navigation/>

      <Switch>
        <Route path={'/'} component={Home} exact/>
        <Route path={'/department'} component={Department} exact/>
        <Route path={'/employee'} component={Employee} exact/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
