import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Code2, FileText, Server } from 'lucide-react';
import photoEnrique from '@/assets/FEnrique.webp';
import photoAlexis from '@/assets/FAlexis.webp';
import photoCesar from '@/assets/FCesar.webp';
import photoYair from '@/assets/FYair.webp';
import photoAaron from '@/assets/FAaron.webp';
import photoTadeo from '@/assets/FTadeo.webp';
import photoIvan from '@/assets/FIvan.webp';
import photoAdriel from '@/assets/FBig.webp';
import {
  aboutStackClass,
  aboutSectionClass,
  aboutSectionPlainClass,
  aboutEyebrowClass,
  aboutTitleClass,
  aboutLeadClass,
  aboutActionsClass,
  aboutAsideClass,
  aboutAsideTextClass,
  aboutAsideFootClass,
  aboutMetaStripClass,
  aboutMetaItemClass,
  aboutMetaValueClass,
  aboutMetaLabelClass,
  aboutHeadClass,
  aboutHeadEyebrowClass,
  aboutHeadTitleClass,
  aboutHeadLeadClass,
  carouselViewportClass,
  carouselCardClass,
  carouselCardActiveClass,
  carouselCardPrevClass,
  carouselCardNextClass,
  carouselCardFarPrevClass,
  carouselCardFarNextClass,
  carouselCardHiddenClass,
  memberPhotoWrapClass,
  memberPhotoClass,
  memberPhotoFallbackClass,
  memberBodyClass,
  memberIdClass,
  memberNameClass,
  memberRoleClass,
  memberIconClass,
  carouselNavClass,
  carouselArrowClass,
  carouselDotsClass,
  carouselDotClass,
  carouselDotIdleClass,
  carouselDotActiveClass,
  creditRowClass,
  creditLabelClass,
  creditValueClass,
  primaryButtonInlineClass,
  secondaryButtonClass,
} from '@/styles/prometeoStyleClasses.js';

const roles = {
  frontend: { label: 'Frontend', icon: Code2 },
  backend: { label: 'Backend', icon: Server },
  docs: { label: 'Documentation', icon: FileText },
};

const team = [
  { id: '2302045', name: 'Enrique Castillo Rodríguez', role: 'frontend', photo: photoEnrique },
  { id: '2302117', name: 'Alexis Alfredo Bustos Rodríguez', role: 'frontend', photo: photoAlexis },
  { id: '2302073', name: 'Cesar David Sánchez Trejo', role: 'backend', photo: photoCesar },
  { id: '2302133', name: 'Yair Gamaliel Guzmán Pérez', role: 'backend', photo: photoYair },
  { id: '2302042', name: 'Aarón de Jesús Santos Absalón', role: 'docs', photo: photoAaron },
  { id: '2302061', name: 'Jorge Tadeo Aviles Pérez', role: 'docs', photo: photoTadeo },
  { id: '2302142', name: 'Jesús Iván Tamay Balam', role: 'docs', photo: photoIvan },
  { id: '2302019', name: 'Adriel Arturo Solano Peraza', role: 'docs', photo: photoAdriel },
];

const metrics = [
  { value: '8', label: 'team members' },
  { value: '3', label: 'workstreams' },
  { value: '3', label: 'weeks of development' },
  { value: '1', label: 'shared monorepo' },
];

const credits = [
  { label: 'University', value: 'Universidad Tecnológica de la Riviera Maya' },
  { label: 'Program', value: 'Engineering in Software Development and Management' },
  { label: 'Course', value: 'Professional Web Development — Unit 3' },
  { label: 'Group', value: 'IT81 · Class of 2026-2027' },
  { label: 'Instructor', value: 'Ing. Cesar David Hernández Hernández' },
  { label: 'Submission', value: 'Playa del Carmen, Quintana Roo · July 2026' },
];

const getInitials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

const getOffset = (index, active, total) => {
  let distance = index - active;
  if (distance > total / 2) distance -= total;
  if (distance < -total / 2) distance += total;
  return distance;
};

const getStateClass = (offset) => {
  if (offset === 0) return carouselCardActiveClass;
  if (offset === -1) return carouselCardPrevClass;
  if (offset === 1) return carouselCardNextClass;
  if (offset === -2) return carouselCardFarPrevClass;
  if (offset === 2) return carouselCardFarNextClass;
  return carouselCardHiddenClass;
};

export const AboutUs = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index) => {
    setActive(((index % team.length) + team.length) % team.length);
  }, []);

  const goNext = useCallback(() => setActive((i) => (i + 1) % team.length), []);
  const goPrev = useCallback(
    () => setActive((i) => (i - 1 + team.length) % team.length),
    [],
  );

  useEffect(() => {
    if (paused) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [paused, goNext]);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goNext();
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrev();
    }
  };

  return (
    <div className={aboutStackClass}>
      <section className={aboutSectionPlainClass}>
        <span className={aboutEyebrowClass}>About us · Team Prometeo</span>
        <h1 className={aboutTitleClass}>Eight people, one repository</h1>
        <p className={aboutLeadClass}>
          We are students of Engineering in Software Development and Management
          at UTRM. Prometeo is the final project for Professional Web
          Development and we built it across three workstreams: the people who
          shaped the interface, the people who raised the API and the people who
          documented the whole process.
        </p>

        <div className={aboutActionsClass}>
          <Link to="/login" className={primaryButtonInlineClass}>
            Get started
            <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
          </Link>
          <Link to="/" className={secondaryButtonClass}>
            Learn more
          </Link>
        </div>
      </section>

      <section className={aboutSectionClass}>
        <div className={aboutAsideClass}>
          <p className={aboutAsideTextClass}>
            Prometheus stole fire from the gods and paid for it for all
            eternity. We only stole hours of sleep, but for three weeks it felt
            about the same.
          </p>
          <p className={aboutAsideFootClass}>
            Nobody was chained to a rock. Although a couple of merges came
            close.
          </p>
        </div>
      </section>

      <section className={aboutMetaStripClass}>
        {metrics.map(({ value, label }) => (
          <div key={label} className={aboutMetaItemClass}>
            <span className={aboutMetaValueClass}>{value}</span>
            <span className={aboutMetaLabelClass}>{label}</span>
          </div>
        ))}
      </section>

      <section className={aboutSectionPlainClass}>
        <div className={aboutHeadClass}>
          <span className={aboutHeadEyebrowClass}>Responsibilities</span>
          <h2 className={aboutHeadTitleClass}>Who did what</h2>
          <p className={aboutHeadLeadClass}>
            The team split into three workstreams from the first week. Frontend
            handled the views, the routing and the API consumption. Backend
            built the endpoints, the authentication and the database connection.
            Documentation recorded every phase of the development with evidence.
          </p>
        </div>

        <div
          role="region"
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="Team members"
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className={carouselViewportClass}>
            {team.map(({ id, name, role, photo }, index) => {
              const offset = getOffset(index, active, team.length);
              const { label, icon: Icon } = roles[role];

              return (
                <article
                  key={id}
                  className={`${carouselCardClass} ${getStateClass(offset)}`}
                  onClick={() => offset !== 0 && goTo(index)}
                >
                  <div className={memberPhotoWrapClass}>
                    {photo ? (
                      <img className={memberPhotoClass} src={photo} alt={name} loading="lazy" />
                    ) : (
                      <span className={memberPhotoFallbackClass} aria-hidden="true">
                        {getInitials(name)}
                      </span>
                    )}
                  </div>

                  <div className={memberBodyClass}>
                    <span className={memberIdClass}>{id}</span>
                    <h3 className={memberNameClass}>{name}</h3>

                    <p className={memberRoleClass}>
                      <Icon size={15} strokeWidth={2} className={memberIconClass} aria-hidden="true" />
                      {label}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className={carouselNavClass}>
            <button type="button" className={carouselArrowClass} onClick={goPrev} aria-label="Previous">
              <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
            </button>

            <div className={carouselDotsClass}>
              {team.map(({ id, name }, index) => (
                <button
                  key={id}
                  type="button"
                  className={`${carouselDotClass} ${index === active ? carouselDotActiveClass : carouselDotIdleClass}`}
                  onClick={() => goTo(index)}
                  aria-label={`View ${name}`}
                  aria-current={index === active}
                />
              ))}
            </div>

            <button type="button" className={carouselArrowClass} onClick={goNext} aria-label="Next">
              <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <section className={aboutSectionClass}>
        <div className={aboutHeadClass}>
          <span className={aboutHeadEyebrowClass}>Credits</span>
          <h2 className={aboutHeadTitleClass}>Project details</h2>
        </div>

        <div>
          {credits.map(({ label, value }) => (
            <div key={label} className={creditRowClass}>
              <span className={creditLabelClass}>{label}</span>
              <span className={creditValueClass}>{value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};