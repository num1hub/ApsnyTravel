import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { TourDetail } from './pages/TourDetail';
import { About } from './pages/About';
import { FAQ } from './pages/FAQ';
import { Contacts } from './pages/Contacts';

function App() {
  return (
    <HashRouter>
      <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/tours/:slug" element={<TourDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;