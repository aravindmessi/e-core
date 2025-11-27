import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import UpcomingPlayers from './pages/UpcomingPlayers';
import Formations from './pages/Formations';
import Managers from './pages/Managers';
import Tournaments from './pages/Tournaments';



const App: React.FC = () => {

  useEffect(() => {
  
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upcoming" element={<UpcomingPlayers />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/managers" element={<Managers />} />
          <Route path="/tournaments" element={<Tournaments />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
