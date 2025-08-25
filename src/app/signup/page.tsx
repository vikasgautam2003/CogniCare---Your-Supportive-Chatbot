// app/signup/page.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignupPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.status === 201) {
        // Redirect to login page on successful signup
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.message || "Failed to create account.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a2a] p-4 text-white">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-gradient-to-r from-[#00f5d4] via-[#7b2ff7] to-[#00f5d4] p-1 shadow-2xl">
          <div className="rounded-xl bg-[#101031] p-8 md:p-10">
            <div className="text-center">
              <h1 className="ai-text text-3xl font-bold">
                Create Account
              </h1>
              <p className="mt-2 text-gray-400">Join CogniCare AI today.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-700 bg-gray-800/50 px-3 py-2 text-white placeholder-gray-500 shadow-sm focus:border-[#00f5d4] focus:outline-none focus:ring-1 focus:ring-[#00f5d4]"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-700 bg-gray-800/50 px-3 py-2 text-white placeholder-gray-500 shadow-sm focus:border-[#00f5d4] focus:outline-none focus:ring-1 focus:ring-[#00f5d4]"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-700 bg-gray-800/50 px-3 py-2 text-white placeholder-gray-500 shadow-sm focus:border-[#00f5d4] focus:outline-none focus:ring-1 focus:ring-[#00f5d4]"
                  placeholder="••••••••"
                />
              </div>

              {error && <p className="text-sm text-red-400 text-center">{error}</p>}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-[#00f5d4] to-[#7b2ff7] px-4 py-2 text-sm font-bold text-black transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>
              </div>

               <div className="text-center text-sm text-gray-400">
                  <p>
                    Already have an account?{' '}
                    <a href="/login" className="font-medium text-[#00f5d4] hover:text-[#00c4ab]">
                      Sign In
                    </a>
                  </p>
                </div>
            </form>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .ai-text {
          background: linear-gradient(90deg, #00f5d4, #7b2ff7, #00f5d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          animation: shine 3s linear infinite;
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </div>
  );
};

export default SignupPage;