import { useState, useEffect } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { auth } from "../../../firebase"; // import Firebase auth
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"; // import signIn and onAuthStateChanged functions
import { useNavigate } from "react-router-dom";

export default function LoginAdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

  const navigate = useNavigate();

  // Check authentication status on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/admin"); // Redirect to /admin if user is already logged in
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin"); // Redirect to /admin on successful login
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign In
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password to sign in
        </Typography>
        {error && (
          <Typography className="text-red-500 mb-4">{error}</Typography>
        )}
        <form onSubmit={handleSignIn} className="mx-auto max-w-[24rem] text-left">
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Your Email
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Handle email input
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
            </label>
            <Input
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Handle password input
              icon={
                <i onClick={togglePasswordVisibility}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
          </div>
          <Button type="submit" color="gray" size="lg" className="mt-6" fullWidth>
            sign in
          </Button>
        </form>
      </div>
    </section>
  );
}
