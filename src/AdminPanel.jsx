import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, BookOpen, Check, ChevronRight,
  CircleHelp, CloudUpload, ExternalLink, Eye, EyeOff, FilePenLine, FolderOpen,
  ImagePlus, LayoutDashboard, LockKeyhole, LogOut, Menu, Plus, RefreshCw,
  Save, Settings, ShieldCheck, Sparkles, Trash2, UploadCloud, X
} from 'lucide-react';
import { DEFAULT_CONTENT, mergeContent } from './siteDefaults';
import { isSupabaseConfigured, supabase } from './lib/supabase';
import { uploadImage } from './lib/siteData';
import { ThemeToggle } from './components/ThemeToggle';
import './admin.css';

const NAVIGATION = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects & gallery', icon: FolderOpen },
  { id: 'services', label: 'Services', icon: FilePenLine },
  { id: 'content', label: 'Page content', icon: BookOpen },
  { id: 'faqs', label: 'FAQs', icon: CircleHelp },
  { id: 'process', label: 'Process & benefits', icon: Sparkles },
  { id: 'media', label: 'Media library', icon: ImagePlus },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const EMPTY_PROJECT = {
  title: '', type: 'Marketing', subtitle: '', category: '', description: '',
  image_url: '', features: [], kind: 'concept', published: false, sort_order: 20
};

function Field({ label, value, onChange, placeholder = '', multiline = false, maxLength = 500, hint, type = 'text', required = false, children }) {
  return <label className="admin-field"><span>{label}{required && <b> *</b>}</span>
    {children || (multiline
      ? <textarea rows={3} maxLength={maxLength} placeholder={placeholder} value={value ?? ''} onChange={e => onChange(e.target.value)} />
      : <input type={type} required={required} maxLength={maxLength} placeholder={placeholder} value={value ?? ''} onChange={e => onChange(e.target.value)} />)}
    {hint && <small>{hint}</small>}
  </label>;
}

function GroupField({ content, group, field, label, onChange, multiline, maxLength = 500, hint }) {
  return <Field label={label} value={content[group]?.[field]} multiline={multiline} maxLength={maxLength} hint={hint} onChange={v => onChange(group, field, v)} />;
}

function Pane({ title, subtitle, children, action }) {
  return <section className="admin-pane"><div className="admin-pane-heading"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>{children}</section>;
}

function Status({ message, error }) {
  return message ? <div className={`admin-message ${error ? 'admin-error' : 'admin-success'}`} role="status">{error ? <CircleHelp size={17}/> : <Check size={17}/>}<span>{message}</span></div> : null;
}

function ImageField({ label = 'Image', value, onChange, onError }) {
  const [busy, setBusy] = useState(false);
  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try { onChange(await uploadImage(file)); }
    catch (err) { onError(err.message); }
    finally { setBusy(false); event.target.value = ''; }
  };
  return <div className="admin-image-field">
    <Field label={label} value={value} onChange={onChange} placeholder="/images/concepts/example.webp or https://..." maxLength={1000} />
    <div className="admin-image-row">
      <label className="admin-upload-button"><UploadCloud size={17}/>{busy ? 'Uploading…' : 'Upload image'}<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={busy} onChange={upload} /></label>
      <span>JPG / PNG / WebP / AVIF · max 5 MB</span>
    </div>
    {value && <img className="admin-inline-preview" src={value} alt="Selected preview" loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; }} />}
  </div>;
}

function SignIn({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState('');
  const submit = async e => {
    e.preventDefault(); setPending(true); setNotice('');
    try { await onLogin(email, password); }
    catch (error) { setNotice(error.message || 'Unable to sign in.'); }
    finally { setPending(false); }
  };
  return <main className="admin-auth-page"><div className="admin-auth-glow" aria-hidden="true"/>
    <div className="admin-auth-box"><a className="admin-auth-brand" href="/"><img src="/dsign-logo-dark.png" alt="D-SIGN DESIGNERS" /></a>
      <span className="admin-overline"><LockKeyhole size={14}/> PRIVATE WORKSPACE</span>
      <h1>Welcome back<span>.</span></h1><p>Sign in to manage your website's content and portfolio.</p>
      <form onSubmit={submit} className="admin-login-form">
        <Field label="Admin email" type="email" value={email} onChange={setEmail} placeholder="admin@example.com" required maxLength={254}/>
        <div className="admin-password-field"><Field label="Password" type={show ? 'text' : 'password'} value={password} onChange={setPassword} required maxLength={200}/><button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>{show ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div>
        <Status message={notice} error/><button className="admin-primary admin-login-btn" disabled={pending} type="submit">{pending ? 'Signing in…' : 'Sign in securely'} <ArrowRight size={17}/></button>
      </form><div className="admin-auth-foot"><ShieldCheck size={16}/> Only authorised D-SIGN admins can publish changes.</div>
      <a className="admin-back-site" href="/"><ArrowLeft size={16}/> Back to website</a>
    </div>
  </main>;
}

function MissingConfig() {
  return <main className="admin-auth-page"><div className="admin-auth-box"><a className="admin-auth-brand" href="/"><img src="/dsign-logo-dark.png" alt="D-SIGN DESIGNERS" /></a><span className="admin-overline">ONE-TIME SETUP</span><h1>Connect your workspace<span>.</span></h1><p>The admin route is installed, but database authentication is not yet configured.</p><div className="admin-setup-guide"><p><b>1.</b> Create a Supabase project.</p><p><b>2.</b> Run <code>supabase/schema.sql</code> in SQL Editor.</p><p><b>3.</b> Create your admin user, then whitelist their ID in <code>admin_users</code>.</p><p><b>4.</b> Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> on Vercel and redeploy.</p></div><p className="admin-setup-note">See <code>ADMIN_SETUP.md</code> in the project. A password is never included in the website code.</p><a className="admin-back-site" href="/"><ArrowLeft size={16}/> Return to website</a></div></main>;
}

function ProjectEditor({ initial, onSave, onCancel, onError }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const previousFocus = document.activeElement;
    dialogRef.current?.querySelector('input:not([type=file])')?.focus();
    const keydown = event => {
      if (event.key === 'Escape') { event.preventDefault(); onCancel(); }
      if (event.key !== 'Tab') return;
      const elements = [...(dialogRef.current?.querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled])') || [])].filter(element => element.getClientRects().length);
      if (!elements.length) return;
      const first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
      if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
    };
    window.addEventListener('keydown',keydown);
    return () => {window.removeEventListener('keydown',keydown);previousFocus?.focus?.();};
  }, []);
  const [draft, setDraft] = useState({ ...EMPTY_PROJECT, ...initial });
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState('');
  const reportError = message => {setLocalError(message);onError(message);};
  const edit = (key, value) => {setLocalError('');setDraft(p => ({ ...p, [key]: value }));};
  const submit = async e => {
    e.preventDefault(); setBusy(true);
    try {
      if (!draft.title.trim()) throw new Error('A project title is required.');
      if (draft.image_url && !(/^(https:\/\/|\/)/i).test(draft.image_url)) throw new Error('Use an HTTPS image URL or a local /images/ path.');
      await onSave(draft);
    } catch (err) { reportError(err.message); }
    finally { setBusy(false); }
  };
  return <div className="admin-modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onCancel()}>
    <div role="dialog" aria-modal="true" aria-labelledby="admin-project-modal-title" className="admin-modal admin-project-modal" ref={dialogRef}>
      <div className="admin-modal-header"><div><span className="admin-overline">PORTFOLIO EDITOR</span><h2 id="admin-project-modal-title">{draft.id ? 'Edit project' : 'New project'}</h2></div><button type="button" aria-label="Close editor" onClick={onCancel}><X size={20}/></button></div>
      <form onSubmit={submit} className="admin-edit-form">
        <Status message={localError} error />
        <div className="admin-field-grid"><Field required label="Project name" value={draft.title} maxLength={140} onChange={v => edit('title',v)}/><Field label="Subtitle" value={draft.subtitle} onChange={v => edit('subtitle',v)}/></div>
        <div className="admin-field-grid"><Field label="Category / industry" value={draft.category} onChange={v => edit('category',v)} /><Field label="Display order" type="number" value={draft.sort_order} onChange={v => edit('sort_order', Number(v))}/></div>
        <div className="admin-field-grid"><Field label="Project type" value={draft.type} onChange={() => {}}><select value={draft.type} onChange={e => edit('type',e.target.value)}><option>Marketing</option><option>E-commerce</option><option>Web Apps</option></select></Field><Field label="Work classification" value={draft.kind} onChange={() => {}}><select value={draft.kind} onChange={e => edit('kind', e.target.value)}><option value="concept">Original design concept</option><option value="client">Completed client project</option></select></Field></div>
        <Field label="Description" multiline maxLength={1100} value={draft.description} onChange={v => edit('description',v)} />
        <Field label="Features (one per line)" multiline value={(draft.features || []).join('\n')} onChange={v => edit('features',v.split('\n').map(x => x.trim()).filter(Boolean))}/>
        <ImageField label="Cover image URL" value={draft.image_url} onChange={v => edit('image_url',v)} onError={reportError}/>
        <label className="admin-switch-row"><input type="checkbox" checked={Boolean(draft.published)} onChange={e => edit('published',e.target.checked)}/><span><b>Published</b><small>Show this project immediately on the public gallery</small></span></label>
        <div className="admin-modal-actions"><button className="admin-secondary" type="button" onClick={onCancel}>Cancel</button><button className="admin-primary" type="submit" disabled={busy}><Save size={17}/>{busy ? 'Saving…' : 'Save project'}</button></div>
      </form>
    </div>
  </div>;
}

function GalleryManager({ projects, refresh, setNotice }) {
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const shown = projects.filter(p => filter === 'all' || (filter === 'published' ? p.published : !p.published));
  const onSave = async draft => {
    const { id, created_at, updated_at, ...data } = draft;
    const operation = id ? supabase.from('projects').update(data).eq('id',id) : supabase.from('projects').insert(data);
    const {error} = await operation;
    if (error) throw error;
    setOpen(false); setEditing(null); setNotice('Project saved. Published changes will appear on the live site after refresh.'); await refresh();
  };
  const remove = async project => {
    if (!window.confirm(`Delete "${project.title}" permanently? Uploaded media will remain in your media library.`)) return;
    const {error} = await supabase.from('projects').delete().eq('id',project.id);
    if (error) setNotice(error.message,true); else {setNotice('Project deleted.'); await refresh();}
  };
  return <>
    <Pane title="Projects & gallery" subtitle="Create, edit, order and publish portfolio content without editing React code." action={<button className="admin-primary" onClick={() => {setEditing(null);setOpen(true);}}><Plus size={16}/> Add project</button>}>
      <div className="admin-toolbar"><div className="admin-pill-group">{[['all','All'],['published','Published'],['draft','Drafts']].map(([id,label]) => <button key={id} type="button" className={filter===id?'active':''} onClick={() => setFilter(id)}>{label}</button>)}</div><span>{shown.length} projects</span></div>
      <div className="admin-project-grid">{shown.map(project => <article key={project.id} className="admin-project-card"><div className="admin-project-cover">{project.image_url && <img src={project.image_url} alt="" loading="lazy"/>}<span className={`admin-status-dot ${project.published?'is-published':''}`}>{project.published?'Published':'Draft'}</span></div><div className="admin-project-body"><span>{project.kind === 'client' ? 'CLIENT WORK' : 'DESIGN CONCEPT'} · {project.type}</span><h3>{project.title}</h3><p>{project.subtitle || project.category || 'No description yet'}</p><div className="admin-card-actions"><button onClick={() => {setEditing(project);setOpen(true);}}><FilePenLine size={15}/> Edit</button><button aria-label={`Delete ${project.title}`} onClick={() => remove(project)} className="admin-danger"><Trash2 size={15}/></button></div></div></article>)}</div>
      {!shown.length && <div className="admin-empty">No projects here yet. Add your first gallery project to get started.</div>}
    </Pane>
    {open && <ProjectEditor initial={editing} onCancel={() => {setOpen(false);setEditing(null);}} onSave={onSave} onError={text => setNotice(text,true)}/>}
  </>;
}

function ServicesEditor({ content, setRow, addRow, removeRow, setNotice }) {
  return <Pane title="Your services" subtitle="All changes to services are saved together using the Save changes button." action={<button className="admin-secondary" onClick={() => addRow('services', {id:crypto.randomUUID(), icon:'monitor',name:'New service',category:'SERVICE',description:'',image:'',tone:'blue',tags:[]})}><Plus size={16}/> Add service</button>}>
    <div className="admin-stack">{content.services.map((service, index) => <div className="admin-editor-card" key={service.id || index}>
      <div className="admin-editor-top"><strong>{String(index+1).padStart(2,'0')} / {service.name}</strong><button className="admin-icon-danger" onClick={() => removeRow('services',index)} aria-label={`Remove ${service.name}`}><Trash2 size={17}/></button></div>
      <div className="admin-field-grid"><Field label="Service name" value={service.name} onChange={v => setRow('services',index,'name',v)}/><Field label="Eyebrow" value={service.category} onChange={v => setRow('services',index,'category',v)}/></div>
      <Field label="Description" multiline value={service.description} onChange={v => setRow('services',index,'description',v)} />
      <div className="admin-field-grid"><Field label="Icon" value={service.icon} onChange={()=>{}}><select value={service.icon} onChange={e => setRow('services',index,'icon',e.target.value)}><option value="monitor">Monitor</option><option value="shopping">Shopping bag</option><option value="code">Code</option></select></Field><Field label="Colour accent" value={service.tone} onChange={()=>{}}><select value={service.tone} onChange={e => setRow('services',index,'tone',e.target.value)}><option value="blue">Blue</option><option value="violet">Violet</option><option value="cyan">Cyan</option></select></Field></div>
      <Field label="Tags (comma separated)" value={(service.tags||[]).join(', ')} onChange={v => setRow('services',index,'tags',v.split(',').map(x=>x.trim()).filter(Boolean))}/>
      <ImageField value={service.image} onChange={v => setRow('services',index,'image',v)} onError={text => setNotice(text,true)}/>
    </div>)}</div>
  </Pane>;
}

function FAQEditor({ content, setRow, addRow, removeRow }) {
  return <Pane title="Frequently asked questions" subtitle="Keep answers clear and up to date. The public FAQ uses this list." action={<button className="admin-secondary" onClick={() => addRow('faqs',{question:'New question',answer:''})}><Plus size={16}/> Add FAQ</button>}>
    <div className="admin-stack">{content.faqs.map((faq,index) => <div className="admin-editor-card" key={index}><div className="admin-editor-top"><strong>FAQ {String(index+1).padStart(2,'0')}</strong><button className="admin-icon-danger" onClick={() => removeRow('faqs',index)} aria-label="Remove FAQ"><Trash2 size={17}/></button></div><Field label="Question" value={faq.question} onChange={v => setRow('faqs',index,'question',v)}/><Field label="Answer" multiline value={faq.answer} maxLength={2000} onChange={v => setRow('faqs',index,'answer',v)}/></div>)}</div>
  </Pane>;
}

function ProcessEditor({ content, setRow, addRow, removeRow }) {
  return <><Pane title="How you work" subtitle="Edit the process steps shown in the approach section." action={<button className="admin-secondary" onClick={() => addRow('process',{name:'New step',copy:'',icon:'compass'})}><Plus size={16}/> Add step</button>}>
    <div className="admin-stack">{content.process.map((step,index) => <div className="admin-editor-card" key={index}><div className="admin-editor-top"><strong>Step {index+1}</strong><button className="admin-icon-danger" onClick={() => removeRow('process',index)} aria-label="Remove step"><Trash2 size={17}/></button></div><div className="admin-field-grid"><Field label="Step title" value={step.name} onChange={v=>setRow('process',index,'name',v)}/><Field label="Icon" value={step.icon} onChange={()=>{}}><select value={step.icon} onChange={e=>setRow('process',index,'icon',e.target.value)}><option value="compass">Compass</option><option value="palette">Palette</option><option value="code">Code</option><option value="rocket">Rocket</option></select></Field></div><Field label="Description" value={step.copy} onChange={v=>setRow('process',index,'copy',v)}/></div>)}</div>
  </Pane><Pane title="Why choose D-SIGN?" subtitle="Trust and benefit highlights displayed below services." action={<button className="admin-secondary" onClick={() => addRow('benefits',{title:'New benefit',detail:'',icon:'shield'})}><Plus size={16}/> Add benefit</button>}>
    <div className="admin-stack">{content.benefits.map((benefit,index) => <div className="admin-editor-card" key={index}><div className="admin-editor-top"><strong>Benefit {index+1}</strong><button className="admin-icon-danger" onClick={() => removeRow('benefits',index)} aria-label="Remove benefit"><Trash2 size={17}/></button></div><div className="admin-field-grid"><Field label="Title" value={benefit.title} onChange={v=>setRow('benefits',index,'title',v)}/><Field label="Icon" value={benefit.icon} onChange={()=>{}}><select value={benefit.icon} onChange={e=>setRow('benefits',index,'icon',e.target.value)}><option value="shield">Shield</option><option value="search">Search</option><option value="cloud">Speed</option><option value="headphones">Launch</option></select></Field></div><Field label="Description" value={benefit.detail} onChange={v=>setRow('benefits',index,'detail',v)}/></div>)}</div>
  </Pane>
  <Pane title="The D-SIGN journey" subtitle="The four-stage slider on mobile and timeline on desktop. Keep exactly four stages.">
    <div className="admin-stack">{content.journey.map((stage,index)=><div className="admin-editor-card" key={index}>
      <div className="admin-editor-top"><strong>Stage {index+1} / 4</strong></div><div className="admin-field-grid"><Field label="Stage name" value={stage.title} onChange={v=>setRow('journey',index,'title',v)}/><Field label="Description" value={stage.detail} onChange={v=>setRow('journey',index,'detail',v)}/></div>
    </div>)}</div>
  </Pane>
  <Pane title="Interactive project planner" subtitle="Edit the service recommendations visitors see when they explore project types.">
    <div className="admin-stack">{content.planner.map((choice,index)=><div className="admin-editor-card" key={choice.id||index}><div className="admin-editor-top"><strong>{choice.label}</strong></div><div className="admin-field-grid"><Field label="Tab label" value={choice.label} onChange={v=>setRow('planner',index,'label',v)}/><Field label="Headline" value={choice.headline} onChange={v=>setRow('planner',index,'headline',v)}/></div><Field label="Description" multiline value={choice.copy} onChange={v=>setRow('planner',index,'copy',v)}/><Field label="Includes (comma separated)" value={(choice.includes||[]).join(', ')} onChange={v=>setRow('planner',index,'includes',v.split(',').map(x=>x.trim()).filter(Boolean))}/><ImageField value={choice.image} onChange={v=>setRow('planner',index,'image',v)} onError={()=>{}}/></div>)}</div>
  </Pane></>;
}

const GROUP_FIELDS = [
  { title:'Hero / landing section', group:'hero', fields: [['eyebrow','Top label'],['heading','Main headline'],['emphasis','Highlighted headline'],['description','Introduction / description',true]] },
  { title:'About section', group:'about', fields: [['eyebrow','Top label'],['heading','Main title'],['emphasis','Highlighted title'],['paragraph_one','First paragraph',true],['paragraph_two','Second paragraph',true],['toolkit','Technologies (comma separated)']] },
  { title:'Services section', group:'copy', fields: [['services_eyebrow','Eyebrow'],['services_title','Title'],['services_emphasis','Highlighted title'],['services_description','Description',true]] },
  { title:'Gallery section', group:'copy', fields: [['gallery_eyebrow','Eyebrow'],['gallery_title','Title'],['gallery_emphasis','Highlighted title'],['gallery_description','Description',true]] },
  { title:'Process section', group:'copy', fields: [['process_eyebrow','Eyebrow'],['process_title','Title'],['process_emphasis','Highlighted title'],['process_description','Description',true]] },
  { title:'FAQ section', group:'copy', fields: [['faq_eyebrow','Eyebrow'],['faq_title','Title'],['faq_emphasis','Highlighted title'],['faq_description','Description',true]] },
  { title:'Contact & footer', group:'copy', fields: [['contact_eyebrow','Eyebrow'],['contact_title','Headline'],['contact_emphasis','Highlighted headline'],['contact_description','Description',true],['footer_tagline','Footer tagline']] }
];

function ContentEditor({ content, setGroup, setNotice }) {
  return <><Pane title="Page content" subtitle="Write the words that visitors see throughout your website. Save once when finished."/>
    {GROUP_FIELDS.map(section => <Pane title={section.title} key={section.title}><div className="admin-field-grid">{section.fields.map(([field,label,multiline]) => <GroupField key={field} content={content} group={section.group} field={field} label={label} multiline={multiline} onChange={setGroup}/>)}</div></Pane>)}
    <Pane title="Hero highlights" subtitle="These appear as check-mark benefits under the hero buttons.">
      <div className="admin-stack">{(content.hero.highlights||[]).map((text,index) => <Field label={`Highlight ${index+1}`} key={index} value={text} onChange={v => setGroup('hero','highlights',content.hero.highlights.map((x,i)=>i===index?v:x))} />)}</div>
    </Pane></>;
}

function SettingsEditor({ content, setGroup, setNotice }) {
  return <><Pane title="General settings" subtitle="Brand, contact, search metadata, appearance and background audio controls.">
    <div className="admin-field-grid"><GroupField content={content} group="site" field="name" label="Business name" onChange={setGroup}/><GroupField content={content} group="site" field="phone" label="Display phone number" onChange={setGroup}/><GroupField content={content} group="site" field="whatsapp" label="WhatsApp number (country code, no +)" onChange={setGroup}/><GroupField content={content} group="site" field="meta_title" label="Browser title / SEO" onChange={setGroup}/></div>
    <GroupField content={content} group="site" field="meta_description" label="Search description" multiline onChange={setGroup}/>
    <ImageField label="Logo image URL" value={content.site.logo_url} onChange={v=>setGroup('site','logo_url',v)} onError={text=>setNotice(text,true)} />
  </Pane>
  <Pane title="Appearance" subtitle="Visitors can always switch themes. Your choice here sets the default for first-time visitors.">
    <div className="admin-settings-row"><div><b>Default colour scheme</b><span>Dark navy or bright editorial light mode</span></div><select value={content.site.default_theme} onChange={e=>setGroup('site','default_theme',e.target.value)}><option value="dark">Dark mode</option><option value="light">Light mode</option></select></div>
    <label className="admin-switch-row"><input type="checkbox" checked={content.site.splash_enabled!==false} onChange={e=>setGroup('site','splash_enabled',e.target.checked)}/><span><b>Show animated splash screen</b><small>Short brand intro once per browsing session, skip available</small></span></label>
  </Pane>
  <Pane title="Lobby music" subtitle="The browser tries to start music automatically, then retries after the first interaction if autoplay is blocked.">
    <label className="admin-switch-row"><input type="checkbox" checked={content.site.music_enabled!==false} onChange={e=>setGroup('site','music_enabled',e.target.checked)}/><span><b>Enable background music</b><small>Visitors can mute it at any time; their preference is remembered</small></span></label>
    <div className="admin-volume"><div><b>Playback volume</b><span>{Math.round((Number(content.site.music_volume)||0)*100)}%</span></div><input aria-label="Music volume" type="range" min="0.1" max="0.75" step="0.01" value={content.site.music_volume ?? 0.54} onChange={e=>setGroup('site','music_volume',Number(e.target.value))}/><small>Recommended: 40–60%. Maximum in this website is 75%.</small></div>
  </Pane></>;
}

function MediaLibrary({ setNotice }) {
  const [items,setItems] = useState([]);
  const [busy,setBusy] = useState(false);
  const refresh = useCallback(async () => {
    const {data,error} = await supabase.storage.from('site-media').list('',{limit:100,sortBy:{column:'created_at',order:'desc'}});
    if (error) setNotice(error.message,true); else setItems(data||[]);
  }, [setNotice]);
  useEffect(() => {refresh();},[refresh]);
  const upload = async e => {
    const files = Array.from(e.target.files||[]).slice(0,10);
    setBusy(true);
    try {for (const file of files) await uploadImage(file); await refresh(); setNotice(`${files.length} image(s) uploaded.`);}
    catch (error) {setNotice(error.message,true);}
    finally {setBusy(false);e.target.value='';}
  };
  const remove = async file => {
    if (!window.confirm(`Delete ${file.name} from storage? This may break places where the image is used.`)) return;
    const {error} = await supabase.storage.from('site-media').remove([file.name]);
    if (error) setNotice(error.message,true); else {setNotice('Image deleted.');refresh();}
  };
  return <Pane title="Media library" subtitle="Upload pictures once, then reuse their public URLs in the gallery, service cards and logo fields." action={<label className="admin-upload-button"><UploadCloud size={16}/>{busy?'Uploading…':'Upload images'}<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple disabled={busy} onChange={upload}/></label>}>
    <div className="admin-media-grid">{items.filter(f=>f.name && !f.name.startsWith('.')).map(file => {const {data}=supabase.storage.from('site-media').getPublicUrl(file.name);return <article key={file.name} className="admin-media-card"><img loading="lazy" src={data.publicUrl} alt={file.name}/><div><span title={file.name}>{file.name}</span><div><button onClick={async()=>{try{await navigator.clipboard.writeText(data.publicUrl);setNotice('Image URL copied.');}catch{setNotice(data.publicUrl);}}}>Copy URL</button><button className="admin-danger" aria-label={`Remove ${file.name}`} onClick={()=>remove(file)}><Trash2 size={15}/></button></div></div></article>;})}</div>
    {!items.length && <div className="admin-empty">Your media library is empty. Upload an image to begin.</div>}
  </Pane>;
}

function Overview({ projects, content, goTo, updatedAt }) {
  const published = projects.filter(p=>p.published).length;
  return <><div className="admin-welcome"><span className="admin-overline">YOUR CREATIVE COMMAND CENTER</span><h2>Make something remarkable<span>.</span></h2><p>Manage the content your visitors see, and bring your next project online without a code deployment.</p><div className="admin-welcome-actions"><button className="admin-primary" onClick={()=>goTo('projects')}><Plus size={17}/> Add a project</button><a href="/" target="_blank" rel="noopener noreferrer" className="admin-light-link">View live website <ArrowUpRight size={16}/></a></div></div>
    <div className="admin-stats"><div><span>TOTAL PROJECTS</span><strong>{projects.length}</strong><small>Published & drafts</small></div><div><span>LIVE PORTFOLIO</span><strong>{published}</strong><small>Visible on your website</small></div><div><span>SERVICES</span><strong>{content.services.length}</strong><small>Current offerings</small></div><div><span>FAQ ENTRIES</span><strong>{content.faqs.length}</strong><small>Answers for visitors</small></div></div>
    <Pane title="Quick actions" subtitle="Jump straight into what you want to manage."><div className="admin-quick-actions">{[['projects','Manage portfolio','Add, edit or publish projects',FolderOpen],['services','Update services','Keep your offerings fresh',FilePenLine],['content','Edit website copy','Headlines, contact and about',BookOpen],['settings','Site preferences','Music, themes and branding',Settings]].map(([id,title,copy,Icon])=><button key={id} onClick={()=>goTo(id)}><span><Icon size={22}/></span><strong>{title}</strong><small>{copy}</small><ChevronRight size={15}/></button>)}</div></Pane>
    <div className="admin-overview-note"><BarChart3 size={19}/><span><b>Vercel Analytics:</b> visitor reports are available in your <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer">Vercel dashboard <ExternalLink size={13}/></a>. WhatsApp enquiries remain in WhatsApp; they are not stored in this dashboard.</span></div>
  </>;
}

export default function AdminPanel({ theme, setTheme }) {
  const [auth,setAuth] = useState('checking');
  const [adminEmail,setAdminEmail] = useState('');
  const [tab,setTab] = useState('overview');
  const [menuOpen,setMenuOpen] = useState(false);
  const [content,setContent] = useState(mergeContent());
  const [projects,setProjects] = useState([]);
  const [dirty,setDirty] = useState(false);
  const [busy,setBusy] = useState(false);
  const [notice,setNoticeState] = useState({message:'',error:false});
  const [updatedAt,setUpdatedAt] = useState(null);
  const noticeTimer = useRef(null);
  const setNotice = useCallback((message,error=false) => {setNoticeState({message,error});},[]);

  const verifyUser = useCallback(async () => {
    const {data: {user},error} = await supabase.auth.getUser();
    if (error || !user) {setAuth('signed-out');return false;}
    const {data, error:roleError} = await supabase.from('admin_users').select('user_id').eq('user_id',user.id).maybeSingle();
    if (roleError || !data) {await supabase.auth.signOut();setAuth('signed-out');return false;}
    setAdminEmail(user.email||'Administrator');setAuth('ready');return true;
  },[]);

  const refreshProjects = useCallback(async () => {
    const { data, error } = await supabase.from('projects').select('*').order('sort_order', {ascending:true}).order('created_at', {ascending:true});
    if (error) throw error;
    setProjects(data || []);
  }, []);
  const refresh = useCallback(async () => {
    const [site, gallery] = await Promise.all([
      supabase.from('site_content').select('payload, updated_at').eq('id','homepage').maybeSingle(),
      supabase.from('projects').select('*').order('sort_order',{ascending:true}).order('created_at',{ascending:true})
    ]);
    if (site.error || gallery.error) throw site.error || gallery.error;
    setContent(mergeContent(site.data?.payload||{}));setProjects(gallery.data||[]);
    setUpdatedAt(site.data?.updated_at||null);setDirty(false);
  },[]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let active=true;
    verifyUser().then(allowed=>{
      if (!active || !allowed) return;
      refresh().catch(error=>setNotice(error.message,true));
    }).catch(()=>setAuth('signed-out'));
    return ()=>{active=false;};
  },[verifyUser,refresh,setNotice]);

  useEffect(() => {
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) robots.setAttribute('content','noindex, nofollow, noarchive');
    document.title = 'Admin workspace | D-SIGN DESIGNERS';
  }, []);
  useEffect(() => { document.body.classList.toggle('admin-body',true);return ()=>document.body.classList.remove('admin-body'); },[]);

  const login = async(email,password) => {
    const {error} = await supabase.auth.signInWithPassword({email:email.trim(),password});
    if (error) throw error;
    const allowed=await verifyUser();
    if (!allowed) throw new Error('This account does not have administrator access.');
    await refresh();
  };
  const logout = async() => {await supabase.auth.signOut();setAuth('signed-out');};
  const setGroup = (group, field, value) => {
    setContent(p => ({...p,[group]:{...p[group],[field]:value}}));setDirty(true);
  };
  const setRow = (array,index,key,value) => {
    setContent(p => ({...p,[array]:p[array].map((row,i)=>i===index?{...row,[key]:value}:row)}));setDirty(true);
  };
  const addRow = (array,value) => {setContent(p=>({...p,[array]:[...p[array],value]}));setDirty(true);};
  const removeRow = (array,index) => {setContent(p=>({...p,[array]:p[array].filter((_,i)=>i!==index)}));setDirty(true);};
  const save = async() => {
    setBusy(true);setNotice('');
    try {
      const {error}=await supabase.from('site_content').upsert({id:'homepage',payload:content},{onConflict:'id'});
      if(error) throw error;
      setDirty(false);setNotice('Website content published successfully. Refresh the public site to see changes.');
      setUpdatedAt(new Date().toISOString());
    } catch(error){setNotice(error.message,true);}
    finally{setBusy(false);}
  };

  if (!isSupabaseConfigured) return <MissingConfig/>;
  if (auth==='checking') return <div className="admin-loading" role="status"><span className="admin-loading-ring"/>Verifying secure session…</div>;
  if (auth!=='ready') return <SignIn onLogin={login}/>;
  const current = NAVIGATION.find(item=>item.id===tab);
  const choose = id => {setTab(id);setMenuOpen(false);window.scrollTo({top:0,behavior:'instant'});};

  return <div className="admin-shell">
    <aside className={`admin-sidebar ${menuOpen?'sidebar-open':''}`}><a href="/" className="admin-logo"><img src={content.site.logo_url || '/dsign-logo-dark.png'} alt="D-SIGN DESIGNERS" /></a>
      <div className="admin-sidebar-label">WORKSPACE / V4.0</div>
      <nav aria-label="Admin navigation">{NAVIGATION.map(({id,label,icon:Icon})=><button key={id} type="button" className={tab===id?'active':''} onClick={()=>choose(id)}><Icon size={19}/>{label}{tab===id && <ChevronRight size={15} className="admin-active-arrow"/>}</button>)}</nav>
      <div className="admin-sidebar-bottom"><div className="admin-avatar">DS</div><div><strong>Administrator</strong><span title={adminEmail}>{adminEmail}</span></div><button onClick={logout} title="Sign out" aria-label="Sign out"><LogOut size={18}/></button></div>
    </aside>
    {menuOpen && <button className="admin-menu-shade" aria-label="Close navigation" onClick={()=>setMenuOpen(false)}/>}
    <div className="admin-main"><header className="admin-topbar"><button className="admin-menu-trigger" type="button" aria-label="Open navigation" onClick={()=>setMenuOpen(!menuOpen)}><Menu size={21}/></button><div className="admin-breadcrumb">WORKSPACE <ChevronRight size={14}/><strong>{current.label}</strong></div><div className="admin-top-actions"><ThemeToggle theme={theme} onChange={setTheme} compact/><a className="admin-site-link" href="/" target="_blank" rel="noopener noreferrer"><Eye size={17}/><span>View site</span></a></div></header>
      <div className="admin-main-content"><div className="admin-page-intro"><div><span className="admin-overline">D-SIGN MANAGEMENT SUITE</span><h1>{current.label}</h1></div>{dirty && <div className="admin-dirty"><span/> Unsaved website changes</div>}</div>
        <Status message={notice.message} error={notice.error}/>
        {tab==='overview' && <Overview projects={projects} content={content} updatedAt={updatedAt} goTo={choose}/>}
        {tab==='projects' && <GalleryManager projects={projects} refresh={refreshProjects} setNotice={setNotice}/>}
        {tab==='services' && <ServicesEditor content={content} setRow={setRow} addRow={addRow} removeRow={removeRow} setNotice={setNotice}/>}
        {tab==='content' && <ContentEditor content={content} setGroup={setGroup} setNotice={setNotice}/>}
        {tab==='faqs' && <FAQEditor content={content} setRow={setRow} addRow={addRow} removeRow={removeRow}/>}
        {tab==='process' && <ProcessEditor content={content} setRow={setRow} addRow={addRow} removeRow={removeRow}/>}
        {tab==='media' && <MediaLibrary setNotice={setNotice}/>}
        {tab==='settings' && <SettingsEditor content={content} setGroup={setGroup} setNotice={setNotice}/>}
        {dirty && <div className="admin-save-bar"><div><span className="admin-save-dot"/><b>Changes not yet published</b><small>Save to make them visible to visitors.</small></div><button className="admin-primary" type="button" onClick={save} disabled={busy}><Save size={17}/>{busy?'Saving…':'Save & publish'}</button></div>}
        <footer className="admin-copyright">D-SIGN DESIGNERS · PRIVATE ADMIN WORKSPACE <span>Protected by Supabase Auth + Row Level Security</span></footer>
      </div>
    </div>
  </div>;
}
