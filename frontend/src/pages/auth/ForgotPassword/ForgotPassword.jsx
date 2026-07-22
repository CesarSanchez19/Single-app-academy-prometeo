import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { forgotPassword } from "@services/auth.service.js";
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
  errorAlertClass,
  successAlertClass,
} from "@/styles/prometeoStyleClasses.js";

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError({ message: "Email is required" });
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setError({ message: "Please provide a valid email address" });
      return;
    }

    setIsLoading(true);

    try {
      await forgotPassword(email.trim());
      setSubmitted(true);
    } catch (err) {
      setError({
        message:
          err.message || "Could not process your request. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

          <form className={formClass} onSubmit={handleSubmit}>
            <div className={fieldClass}>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="Enter your email, e.g. john@company.com"
                autoComplete="email"
                disabled={isLoading || submitted}
              />
            </div>

            {error && (
              <div className={errorAlertClass} role="alert">
                {error.message}
              </div>
            )}

            {submitted && (
              <div className={`${successAlertClass} flex items-start gap-2`} role="alert">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                <span>
                  If an account with that email exists, we have sent a password recovery link.
                </span>
              </div>
            )}

            <button 
              type="submit" 
              className={`${submitButtonClass} ${isLoading || submitted ? "opacity-75 cursor-not-allowed" : ""}`}
              disabled={isLoading || submitted}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} strokeWidth={2} className="animate-spin" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail size={18} strokeWidth={2} aria-hidden="true" />
                  Send link
                </>
              )}
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
