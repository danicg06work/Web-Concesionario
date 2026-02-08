import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ModelShowcase from './components/ModelShowcase';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#FF8000] selection:text-black font-sans">
      <Navbar />
      <Hero />
      <ModelShowcase />
      <Footer />
    </div>
  );
}

export default App;
