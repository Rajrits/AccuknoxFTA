import React from 'react';
import Dashboard from './components/Dashboard';
import AddWidgetModal from './components/AddWidgetModal';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Dynamic Dashboard</h1>
        <SearchBar />
      </header>
      <main className="app-main">
        <Dashboard />
        <AddWidgetModal />
      </main>
    </div>
  );
}

export default App;
