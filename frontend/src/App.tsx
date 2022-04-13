import React from 'react';
import {Route, Routes} from 'react-router-dom';
import { ChildView } from './views/ChildView';
import {GiftsView} from "./views/GiftView/GiftsView";
import {SingleGiftView} from "./views/SingleGiftView";
import {Header} from "./components/Header/Header";
import './App.css';

function App() {
  return (
    <div className='app'>
        <h1 className='app__title'>Santa App</h1>
        <Header/>
        <hr/>
        <Routes>
            <Route path='/gift' element={<GiftsView/>}/>
            <Route path='/gift/:giftId' element={<SingleGiftView/>}/>
            <Route path='/child' element={<ChildView/>}/>

        </Routes>
    </div>
  );
}

export default App;
