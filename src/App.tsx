import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './components/layouts/AppLayout.tsx'
import Homepage from './pages/Homepage.tsx';
import Pricing from './pages/Pricing.tsx';
import About from './pages/About.tsx';
import Blog from './pages/Blog.tsx';
import Contact from './pages/Contact.tsx';

// Service pages
import WebDevelopment from './pages/services/WebDevelopment.tsx';
import MobileApps from './pages/services/MobileApps.tsx';
import Ecommerce from './pages/services/Ecommerce.tsx';
import DigitalMarketing from './pages/services/DigitalMarketing.tsx';
import Consulting from './pages/services/Consulting.tsx';
import Maintenance from './pages/services/Maintenance.tsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Service routes */}
          <Route path="/services/web-development" element={<WebDevelopment />} />
          <Route path="/services/mobile-apps" element={<MobileApps />} />
          <Route path="/services/ecommerce" element={<Ecommerce />} />
          <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/services/consulting" element={<Consulting />} />
          <Route path="/services/maintenance" element={<Maintenance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
