import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useLanguage } from "../../../shared/hooks/LanguageContext";
import { Link } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/AuthContext";
import { useState } from "react";
import { Message } from "primereact/message";

export const SignUpForm = () => {
  const { t } = useLanguage();
  const { signup } = useAuth();
  const [messages, setMessages] = useState<
    Array<{ severity: string; content: string }>
  >([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessages([]);
    const { success, error } = await signup({ ...formData, role: "user" });

    if (success) {
      setMessages([{ severity: "success", content: t.signupSuccess }]);
      // Redirect logic
    } else {
      const errorMessage = {
        "email-exists": t.errors.emailExists.toString(),
        "password-too-short": t.errors.passwordTooShort.toString(),
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
      <div className="space-y-1 text-right">
        <label className="text-sm font-medium text-gray-700 transition-colors duration-300 dark:text-gray-300">
          {"الاسم"}
        </label>
        <InputText
          id="name"
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
          //placeholder={t.namePlaceholder}
          className="w-full focus:ring-2 ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:border-primary-400"
          pt={{
            root: {
              className: "border-gray-300 border-2 dark:border-gray-600",
            },
          }}
        />
      </div>

      <div className="space-y-1 text-right">
        <label
          htmlFor="email"
          className="text-sm font-medium text-gray-700 transition-colors duration-300 dark:text-gray-300"
        >
          {"البريد الالكتروني"}
        </label>
        <InputText
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full focus:ring-2 ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:border-primary-400"
          pt={{
            root: {
              className: "border-gray-300 border-2 dark:border-gray-600",
            },
          }}
        />
      </div>

      <div className="space-y-1 text-right">
        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-700 transition-colors duration-300 dark:text-gray-300"
        >
          {"كلمة المرور"}
        </label>
        <InputText
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
            if (e.target.value.length > 0) setMessages([]);
          }}
          required
          className="w-full focus:ring-2 border-2 ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:border-primary-400"
          pt={{
            root: { className: "border-gray-300 dark:border-gray-600" },
          }}
        />
      </div>

      {/* {error && <div className="text-red-500 text-sm">{error}</div>} */}

      <Button
        label={"التسجيل"}
        type="submit"
        className="w-full !bg-orange-500 hover:!bg-orange-600 !text-white !font-bold !py-3 !rounded-lg !transition-all !duration-300 !border-none"
        pt={{
          root: { className: "!shadow-sm hover:!shadow-md" },
        }}
      />

      <div className="mt-4 text-center">
        <span className="text-gray-600 dark:text-gray-300 text-sm">
          {"هل لديك حساب بالفعل؟"}{" "}
          <Link
            to="/signin"
            className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-medium underline underline-offset-4 transition-colors"
          >
            {"تسجيل الدخول"}
          </Link>
        </span>
      </div>
    </form>
  );
};
