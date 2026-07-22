import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus } from "lucide-react";
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
  labelClass,
  inputClass,
  linkAccentClass,
  submitButtonClass,
  footerClass,
  footerTextClass,
} from "@/styles/prometeoStyleClasses.js";

export const Signup = () => {
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
          <span>Back to home</span>
        </button>
      </header>

      <main className={mainClass}>
        <div className={cardClass}>
          <div className={introClass}>
            <span className={eyebrowClass}>Prometeo</span>
            <h1 className={titleClass}>Create your account</h1>
            <p className={descriptionClass}>
              Register your business to start managing sessions, clients and
              employees.
            </p>
          </div>

          <form className={formClass} onSubmit={(e) => e.preventDefault()}>
            <div className={fieldClass}>
              <label htmlFor="name" className={labelClass}>
                Full name
              </label>
              <input
                type="text"
                id="name"
                className={inputClass}
                placeholder="Your name"
                autoComplete="name"
              />
            </div>

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
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <input
                type="password"
                id="password"
                className={inputClass}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>

            <div className={fieldClass}>
              <label htmlFor="confirm-password" className={labelClass}>
                Confirm password
              </label>
              <input
                type="password"
                id="confirm-password"
                className={inputClass}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className={submitButtonClass}>
              <UserPlus size={18} strokeWidth={2} aria-hidden="true" />
              Create account
            </button>
          </form>

          <footer className={footerClass}>
            <p className={footerTextClass}>
              Already have an account?{" "}
              <Link to="/login" className={linkAccentClass}>
                Log in
              </Link>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};
