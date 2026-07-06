import { useState } from 'react';
import { Phone, Facebook, Youtube, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSharedTranslations } from '../translations/shared';

export default function Header() {
  const { language, setLanguage, getSiteContent } = useLanguage();
  const t = useSharedTranslations(language);
  const [copied, setCopied] = useState(false);

  const phoneNumber = getSiteContent('about', 'phoneNumber', '599 - 506 - 507');
  const phoneNumberFull = getSiteContent('about', 'phoneNumberFull', '+995 599 506 507');
  const facebookUrl = getSiteContent('about', 'facebookUrl', 'https://www.facebook.com/eyeclinicMaGo/');
  const youtubeUrl = getSiteContent('about', 'youtubeUrl', 'https://www.youtube.com/channel/UCfWbr2cXHIoHqQPgGphWR0Q');
  const whatsappUrl = getSiteContent('about', 'whatsappUrl', 'https://wa.me/995599506507');

  const handlePhoneCopy = () => {
    navigator.clipboard.writeText(phoneNumberFull.replace(/\s/g, '')).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
              <Facebook className="w-5 h-5 text-blue-600" />
            </a>
            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
              <Youtube className="w-5 h-5 text-red-600" />
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
              <MessageCircle className="w-5 h-5 text-green-500" />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePhoneCopy}
              className="flex items-center gap-2 font-bold text-sm text-[#00265E] hover:text-[#003366] transition-colors"
              title="Click to copy"
            >
              <Phone className="w-4 h-4" />
              <span>{phoneNumber}</span>
              {copied && <span className="text-xs text-green-600 ml-1">Copied!</span>}
            </button>

            <div className="flex gap-1">
              {(['ge', 'en', 'ru'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-0.5 text-xs font-bold rounded transition-colors ${
                    language === lang
                      ? 'bg-[#00265E] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#00265E] text-white py-1 text-center">
        <p className="text-sm font-medium tracking-wide">{t.appointmentOnly}</p>
      </div>
    </div>
  );
}
