import { useState, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, KeyRound, Loader2, Check, X } from "lucide-react";
import { resetPassword } from "@services/auth.service.js";
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
  errorAlertClass,
  successAlertClass,
} from "@/styles/prometeoStyleClasses.js";

const PASSWORD_RULES = [
  { key: "length", label: "At least 8 characters", test: (v) => v.length >= 8 },
  { key: "uppercase", label: "At least one uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { key: "number", label: "At least one number", test: (v) => /\d/.test(v) },
];

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

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

    if (!token) {
      setError({ message: "Invalid or missing recovery token." });
      return;
    }

    if (!password || !confirmPassword) {
      setError({ message: "Both fields are required." });
      return;
    }

    if (!allPasswordRulesPassed) {
      setError({ message: "Password does not meet the requirements." });
      return;
    }

    if (password !== confirmPassword) {
      setError({ message: "Passwords do not match." });
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => navigate("/login", { replace: true }), 3000);
    } catch (err) {
      setPassword("");
      setConfirmPassword("");
      
      const code = err.code;
      if (code === "TOKEN_EXPIRED") {
        setError({ message: "This link has expired. Please request a new one." });
      } else if (code === "TOKEN_USED") {
        setError({ message: "This link has already been used. Please request a new one if you need to reset your password." });
      } else if (code === "TOKEN_INVALID") {
        setError({ message: "Invalid or expired password reset link." });
      } else if (code === "VALIDATION_ERROR") {
        setError({ message: err.message });
      } else {
        setError({
          message: "Could not reset your password. Please try again later.",
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
              <h1 className={titleClass}>Password reset!</h1>
              <p className={descriptionClass}>
                Your password has been changed successfully. You will be redirected to the login page in a moment.
              </p>
            </div>
            <div className={successAlertClass} role="status">
              Password reset successfully
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
            <h1 className={titleClass}>Reset your password</h1>
            <p className={descriptionClass}>
              Enter your new password. Make sure it has at least 8 characters.
            </p>
          </div>

          <form className={formClass} onSubmit={handleSubmit}>
            <div className={fieldClass}>
              <label htmlFor="password" className={labelClass}>
                New password
              </label>
              <input
                type="password"
                id="password"
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
              <label htmlFor="confirm-password" className={labelClass}>
                Confirm password
              </label>
              <input
                type="password"
                id="confirm-password"
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
                  <Loader2 size={18} strokeWidth={2} className="animate-spin" aria-hidden="true" />
                  Resetting...
                </>
              ) : (
                <>
                  <KeyRound size={18} strokeWidth={2} aria-hidden="true" />
                  Reset password
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
