import React from "react";
import { Link } from "react-router";
import google from "../assets/google.svg";
import git from "../assets/git.svg";
const Login = () => {
  return (
    <main class="flex flex-1 items-center h-screen justify-center p-6 bg-gradient-to-b from-blue-100 via-white to-blue-100 dark:from-navy-900 dark:via-background-dark dark:to-navy-900">
      <div class="layout-content-container flex flex-col w-full max-w-[480px] bg-white/70 dark:bg-background-dark/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 p-8">
        <div class="mb-4">
          <h1 class="text-navy-deep dark:text-white tracking-tight text-3xl font-bold leading-tight text-center pb-2">
            Welcome Back
          </h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm text-center">
            The best accommodation awaits you
          </p>
        </div>

        <div class="mb-6">
          <div class="flex border-b border-gray-200 dark:border-gray-700 px-4 gap-8 justify-center">
            <Link
              to="/Login"
              class="flex flex-col items-center justify-center border-b-2 border-primary text-navy-deep dark:text-white pb-3 pt-2"
              href="#"
            >
              <p class="text-sm font-bold leading-normal tracking-wide">
                Login
              </p>
            </Link>
            <Link
              to="/Register"
              class="flex flex-col items-center justify-center border-b-2 border-transparent text-gray-400 pb-3 pt-2 hover:text-navy-deep dark:hover:text-white transition-all"
              href="#"
            >
              <p class="text-sm font-bold leading-normal tracking-wide">
                Sign Up
              </p>
            </Link>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex flex-col w-full">
            <div className="flex justify-between items-center">
              <p class="text-navy-deep dark:text-gray-200 text-sm font-semibold leading-normal pb-2">
                Email Address
              </p>
            </div>
            <input
              class="form-input flex w-full rounded-lg text-navy-deep dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 h-12 placeholder:text-gray-400 p-4 text-sm font-normal"
              placeholder="name@luxetravel.com"
              type="email"
            />
          </div>
          <div class="flex flex-col w-full">
            <div class="flex justify-between items-center pb-2">
              <p class="text-navy-deep dark:text-gray-200 text-sm font-semibold leading-normal">
                Password
              </p>
              <a
                class="text-xs font-medium text-primary hover:underline"
                href="#"
              >
                Forgot password?
              </a>
            </div>
            <input
              class="form-input flex w-full rounded-lg text-navy-deep dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 h-12 placeholder:text-gray-400 p-4 text-sm font-normal"
              placeholder="••••••••"
              type="password"
            />
          </div>
        </div>

        <div class="mt-8">
          <Link to="/">
            <button class="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#0a192f] hover:bg-navy-deep/90 text-white text-sm font-bold transition-all shadow-lg">
              <span>Sign In</span>
            </button>
          </Link>
        </div>

        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-white/0 px-2 text-gray-400 backdrop-blur-sm">
              Or continue with
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button class="flex items-center justify-center gap-2 h-11 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white/60 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-gray-400 dark:hover:border-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 border-gg">
            <span class="text-lg">
              <img src={google} alt="Google" class="w-5 h-5" />
            </span>
            <span class="text-xs font-semibold text-navy-deep dark:text-white">
              Google
            </span>
          </button>
          <button class="flex items-center justify-center gap-2 h-11 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white/60 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-gray-400 dark:hover:border-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 border-gg">
            <span class="text-lg">
              <img src={git} alt="Github" class="w-5 h-5" />
            </span>
            <span class="text-xs font-semibold text-navy-deep dark:text-white">
              Github
            </span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Login;
