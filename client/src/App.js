import React from 'react';
import './assets/sass/index.sass';
import Students from './components/Students/index';
import SearchBar from './components/SearchBar/index';

function App() {
  return (
    <div>
      <SearchBar />
      <Students />
    </div>
  );
}

export default App;
