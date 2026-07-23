import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Shield, User } from 'lucide-react';
import { useHealth } from '@hooks/useHealth.js';
import {
  homeStackClass,
  homeHeroClass,
  homeEyebrowClass,
  homeTitleClass,
  homeLeadClass,
  homeActionsRowClass,
  primaryButtonInlineClass,
  secondaryButtonClass,
  specCardClass,
  specCardTitleClass,
  specRowClass,
  specLabelClass,
  specValueClass,
  specStatusClass,
  specDotClass,
  specDotOnlineClass,
  specDotOfflineClass,
  specDotIdleClass,
  specHintClass,
  metaStripClass,
  metaItemClass,
  metaValueClass,
  metaLabelClass,
  homeSectionClass,
  homeSectionPlainClass,
  homeSectionHeadClass,
  homeSectionEyebrowClass,
  homeSectionTitleClass,
  homeSectionLeadClass,
  areaGridClass,
  areaCardClass,
  areaIconClass,
  areaTitleClass,
  areaTextClass,
  areaRoutesClass,
  routeChipClass,
  tracePanelClass,
  traceHeadClass,
  traceEyebrowClass,
  traceHeadTitleClass,
  traceHeadLeadClass,
  traceListClass,
  traceItemClass,
  traceDotClass,
  traceBodyClass,
  traceTitleClass,
  traceTextClass,
  traceCodeClass,
  colophonRowClass,
  colophonLabelClass,
  colophonItemsClass,
  colophonItemClass,
} from '@/styles/prometeoStyleClasses.js';

const specRows = [
  { label: 'Course', value: 'Professional Web Development' },
  { label: 'Unit', value: 'Unit 2 — Final project' },
  { label: 'Team', value: '8 members · IT81' },
  { label: 'University', value: 'UTRM' },
  { label: 'Submission', value: 'July 2026' },
];

const metrics = [
  { value: '3', label: 'access areas' },
  { value: '8', label: 'team members' },
  { value: '15 min', label: 'access token lifetime' },
  { value: '60 days', label: 'refresh token lifetime' },
];

const areas = [
  {
    icon: Globe,
    title: 'Public',
    text: 'The open screens: home, project information, sign up, sign in and the password recovery flow.',
    routes: ['/', '/about-us', '/login', '/signup', '/forgot-password'],
  },
  {
    icon: User,
    title: 'User',
    text: 'The dashboard for any authenticated account. It shows the profile, allows editing personal data and lists the active sessions on every device.',
    routes: ['/dashboard/home', '/dashboard/profile', '/dashboard/active-sessions'],
  },
  {
    icon: Shield,
    title: 'Administrator',
    text: 'The sections reserved for the admin role. They go through the role middleware first, which stops the request when the account does not qualify.',
    routes: ['/dashboard/monitoring'],
  },
];

const trace = [
  {
    title: 'From the browser to the API',
    code: 'POST /api/v1/auth/login',
    text: 'React Router switches views without reloading the page. A central client written with Fetch builds the request and sends it to the Express REST API.',
  },
  {
    title: 'Two tokens, two lifetimes',
    code: 'bcrypt.compare() → jwt.sign()',
    text: 'The submitted password is compared against its bcrypt hash. On a match the server issues a 15 minute access token for requests and a 60 day refresh token that travels in an HTTP cookie.',
  },
  {
    title: 'The middleware checks the role',
    code: 'requireAuth → requireRole',
    text: 'Before reaching the controller, every protected route verifies the token signature and then the role of the account. Without permission the request stops there and never touches the database.',
  },
  {
    title: 'Mongoose writes to Atlas',
    code: 'User.findOne()',
    text: 'The user and token models define the schema, validate the information and run the operation against the MongoDB Atlas cluster.',
  },
];

const colophon = [
  {
    label: 'Frontend',
    items: ['React 18', 'React Router DOM', 'Context API', 'Vite 6', 'Tailwind CSS 4', 'Lucide React', 'Fetch API'],
  },
  {
    label: 'Backend',
    items: ['Node.js 18+', 'Express 4', 'Helmet', 'CORS', 'Compression', 'Cookie Parser', 'UA Parser JS'],
  },
  {
    label: 'Database',
    items: ['MongoDB Atlas', 'Mongoose'],
  },
  {
    label: 'Security',
    items: ['JSON Web Tokens', 'bcrypt', 'dotenv', 'Role-based access control'],
  },
  {
    label: 'Tooling',
    items: ['pnpm workspaces', 'Concurrently', 'Nodemon', 'ESLint', 'Git'],
  },
];

export const Home = () => {
  const { isLoading, error } = useHealth();

  const status = isLoading
    ? { dot: specDotIdleClass, label: 'Checking' }
    : error
      ? { dot: specDotOfflineClass, label: 'Offline' }
      : { dot: specDotOnlineClass, label: 'Online' };

  return (
    <div className={homeStackClass}>
      <section className={homeHeroClass}>
        <div>
          <span className={homeEyebrowClass}>Final project · Prometeo</span>
          <h1 className={homeTitleClass}>One application, three levels of access</h1>
          <p className={homeLeadClass}>
            Prometeo is a full-stack web application built in three weeks by a
            team of eight. React and Vite on the browser side, an Express REST
            API on the server side and MongoDB Atlas holding the data, all
            inside a single monorepo.
          </p>

          <div className={homeActionsRowClass}>
            <Link to="/login" className={primaryButtonInlineClass}>
              Get started
              <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
            </Link>
            <Link to="/about-us" className={secondaryButtonClass}>
              Learn more
            </Link>
          </div>
        </div>

        <div>
          <div className={specCardClass}>
            <span className={specCardTitleClass}>Project record</span>

            {specRows.map(({ label, value }) => (
              <div key={label} className={specRowClass}>
                <span className={specLabelClass}>{label}</span>
                <span className={specValueClass}>{value}</span>
              </div>
            ))}

            <div className={specRowClass}>
              <span className={specLabelClass}>API</span>
              <span className={`${specValueClass} ${specStatusClass}`}>
                <span className={`${specDotClass} ${status.dot}`} aria-hidden="true" />
                {status.label}
              </span>
            </div>
          </div>

          {error && (
            <p className={specHintClass}>
              The backend is not responding. Start it with <strong>pnpm dev:backend</strong> and
              make sure port 3000 is free.
            </p>
          )}
        </div>
      </section>

      <section className={metaStripClass}>
        {metrics.map(({ value, label }) => (
          <div key={label} className={metaItemClass}>
            <span className={metaValueClass}>{value}</span>
            <span className={metaLabelClass}>{label}</span>
          </div>
        ))}
      </section>

      <section className={homeSectionPlainClass}>
        <div className={homeSectionHeadClass}>
          <span className={homeSectionEyebrowClass}>Architecture</span>
          <h2 className={homeSectionTitleClass}>Three areas defined during planning</h2>
          <p className={homeSectionLeadClass}>
            Before writing any code the team sketched the project in Excalidraw
            and split it in three. That same split still organizes the
            repository: each area has its own routes, views and permission level.
          </p>
        </div>

        <div className={areaGridClass}>
          {areas.map(({ icon: Icon, title, text, routes }) => (
            <article key={title} className={areaCardClass}>
              <Icon size={20} strokeWidth={1.75} className={areaIconClass} aria-hidden="true" />
              <h3 className={areaTitleClass}>{title}</h3>
              <p className={areaTextClass}>{text}</p>

              <ul className={areaRoutesClass}>
                {routes.map((route) => (
                  <li key={route} className={routeChipClass}>{route}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={homeSectionPlainClass}>
        <div className={tracePanelClass}>
          <div className={traceHeadClass}>
            <span className={traceEyebrowClass}>Request path</span>
            <h2 className={traceHeadTitleClass}>What happens when someone signs in</h2>
            <p className={traceHeadLeadClass}>
              The full journey of a request, from the click in the browser to
              the response that comes back with the data.
            </p>
          </div>

          <div className={traceListClass}>
            {trace.map(({ title, code, text }) => (
              <article key={title} className={traceItemClass}>
                <span className={traceDotClass} aria-hidden="true" />
                <div className={traceBodyClass}>
                  <h3 className={traceTitleClass}>{title}</h3>
                  <code className={traceCodeClass}>{code}</code>
                  <p className={traceTextClass}>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={homeSectionClass}>
        <div className={homeSectionHeadClass}>
          <span className={homeSectionEyebrowClass}>Tooling</span>
          <h2 className={homeSectionTitleClass}>What it is built with</h2>
          <p className={homeSectionLeadClass}>
            The whole project is written in JavaScript. The monorepo is handled
            with pnpm workspaces, so a single install from the root sets up both
            sides.
          </p>
        </div>

        <div>
          {colophon.map(({ label, items }) => (
            <div key={label} className={colophonRowClass}>
              <span className={colophonLabelClass}>{label}</span>
              <ul className={colophonItemsClass}>
                {items.map((item) => (
                  <li key={item} className={colophonItemClass}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};