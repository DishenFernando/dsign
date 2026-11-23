// Public, editable website defaults. No passwords, secret keys or private data belong here.
export const DEFAULT_CONTENT = {
  site: {
    name: 'D-SIGN DESIGNERS', phone: '070 118 8941', whatsapp: '94701188941',
    logo_url: '/dsign-logo-dark.png', default_theme: 'dark', splash_enabled: true,
    music_enabled: true, music_volume: 0.54,
    meta_title: 'D-SIGN DESIGNERS | Web Design & Development',
    meta_description: 'Modern marketing websites, e-commerce experiences and custom web applications in Sri Lanka.'
  },
  hero: {
    eyebrow: 'INDEPENDENT DIGITAL DESIGN & DEVELOPMENT STUDIO',
    heading: 'Websites that', emphasis: 'mean business.',
    description: 'Distinctive design. Thoughtful development. Digital experiences made to help your business look better, work smarter and grow.',
    highlights: ['Tailored to your brand', 'Mobile-first & SEO-ready', 'Support beyond launch']
  },
  copy: {
    services_eyebrow: 'WHAT WE DO', services_title: 'The right solution.', services_emphasis: 'Built your way.',
    services_description: 'No one-size-fits-all websites. We bring strategy, design and development together for your next big move.',
    gallery_eyebrow: 'EXPLORE THE GALLERY', gallery_title: 'Ideas worth', gallery_emphasis: 'bringing to life.',
    gallery_description: 'Explore our original design concepts and selected client projects. Concept studies are identified clearly.',
    process_eyebrow: 'OUR APPROACH', process_title: 'Simple process.', process_emphasis: 'Serious attention to detail.',
    process_description: 'Clear communication at every stage, from your first idea to the day your website goes live.',
    faq_eyebrow: 'GOOD TO KNOW', faq_title: 'Questions?', faq_emphasis: "We've got answers.",
    faq_description: "Here's what clients often want to know before getting started.",
    contact_eyebrow: "LET'S MAKE SOMETHING GREAT", contact_title: 'Have a project in mind?',
    contact_emphasis: "Let's make it happen.",
    contact_description: "Tell us a little about your idea. We'll help you figure out the right next step.",
    footer_tagline: 'We design for you, for your requirements.'
  },
  about: {
    eyebrow: 'WHO WE ARE', heading: 'Small studio mindset.', emphasis: 'Big-picture thinking.',
    paragraph_one: 'D-SIGN DESIGNERS is a web design and development business focused on creating thoughtful digital experiences for growing brands, ambitious founders and established companies.',
    paragraph_two: 'We bring design sensibility and engineering together — building every project around what you actually need, not just what looks impressive in a screenshot.',
    toolkit: 'React, JavaScript, Java, Express, FastAPI, Databases'
  },
  services: [
    { id: 'marketing', icon: 'monitor', name: 'Marketing Websites', category: 'FOR BRANDS & BUSINESSES', description: 'Considered design, clear messaging, and conversion-focused pages that make a powerful first impression.', tags: ['Business websites','Landing pages','Portfolio websites'], tone: 'blue', image: '/images/concepts/modern-residence.webp' },
    { id: 'commerce', icon: 'shopping', name: 'E-commerce Websites', category: 'FOR THE NEXT BIG SALE', description: 'Fast, intuitive storefronts designed to make browsing easier and the buying experience more enjoyable.', tags: ['Product catalogues','Store management','Checkout integrations'], tone: 'violet', image: '/images/concepts/everyday-objects.webp' },
    { id: 'applications', icon: 'code', name: 'Custom Web Applications', category: 'BUILT AROUND YOUR WORKFLOW', description: 'Purpose-built portals, dashboards and web systems that solve real business problems.', tags: ['Admin dashboards','Client portals','API integrations'], tone: 'cyan', image: '/images/concepts/luminous-platform.webp' }
  ],
  journey: [
    { title:'DESIGN', detail:'Ideas shaped into an identity.', icon:'palette', accent:'cyan' },
    { title:'DEVELOP', detail:'Thoughtful code, built to perform.', icon:'code', accent:'blue' },
    { title:'DEPLOY', detail:'Your next big launch, made simple.', icon:'rocket', accent:'violet' },
    { title:'GROW', detail:"Ready for whatever comes next.", icon:'trending', accent:'mint' }
  ],
  planner: [
    { id:'marketing', label:'Business website', icon:'monitor', projectType:'Marketing / Business website', headline:'Make an unforgettable first impression.', copy:'For brands that need a thoughtful online home, clear messaging and a compelling way to get in touch.', image:'/images/concepts/horizon-villa.webp', includes:['Brand-led page design','SEO-friendly structure','Responsive experiences'] },
    { id:'commerce', label:'Online store', icon:'shopping', projectType:'E-commerce website', headline:'Turn browsing into a better buying journey.', copy:'For businesses ready to showcase products, simplify discovery and build a store around their customers.', image:'/images/concepts/nordic-objects.webp', includes:['Product discovery','Storefront experiences','Checkout planning'] },
    { id:'application', label:'Web application', icon:'layout', projectType:'Custom web application', headline:'Make your everyday work feel effortless.', copy:'For teams with specific processes that call for a purposeful, secure-minded application.', image:'/images/concepts/digital-flux.webp', includes:['Workflow discovery','Role-based interfaces','Integration planning'] }
  ],
  benefits: [
    {icon:'shield',title:'Security-minded',detail:'Thoughtful validation, access controls and security-conscious implementation.'},
    {icon:'search',title:'SEO foundations',detail:'Metadata, clean structure and search-friendly best practices from day one.'},
    {icon:'cloud',title:'Fast & responsive',detail:'Mobile-first layouts and performance-conscious implementation.'},
    {icon:'headphones',title:'Launch & aftercare',detail:'Domain guidance, hosting setup and clearly scoped support after launch.'}
  ],
  process: [
    { name:'Discover', copy:'We listen, define the goals, and understand your business and audience.', icon:'compass' },
    { name:'Design', copy:'We shape the experience, content structure, and interface direction.', icon:'palette' },
    { name:'Develop', copy:'We turn the approved direction into a responsive, reliable website.', icon:'code' },
    { name:'Launch & grow', copy:'We check, deploy, hand over, and discuss what comes next.', icon:'rocket' }
  ],
  faqs: [
    { question:'Do you build websites for small businesses and startups?', answer:'Absolutely. We work with projects of different sizes, from a focused landing page or company website to a full online store or bespoke web application. The scope is tailored to your requirements.' },
    { question:'Can you help with domain names and hosting?', answer:'Yes. We can guide you through domain registration, hosting selection, DNS, SSL setup and deployment. Domain and hosting fees are quoted separately when applicable, so you retain visibility and ownership.' },
    { question:'Will the website work on phones and tablets?', answer:'Responsive design is part of our development approach. Layouts are adapted for phones, tablets and larger screens, with usability and accessibility considered throughout.' },
    { question:'Do you include SEO and security?', answer:'We implement practical SEO foundations and security-minded development practices based on the agreed scope. Search rankings and complete freedom from security vulnerabilities cannot be guaranteed.' },
    { question:'What happens after the website goes live?', answer:'We can provide handover guidance, issue fixes within the agreed warranty scope, and optional ongoing maintenance. Your proposal will explain what is included and what is billed separately.' },
    { question:'How much does a website cost?', answer:'Pricing depends on pages, features, integrations, content, design complexity and hosting requirements. Share a quick outline through the enquiry form and we can provide a tailored quotation.' }
  ]
};

export function mergeContent(incoming = {}) {
  const defaults = DEFAULT_CONTENT;
  return {
    ...defaults,
    ...incoming,
    site: { ...defaults.site, ...(incoming.site || {}) },
    hero: { ...defaults.hero, ...(incoming.hero || {}) },
    copy: { ...defaults.copy, ...(incoming.copy || {}) },
    about: { ...defaults.about, ...(incoming.about || {}) },
    services: Array.isArray(incoming.services) ? incoming.services : defaults.services,
    benefits: Array.isArray(incoming.benefits) ? incoming.benefits : defaults.benefits,
    journey: Array.isArray(incoming.journey) && incoming.journey.length === 4 ? incoming.journey : defaults.journey,
    planner: Array.isArray(incoming.planner) && incoming.planner.length ? incoming.planner : defaults.planner,
    process: Array.isArray(incoming.process) ? incoming.process : defaults.process,
    faqs: Array.isArray(incoming.faqs) ? incoming.faqs : defaults.faqs
  };
}
