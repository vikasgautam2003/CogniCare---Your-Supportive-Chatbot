// // app/login/page.tsx

// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";

// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     if (!email || !password) {
//       setError("Please fill in both fields.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch("/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (res.ok) {
       
//         router.push("/dashboard");
//       } else {
//         const data = await res.json();
//         setError(data.message || "Failed to login. Please check your credentials.");
//       }
//     } catch (error) {
//       setError("An unexpected error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-[#0a0a2a] p-4 text-white">
//       <div className="w-full max-w-md">
 
//         <div className="rounded-2xl bg-gradient-to-r from-[#00f5d4] via-[#7b2ff7] to-[#00f5d4] p-1 shadow-2xl">
       
//           <div className="rounded-xl bg-[#101031] p-8 md:p-10">
//             <div className="text-center">
//               <h1 className="ai-text text-3xl font-bold">
//                 CogniCare AI
//               </h1>
//               <p className="mt-2 text-gray-400">Welcome back, please login to your account.</p>
//             </div>

//             <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//               <div>
//                 <label htmlFor="email" className="text-sm font-medium text-gray-300">
//                   Email Address
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="mt-2 w-full rounded-md border border-gray-700 bg-gray-800/50 px-3 py-2 text-white placeholder-gray-500 shadow-sm focus:border-[#00f5d4] focus:outline-none focus:ring-1 focus:ring-[#00f5d4]"
//                   placeholder="you@example.com"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="password"
//                   className="text-sm font-medium text-gray-300"
//                 >
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="mt-2 w-full rounded-md border border-gray-700 bg-gray-800/50 px-3 py-2 text-white placeholder-gray-500 shadow-sm focus:border-[#00f5d4] focus:outline-none focus:ring-1 focus:ring-[#00f5d4]"
//                   placeholder="••••••••"
//                 />
//               </div>

//               {error && <p className="text-sm text-red-400 text-center">{error}</p>}

//               <div>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="group relative flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-[#00f5d4] to-[#7b2ff7] px-4 py-2 text-sm font-bold text-black transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50"
//                 >
//                   {isLoading ? "Signing In..." : "Sign In"}
//                 </button>
//               </div>

//              <div className="flex flex-col items-center justify-center space-y-2 text-center text-sm">
//                 <a href="#" className="font-medium text-[#00f5d4] hover:text-[#00c4ab]">
//                     Forgot your password?
//                 </a>
//                 <p className="text-gray-400">
//                     Don't have an account?{' '}
//                     <a href="/signup" className="font-medium text-[#00f5d4] hover:text-[#00c4ab]">
//                     Sign Up
//                     </a>
//                 </p>
//                 </div>
//             </form>
//           </div>
//         </div>
//       </div>
     
//       <style jsx global>{`
//         .ai-text {
//           background: linear-gradient(90deg, #00f5d4, #7b2ff7, #00f5d4);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-size: 200% auto;
//           animation: shine 3s linear infinite;
//         }

//         @keyframes shine {
//           to {
//             background-position: 200% center;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LoginPage;




// app/login/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please fill in both fields.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
       
        localStorage.setItem("token", data.token); // assuming API sends { token }
        router.push("/chatbot");
      } else {
        setError(data.message || "Failed to login. Please check your credentials.");
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
              <h1 className="ai-text text-3xl font-bold">CogniCare AI</h1>
              <p className="mt-2 text-gray-400">
                Welcome back, please login to your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
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
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-700 bg-gray-800/50 px-3 py-2 text-white placeholder-gray-500 shadow-sm focus:border-[#00f5d4] focus:outline-none focus:ring-1 focus:ring-[#00f5d4]"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 text-center">{error}</p>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-[#00f5d4] to-[#7b2ff7] px-4 py-2 text-sm font-bold text-black transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
              </div>

              <div className="flex flex-col items-center justify-center space-y-2 text-center text-sm">
                <a
                  href="#"
                  className="font-medium text-[#00f5d4] hover:text-[#00c4ab]"
                >
                  Forgot your password?
                </a>
                <p className="text-gray-400">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="font-medium text-[#00f5d4] hover:text-[#00c4ab]"
                  >
                    Sign Up
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

export default LoginPage;
