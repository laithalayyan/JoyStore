import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useLanguage } from "../../../shared/hooks/LanguageContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double submit

    setIsSubmitting(true);
    setMessages([]);
    console.log("[SignInForm] Submitting credentials:", credentials);

    const response = await login(credentials.email, credentials.password);
    console.log("[SignInForm] Received response from login:", response);
    //const { success, error, role } = response;

    if (response.success && response.user) {
      // Check response.user for role
      setMessages([{ severity: "success", content: t.loginSuccess }]); // Use your translation key
      console.log(
        "[SignInForm] Login successful. User role from response:",
        response.user.role
      );

      setTimeout(() => {
        const fromPath = location.state?.from?.pathname;
        const roleFromResponse = response.user?.role;
        let finalRedirectPath = "/"; // Default for non-admin

        console.log(
          "[SignInForm] Timeout: fromPath:",
          fromPath,
          "roleFromResponse:",
          roleFromResponse
        );

        if (roleFromResponse === "admin") {
          // Admin: go to /admin, or fromPath if it was an admin page
          finalRedirectPath =
            fromPath && fromPath.startsWith("/admin") ? fromPath : "/admin";
        } else if (fromPath) {
          // User: go to fromPath if it exists
          finalRedirectPath = fromPath;
        }
        // Else (user, no fromPath): defaults to "/"

        console.log("[SignInForm] Navigating to:", finalRedirectPath);
        navigate(finalRedirectPath, { replace: true });
      }, 1000); // Shorter timeout, 1500ms is quite long for user to wait
    } else {
      const errorKey = response.error || "invalidCredentials";
      const errorMessage =
        t.errors[errorKey as keyof typeof t.errors]?.toString() ||
        t.errors.invalidCredentials.toString();

      setMessages([{ severity: "error", content: errorMessage }]);
      setIsSubmitting(false); // Only set false on error, success navigates away
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
      <div className="space-y-1 text-right">
        <label
          htmlFor="email"
          className="text-sm text-right font-medium text-gray-700 transition-colors duration-300 dark:text-gray-300"
        >
          {"البريد الالكتروني"}
        </label>
        <InputText
          id="email"
          className="text-right w-full focus:ring-2 ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:border-primary-400"
          pt={{
            root: {
              className:
                "text-right border-gray-300 border-2 dark:border-gray-600",
            },
          }}
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>

      <div className="space-y-1 text-right">
        <label
          htmlFor="password"
          className="text-sm text-right font-medium text-gray-700 transition-colors duration-300 dark:text-gray-300"
        >
          {"كلمة المرور"}
        </label>
        <InputText
          id="password"
          type="password"
          className="w-full text-right focus:ring-2 ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:border-primary-400"
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
        label={"تسجيل الدخول"}
        type="submit"
        className="w-full !bg-orange-500 hover:!bg-orange-600 !text-white !font-bold !py-3 !rounded-lg !transition-all !duration-300 !border-none"
        pt={{
          root: { className: "!shadow-sm hover:!shadow-md" },
        }}
      />

      <div className="mt-4 text-center">
        <span className="text-gray-600 dark:text-gray-300 text-sm">
          {"لا تملك حساباً؟"}{" "}
          <Link
            to="/signup"
            className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-medium underline underline-offset-4 transition-colors"
          >
            {"التسجيل"}
          </Link>
        </span>
      </div>
    </form>
  );
};
