import { useEffect, useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, Check, ChevronDown,
  Cloud, Code2, Compass, Database, Globe2, Headphones,
  LayoutGrid, LockKeyhole, Menu, MessageCircle, Monitor,
  Palette, Phone, Rocket, Search, ShieldCheck, ShoppingBag,
  Sparkles, TrendingUp, X, Zap
} from 'lucide-react';

const BUSINESS_PHONE = '070 118 8941';
const WHATSAPP_NUMBER = '94701188941';
const whatsappLink = (text = 'Hello D-SIGN DESIGNERS! I would like to discuss a website project.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const menuItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Approach', href: '#process' },
  { label: 'About', href: '#about' },
];

const services = [
  {
    number: '01', icon: Monitor, name: 'Marketing Websites',
    category: 'FOR BRANDS & BUSINESSES',
    description: 'Considered design, clear messaging, and conversion-focused pages that make a powerful first impression.',
    tags: ['Business websites', 'Landing pages', 'Portfolio websites'],
    tone: 'blue'
  },
  {
    number: '02', icon: ShoppingBag, name: 'E-commerce Websites',
    category: 'FOR THE NEXT BIG SALE',
    description: 'Fast, intuitive storefronts designed to make browsing easier and the buying experience more enjoyable.',
    tags: ['Product catalogues', 'Store management', 'Checkout integrations'],
    tone: 'violet'
  },
  {
    number: '03', icon: Code2, name: 'Custom Web Applications',
    category: 'BUILT AROUND YOUR WORKFLOW',
    description: 'Purpose-built portals, dashboards and web systems that solve real business problems.',
    tags: ['Admin dashboards', 'Client portals', 'API integrations'],
    tone: 'cyan'
  }
];

const promises = [
  { icon: ShieldCheck, title: 'Security-minded', detail: 'Thoughtful validation, access controls and security-conscious implementation.' },
  { icon: Search, title: 'SEO foundations', detail: 'Metadata, clean structure and search-friendly best practices from day one.' },
  { icon: Zap, title: 'Fast & responsive', detail: 'Mobile-first layouts and performance-conscious implementation.' },
  { icon: Cloud, title: 'Launch & aftercare', detail: 'Domain guidance, hosting setup and clearly scoped support after launch.' },
];

const projects = [
  {
    number: '01', title: 'The Modern Spaces', type: 'Marketing',
    subtitle: 'Architecture & brand presence',
    category: 'Business website concept', className: 'portfolio-architecture',
    description: 'A cinematic, editorial web experience for a modern architectural studio.'
  },
  {
    number: '02', title: 'Form & Function', type: 'E-commerce',
    subtitle: 'Contemporary homeware store',
    category: 'E-commerce concept', className: 'portfolio-commerce',
    description: 'A product-first shopping experience for a curated lifestyle brand.'
  },
  {
    number: '03', title: 'Clarity Workspace', type: 'Web Apps',
    subtitle: 'Operations & analytics platform',
    category: 'Web application concept', className: 'portfolio-dashboard',
    description: 'A cleaner way to organise information, teams and business insights.'
  }
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
      <img src="/dsign-logo.svg" alt="D-SIGN DESIGNERS" />
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
    const onKey = (event) => { if (event.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-shell container">
        <Logo />
        <nav className={`main-navigation ${isOpen ? 'navigation-open' : ''}`} aria-label="Main navigation" id="main-navigation">
          {menuItems.map(item => (
            <a key={item.href} href={item.href} className={activeSection === item.href.slice(1) ? 'active' : ''} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="mobile-nav-contact" href="#contact" onClick={closeMenu}>Start a project <ArrowUpRight size={17} /></a>
        </nav>
        <a href="#contact" className="header-contact">Let's talk <ArrowUpRight size={17} /></a>
        <button type="button" className="menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls="main-navigation" aria-label={isOpen ? 'Close menu' : 'Open menu'}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

function BrowserMockup() {
  return (
    <div className="hero-visual" aria-label="Sample website designs and interactive dashboard illustrations">
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
          <div className="mock-site-photo"><img src="/images/architecture.svg" alt="Architectural illustration for a sample website" /></div>
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
      <div className="hero-noise" aria-hidden="true" />
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

function Ticker() {
  const words = ['DESIGN', 'DEVELOP', 'DEPLOY', 'GROW', 'DESIGN', 'DEVELOP', 'DEPLOY', 'GROW'];
  return <div className="ticker" aria-hidden="true"><div className="ticker-track">{words.map((word, i) => <span key={`${word}-${i}`}>{word}<span className="ticker-star">✳</span></span>)}</div></div>;
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

function WorkMockup({ project }) {
  if (project.type === 'Marketing') {
    return <div className="work-visual work-visual-marketing">
      <div className="work-browser-top"><span className="small-dots">•••</span><span>the modern spaces</span><Menu size={12}/></div>
      <div className="work-architectural"><img src="/images/architecture.svg" alt="Architectural illustration" /><div className="work-architecture-overlay"><span>EST. 2025 / THE MODERN SPACES</span><strong>Spaces that<br /><em>make a statement.</em></strong><small>SEE OUR WORK <ArrowRight size={12}/></small></div></div>
    </div>;
  }
  if (project.type === 'E-commerce') {
    return <div className="work-visual work-visual-commerce">
      <div className="commerce-top"><strong>form<span>.</span></strong><span>SHOP &nbsp;&nbsp; THE STORY &nbsp;&nbsp; <ShoppingBag size={15}/></span></div>
      <div className="commerce-main"><div className="commerce-product"><img src="/images/product.svg" alt="Illustration of a modern wooden chair" /></div><div className="commerce-copy"><small>COLLECTION NO. 01</small><h3>Objects for<br />everyday life.</h3><span>EXPLORE COLLECTION <ArrowUpRight size={13}/></span></div></div>
    </div>;
  }
  return <div className="work-visual work-visual-app">
    <div className="app-side"><div className="app-logo"><LayoutGrid size={18}/></div>{[LayoutGrid, TrendingUp, Database, Headphones].map((Icon, i) => <span key={i} className={i === 0 ? 'selected' : ''}><Icon size={17}/></span>)}</div>
    <div className="app-main"><div className="app-top"><div><small>MONDAY, NOVEMBER 23</small><h3>Good morning, Alex <span>✳</span></h3></div><span className="app-avatar">A</span></div><div className="app-metric-row"><div><small>Total revenue</small><strong>$84,250</strong><span>↗ 12.8% this month</span></div><div><small>Active projects</small><strong>24</strong><span>↗ 4 new this week</span></div></div><div className="app-chart"><span>Performance overview</span><div className="app-bars">{[35,48,42,64,58,75,68,88,76,100,85,112].map((h, i) => <i key={i} style={{height: `${h}px`}}/>)}</div></div></div>
  </div>;
}

function Portfolio() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Marketing', 'E-commerce', 'Web Apps'];
  const shown = filter === 'All' ? projects : projects.filter(project => project.type === filter);
  return (
    <section className="portfolio-section section-dark" id="work" aria-labelledby="work-title">
      <div className="container">
        <div className="work-heading-row"><div id="work-title"><SectionHeading light eyebrow="SELECTED CONCEPTS" title="A glimpse of" emphasis="what's possible." text="A few exploratory design concepts to show how we think about brand, commerce and product experiences." /></div><div className="concept-disclaimer reveal"><Sparkles size={17}/><span>Concept projects — not client case studies</span></div></div>
        <div className="portfolio-filters" role="group" aria-label="Filter portfolio concepts">
          {filters.map(f => <button key={f} type="button" className={filter === f ? 'selected' : ''} onClick={() => setFilter(f)} aria-pressed={filter === f}>{f}</button>)}
        </div>
        <div className="portfolio-grid">
          {shown.map((project) => <article className="project-card" key={project.title}>
            <div className="project-preview"><WorkMockup project={project}/></div>
            <div className="project-details"><div><span>{project.category} / {project.number}</span><h3>{project.title}</h3><p>{project.subtitle}</p></div><a href={whatsappLink(`Hello D-SIGN DESIGNERS! I saw your ${project.category.toLowerCase()} (${project.title}). I'd like something similar for my business.`)} target="_blank" rel="noopener noreferrer" aria-label={`Discuss a project similar to ${project.title}`}><ArrowUpRight size={24}/></a></div>
          </article>)}
        </div>
        <div className="work-footnote"><span><span className="footnote-dot"/> Your brand could be next.</span><a href="#contact">Tell us what you have in mind <ArrowRight size={16}/></a></div>
      </div>
    </section>
  );
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

function Contact() {
  const [form, setForm] = useState(initialQuote);
  const [status, setStatus] = useState('');
  const onChange = event => setForm(prev => ({...prev, [event.target.name]: event.target.value}));
  const submit = event => {
    event.preventDefault();
    if (!form.name.trim() || !form.details.trim()) { setStatus('Please add your name and a short project description.'); return; }
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
    setStatus('Your WhatsApp message has been prepared. If the new tab did not open, please allow pop-ups or use the direct WhatsApp button.');
    const opened = window.open(url, '_blank');
    if (opened) opened.opener = null;
    else window.location.assign(url);
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
        <button type="submit" className="button button-primary form-submit"><span>Send enquiry via WhatsApp</span><ArrowUpRight size={19}/></button><p className="form-privacy"><LockKeyhole size={13}/> No account needed. Your details are only included in the WhatsApp message you choose to send.</p>{status && <p className="form-status" role="status">{status}</p>}
      </form>
    </div>
  </div></section>;
}

function Footer() {
  return <footer className="footer section-dark"><div className="container"><div className="footer-top"><div className="footer-brand"><Logo compact/><p>We design for you,<br/>for your requirements.</p></div><div className="footer-nav"><div><span>EXPLORE</span><a href="#services">Services</a><a href="#work">Our work</a><a href="#process">Our process</a><a href="#about">About us</a></div><div><span>GET IN TOUCH</span><a href="tel:+94701188941">{BUSINESS_PHONE}</a><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={13}/></a><a href="#contact">Request a quote</a></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} D-SIGN DESIGNERS. All rights reserved.</span><span>DESIGN · DEVELOPMENT · DIGITAL EXPERIENCES</span><a href="#home">Back to top <ArrowUpRight size={13}/></a></div></div></footer>;
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
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
  return <><a href="#main-content" className="skip-link">Skip to content</a><Header activeSection={activeSection}/><main id="main-content"><Hero/><Ticker/><Services/><BenefitBar/><Portfolio/><Process/><About/><FAQ/><Contact/></main><Footer/></>;
}
