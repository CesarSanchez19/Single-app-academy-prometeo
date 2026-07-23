import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn, Loader2 } from "lucide-react";
import { useAuth } from "@hooks/useAuth.js";
import { login as loginService } from "@services/auth.service.js";
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
  const { login: setAuthContext } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError({ type: "validation", message: "All fields are required" });
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setError({ type: "validation", message: "Invalid email format" });
      return;
    }

    setIsLoading(true);

    try {
      const data = await loginService(email, password);

      setAuthContext({ accessToken: data.accessToken, user: data.user });

      navigate("/dashboard/home", { replace: true });
    } catch (err) {
      const code = err.code;
      if (code === "INVALID_CREDENTIALS") {
        setError({ type: "credentials", message: "Invalid email or password" });
      } else if (code === "ACCOUNT_SUSPENDED") {
        setError({
          type: "suspended",
          message: "Your account is suspended. Contact an administrator.",
        });
      } else {
        setError({
          type: "network",
          message: "Could not connect to server. Please try again later.",
        });
      }
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
            <h1 className={titleClass}>Log in to your account</h1>
            <p className={descriptionClass}>
              Enter your credentials to access your active sessions.
            </p>
          </div>

          <form className={formClass} onSubmit={handleSubmit}>
            <div className={fieldClass}>
              <label htmlFor="email" className={labelClass}>
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="Enter your email, e.g. john@company.com"
                autoComplete="email"
                disabled={isLoading}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="Enter your password, e.g. SecurePass123!"
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div
                className={`text-[13px] font-medium p-3 rounded-md ${
                  error.type === "suspended"
                    ? "bg-amber-50 text-amber-800 border border-amber-200"
                    : "bg-red-50 text-red-600 border border-red-100"
                }`}
                role="alert"
              >
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
                  Loading...
                </>
              ) : (
                <>
                  <LogIn size={18} strokeWidth={2} aria-hidden="true" />
                  Log in
                </>
              )}
            </button>
          </form>

          <footer className={footerClass}>
            <p className={footerTextClass}>
              Don't have an account?{" "}
              <Link to="/signup" className={linkAccentClass}>
                Create account
              </Link>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};
