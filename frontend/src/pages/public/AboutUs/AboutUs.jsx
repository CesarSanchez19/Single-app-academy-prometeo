import {
  pageCardClass,
  introClass,
  eyebrowClass,
  titleClass,
  descriptionClass,
  primaryButtonInlineClass,
} from '@/styles/prometeoStyleClasses.js';

export const AboutUs = () => {
  return (
    <div className={pageCardClass}>
      <div className={introClass}>
        <span className={eyebrowClass}>Prometeo</span>
        <h1 className={titleClass}>Nosotros</h1>
        <p className={descriptionClass}>
          Estamos construyendo la plataforma para academias que quieren operar con
          claridad: menos fricción administrativa, más tiempo para enseñar.
        </p>
      </div>

      <button type="button" className={primaryButtonInlineClass}>
        Conocer el equipo
      </button>
    </div>
  );
};
