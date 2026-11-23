import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, Check, ChevronDown, ChevronLeft, ChevronRight,
  Cloud, Code2, Compass, Database, Globe2, Headphones,
  LayoutGrid, LockKeyhole, Menu, MessageCircle, Monitor,
  Palette, Phone, Rocket, Search, ShieldCheck, ShoppingBag,
  Sparkles, TrendingUp, X, Zap, Volume2, VolumeX
} from 'lucide-react';

const BUSINESS_PHONE = '070 118 8941';
const WHATSAPP_NUMBER = '94701188941';
const whatsappLink = (text = 'Hello D-SIGN DESIGNERS! I would like to discuss a website project.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const menuItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Concept gallery', href: '#work' },
  { label: 'Approach', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'FAQs', href: '#faq' },
];

const services = [
  {
    number: '01', icon: Monitor, name: 'Marketing Websites',
    category: 'FOR BRANDS & BUSINESSES',
    description: 'Considered design, clear messaging, and conversion-focused pages that make a powerful first impression.',
    tags: ['Business websites', 'Landing pages', 'Portfolio websites'],
    tone: 'blue', image: '/images/concepts/modern-residence.webp'
  },
  {
    number: '02', icon: ShoppingBag, name: 'E-commerce Websites',
    category: 'FOR THE NEXT BIG SALE',
    description: 'Fast, intuitive storefronts designed to make browsing easier and the buying experience more enjoyable.',
    tags: ['Product catalogues', 'Store management', 'Checkout integrations'],
    tone: 'violet', image: '/images/concepts/everyday-objects.webp'
  },
  {
    number: '03', icon: Code2, name: 'Custom Web Applications',
    category: 'BUILT AROUND YOUR WORKFLOW',
    description: 'Purpose-built portals, dashboards and web systems that solve real business problems.',
    tags: ['Admin dashboards', 'Client portals', 'API integrations'],
    tone: 'cyan', image: '/images/concepts/luminous-platform.webp'
  }
];

const promises = [
  { icon: ShieldCheck, title: 'Security-minded', detail: 'Thoughtful validation, access controls and security-conscious implementation.' },
  { icon: Search, title: 'SEO foundations', detail: 'Metadata, clean structure and search-friendly best practices from day one.' },
  { icon: Zap, title: 'Fast & responsive', detail: 'Mobile-first layouts and performance-conscious implementation.' },
  { icon: Cloud, title: 'Launch & aftercare', detail: 'Domain guidance, hosting setup and clearly scoped support after launch.' },
];

// These are fictional design concepts. Do not relabel them as client projects.
const projects = [
  { number: '01', title: 'The Modern Spaces', type: 'Marketing', subtitle: 'Architecture & brand presence', category: 'Business website concept', image: '/images/concepts/studio-spaces.webp', description: 'An editorial website direction for a modern architecture studio.', features: ['Immersive landing page', 'Portfolio storytelling', 'Clear enquiry flow'] },
  { number: '02', title: 'Form & Function', type: 'E-commerce', subtitle: 'Contemporary homeware store', category: 'E-commerce concept', image: '/images/concepts/nordic-objects.webp', description: 'A tactile, product-led online shopping experience for considered living.', features: ['Curated product discovery', 'Mobile-friendly collection pages', 'Thoughtful conversion journeys'] },
  { number: '03', title: 'Clarity Workspace', type: 'Web Apps', subtitle: 'Operations & analytics platform', category: 'Web application concept', image: '/images/concepts/digital-flux.webp', description: 'An intuitive dashboard direction that makes complex information easier to navigate.', features: ['Role-based journeys', 'Data visualisation', 'Organised workflows'] },
  { number: '04', title: 'Horizon Residences', type: 'Marketing', subtitle: 'Premium real estate experience', category: 'Property website concept', image: '/images/concepts/horizon-villa.webp', description: 'A sophisticated property showcase designed around imagery and clear next steps.', features: ['Property storytelling', 'Responsive galleries', 'Lead generation'] },
  { number: '05', title: 'Atelier Living', type: 'E-commerce', subtitle: 'Refined lifestyle collection', category: 'Online store concept', image: '/images/concepts/atelier-interiors.webp', description: 'A warm, minimalist shopping direction for premium interior products.', features: ['Product collections', 'Editorial storytelling', 'Shopping experience'] },
  { number: '06', title: 'Flux Analytics', type: 'Web Apps', subtitle: 'Insights & decision platform', category: 'Dashboard concept', image: '/images/concepts/luminous-platform.webp', description: 'A data-led web application direction with a clear, confident visual language.', features: ['Custom dashboard layouts', 'API-ready interactions', 'Accessible navigation'] },
  { number: '07', title: 'Northline Studio', type: 'Marketing', subtitle: 'Interior architecture presence', category: 'Studio website concept', image: '/images/concepts/modern-residence.webp', description: 'A visual-first studio website concept that balances imagery and meaningful content.', features: ['Service storytelling', 'Project showcases', 'Enquiry pathways'] },
  { number: '08', title: 'Everyday Edit', type: 'E-commerce', subtitle: 'Design-led product boutique', category: 'Retail concept', image: '/images/concepts/everyday-objects.webp', description: 'An inviting storefront concept with a visual product discovery experience.', features: ['Collection browsing', 'Product highlights', 'Streamlined mobile layout'] },
  { number: '09', title: 'Cloudline Console', type: 'Web Apps', subtitle: 'Business management workspace', category: 'SaaS interface concept', image: '/images/concepts/cloud-workspace.webp', description: 'A streamlined workspace direction for everyday business operations.', features: ['Modular components', 'Organised information', 'Scalable interface patterns'] }
];

const steps = [
  { index: '01', name: 'Discover', copy: 'We listen, define the goals, and understand your business and audience.', icon: Compass },
  { index: '02', name: 'Design', copy: 'We shape the experience, content structure, and interface direction.', icon: Palette },
  { index: '03', name: 'Develop', copy: 'We turn the approved direction into a responsive, reliable website.', icon: Code2 },
  { index: '04', name: 'Launch & grow', copy: 'We check, deploy, hand over, and discuss what comes next.', icon: Rocket },
];

const faqs = [
  { question: 'Do you build websites for small businesses and startups?', answer: 'Absolutely. We work with projects of different sizes, from a focused landing page or company website to a full online store or bespoke web application. The scope is tailored to your requirements.' },
  { question: 'Can you help with domain names and hosting?', answer: 'Yes. We can guide you through domain registration, hosting selection, DNS, SSL setup and deployment. Domain and hosting fees are quoted separately when applicable, so you retain visibility and ownership.' },
  { question: 'Will the website work on phones and tablets?', answer: 'Responsive design is part of our development approach. Layouts are adapted for phones, tablets and larger screens, with usability and accessibility considered throughout.' },
  { question: 'Do you include SEO and security?', answer: 'We implement practical SEO foundations and security-minded development practices based on the agreed scope. Search rankings and complete freedom from security vulnerabilities cannot be guaranteed.' },
  { question: 'What happens after the website goes live?', answer: 'We can provide handover guidance, issue fixes within the agreed warranty scope, and optional ongoing maintenance. Your proposal will explain what is included and what is billed separately.' },
  { question: 'How much does a website cost?', answer: 'Pricing depends on pages, features, integrations, content, design complexity and hosting requirements. Share a quick outline through the enquiry form and we can provide a tailored quotation.' },
];

const initialQuote = {
  name: '', business: '', phone: '', projectType: 'Marketing / Business website',
  budget: 'Need guidance', timeframe: 'Flexible', details: ''
};

function Logo({ compact = false }) {
  return (
    <a className={`brand ${compact ? 'brand-compact' : ''}`} href="#home" aria-label="D-SIGN DESIGNERS, back to top">
      <img src="/dsign-logo-dark.png" alt="D-SIGN DESIGNERS" width="1330" height="542" decoding="async" />
    </a>
  );
}

function ButtonLink({ children, href, secondary = false, className = '' }) {
  return (
    <a className={`button ${secondary ? 'button-outline' : 'button-primary'} ${className}`} href={href}>
      <span>{children}</span><ArrowUpRight size={18} strokeWidth={1.9} aria-hidden="true" />
    </a>
  );
}

function Eyebrow({ children, light = false }) {
  return <span className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><span className="eyebrow-line" />{children}</span>;
}

function SectionHeading({ eyebrow, title, emphasis, text, light = false }) {
  return (
    <div className={`section-heading ${light ? 'section-heading-light' : ''} reveal`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2>{title} {emphasis && <span>{emphasis}</span>}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Header({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef(null);
  const navigationRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const navigation = navigationRef.current;
    const firstLink = navigation?.querySelector('a');
    firstLink?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key === 'Tab' && navigation) {
        const links = [...navigation.querySelectorAll('a')];
        if (!links.length) return;
        const first = links[0];
        const last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    const onResize = () => { if (window.innerWidth > 960) setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-shell container">
        <Logo />
        <nav ref={navigationRef} className={`main-navigation ${isOpen ? 'navigation-open' : ''}`} aria-label="Main navigation" id="main-navigation">
          {menuItems.map(item => (
            <a key={item.href} href={item.href} className={activeSection === item.href.slice(1) ? 'active' : ''} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="mobile-nav-contact" href="#contact" onClick={closeMenu}>Start a project <ArrowUpRight size={17} /></a>
        </nav>
        <a href="#contact" className="header-contact">Let's talk <ArrowUpRight size={17} /></a>
        <button ref={menuButtonRef} type="button" className="menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls="main-navigation" aria-label={isOpen ? 'Close menu' : 'Open menu'}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

function BrowserMockup() {
  return (
    <div className="hero-visual" role="group" aria-label="Illustrative website design preview">
      <div className="hero-rings" aria-hidden="true" />
      <div className="visual-dots" aria-hidden="true" />
      <div className="browser-window">
        <div className="browser-bar">
          <div className="browser-dots"><span /><span /><span /></div>
          <div className="browser-address"><LockKeyhole size={10} /> a sample website experience</div>
          <span className="browser-bar-icon"><Globe2 size={14} /></span>
        </div>
        <div className="mock-site-header"><strong>STUDIO / NORTH</strong><span>Spaces &nbsp;&nbsp; Projects &nbsp;&nbsp; About</span><b>Enquire <ArrowUpRight size={10} /></b></div>
        <div className="mock-site-hero">
          <div className="mock-site-copy">
            <span>ARCHITECTURE & INTERIORS</span>
            <h3>Designed<br />to inspire.</h3>
            <p>Thoughtful spaces for modern living.</p>
            <span className="mock-site-link">EXPLORE PROJECTS <ArrowRight size={11} /></span>
          </div>
          <div className="mock-site-photo"><img src="/images/concepts/studio-spaces.webp" alt="Architectural imagery for a fictional website concept" width="1200" height="410" fetchPriority="high" /></div>
        </div>
        <div className="mock-site-footer"><span>01 / DESIGN & EXPERIENCE</span><span>FORM FOLLOWS FEELING.</span></div>
      </div>
      <div className="floating-card float-security"><ShieldCheck size={22} /><div><strong>Built with care</strong><span>Security-minded & responsive</span></div><BadgeCheck size={16} className="float-check" /></div>
      <div className="floating-card float-conversion"><span className="float-conversion-icon"><TrendingUp size={20} /></span><div><strong>Made to convert</strong><span>Clean. Fast. Purposeful.</span></div></div>
      <div className="floating-mobile" aria-hidden="true">
        <div className="floating-mobile-bar" /><div className="mobile-mock-heading">Good design.<br /><em>Everywhere.</em></div><div className="mobile-mock-art"><span className="mobile-mock-disc"/><span className="mobile-mock-shape"/></div><span className="mobile-mock-button">EXPLORE</span>
      </div>
      <div className="visual-small-label" aria-hidden="true">THOUGHTFUL DIGITAL EXPERIENCES <span>↗</span></div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero section-dark" id="home" aria-labelledby="hero-title">
      <div className="hero-noise" aria-hidden="true" /><div className="hero-orb hero-orb-one" aria-hidden="true" /><div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="hero-grid container">
        <div className="hero-content">
          <div className="hero-topline"><span className="status-pulse" /> INDEPENDENT DIGITAL DESIGN & DEVELOPMENT STUDIO</div>
          <h1 id="hero-title">Websites that<br /><span className="gradient-text">mean business.</span></h1>
          <p className="hero-description">Distinctive design. Thoughtful development. Digital experiences made to help your business <strong>look better, work smarter and grow.</strong></p>
          <div className="hero-actions">
            <ButtonLink href="#contact">Start your project</ButtonLink>
            <a className="text-link" href="#work">Explore our work <ArrowDown size={17} /></a>
          </div>
          <div className="hero-points">
            <span><Check size={15} /> Tailored to your brand</span>
            <span><Check size={15} /> Mobile-first & SEO-ready</span>
            <span><Check size={15} /> Support beyond launch</span>
          </div>
        </div>
        <BrowserMockup />
      </div>
      <div className="hero-bottom container">
        <span>SCROLL TO EXPLORE <ArrowDown size={14} /></span>
        <span>WE DESIGN FOR YOU, FOR YOUR REQUIREMENTS.</span>
      </div>
    </section>
  );
}

// The former infinite ticker clipped its words on narrow screens and used an
// inconsistent Unicode star. This responsive journey keeps every step readable.
const journeyStages = [
  { title: 'DESIGN', detail: 'Ideas shaped into an identity.', icon: Palette, accent: 'cyan' },
  { title: 'DEVELOP', detail: 'Thoughtful code, built to perform.', icon: Code2, accent: 'blue' },
  { title: 'DEPLOY', detail: 'Your next big launch, made simple.', icon: Rocket, accent: 'violet' },
  { title: 'GROW', detail: 'Ready for whatever comes next.', icon: TrendingUp, accent: 'mint' },
];

function JourneyStrip() {
  // Duplicate boundary slides allow the mobile carousel to loop smoothly
  // without snapping backwards through all four steps.
  const total = journeyStages.length;
  const slides = [journeyStages[total - 1], ...journeyStages, journeyStages[0]];
  const [trackIndex, setTrackIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [userControlled, setUserControlled] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const swipeStartRef = useRef(null);
  const animationFrameRef = useRef([]);
  const activeIndex = (trackIndex - 1 + total) % total;

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 900px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMobile = () => setIsMobile(mobileQuery.matches);
    const updateMotion = () => setReduceMotion(motionQuery.matches);
    updateMobile();
    updateMotion();
    mobileQuery.addEventListener('change', updateMobile);
    motionQuery.addEventListener('change', updateMotion);
    return () => {
      mobileQuery.removeEventListener('change', updateMobile);
      motionQuery.removeEventListener('change', updateMotion);
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobile || !isVisible || reduceMotion || userControlled) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setTrackIndex(index => index === total + 1 ? 2 : index + 1);
      }
    }, 4500);
    return () => window.clearInterval(timer);
  }, [isMobile, isVisible, reduceMotion, userControlled, total]);

  useEffect(() => () => {
    animationFrameRef.current.forEach(window.cancelAnimationFrame);
  }, []);

  function move(direction) {
    setUserControlled(true); // Don't change slides while a visitor is reading.
    setTrackIndex(index => {
      const current = (index - 1 + total) % total;
      if (reduceMotion) return ((current + direction + total) % total) + 1;
      // At a boundary clone, start from its real counterpart.
      if (index === 0 || index === total + 1) return ((current + direction + total) % total) + 1;
      return index + direction;
    });
  }

  function selectSlide(index) {
    setUserControlled(true);
    setTrackIndex(index + 1);
  }

  function handleTransitionEnd(event) {
    if (event.target !== trackRef.current || event.propertyName !== 'transform') return;
    if (trackIndex !== 0 && trackIndex !== total + 1) return;
    setTransitionEnabled(false);
    setTrackIndex(trackIndex === 0 ? total : 1);
    // Re-enable transitions after the browser has painted the instant reset.
    const first = window.requestAnimationFrame(() => {
      const second = window.requestAnimationFrame(() => setTransitionEnabled(true));
      animationFrameRef.current.push(second);
    });
    animationFrameRef.current.push(first);
  }

  function handleTouchEnd(event) {
    if (swipeStartRef.current === null) return;
    const distance = event.changedTouches[0].clientX - swipeStartRef.current;
    swipeStartRef.current = null;
    if (Math.abs(distance) > 42) move(distance < 0 ? 1 : -1);
  }

  return (
    <section className="journey-strip" ref={sectionRef} aria-label="How D-SIGN DESIGNERS brings ideas to life">
      <div className="container journey-inner">
        <div className="journey-intro">
          <span className="journey-kicker"><span className="journey-kicker-dot" /> THE D-SIGN JOURNEY</span>
          <span className="journey-intro-right">FROM FIRST IDEA TO WHAT'S NEXT</span>
        </div>
        <div className="journey-desktop" aria-label="Our four stages">
          {journeyStages.map((stage, index) => {
            const Icon = stage.icon;
            return <div className="journey-stage" key={stage.title}>
              <div className={`journey-stage-icon journey-${stage.accent}`}><Icon size={20} strokeWidth={2} aria-hidden="true" /></div>
              <div className="journey-stage-copy"><span className="journey-stage-number">0{index + 1}</span><strong>{stage.title}</strong><span className="journey-stage-detail">{stage.detail}</span></div>
              {index < total - 1 && <ArrowRight className="journey-stage-arrow" size={17} aria-hidden="true" />}
            </div>;
          })}
        </div>
        <div className="journey-mobile">
          <div className="journey-viewport"
            aria-roledescription="carousel"
            aria-label="Our four-stage process"
            onTouchStart={event => { swipeStartRef.current = event.touches[0].clientX; }}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={() => { swipeStartRef.current = null; }}>
            <div className="journey-slider-track" ref={trackRef}
              onTransitionEnd={handleTransitionEnd}
              style={{ transform: `translate3d(-${trackIndex * 100}%, 0, 0)`, transition: transitionEnabled && !reduceMotion ? undefined : 'none' }}>
              {slides.map((stage, index) => {
                const Icon = stage.icon;
                const step = (index - 1 + total) % total;
                return <div className="journey-slide" key={`${stage.title}-${index}`}
                  role="group" aria-roledescription="slide" aria-label={`${stage.title}, step ${step + 1} of ${total}`}
                  aria-hidden={index !== trackIndex}>
                  <div className={`journey-slide-icon journey-${stage.accent}`}><Icon size={24} strokeWidth={1.9} aria-hidden="true" /></div>
                  <div className="journey-slide-text"><span className="journey-slide-eyebrow">STEP 0{step + 1} / 0{total}</span><strong>{stage.title}</strong><span>{stage.detail}</span></div>
                  <span className="journey-slide-flourish" aria-hidden="true">0{step + 1}</span>
                </div>;
              })}
            </div>
          </div>
          <div className="journey-controls">
            <div className="journey-dots" role="group" aria-label="Choose a stage">
              {journeyStages.map((stage, index) => (
                <button key={stage.title} type="button"
                  className={`journey-dot ${activeIndex === index ? 'is-active' : ''}`}
                  aria-label={`Show ${stage.title.toLowerCase()} stage`}
                  aria-current={activeIndex === index ? 'step' : undefined}
                  onClick={() => selectSlide(index)} />
              ))}
            </div>
            <div className="journey-arrows">
              <button type="button" className="journey-arrow" onClick={() => move(-1)} aria-label="Previous stage"><ChevronLeft size={18} aria-hidden="true" /></button>
              <button type="button" className="journey-arrow" onClick={() => move(1)} aria-label="Next stage"><ChevronRight size={18} aria-hidden="true" /></button>
            </div>
          </div>
          <span className="sr-only" aria-live={userControlled ? 'polite' : 'off'}>{userControlled ? `Showing ${journeyStages[activeIndex].title.toLowerCase()}, step ${activeIndex + 1} of ${total}` : ''}</span>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services-section section-light" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-intro-row">
          <div id="services-title"><SectionHeading eyebrow="WHAT WE DO" title="The right solution." emphasis="Built your way." text="No one-size-fits-all websites. We bring strategy, design and development together for your next big move." /></div>
          <a className="section-link reveal" href="#contact">Let's plan your project <ArrowUpRight size={19} /></a>
        </div>
        <div className="services-grid">
          {services.map((service, i) => {
            const Icon = service.icon;
            return <article key={service.name} className={`service-card service-${service.tone} reveal delay-${i + 1}`}>
              <div className="service-top"><span className="service-icon"><Icon size={28} strokeWidth={1.5} /></span><span className="service-number">/ {service.number}</span></div>
              <div className="service-image"><img src={service.image} alt={`${service.name} design inspiration`} loading="lazy" decoding="async" width="640" height="360" /></div>
              <div className="service-copy"><span className="card-eyebrow">{service.category}</span><h3>{service.name}</h3><p>{service.description}</p></div>
              <div className="service-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <a href={whatsappLink(`Hello D-SIGN DESIGNERS! I'm interested in ${service.name}. Can we discuss my requirements?`)} target="_blank" rel="noopener noreferrer" className="service-cta" aria-label={`Discuss ${service.name} via WhatsApp`}><ArrowUpRight size={23} /></a>
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}

function BenefitBar() {
  return (
    <section className="benefits-section section-light" aria-label="Why build with D-SIGN DESIGNERS">
      <div className="container">
        <div className="benefits-grid">
          {promises.map((promise, i) => {
            const Icon = promise.icon;
            return <div className={`benefit reveal delay-${i % 4 + 1}`} key={promise.title}><Icon size={24} strokeWidth={1.6} /><div><h3>{promise.title}</h3><p>{promise.detail}</p></div></div>;
          })}
        </div>
      </div>
    </section>
  );
}

const ideaChoices = [
  { id: 'marketing', label: 'Business website', icon: Monitor, projectType: 'Marketing / Business website', headline: 'Make an unforgettable first impression.', copy: 'For brands that need a thoughtful online home, clear messaging and a compelling way to get in touch.', image: '/images/concepts/horizon-villa.webp', includes: ['Brand-led page design', 'SEO-friendly structure', 'Responsive experiences'] },
  { id: 'commerce', label: 'Online store', icon: ShoppingBag, projectType: 'E-commerce website', headline: 'Turn browsing into a better buying journey.', copy: 'For businesses ready to showcase products, simplify discovery and build a store around their customers.', image: '/images/concepts/nordic-objects.webp', includes: ['Product discovery', 'Storefront experiences', 'Checkout planning'] },
  { id: 'application', label: 'Web application', icon: LayoutGrid, projectType: 'Custom web application', headline: 'Make your everyday work feel effortless.', copy: 'For teams with specific processes that call for a purposeful, secure-minded application.', image: '/images/concepts/digital-flux.webp', includes: ['Workflow discovery', 'Role-based interfaces', 'Integration planning'] }
];

function IdeaStudio({ onStartProject }) {
  const [selection, setSelection] = useState('marketing');
  const selected = ideaChoices.find(item => item.id === selection);
  return <section className="idea-section section-light" id="idea-studio" aria-labelledby="idea-title">
    <div className="container idea-layout">
      <div className="idea-intro reveal">
        <Eyebrow>INTERACTIVE PROJECT PLANNER</Eyebrow>
        <h2 id="idea-title">Not sure where to <span>start?</span></h2>
        <p>Choose what you'd like to create. We'll show you a starting direction and carry your choice into the enquiry form.</p>
        <div className="idea-selector" role="group" aria-label="Choose a project direction">
          {ideaChoices.map(item => { const Icon = item.icon; return <button type="button" key={item.id} aria-pressed={selection === item.id} className={selection === item.id ? 'idea-selected' : ''} onClick={() => setSelection(item.id)}><Icon size={18}/>{item.label}<ArrowRight size={16}/></button>; })}
        </div>
      </div>
      <div className="idea-result reveal" aria-live="polite" aria-atomic="true">
        <div className="idea-result-art"><img src={selected.image} alt={`${selected.label} design concept inspiration`} loading="lazy" width="1100" height="650" /></div>
        <div className="idea-result-copy"><span>YOUR STARTING POINT / {selected.label.toUpperCase()}</span><h3>{selected.headline}</h3><p>{selected.copy}</p><ul>{selected.includes.map(item => <li key={item}><Check size={15}/>{item}</li>)}</ul><a className="idea-link" href="#contact" onClick={() => onStartProject(selected.projectType)}>Discuss this idea <ArrowUpRight size={18}/></a></div>
      </div>
    </div>
  </section>;
}

function ConceptPreview({ project }) {
  return <div className={`concept-preview concept-${project.type.toLowerCase().replace(/[^a-z]+/g, '-')}`}>
    <img src={project.image} alt={`${project.title}, a fictional ${project.type.toLowerCase()} design concept`} loading="lazy" decoding="async" width="1200" height="760" />
    <div className="concept-overlay" aria-hidden="true"><span>DESIGN STUDY / {project.number}</span><strong>{project.title}</strong><span className="concept-overlay-action">EXPLORE THE CONCEPT <ArrowUpRight size={14}/></span></div>
  </div>;
}

function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const triggerRef = useRef(null);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const filters = ['All', 'Marketing', 'E-commerce', 'Web Apps'];
  const shown = filter === 'All' ? projects : projects.filter(project => project.type === filter);
  const openProject = (project, event) => { triggerRef.current = event.currentTarget; setSelected(project); };
  const closeProject = () => { setSelected(null); requestAnimationFrame(() => triggerRef.current?.focus()); };
  const goProject = (direction) => setSelected(current => {
    const index = shown.findIndex(project => project.number === current.number);
    return shown[(index + direction + shown.length) % shown.length];
  });
  useEffect(() => {
    if (!selected) return undefined;
    document.body.classList.add('dialog-open');
    closeRef.current?.focus();
    const onKey = event => {
      if (event.key === 'Escape') { event.preventDefault(); closeProject(); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); goProject(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); goProject(1); }
      if (event.key === 'Tab') {
        const elements = [...dialogRef.current.querySelectorAll('a[href], button:not([disabled])')];
        if (!elements.length) return;
        const first = elements[0], last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.classList.remove('dialog-open'); window.removeEventListener('keydown', onKey); };
  }, [Boolean(selected)]);
  return <section className="portfolio-section section-dark" id="work" aria-labelledby="work-title">
    <div className="container">
      <div className="work-heading-row"><div id="work-title"><SectionHeading light eyebrow="EXPLORE THE GALLERY" title="Ideas worth" emphasis="bringing to life." text="Browse our original design studies across websites, stores and applications. These are visual concepts, not commissioned client work." /></div><div className="concept-disclaimer reveal"><Sparkles size={17}/><span>Original concepts · Not client case studies</span></div></div>
      <div className="portfolio-toolbar"><div className="portfolio-filters" role="group" aria-label="Filter gallery by project type">
        {filters.map(f => <button key={f} type="button" className={filter === f ? 'selected' : ''} onClick={() => setFilter(f)} aria-pressed={filter === f}>{f}</button>)}
      </div><span className="portfolio-count" role="status">SHOWING {shown.length.toString().padStart(2,'0')} / {projects.length.toString().padStart(2,'0')} CONCEPTS</span></div>
      <div className="portfolio-grid">
        {shown.map(project => <article className="project-card" key={project.number}>
          <button type="button" className="project-open" onClick={event => openProject(project,event)} aria-label={`Preview ${project.title} concept`}><ConceptPreview project={project} /><span className="project-zoom"><ArrowUpRight size={21}/></span></button>
          <div className="project-details"><div><span>{project.category} / {project.number}</span><h3>{project.title}</h3><p>{project.subtitle}</p></div><button type="button" onClick={event => openProject(project,event)} aria-label={`View details about ${project.title}`}><ArrowUpRight size={23}/></button></div>
        </article>)}
      </div>
      <div className="work-footnote"><span><span className="footnote-dot"/> Your brand could be next.</span><a href="#contact">Tell us what you have in mind <ArrowRight size={16}/></a></div>
    </div>
    {selected && <div className="gallery-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) closeProject(); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="gallery-title" aria-describedby="gallery-description" className="gallery-dialog">
        <button ref={closeRef} className="gallery-close" type="button" aria-label="Close project preview" onClick={closeProject}><X size={22}/></button>
        <div className="gallery-image"><img src={selected.image} alt={`${selected.title} design inspiration`} width="1200" height="760" /></div>
        <div className="gallery-content"><div className="gallery-meta">CONCEPT STUDY / {selected.number} &nbsp;·&nbsp; {selected.type.toUpperCase()}</div><h3 id="gallery-title">{selected.title}</h3><p id="gallery-description">{selected.description}</p><p className="gallery-note">This is an original visual concept and does not represent completed client work.</p><div className="gallery-feature-list">{selected.features.map(feature => <span key={feature}><Check size={14}/>{feature}</span>)}</div><a className="button button-primary gallery-cta" href={whatsappLink(`Hello D-SIGN DESIGNERS! I like the ${selected.title} design concept and would like to discuss something similar.`)} target="_blank" rel="noopener noreferrer">Discuss a similar project <ArrowUpRight size={18}/></a><div className="gallery-navigation"><button type="button" onClick={() => goProject(-1)}><ArrowRight size={17} className="arrow-previous"/> Previous</button><span>{shown.findIndex(item => item.number === selected.number)+1} / {shown.length}</span><button type="button" onClick={() => goProject(1)}>Next <ArrowRight size={17}/></button></div></div>
      </div>
    </div>}
  </section>;
}

function Process() {
  return <section className="process-section section-light" id="process"><div className="container">
    <div className="process-heading"><SectionHeading eyebrow="OUR APPROACH" title="Simple process." emphasis="Serious attention to detail." text="Clear communication at every stage, from your first idea to the day your website goes live." /></div>
    <div className="process-grid">{steps.map((step, i) => {const Icon = step.icon; return <div className={`process-step reveal delay-${i+1}`} key={step.index}><div className="process-ordinal">{step.index}<span className="process-connection"/></div><div className="process-icon"><Icon size={26} strokeWidth={1.5}/></div><h3>{step.name}</h3><p>{step.copy}</p></div>})}</div>
    <div className="process-note reveal"><span><BadgeCheck size={18}/> Clear scope. Thoughtful execution. Transparent handover.</span><a href="#contact">Let's get started <ArrowUpRight size={17}/></a></div>
  </div></section>;
}

function About() {
  return <section className="about-section section-dark" id="about"><div className="container about-grid">
    <div className="about-visual reveal"><div className="about-graphic"><span className="about-large-d">D<span>.</span></span><div className="about-orbit about-orbit-a"/><div className="about-orbit about-orbit-b"/><span className="about-graphic-annotation">IDEAS → EXPERIENCES → IMPACT</span></div><div className="about-graphic-caption"><span>DESIGN & DEVELOPMENT</span><span>01 / D-SIGN DESIGNERS</span></div></div>
    <div className="about-copy reveal"><Eyebrow light>WHO WE ARE</Eyebrow><h2>Small studio mindset.<br /><span>Big-picture thinking.</span></h2><p>D-SIGN DESIGNERS is a web design and development business focused on creating thoughtful digital experiences for growing brands, ambitious founders and established companies.</p><p>We bring design sensibility and engineering together — building every project around what you actually need, not just what looks impressive in a screenshot.</p><div className="about-tech"><span>OUR TOOLKIT</span><div>React <i/> JavaScript <i/> Java <i/> Express <i/> FastAPI <i/> Databases</div></div><ButtonLink href="#contact">Work with us</ButtonLink></div>
  </div></section>;
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return <section className="faq-section section-light" id="faq"><div className="container faq-grid"><div className="faq-heading"><SectionHeading eyebrow="GOOD TO KNOW" title="Questions?" emphasis="We've got answers." text="Here's what clients often want to know before getting started."/><div className="faq-cta"><MessageCircle size={22}/><div><strong>Have something else in mind?</strong><span>We're happy to talk through your idea.</span></div><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Ask a question via WhatsApp"><ArrowUpRight size={19}/></a></div></div><div className="faq-list">{faqs.map((faq, i) => <div className={`faq-item ${open === i ? 'faq-open' : ''}`} key={faq.question}><button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} aria-controls={`faq-answer-${i}`} id={`faq-question-${i}`}><span>{faq.question}</span><ChevronDown size={20}/></button><div className="faq-answer" id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} hidden={open !== i}><p>{faq.answer}</p></div></div>)}</div></div></section>;
}

function Contact({ selectedProjectType }) {
  const [form, setForm] = useState(initialQuote);
  const [status, setStatus] = useState('');
  const [preparedLink, setPreparedLink] = useState('');
  useEffect(() => { if (selectedProjectType) setForm(previous => ({...previous, projectType: selectedProjectType})); }, [selectedProjectType]);
  const onChange = event => setForm(prev => ({...prev, [event.target.name]: event.target.value}));
  const submit = event => {
    event.preventDefault();
    if (!form.name.trim() || form.details.trim().length < 10) { setStatus('Please enter your name and at least 10 characters describing your project.'); return; }
    const message = [
      'Hello D-SIGN DESIGNERS! I would like a website quotation.', '',
      `Name: ${form.name.trim()}`,
      `Business: ${form.business.trim() || 'Not specified'}`,
      `Contact: ${form.phone.trim() || 'Not specified'}`,
      `Project: ${form.projectType}`,
      `Budget: ${form.budget}`,
      `Timeline: ${form.timeframe}`, '',
      `Requirements: ${form.details.trim()}`
    ].join('\n');
    const url = whatsappLink(message);
    setPreparedLink(url);
    setStatus('Your WhatsApp message is ready. If it did not open automatically, use the prepared-message link below.');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return <section className="contact-section section-dark" id="contact"><div className="container">
    <div className="contact-top reveal"><Eyebrow light>LET'S MAKE SOMETHING GREAT</Eyebrow><h2>Have a project in mind?<br/><span>Let's make it happen.</span></h2><p>Tell us a little about your idea. We'll help you figure out the right next step.</p></div>
    <div className="contact-grid">
      <div className="contact-aside reveal"><div className="contact-aside-block"><span>START A CONVERSATION</span><a className="contact-whatsapp" href={whatsappLink()} target="_blank" rel="noopener noreferrer"><MessageCircle size={27}/><span>Chat on WhatsApp</span><ArrowUpRight size={20}/></a><a className="contact-phone" href="tel:+94701188941"><Phone size={18}/> {BUSINESS_PHONE}</a></div><div className="contact-aside-divider"/><div className="contact-aside-block"><span>WHAT TO EXPECT</span><ul><li><Check size={17}/> A conversation about your goals</li><li><Check size={17}/> Recommendations tailored to your needs</li><li><Check size={17}/> A clear project scope and quotation</li></ul></div><div className="aside-sparkle"><Sparkles size={36} strokeWidth={1}/><span>YOUR IDEA IS<br/>OUR STARTING POINT.</span></div></div>
      <form className="quote-form reveal" onSubmit={submit} aria-label="Project quotation enquiry"><div className="form-header"><div><span>PROJECT ENQUIRY</span><h3>Tell us what you're imagining.</h3></div><div className="form-step">01 <span>/ 01</span></div></div>
        <div className="form-row"><label>Your name <span>*</span><input name="name" value={form.name} onChange={onChange} placeholder="Your name" required maxLength={90} autoComplete="name" /></label><label>Business / brand<input name="business" value={form.business} onChange={onChange} placeholder="Company or brand name" maxLength={120} autoComplete="organization"/></label></div>
        <div className="form-row"><label>Contact number<input name="phone" value={form.phone} onChange={onChange} type="tel" placeholder="Your preferred number" maxLength={35} autoComplete="tel"/></label><label>Project type<select name="projectType" value={form.projectType} onChange={onChange}><option>Marketing / Business website</option><option>E-commerce website</option><option>Custom web application</option><option>Website redesign</option><option>Maintenance / support</option><option>Not sure yet</option></select></label></div>
        <div className="form-row"><label>Estimated budget<select name="budget" value={form.budget} onChange={onChange}><option>Need guidance</option><option>Under LKR 100,000</option><option>LKR 100,000 – 250,000</option><option>LKR 250,000 – 500,000</option><option>LKR 500,000+</option></select></label><label>Ideal timeframe<select name="timeframe" value={form.timeframe} onChange={onChange}><option>Flexible</option><option>As soon as possible</option><option>Within 1 month</option><option>1–3 months</option><option>3+ months</option></select></label></div>
        <label>Tell us about your project <span>*</span><textarea name="details" value={form.details} onChange={onChange} placeholder="What are you building? What would you like your website or application to do?" rows={4} minLength={10} maxLength={1600} required/></label>
        <button type="submit" className="button button-primary form-submit"><span>Send enquiry via WhatsApp</span><ArrowUpRight size={19}/></button><p className="form-privacy"><LockKeyhole size={13}/> No account needed. Your details are only included in the WhatsApp message you choose to send.</p>{status && <p className="form-status" role="status">{status}</p>}{preparedLink && <a className="prepared-whatsapp" href={preparedLink} target="_blank" rel="noopener noreferrer">Open your prepared WhatsApp message <ArrowUpRight size={15}/></a>}
      </form>
    </div>
  </div></section>;
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 660);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <button className={`back-to-top ${visible ? 'back-to-top-visible' : ''}`} type="button" aria-label="Back to top" tabIndex={visible ? 0 : -1} onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}><ArrowDown size={19}/></button>;
}

function Footer() {
  return <footer className="footer section-dark"><div className="container"><div className="footer-top"><div className="footer-brand"><Logo compact/><p>We design for you,<br/>for your requirements.</p></div><div className="footer-nav"><div><span>EXPLORE</span><a href="#services">Services</a><a href="#work">Our work</a><a href="#process">Our process</a><a href="#about">About us</a></div><div><span>GET IN TOUCH</span><a href="tel:+94701188941">{BUSINESS_PHONE}</a><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={13}/></a><a href="#contact">Request a quote</a></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} D-SIGN DESIGNERS. All rights reserved.</span><span>DESIGN · DEVELOPMENT · DIGITAL EXPERIENCES</span><a href="#home">Back to top <ArrowUpRight size={13}/></a></div></div></footer>;
}


/**
 * Local, original ambient soundtrack. Request audible autoplay immediately, then
 * retry on the first real user gesture if the browser blocks autoplay with sound.
 * Muting is a preference, not a pause: the track continues silently and loops.
 */
function AmbientPlayer() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(() => {
    try {
      // Preserve the visitor's explicit "off" preference from website v3.
      return ['off', 'muted'].includes(localStorage.getItem('dsign-ambient-audio'));
    } catch {
      return false;
    }
  });
  const [playback, setPlayback] = useState('starting');
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    let active = true;
    audio.volume = 0.36;
    audio.muted = muted;

    const onPlaying = () => {
      if (!active) return;
      setPlayback('playing');
      removeGestureListeners();
    };
    const onPause = () => {
      if (active) {
        setPlayback('paused');
        addGestureListeners();
      }
    };
    const onError = () => {
      if (!active) return;
      setUnavailable(true);
      setPlayback('unavailable');
      removeGestureListeners();
    };

    // Calling play() directly in the event handler matters: the browser must
    // recognise this as a genuine click/tap/keyboard user activation.
    const requestPlayback = () => {
      if (!active || audio.error || !audio.paused) return;
      try {
        const result = audio.play();
        if (result && typeof result.catch === 'function') {
          result.catch(() => {
            if (active && !audio.error && audio.paused) setPlayback('blocked');
          });
        }
      } catch {
        if (active) setPlayback('blocked');
      }
    };

    const onFirstGesture = (event) => {
      if (event.target?.closest?.('.ambient-control')) return;
      if (event.type === 'keydown' && (
        event.key === 'Tab' || event.key === 'Escape' ||
        event.altKey || event.ctrlKey || event.metaKey || event.repeat
      )) return;
      requestPlayback();
    };
    // All supported inputs; clicking the sound control is handled by the
    // button itself, so it never unexpectedly flips the visitor's preference.
    const addGestureListeners = () => {
      document.addEventListener('pointerdown', onFirstGesture, true);
      document.addEventListener('click', onFirstGesture, true);
      document.addEventListener('keydown', onFirstGesture, true);
      document.addEventListener('touchstart', onFirstGesture, true);
    };
    const removeGestureListeners = () => {
      document.removeEventListener('pointerdown', onFirstGesture, true);
      document.removeEventListener('click', onFirstGesture, true);
      document.removeEventListener('keydown', onFirstGesture, true);
      document.removeEventListener('touchstart', onFirstGesture, true);
    };

    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);
    addGestureListeners();
    requestPlayback(); // Audible on load whenever the browser permits it.

    return () => {
      active = false;
      removeGestureListeners();
      audio.pause();
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
    };
  }, []); // Initial preference is read before first render.

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio || unavailable) return;

    if (audio.muted) {
      audio.muted = false;
      setMuted(false);
      try { localStorage.setItem('dsign-ambient-audio', 'on'); } catch { /* Storage optional. */ }
    } else if (!audio.paused) {
      audio.muted = true;
      setMuted(true);
      try { localStorage.setItem('dsign-ambient-audio', 'muted'); } catch { /* Storage optional. */ }
      return;
    }

    // If a browser blocked autoplay, the visitor can still use this icon
    // directly. play() must be initiated in the click handler.
    if (audio.paused) {
      setPlayback('starting');
      try {
        const result = audio.play();
        if (result && typeof result.catch === 'function') {
          result.catch(() => setPlayback('blocked'));
        }
      } catch {
        setPlayback('blocked');
      }
    }
  };

  const audible = playback === 'playing' && !muted;
  const hint = unavailable
    ? 'Background music unavailable'
    : muted
      ? 'Unmute peaceful background music'
      : playback === 'blocked' || playback === 'paused'
        ? 'Play peaceful background music'
        : 'Mute peaceful background music';

  return (
    <div className={`ambient-control ${audible ? 'ambient-playing' : ''}`}>
      <audio
        ref={audioRef}
        src="/audio/quiet-horizons.mp3"
        autoPlay
        muted={muted}
        loop
        preload="auto"
        aria-hidden="true"
      />
      <button
        type="button"
        className="ambient-button"
        onClick={toggleSound}
        disabled={unavailable}
        aria-label={hint}
        title={hint}
      >
        {muted ? <VolumeX size={60} aria-hidden="true" /> : <Volume2 size={60} aria-hidden="true" />}
        <span className="ambient-bars" aria-hidden="true"><i /><i /><i /></span>
      </button>
      <span className="ambient-tooltip" aria-hidden="true">
        {unavailable ? 'Music unavailable'
          : muted ? 'Music muted'
            : playback === 'blocked' || playback === 'paused' ? 'Music starts on interaction'
              : 'Mute music'}
      </span>
      <span className="ambient-announcement" role="status">
        {unavailable ? 'Background music unavailable'
          : muted ? 'Background music muted'
            : playback === 'blocked' ? 'The browser blocked automatic audio. Interact with the page or tap the music button to listen.'
              : playback === 'playing' ? 'Background music playing' : ''}
      </span>
    </div>
  );
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const calculate = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const scrollable = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        setProgress(Math.min(100, Math.max(0, scrollY / scrollable * 100)));
        frame = 0;
      });
    };
    calculate();
    window.addEventListener('scroll', calculate, { passive: true });
    window.addEventListener('resize', calculate);
    return () => {
      window.removeEventListener('scroll', calculate);
      window.removeEventListener('resize', calculate);
      cancelAnimationFrame(frame);
    };
  }, []);
  return <div className="reading-progress" aria-hidden="true"><span style={{width: `${progress}%`}} /></div>;
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProjectType, setSelectedProjectType] = useState('');
  useEffect(() => {
    const selectActive = () => {
      const ids = ['home', 'services', 'work', 'process', 'about', 'faq', 'contact'];
      let active = 'home';
      ids.forEach(id => { const element = document.getElementById(id); if (element && element.getBoundingClientRect().top <= 180) active = id; });
      setActiveSection(active);
    };
    selectActive(); window.addEventListener('scroll', selectActive, { passive: true });
    return () => window.removeEventListener('scroll', selectActive);
  }, []);
  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(item => item.classList.add('is-visible')); return;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) {entry.target.classList.add('is-visible'); observer.unobserve(entry.target);} }), { threshold: 0.09, rootMargin: '0px 0px -40px 0px' });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return <><a href="#main-content" className="skip-link">Skip to content</a><ReadingProgress/><Header activeSection={activeSection}/><main id="main-content"><Hero/><JourneyStrip/><Services/><BenefitBar/><IdeaStudio onStartProject={setSelectedProjectType}/><Portfolio/><Process/><About/><FAQ/><Contact selectedProjectType={selectedProjectType}/></main><Footer/><AmbientPlayer/><BackToTop/></>;
}
