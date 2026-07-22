import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
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

export const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className={pageClass}>
      <div className={backdropClass} aria-hidden="true" />

      <header className={headerClass}>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className={backButtonClass}
        >
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
          <span>Back to login</span>
        </button>
      </header>

      <main className={mainClass}>
        <div className={cardClass}>
          <div className={introClass}>
            <span className={eyebrowClass}>Prometeo</span>
            <h1 className={titleClass}>Recover your password</h1>
            <p className={descriptionClass}>
              Enter your email and we will send you a link to reset your password.
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
                placeholder="Enter your email, e.g. john@company.com"
                autoComplete="email"
              />
            </div>

            <button type="submit" className={submitButtonClass}>
              <Mail size={18} strokeWidth={2} aria-hidden="true" />
              Send link
            </button>
          </form>

          <footer className={footerClass}>
            <p className={footerTextClass}>
              Forgot your password?{" "}
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
