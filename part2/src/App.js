import Header from './components/header';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './views/home';
import AddEmplyee from './views/addEmplyee';
import EmplyeeDetail from './views/emplyeeDetail';
import UpdateEmplyee from './views/updateEmplyee';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-emplyee' element={<AddEmplyee />} />
        <Route path='/emplyee-detail/:id' element={<EmplyeeDetail />} />
        <Route path='/update-emplyee/:id' element={<UpdateEmplyee />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
