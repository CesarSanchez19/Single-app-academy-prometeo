import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn } from "lucide-react";
import {
  pageClass,
  backdropClass,
  headerClass,
  backButtonClass,
  mainClass,
  cardClass,
  introClass,
  eyebrowClass,
  titleClass,
  descriptionClass,
  formClass,
  fieldClass,
  fieldRowClass,
  labelClass,
  inputClass,
  linkClass,
  linkAccentClass,
  submitButtonClass,
  footerClass,
  footerTextClass,
} from "@/styles/prometeoStyleClasses.js";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div className={pageClass}>
      <div className={backdropClass} aria-hidden="true" />

      <header className={headerClass}>
        <button
          type="button"
          onClick={() => navigate("/")}
          className={backButtonClass}
        >
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
          <span>Volver al inicio</span>
        </button>
      </header>

      <main className={mainClass}>
        <div className={cardClass}>
          <div className={introClass}>
            <span className={eyebrowClass}>Prometeo</span>
            <h1 className={titleClass}>Log in to your account</h1>
            <p className={descriptionClass}>
              Enter your credentials to access your active sessions.
            </p>
          </div>

          <form className={formClass} onSubmit={(e) => e.preventDefault()}>
            <div className={fieldClass}>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                type="email"
                id="email"
                className={inputClass}
                placeholder="your@email.com"
                autoComplete="email"
              />
            </div>

            <div className={fieldClass}>
              <div className={fieldRowClass}>
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>
                <Link to="/forgot-password" className={linkClass}>
                  Forgot your password?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                className={inputClass}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className={submitButtonClass}>
              <LogIn size={18} strokeWidth={2} aria-hidden="true" />
              Log in
            </button>
          </form>

          <footer className={footerClass}>
            <p className={footerTextClass}>
              Don't have an account?{" "}
              <Link to="/properties/signup" className={linkAccentClass}>
                Create account
              </Link>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};
