import React from 'react';
import './App.css';
import FileUploader from './pages/home/components/fileUploader/FileUploader';
import nba_logo from './assets/imgs/nba.png'

const App: React.FC = () => {
  return (
    <div className='containerApp'>
      <img src={nba_logo} alt="nba_logo"  className='imgHome'/>
      <h1>Upload a CSV file with the info of your favorite NBA players</h1>
    <div className='fileUploader'>
      <FileUploader/>
    </div>
  </div>
  );
}

export default App;
