import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus, Loader2, Check, X } from "lucide-react";
import { register as registerService } from "@services/auth.service.js";
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
  passwordChecklistClass,
  passwordRuleClass,
  passwordRulePassClass,
  passwordRuleFailClass,
  successAlertClass,
  errorAlertClass,
} from "@/styles/prometeoStyleClasses.js";

const PASSWORD_RULES = [
  { key: "length", label: "At least 8 characters", test: (v) => v.length >= 8 },
  { key: "uppercase", label: "At least one uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { key: "number", label: "At least one number", test: (v) => /\d/.test(v) },
];

export const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const passwordChecks = useMemo(
    () => PASSWORD_RULES.map((rule) => ({ ...rule, passed: rule.test(password) })),
    [password]
  );

  const allPasswordRulesPassed = passwordChecks.every((r) => r.passed);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !lastname.trim() || !email.trim() || !password || !confirmPassword) {
      setError({ type: "validation", message: "All fields are required" });
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setError({ type: "validation", message: "Please provide a valid email address" });
      return;
    }

    if (!allPasswordRulesPassed) {
      setError({ type: "validation", message: "Password does not meet the requirements" });
      return;
    }

    if (password !== confirmPassword) {
      setError({ type: "validation", message: "Passwords do not match" });
      return;
    }

    setIsLoading(true);

    try {
      await registerService(name.trim(), lastname.trim(), email.trim(), password);
      setSuccess(true);
      setTimeout(() => navigate("/login", { replace: true }), 2500);
    } catch (err) {
      const code = err.code;
      if (code === "EMAIL_ALREADY_EXISTS") {
        setError({
          type: "conflict",
          message: "This email is already registered. Try logging in.",
        });
      } else if (code === "VALIDATION_ERROR") {
        setError({ type: "validation", message: err.message });
      } else {
        setError({
          type: "network",
          message: "Could not complete your registration. Please try again later.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className={pageClass}>
        <div className={backdropClass} aria-hidden="true" />
        <main className={mainClass}>
          <div className={cardClass}>
            <div className={introClass}>
              <span className={eyebrowClass}>Prometeo</span>
              <h1 className={titleClass}>Account created!</h1>
              <p className={descriptionClass}>
                Your account has been created successfully. You will be redirected to the
                login page in a moment.
              </p>
            </div>
            <div className={successAlertClass} role="status">
              Account created successfully
            </div>
            <Link
              to="/login"
              className={`${submitButtonClass} mt-5 no-underline text-center`}
            >
              Go to login
            </Link>
          </div>
        </main>
      </div>
    );
  }

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
              Create your user account to sign in to the system.
            </p>
          </div>

          <form className={formClass} onSubmit={handleSubmit}>
            <div className={fieldClass}>
              <label htmlFor="signup-name" className={labelClass}>
                Name(s)
              </label>
              <input
                type="text"
                id="signup-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="Enter your name(s), e.g. John Albert"
                autoComplete="given-name"
                disabled={isLoading}
              />
            </div>

            <div className={fieldClass}>
              <label htmlFor="signup-lastname" className={labelClass}>
                Lastname(s)
              </label>
              <input
                type="text"
                id="signup-lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className={inputClass}
                placeholder="Enter your lastname(s), e.g. Smith Doe"
                autoComplete="family-name"
                disabled={isLoading}
              />
            </div>

            <div className={fieldClass}>
              <label htmlFor="signup-email" className={labelClass}>
                Email
              </label>
              <input
                type="email"
                id="signup-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="Enter your email, e.g. john@company.com"
                autoComplete="email"
                disabled={isLoading}
              />
            </div>

            <div className={fieldClass}>
              <label htmlFor="signup-password" className={labelClass}>
                Password
              </label>
              <input
                type="password"
                id="signup-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="Create a password, e.g. SecurePass123!"
                autoComplete="new-password"
                disabled={isLoading}
              />
              {password.length > 0 && (
                <div className={passwordChecklistClass} aria-label="Password requirements">
                  {passwordChecks.map((rule) => (
                    <div
                      key={rule.key}
                      className={`${passwordRuleClass} ${
                        rule.passed ? passwordRulePassClass : passwordRuleFailClass
                      }`}
                    >
                      {rule.passed ? (
                        <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                      ) : (
                        <X size={13} strokeWidth={2.5} aria-hidden="true" />
                      )}
                      <span>{rule.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={fieldClass}>
              <label htmlFor="signup-confirm-password" className={labelClass}>
                Confirm password
              </label>
              <input
                type="password"
                id="signup-confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass}
                placeholder="Confirm your password, e.g. SecurePass123!"
                autoComplete="new-password"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className={errorAlertClass} role="alert">
                {error.message}
              </div>
            )}

            <button
              type="submit"
              className={`${submitButtonClass} ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2
                    size={18}
                    strokeWidth={2}
                    className="animate-spin"
                    aria-hidden="true"
                  />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus size={18} strokeWidth={2} aria-hidden="true" />
                  Create account
                </>
              )}
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
