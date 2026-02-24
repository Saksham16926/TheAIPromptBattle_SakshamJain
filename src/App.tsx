import Header from './components/Header';
import Hero from './components/Hero';
import TopPicks from './components/TopPicks';
import OffersCarousel from './components/OffersCarousel';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <OffersCarousel />
        <TopPicks />
      </main>
      <Footer />
    </div>
  );
}

export default App;
