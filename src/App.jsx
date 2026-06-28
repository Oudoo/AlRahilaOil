import { useState, useEffect, useRef } from 'react';
import {
  Smartphone,
  LayoutDashboard,
  QrCode,
  Nfc,
  ShieldCheck,
  BarChart3,
  ArrowLeft,
  Truck,
  Droplets,
  Building2,
  Wallet,
  Menu,
  X,
  ArrowLeftRight,
  Fuel,
  ChevronDown,
  Zap,
  ScanLine,
  Signal,
  Battery,
  Wifi,
  Camera,
  Moon,
  Sun
} from 'lucide-react';

import logoSrc from '/logo.png';
import qaribLogoSrc from '/qariblogo.png';

/* ────────────────────────────────────────────────── */
/*  CONTENT DICTIONARY                                */
/* ────────────────────────────────────────────────── */
const content = {
  brand: 'الراحلة',
  tagline: 'لخدمات النفط',
  navFeatures: 'المميزات',
  navDashboard: 'لوحة التحكم',
  navApp: 'تطبيق الهاتف',
  heroTitle: 'حلول ذكية لإدارة وصرف الوقود',
  heroDesc:
    'الحل المتكامل لإدارة وصرف الوقود بكفاءة واحترافية عالية.',
  ctaPrimary: 'طلب عرض تجريبي',
  ctaSecondary: 'استكشف النظام',
  appTitle: 'تطبيق الهاتف المحمول',
  appDesc:
    'حل ذكي يمكن موظفي المحطات من تنفيذ عمليات صرف الوقود ومتابعة الرصيد والتحويلات بكفاءة عالية.',
  featQR: 'صرف عبر QR و NFC',
  featQRDesc:
    'صرف آمن وسريع للوقود باستخدام رموز الاستجابة السريعة أو تقنية NFC مباشرة من التطبيق.',
  featTransfer: 'التحويلات بين المحطات',
  featTransferDesc:
    'تحويل سلس للأرصدة بين المحطات مع سجل كامل لجميع الحركات المالية.',
  featBalance: 'رصيد لحظي',
  featBalanceDesc:
    'متابعة فورية للأرصدة المتبقية وملخصات المعاملات اليومية.',
  dashTitle: 'لوحة التحكم المركزية بالنظام',
  dashDesc:
    'منصة مركزية متقدمة للتحليلات الرقابة، والمطابقة المالية، تدعم الإدارة العليا باتخاذ قرارات دقيقة.',
  statValue: 'إجمالي قيمة المعاملات',
  statVolume: 'إجمالي الوقود الموزع',
  statStations: 'المحطات النشطة',
  statCompanies: 'الشركات المستفيدة',
  footerText:
    'جميع الحقوق محفوظة.',
};

/* ────────────────────────────────────────────────── */
/*  INTERSECTION OBSERVER HOOK                        */
/* ────────────────────────────────────────────────── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);
  return [ref, isInView];
}

/* ────────────────────────────────────────────────── */
/*  ANIMATED COUNTER                                  */
/* ────────────────────────────────────────────────── */
function AnimatedCounter({ end, suffix = '', duration = 2000, isVisible }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start * 100) / 100);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  const display = end >= 1000
    ? (count / (end >= 1000000 ? 1000000 : 1000)).toFixed(end >= 1000000 ? 2 : 1)
    : count.toFixed(end % 1 === 0 ? 0 : 1);

  const unitLabel = end >= 1000000 ? 'M' : end >= 1000 ? 'K' : '';

  return (
    <span className="tabular-nums">
      {display}{unitLabel} {suffix}
    </span>
  );
}

/* ────────────────────────────────────────────────── */
/*  MAIN APP COMPONENT                                */
/* ────────────────────────────────────────────────── */
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const whatsappUrl = "https://wa.me/201095222229?text=" + encodeURIComponent("السلام عليكم، أريد طلب عرض تجريبي");
  
  const [heroRef, heroInView] = useInView();
  const [dashRef, dashInView] = useInView();
  const [appRef, appInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navLinks = [
    { label: content.navFeatures, href: '#features' },
    { label: content.navApp, href: '#app' },
    { label: content.navDashboard, href: '#dashboard' },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 dark:bg-slate-950 font-kufi text-slate-900 dark:text-slate-50 overflow-x-hidden transition-colors duration-300">

      {/* ═══════════════════════════════════════════ */}
      {/*  HEADER                                     */}
      {/* ═══════════════════════════════════════════ */}
      <header
        id="header"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl shadow-lg shadow-slate-900/5 dark:shadow-black/20 border-b border-slate-200/60 dark:border-slate-800/60'
            : 'bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo + Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-emerald-100 dark:ring-emerald-900/50 group-hover:ring-emerald-300 dark:group-hover:ring-emerald-700 transition-all shadow-md bg-white">
              <img
                src={logoSrc}
                alt="شعار الراحلة لخدمات النفط"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-emerald-800 dark:text-emerald-400 leading-tight tracking-tight">
                {content.brand}
              </h1>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                {content.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-1 items-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="تغيير المظهر"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-700/25 hover:shadow-emerald-700/40 hover:scale-[1.02] active:scale-[0.98]">
              {content.ctaPrimary}
            </a>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="md:hidden flex items-center gap-3">
             <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="تغيير المظهر"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="فتح القائمة"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pb-6 space-y-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block text-center w-full bg-emerald-700 dark:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm mt-2 shadow-lg shadow-emerald-700/25 dark:shadow-emerald-900/40">
              {content.ctaPrimary}
            </a>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════ */}
      {/*  HERO SECTION                               */}
      {/* ═══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative pt-16 pb-28 lg:pt-24 lg:pb-36 overflow-hidden">
        {/* Background decorative blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/60 dark:bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none transition-colors duration-500" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-100/40 dark:bg-teal-900/10 rounded-full blur-[100px] pointer-events-none transition-colors duration-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-50/30 dark:bg-emerald-950/30 rounded-full blur-[150px] pointer-events-none transition-colors duration-500" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <div className={`space-y-8 ${heroInView ? 'animate-slide-up' : 'opacity-0'}`}>


            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-slate-900 dark:text-white leading-[1.2] tracking-tight">
              {content.heroTitle.split(' ').map((word, i) =>
                word === 'ذكية' || word === 'الوقود' ? (
                  <span key={i} className="gradient-text dark:from-emerald-400 dark:to-emerald-200">{word} </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </h2>

            {/* Description */}
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              {content.heroDesc}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-emerald-700/20 dark:shadow-emerald-900/30 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3">
                {content.ctaPrimary}
                <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
              </a>
              <button 
                onClick={() => {
                  const willShow = !showExplore;
                  setShowExplore(willShow);
                  if (willShow) {
                    setTimeout(() => {
                      document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                  }
                }} 
                className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700 px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-2 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-600"
              >
                {content.ctaSecondary}
                <ChevronDown size={18} className={`text-emerald-600 dark:text-emerald-400 transition-transform ${showExplore ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                <span>نظام يعمل على مدار الساعة</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <ShieldCheck size={14} className="text-emerald-500 dark:text-emerald-400" />
                <span>تشفير بنكي</span>
              </div>
            </div>
          </div>

          {/* Visual Side — Complex Mockup Composition */}
          <div className={`relative h-[520px] lg:h-[600px] w-full hidden md:block ${heroInView ? 'animate-fade-in' : 'opacity-0'}`}>

            {/* Dashboard Mockup (Background) */}
            <div className="absolute top-0 right-0 w-[85%] h-[420px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-slate-900/10 dark:shadow-black/40 border border-slate-100 dark:border-slate-800 overflow-hidden animate-float-slow transition-colors duration-300">
              {/* Browser bar */}
              <div className="h-10 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-400 dark:bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-400 dark:bg-emerald-500" />
                <div className="flex-1 mx-4">
                  <div className="w-48 h-5 bg-slate-100 dark:bg-slate-700 rounded-full mx-auto" />
                </div>
              </div>
              {/* Dashboard layout */}
              <div className="flex h-[calc(100%-40px)]">
                {/* Sidebar */}
                <div className="w-14 bg-emerald-800 dark:bg-emerald-950 flex flex-col items-center py-4 gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 dark:bg-emerald-800 flex items-center justify-center">
                    <Fuel size={14} className="text-white" />
                  </div>
                  <div className="w-6 h-6 rounded bg-emerald-700/50 dark:bg-emerald-800/50" />
                  <div className="w-6 h-6 rounded bg-emerald-700/50 dark:bg-emerald-800/50" />
                  <div className="w-6 h-6 rounded bg-emerald-700/50 dark:bg-emerald-800/50" />
                  <div className="mt-auto w-6 h-6 rounded bg-emerald-700/50 dark:bg-emerald-800/50" />
                </div>
                {/* Main area */}
                <div className="flex-1 p-5 space-y-4 overflow-hidden">
                  {/* Top bar */}
                  <div className="flex items-center justify-between">
                    <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-lg w-32" />
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800" />
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800" />
                    </div>
                  </div>
                  {/* Stat cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-20 bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/40 dark:to-emerald-800/20 rounded-xl border border-emerald-100 dark:border-emerald-800/50 p-3 flex flex-col justify-between">
                      <div className="text-emerald-700 dark:text-emerald-400 font-black text-lg leading-none">9.85</div>
                      <div className="text-[9px] text-emerald-600 dark:text-emerald-500 font-bold">مليون دينار</div>
                    </div>
                    <div className="h-20 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/40 dark:to-blue-800/20 rounded-xl border border-blue-100 dark:border-blue-800/50 p-3 flex flex-col justify-between">
                      <div className="text-blue-700 dark:text-blue-400 font-black text-lg leading-none">213.9</div>
                      <div className="text-[9px] text-blue-600 dark:text-blue-500 font-bold">ألف لتر</div>
                    </div>
                    <div className="h-20 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/40 dark:to-purple-800/20 rounded-xl border border-purple-100 dark:border-purple-800/50 p-3 flex flex-col justify-between">
                      <div className="text-purple-700 dark:text-purple-400 font-black text-lg leading-none">47</div>
                      <div className="text-[9px] text-purple-600 dark:text-purple-500 font-bold">شركة</div>
                    </div>
                  </div>
                  {/* Chart placeholder */}
                  <div className="h-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-3 flex items-end gap-1">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-emerald-200 dark:bg-emerald-600/60 rounded-t"
                        style={{ height: `${h}%`, opacity: 0.5 + (h / 200) }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Phone Mockup (Foreground) */}
            <div className="absolute bottom-0 left-0 w-56 h-[420px] animate-float z-10">
              {/* Phone body */}
              <div className="w-full h-full bg-gradient-to-b from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 rounded-[2.5rem] shadow-2xl shadow-slate-900/30 dark:shadow-black/50 border-[3px] border-slate-700 dark:border-slate-600 p-[6px] relative transition-colors duration-300">
                {/* Notch */}
                <div className="phone-notch dark:bg-slate-950" />
                {/* Screen */}
                <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[2rem] overflow-hidden flex flex-col">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-5 pt-2 pb-1">
                    <span className="text-[8px] font-bold text-slate-500 dark:text-slate-400">9:41</span>
                    <div className="flex items-center gap-1">
                      <Signal size={8} className="text-slate-400 dark:text-slate-500" />
                      <Wifi size={8} className="text-slate-400 dark:text-slate-500" />
                      <Battery size={8} className="text-slate-400 dark:text-slate-500" />
                    </div>
                  </div>
                  {/* App header */}
                  <div className="px-4 pt-2 pb-3 text-center border-b border-slate-50 dark:border-slate-800">
                    <div className="w-8 h-8 rounded-lg overflow-hidden mx-auto mb-1 ring-1 ring-emerald-100 dark:ring-emerald-900 bg-white">
                      <img src={logoSrc} alt="" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-sm font-black text-emerald-800 dark:text-emerald-400">{content.brand}</h3>
                  </div>
                  {/* Wallet card */}
                  <div className="px-3 pt-3 space-y-2.5 flex-1">
                    <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 dark:from-emerald-700 dark:via-emerald-800 dark:to-emerald-950 rounded-2xl p-4 text-white shadow-lg shadow-emerald-600/30 dark:shadow-emerald-900/50 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full -translate-x-6 -translate-y-6" />
                      <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/5 rounded-full translate-x-4 translate-y-4" />
                      <div className="relative">
                        <span className="text-emerald-200 dark:text-emerald-300 text-[10px] font-bold">الرصيد المتاح</span>
                        <div className="text-2xl font-black mt-0.5 tracking-tight">850.000</div>
                        <span className="text-[10px] font-semibold text-emerald-200 dark:text-emerald-300">دينار ليبي</span>
                      </div>
                    </div>
                    {/* QR/NFC button */}
                    <div className="bg-gradient-to-l from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 rounded-xl p-3 text-white shadow-md shadow-orange-400/20 dark:shadow-orange-900/30 flex items-center justify-between">
                      <span className="font-black text-xs">صرف الوقود</span>
                      <div className="flex gap-1.5">
                        <QrCode size={16} />
                        <Nfc size={16} />
                      </div>
                    </div>
                    {/* Quick actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-1">
                        <ArrowLeftRight size={14} className="text-blue-500 dark:text-blue-400" />
                        <span className="text-[8px] font-bold text-slate-600 dark:text-slate-300">التحويلات</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-1">
                        <BarChart3 size={14} className="text-emerald-500 dark:text-emerald-400" />
                        <span className="text-[8px] font-bold text-slate-600 dark:text-slate-300">الحركات</span>
                      </div>
                    </div>
                  </div>
                  {/* Bottom nav */}
                  <div className="flex justify-around py-2 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
                    <div className="w-8 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute top-16 left-4 glass dark:glass-dark rounded-2xl px-4 py-3 shadow-lg animate-float z-20 border border-white/50 dark:border-slate-600/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                  <Zap size={14} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 dark:text-slate-300">معاملة جديدة</div>
                  <div className="text-xs font-black text-emerald-700 dark:text-emerald-300">+1,250 دينار</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  EXPLORE SECTION (HIDDEN BY DEFAULT)        */}
      {/* ═══════════════════════════════════════════ */}
      <div id="explore-section" className={`overflow-hidden transition-all duration-700 ease-in-out ${showExplore ? 'max-h-[2000px] opacity-100 py-16 bg-emerald-50/50 dark:bg-emerald-950/20 border-y border-emerald-100 dark:border-emerald-900/30' : 'max-h-0 opacity-0 py-0'}`}>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-12 shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-800">
               <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 text-center">النظام المتكامل لإدارة محطات الوقود</h3>
               <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                     <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <LayoutDashboard size={24} />
                     </div>
                     <h4 className="font-bold text-lg text-slate-900 dark:text-white">نظام الإدارة المركزي</h4>
                     <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">تحكم كامل في كافة فروع ومحطات الشركة، متابعة الأرصدة وإصدار التقارير المالية والإدارية بدقة متناهية.</p>
                  </div>
                  <div className="space-y-4">
                     <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <Smartphone size={24} />
                     </div>
                     <h4 className="font-bold text-lg text-slate-900 dark:text-white">تطبيقات العاملين</h4>
                     <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">تطبيقات هواتف ذكية مخصصة لموظفي المحطات لتسهيل عمليات الصرف، وقراءة الباركود، وإجراء التحويلات بأمان.</p>
                  </div>
                  <div className="space-y-4">
                     <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <ShieldCheck size={24} />
                     </div>
                     <h4 className="font-bold text-lg text-slate-900 dark:text-white">بنية تحتية آمنة</h4>
                     <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">يعمل النظام على خوادم سحابية مشفرة بالكامل لضمان سرية البيانات وحمايتها من أي اختراقات.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/*  DASHBOARD STATISTICS SECTION               */}
      {/* ═══════════════════════════════════════════ */}
      <section id="dashboard" ref={dashRef} className="py-20 lg:py-28 bg-white dark:bg-slate-950 relative transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.04)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${dashInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center justify-center p-3.5 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 rounded-2xl mb-6 text-blue-600 dark:text-blue-400 shadow-sm border dark:border-blue-800/30">
              <LayoutDashboard size={28} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              {content.dashTitle}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {content.dashDesc}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: content.statValue, value: 9850000, displayVal: '9.85M', unit: 'دينار', icon: Wallet, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/30 dark:to-amber-800/10', border: 'border-amber-100 dark:border-amber-800/50', glow: 'shadow-amber-100/50 dark:shadow-amber-900/20' },
              { label: content.statVolume, value: 213900, displayVal: '213.9K', unit: 'لتر', icon: Droplets, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/10', border: 'border-blue-100 dark:border-blue-800/50', glow: 'shadow-blue-100/50 dark:shadow-blue-900/20' },
              { label: content.statStations, value: 24, displayVal: '24', unit: 'محطة', icon: Building2, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/30 dark:to-emerald-800/10', border: 'border-emerald-100 dark:border-emerald-800/50', glow: 'shadow-emerald-100/50 dark:shadow-emerald-900/20' },
              { label: content.statCompanies, value: 47, displayVal: '47', unit: 'عقد', icon: Truck, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/30 dark:to-purple-800/10', border: 'border-purple-100 dark:border-purple-800/50', glow: 'shadow-purple-100/50 dark:shadow-purple-900/20' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`group bg-white dark:bg-slate-900 border ${stat.border} rounded-2xl p-6 shadow-sm hover:shadow-xl ${stat.glow} transition-all duration-500 hover:-translate-y-1 cursor-default ${
                  dashInView ? 'animate-count-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                  <stat.icon size={22} />
                </div>
                <div className="text-3xl font-black text-slate-900 dark:text-white mb-1.5">
                  {dashInView ? (
                    <AnimatedCounter end={stat.value} suffix={stat.unit} isVisible={dashInView} />
                  ) : (
                    <span>{stat.displayVal} {stat.unit}</span>
                  )}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  FEATURES DIVIDER                           */}
      {/* ═══════════════════════════════════════════ */}
      <div id="features" className="h-px bg-gradient-to-l from-transparent via-emerald-200 dark:via-emerald-800 to-transparent transition-colors duration-300" />

      {/* ═══════════════════════════════════════════ */}
      {/*  MOBILE APP FEATURES SECTION                */}
      {/* ═══════════════════════════════════════════ */}
      <section id="app" ref={appRef} className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-100/30 dark:bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Features Text Side */}
            <div className={`space-y-8 transition-all duration-700 ${appInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div>
                <div className="inline-flex items-center justify-center p-3.5 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-800/20 rounded-2xl mb-6 text-emerald-600 dark:text-emerald-400 shadow-sm border dark:border-emerald-800/30">
                  <Smartphone size={28} />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                  {content.appTitle}
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  {content.appDesc}
                </p>
              </div>

              {/* Feature list */}
              <div className="space-y-4">
                {[
                  {
                    title: content.featQR,
                    desc: content.featQRDesc,
                    icon: QrCode,
                    color: 'bg-gradient-to-br from-orange-100 to-amber-50 dark:from-orange-900/30 dark:to-amber-800/10 text-orange-600 dark:text-orange-400',
                    hoverBorder: 'hover:border-orange-200 dark:hover:border-orange-800/50',
                  },
                  {
                    title: content.featTransfer,
                    desc: content.featTransferDesc,
                    icon: ArrowLeftRight,
                    color: 'bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/10 text-blue-600 dark:text-blue-400',
                    hoverBorder: 'hover:border-blue-200 dark:hover:border-blue-800/50',
                  },
                  {
                    title: content.featBalance,
                    desc: content.featBalanceDesc,
                    icon: BarChart3,
                    color: 'bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-800/10 text-emerald-600 dark:text-emerald-400',
                    hoverBorder: 'hover:border-emerald-200 dark:hover:border-emerald-800/50',
                  },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-4 p-5 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-100 dark:border-slate-700/50 ${feature.hoverBorder} hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg dark:hover:shadow-black/20 transition-all duration-300 cursor-default group`}
                    style={{ animationDelay: `${idx * 200}ms` }}
                  >
                    <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${feature.color} transition-transform group-hover:scale-110 shadow-sm border dark:border-white/5`}>
                      <feature.icon size={22} />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-slate-900 dark:text-white mb-1">{feature.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone Visual Side */}
            <div className={`relative flex justify-center transition-all duration-700 delay-300 ${appInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Glow effects */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 bg-emerald-400/20 dark:bg-emerald-600/20 rounded-full blur-[80px] animate-pulse-glow" />
              </div>
              <div className="absolute top-10 -left-10 w-40 h-40 bg-orange-300/20 dark:bg-orange-500/10 rounded-full blur-[60px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

              {/* Phone mockup */}
              <div className="relative w-72 h-[580px]">
                <div className="w-full h-full bg-gradient-to-b from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 rounded-[3rem] shadow-2xl shadow-slate-900/40 dark:shadow-black/50 border-[4px] border-slate-700 dark:border-slate-600 p-[6px] relative transition-colors duration-300">
                  {/* Notch */}
                  <div className="phone-notch dark:bg-slate-950" />
                  {/* Screen */}
                  <div className="w-full h-full bg-slate-50 dark:bg-slate-950 rounded-[2.4rem] overflow-hidden flex flex-col relative">
                    {/* Status bar */}
                    <div className="flex items-center justify-between px-6 pt-2.5 pb-1 bg-white dark:bg-slate-900 border-b border-transparent dark:border-slate-800">
                      <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400">9:41</span>
                      <div className="flex items-center gap-1.5">
                        <Signal size={9} className="text-slate-400 dark:text-slate-500" />
                        <Wifi size={9} className="text-slate-400 dark:text-slate-500" />
                        <Battery size={9} className="text-slate-400 dark:text-slate-500" />
                      </div>
                    </div>

                    {/* App header */}
                    <div className="px-5 pt-3 pb-4 bg-white dark:bg-slate-900 text-center shadow-sm">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden mx-auto mb-2 ring-2 ring-emerald-100 dark:ring-emerald-900/50 bg-white">
                        <img src={logoSrc} alt="" className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-black text-emerald-800 dark:text-emerald-400 text-base">{content.brand}</h3>
                      <p className="text-[9px] text-slate-400 font-semibold mt-0.5">حلول ذكية للوقود</p>
                    </div>

                    {/* Scanner area */}
                    <div className="flex-1 p-4 space-y-3">
                      <div className="h-44 border-2 border-dashed border-emerald-300 dark:border-emerald-700 rounded-2xl flex flex-col items-center justify-center bg-emerald-50/50 dark:bg-emerald-900/10 relative overflow-hidden">
                        {/* Scanner corners */}
                        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-emerald-500 dark:border-emerald-600 rounded-tr-lg" />
                        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-emerald-500 dark:border-emerald-600 rounded-tl-lg" />
                        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-emerald-500 dark:border-emerald-600 rounded-br-lg" />
                        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-emerald-500 dark:border-emerald-600 rounded-bl-lg" />
                        {/* Scan line animation */}
                        <ScanLine size={40} className="text-emerald-400 dark:text-emerald-600 mb-2" />
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">قم بتوجيه الكاميرا</span>
                        <span className="text-[9px] text-slate-400 mt-1">لمسح رمز QR أو NFC</span>
                      </div>

                      {/* NFC status */}
                      <div className="bg-white dark:bg-slate-800 rounded-xl p-3.5 shadow-sm flex items-center justify-between border border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-2.5">
                          <Nfc className="text-emerald-600 dark:text-emerald-400" size={20} />
                          <span className="font-bold text-sm text-slate-700 dark:text-slate-200">NFC جاهز</span>
                        </div>
                        <div className="w-10 h-6 bg-emerald-100 dark:bg-emerald-900/50 rounded-full relative">
                          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-emerald-600 dark:bg-emerald-500 rounded-full shadow-sm transition-all" />
                        </div>
                      </div>

                      {/* Camera button */}
                      <div className="flex justify-center pt-2">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-700 dark:from-emerald-500 dark:to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/30 dark:shadow-emerald-900/50">
                          <Camera size={22} className="text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="flex justify-center pb-2 pt-1 bg-white dark:bg-slate-900 border-t border-transparent dark:border-slate-800">
                      <div className="w-28 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  CTA SECTION                                */}
      {/* ═══════════════════════════════════════════ */}
      <section ref={ctaRef} className="relative bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 text-white py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-700/10 rounded-full blur-[120px]" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        <div className={`max-w-4xl mx-auto px-4 text-center relative z-10 transition-all duration-700 ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-emerald-200 text-sm font-bold border border-white/10 mb-8">
            <Fuel size={16} />
            <span>ابدأ رحلتك الرقمية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
            هل أنت مستعد لتحويل إدارة الوقود؟
          </h2>
          <p className="text-lg text-emerald-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            انضم إلى شبكة المحطات الذكية واستفد من أحدث تقنيات إدارة وصرف الوقود
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group bg-white text-emerald-800 px-10 py-4 rounded-2xl font-black text-lg hover:bg-emerald-50 transition-all shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3">
              {content.ctaPrimary}
              <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            </a>
            <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2">
              {content.ctaSecondary}
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  FOOTER                                     */}
      {/* ═══════════════════════════════════════════ */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-slate-700 bg-white">
                <img src={logoSrc} alt="شعار الراحلة" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-black text-lg">{content.brand}</span>
                <span className="text-xs text-slate-500 mr-2">{content.tagline}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <p className="text-sm text-center md:text-start leading-relaxed">
                &copy; {new Date().getFullYear()} {content.brand}. {content.footerText}
              </p>
              <div className="hidden sm:block w-px h-6 bg-slate-800" />
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">تصميم وتنفيذ شركة القريب</span>
                <img src={qaribLogoSrc} alt="شركة القريب" className="h-8 w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
