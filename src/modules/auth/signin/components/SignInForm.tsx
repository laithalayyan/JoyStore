import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useLanguage } from "../../../shared/hooks/LanguageContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../shared/hooks/AuthContext";
import { Message } from "primereact/message";

export const SignInForm = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const [messages, setMessages] = useState<
    Array<{ severity: string; content: string }>
  >([]);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessages([]);
    const response = await login(credentials.email, credentials.password);
    const { success, error, role } = response;

    if (success) {
      setMessages([{ severity: "success", content: t.loginSuccess }]);
      // Redirect logic
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1500);
    } else {
      const errorMessage = {
        "email-not-found": t.errors.emailNotFound.toString(),
        "wrong-password": t.errors.wrongPassword.toString(),
        // Add more error mappings as needed
      }[error || "invalidCredentials"];

      setMessages([
        {
          severity: "error",
          content: errorMessage || t.errors.invalidCredentials.toString(),
        },
      ]);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {messages.map((msg, index) => (
        <Message
          key={index}
          severity={msg.severity as "success" | "info" | "warn" | "error"}
          text={msg.content}
          className="w-full"
        />
      ))}
      <div className="space-y-1">
        <label
          htmlFor="email"
          className="text-sm font-medium text-gray-700 transition-colors duration-300 dark:text-gray-300"
        >
          {t.email}
        </label>
        <InputText
          id="email"
          className="w-full focus:ring-2 ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:border-primary-400"
          pt={{
            root: {
              className: "border-gray-300 border-2 dark:border-gray-600",
            },
          }}
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-700 transition-colors duration-300 dark:text-gray-300"
        >
          {t.password}
        </label>
        <InputText
          id="password"
          type="password"
          className="w-full focus:ring-2 ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:border-primary-400"
          pt={{
            root: {
              className: "border-gray-300 border-2 dark:border-gray-600",
            },
          }}
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </div>

      {/* {error && <div className="text-red-500 text-sm">{error}</div>} */}

      <Button
        label={t.signIn}
        type="submit"
        className="w-full !bg-orange-500 hover:!bg-orange-600 !text-white !font-bold !py-3 !rounded-lg !transition-all !duration-300 !border-none"
        pt={{
          root: { className: "!shadow-sm hover:!shadow-md" },
        }}
      />

      <div className="mt-4 text-center">
        <span className="text-gray-600 dark:text-gray-300 text-sm">
          {t.dontHaveAccount}{" "}
          <Link
            to="/signup"
            className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-medium underline underline-offset-4 transition-colors"
          >
            {t.signUp}
          </Link>
        </span>
      </div>
    </form>
  );
};
