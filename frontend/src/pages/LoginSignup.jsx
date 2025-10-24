import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import logo from "../../public/Logo.png";
import { loginUser, registerUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function LoginSignup() {
  const [isSignIn, setIsSignIn] = useState(
    sessionStorage.getItem("isSignIn") === "true" ? true : false
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/todolist", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignIn) {
        console.log("Sign in attempt:", { email, password });
        const data = {
          email: email,
          password: password,
        };
        const response = await loginUser(data);
        console.log("Login successful:", response);
        localStorage.setItem("token", response.accessToken);
        navigate("/todolist", { replace: true });
      } else {
        console.log("Sign up attempt:", {
          name,
          email,
          password,
          confirmPassword,
        });

        if (password !== confirmPassword) {
          setPasswordError("Passwords do not match");
          return;
        }
        const data = {
          name: name,
          email: email,
          password: password,
        };

        const response = await registerUser(data);
        console.log("Registration successful:", response);
        togglePage();
      }
    } catch (error) {
      console.error("Auth error:", err);
      alert(err.message || "Something went wrong. Please try again.");
    }
  };

  const togglePage = () => {
    sessionStorage.setItem("isSignIn", !isSignIn);
    setIsSignIn(!isSignIn);
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <img src={logo} alt="Logo" className=" w-[25%]" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isSignIn ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-500">
              {isSignIn
                ? "Sign in to continue to your account"
                : "Sign up to get started"}
            </p>
          </div>
          <div className="space-y-4">
            {!isSignIn && (
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {!isSignIn && (
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (password !== e.target.value) {
                        setPasswordError("Passwords do not match");
                      } else {
                        setPasswordError("");
                      }
                    }}
                    placeholder="Confirm your password"
                    className={`w-full pl-10 pr-12 py-3 border ${
                      passwordError ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 ${
                      passwordError
                        ? "focus:ring-red-500"
                        : "focus:ring-indigo-500"
                    } focus:border-transparent outline-none transition-all duration-200`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {isSignIn ?? (
              <div className="flex justify-end">
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-black to-black text-white py-3 rounded-lg font-semibold hover:from-gray-900 hover: to-gray-900 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isSignIn ? "Sign In" : "Create Account"}
            </button>
          </div>

          <p className="text-center text-sm text-gray-600">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={togglePage}
              className="text-indigo-600 hover:text-indigo-700 font-semibold "
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
