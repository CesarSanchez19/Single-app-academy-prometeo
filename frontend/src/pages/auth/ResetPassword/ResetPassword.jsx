import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, KeyRound } from "lucide-react";
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

export const ResetPassword = () => {
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
          <span>Volver al inicio de sesión</span>
        </button>
      </header>

      <main className={mainClass}>
        <div className={cardClass}>
          <div className={introClass}>
            <span className={eyebrowClass}>Prometeo</span>
            <h1 className={titleClass}>Reset your password</h1>
            <p className={descriptionClass}>
              Enter your new password. Make sure it has at least 8 characters.
            </p>
          </div>

          <form className={formClass} onSubmit={(e) => e.preventDefault()}>
            <div className={fieldClass}>
              <label htmlFor="password" className={labelClass}>
                New password
              </label>
              <input
                type="password"
                id="password"
                className={inputClass}
                placeholder="Create a password, e.g. SecurePass123!"
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
                placeholder="Confirm your password, e.g. SecurePass123!"
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className={submitButtonClass}>
              <KeyRound size={18} strokeWidth={2} aria-hidden="true" />
              Reset password
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
