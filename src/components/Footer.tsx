import { Link } from 'react-router-dom';
import { Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useFooterTranslations } from '../translations/footer';

export default function Footer() {
  const { language, getSiteContent } = useLanguage();
  const t = useFooterTranslations(language);

  const phoneNumberFull = getSiteContent('about', 'phoneNumberFull', '+995 599 506 507');
  const emailAddress = getSiteContent('about', 'emailAddress', 'doctormago2018@gmail.com');
  const facebookUrl = getSiteContent('about', 'facebookUrl', 'https://www.facebook.com/eyeclinicMaGo/');
  const youtubeUrl = getSiteContent('about', 'youtubeUrl', 'https://www.youtube.com/channel/UCfWbr2cXHIoHqQPgGphWR0Q');

  return (
    <footer className="bg-[#00265E] text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 tracking-wide">{t.contact}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 opacity-80" />
                <a href={`tel:${phoneNumberFull.replace(/\s/g, '')}`} className="hover:text-gray-300 transition-colors">
                  {phoneNumberFull}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 opacity-80" />
                <a href={`mailto:${emailAddress}`} className="hover:text-gray-300 transition-colors break-all">
                  {emailAddress}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 opacity-80 mt-0.5" />
                <p className="opacity-90 leading-relaxed">{t.address}</p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-bold text-lg mb-4 tracking-wide">{t.menu}</h3>
            <div className="space-y-2 text-sm">
              <Link to="/" className="block opacity-90 hover:opacity-100 hover:text-gray-300 transition-colors">{t.home}</Link>
              <Link to="/magotherapy" className="block opacity-90 hover:opacity-100 hover:text-gray-300 transition-colors">{t.magotherapy}</Link>
              <Link to="/faq" className="block opacity-90 hover:opacity-100 hover:text-gray-300 transition-colors">{t.faq}</Link>
              <Link to="/gallery" className="block opacity-90 hover:opacity-100 hover:text-gray-300 transition-colors">{t.gallery}</Link>
              <Link to="/zogadi" className="block opacity-90 hover:opacity-100 hover:text-gray-300 transition-colors">{t.results}</Link>
              <Link to="/about" className="block opacity-90 hover:opacity-100 hover:text-gray-300 transition-colors">{t.about}</Link>
              <Link to="/contact" className="block opacity-90 hover:opacity-100 hover:text-gray-300 transition-colors">{t.contactLink}</Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-4 tracking-wide">{t.followUs}</h3>
            <p className="text-sm opacity-90 mb-4">{t.followSocial}</p>
            <div className="space-y-3">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
              >
                <Facebook className="w-5 h-5" />
                {t.facebookButton}
              </a>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
              >
                <Youtube className="w-5 h-5" />
                {t.youtubeButton}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-4 text-center text-xs opacity-70">
          <p>© {new Date().getFullYear()} თვალის კლინიკა "ახალი ტექნოლოგიები — MaGo"</p>
        </div>
      </div>
    </footer>
  );
}
