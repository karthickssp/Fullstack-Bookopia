import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './EntryPage/Login';
import Register from './EntryPage/Register';
import UpdateDataData from './Components/UpdateData';
import GetData from './Components/GetData';
import AddData from './Components/AddData';
import ViewData from './Components/ViewData';
import Home from './EntryPage/Home';
import Sort from './Elements/Sort';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route path = '/' element ={<Login/>}/>
          <Route path = '/register' element ={<Register/>}/>
          <Route path = '/home' element =<Home/>/>        
          <Route path = '/add' element ={<AddData/>}/>
          <Route path = '/get' element ={<GetData/>}/>
          <Route path = '/view/:id' element ={<ViewData/>}/>
          <Route path = '/edit' element ={<UpdateDataData/>}/>
          <Route path = '/edit/:id' element ={<UpdateDataData/>}/>
          <Route path = '/sort' element ={<Sort/>}/>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;