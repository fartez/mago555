import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavTranslations } from '../translations/nav';

export default function Navigation() {
  const { language } = useLanguage();
  const t = useNavTranslations(language);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    `font-semibold text-sm transition-colors hover:text-[#00265E] ${isActive(path) ? 'text-[#00265E]' : 'text-gray-700'}`;

  const toggleDropdown = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src="/images/small_logo.png"
              alt="Mago Eye Clinic"
              className="h-12 md:h-16 w-auto max-w-[200px] md:max-w-[300px] object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
                const span = document.createElement('span');
                span.className = 'font-bold text-[#00265E] text-xl';
                span.textContent = 'MaGo Clinic';
                e.currentTarget.parentElement?.appendChild(span);
              }}
            />
          </Link>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-5">
            <Link to="/" className={linkClass('/')}>{t.home}</Link>

            {/* Magotherapy dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 font-semibold text-sm text-gray-700 hover:text-[#00265E] transition-colors">
                {t.magotherapy}
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md mt-1 py-2 min-w-[180px] z-50">
                <Link to="/magotherapy" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#00265E]">{t.magotherapyFull}</Link>
                <Link to="/glaukoma" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#00265E]">{t.glaukoma}</Link>
                <Link to="/amblyopia" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#00265E]">{t.amblyopia}</Link>
                <Link to="/astigmatizm" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#00265E]">{t.astigmatizm}</Link>
                <Link to="/sielme" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#00265E]">{t.sielme}</Link>
                <Link to="/pigmenturetinite" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#00265E]">{t.pigmentaryRetinitis}</Link>
              </div>
            </div>

            <Link to="/faq" className={linkClass('/faq')}>{t.faq}</Link>

            {/* Gallery dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 font-semibold text-sm text-gray-700 hover:text-[#00265E] transition-colors">
                {t.gallery}
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md mt-1 py-2 min-w-[160px] z-50">
                <Link to="/gallery" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#00265E]">{t.photoGallery}</Link>
                <Link to="/video-gallery" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#00265E]">{t.videoGallery}</Link>
              </div>
            </div>

            {/* Results dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 font-semibold text-sm text-gray-700 hover:text-[#00265E] transition-colors">
                {t.results}
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md mt-1 py-2 min-w-[220px] z-50">
                <Link to="/zogadi" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#00265E]">{t.general}</Link>
                <Link to="/sielme" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#00265E]">{t.sielme}</Link>
                <Link to="/pigmenturetinite" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#00265E]">{t.pigmentaryRetinitis}</Link>
                <Link to="/amblyopia" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#00265E]">{t.amblyopia}</Link>
                <Link to="/glaukoma" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#00265E]">{t.glaukoma}</Link>
                <Link to="/astigmatizm" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#00265E]">{t.astigmatizm}</Link>
              </div>
            </div>

            <Link to="/about" className={linkClass('/about')}>{t.about}</Link>
            <Link to="/contact" className={linkClass('/contact')}>{t.contact}</Link>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100">
            <Link to="/" className="block py-2 font-medium text-gray-700 hover:text-[#00265E]" onClick={() => setMobileOpen(false)}>{t.home}</Link>

            <button className="w-full flex items-center justify-between py-2 font-medium text-gray-700" onClick={() => toggleDropdown('mago')}>
              {t.magotherapy} <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'mago' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'mago' && (
              <div className="pl-4 space-y-1">
                <Link to="/magotherapy" className="block py-1.5 text-sm text-gray-600 hover:text-[#00265E]" onClick={() => setMobileOpen(false)}>{t.magotherapyFull}</Link>
                <Link to="/glaukoma" className="block py-1.5 text-sm text-gray-600 hover:text-[#00265E]" onClick={() => setMobileOpen(false)}>{t.glaukoma}</Link>
                <Link to="/amblyopia" className="block py-1.5 text-sm text-gray-600 hover:text-[#00265E]" onClick={() => setMobileOpen(false)}>{t.amblyopia}</Link>
                <Link to="/astigmatizm" className="block py-1.5 text-sm text-gray-600 hover:text-[#00265E]" onClick={() => setMobileOpen(false)}>{t.astigmatizm}</Link>
                <Link to="/sielme" className="block py-1.5 text-sm text-gray-600 hover:text-[#00265E]" onClick={() => setMobileOpen(false)}>{t.sielme}</Link>
                <Link to="/pigmenturetinite" className="block py-1.5 text-sm text-gray-600 hover:text-[#00265E]" onClick={() => setMobileOpen(false)}>{t.pigmentaryRetinitis}</Link>
              </div>
            )}

            <Link to="/faq" className="block py-2 font-medium text-gray-700 hover:text-[#00265E]" onClick={() => setMobileOpen(false)}>{t.faq}</Link>

            <button className="w-full flex items-center justify-between py-2 font-medium text-gray-700" onClick={() => toggleDropdown('gallery')}>
              {t.gallery} <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'gallery' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'gallery' && (
              <div className="pl-4 space-y-1">
                <Link to="/gallery" className="block py-1.5 text-sm text-gray-600 hover:text-[#00265E]" onClick={() => setMobileOpen(false)}>{t.photoGallery}</Link>
                <Link to="/video-gallery" className="block py-1.5 text-sm text-gray-600 hover:text-[#00265E]" onClick={() => setMobileOpen(false)}>{t.videoGallery}</Link>
              </div>
            )}

            <button className="w-full flex items-center justify-between py-2 font-medium text-gray-700" onClick={() => toggleDropdown('results')}>
              {t.results} <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'results' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'results' && (
              <div className="pl-4 space-y-1">
                <Link to="/zogadi" className="block py-1.5 text-sm text-gray-600 hover:text-[#00265E]" onClick={() => setMobileOpen(false)}>{t.general}</Link>
                <Link to="/sielme" className="block py-1.5 text-sm text-gray-600 hover:text-[#00265E]" onClick={() => setMobileOpen(false)}>{t.sielme}</Link>
                <Link to="/pigmenturetinite" className="block py-1.5 text-sm text-gray-600 hover:text-[#00265E]" onClick={() => setMobileOpen(false)}>{t.pigmentaryRetinitis}</Link>
                <Link to="/amblyopia" className="block py-1.5 text-sm text-gray-600 hover:text-[#00265E]" onClick={() => setMobileOpen(false)}>{t.amblyopia}</Link>
                <Link to="/glaukoma" className="block py-1.5 text-sm text-gray-600 hover:text-[#00265E]" onClick={() => setMobileOpen(false)}>{t.glaukoma}</Link>
                <Link to="/astigmatizm" className="block py-1.5 text-sm text-gray-600 hover:text-[#00265E]" onClick={() => setMobileOpen(false)}>{t.astigmatizm}</Link>
              </div>
            )}

            <Link to="/about" className="block py-2 font-medium text-gray-700 hover:text-[#00265E]" onClick={() => setMobileOpen(false)}>{t.about}</Link>
            <Link to="/contact" className="block py-2 font-medium text-gray-700 hover:text-[#00265E]" onClick={() => setMobileOpen(false)}>{t.contact}</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
