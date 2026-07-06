import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BookingPage from './pages/BookingPage';
import GlaukomaPage from './pages/GlaukomaPage';
import AmblyopiaPage from './pages/AmblyopiaPage';
import AstigmatizmPage from './pages/AstigmatizmPage';
import SielmePage from './pages/SielmePage';
import PigmenturetinitePage from './pages/PigmenturetinitePage';
import ZogadiPage from './pages/ZogadiPage';
import PhotoGalleryPage from './pages/PhotoGalleryPage';
import VideoGalleryPage from './pages/VideoGalleryPage';
import FAQPage from './pages/FAQPage';
import AdminPage from './admin/AdminPage';

export default function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/glaukoma" element={<GlaukomaPage />} />
        <Route path="/amblyopia" element={<AmblyopiaPage />} />
        <Route path="/astigmatizm" element={<AstigmatizmPage />} />
        <Route path="/sielme" element={<SielmePage />} />
        <Route path="/pigmenturetinite" element={<PigmenturetinitePage />} />
        <Route path="/zogadi" element={<ZogadiPage />} />
        <Route path="/gallery" element={<PhotoGalleryPage />} />
        <Route path="/video-gallery" element={<VideoGalleryPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/admin/*" element={<AdminAuthProvider><AdminPage /></AdminAuthProvider>} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </LanguageProvider>
  );
}
