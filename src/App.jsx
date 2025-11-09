import './App.css'
import CustomCursor from './components/CustomCursor'
import Navbar from './pages/Navbar'
import About from './pages/About'
import Hero from './pages/Hero'
import Stats from './pages/Stats'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Education from './pages/Education'
import Reviews from './pages/Reviews'
import AIBot from './components/AIBot'
import Footer from './components/Footer'
import Footer2 from './components/Footer2'
import Contact from './pages/Contact'

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Reviews />
      <AIBot />
      <Contact />
      <Footer />
      <Footer2 />
    </div>
  )
}

export default App