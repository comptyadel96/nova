"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authUser } from "@/lib/data";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("nova-auth") === "true"
    ) {
      router.replace("/profile");
    }
  }, [router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email === authUser.email && password === authUser.password) {
      window.localStorage.setItem("nova-auth", "true");
      router.push("/profile");
      return;
    }

    setError("Email ou mot de passe incorrect.");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-light-radial" />
      <main className="relative mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5 py-12 sm:px-6 lg:px-8">
        <div className="rounded-4xl border border-slate-200/80 bg-white p-8 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-600">
              Connexion
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
              Accédez à votre dashboard Nova
            </h1>
            <p className="text-base leading-7 text-slate-600">
              Connectez-vous avec votre email et mot de passe pour retrouver vos
              interventions et vos plombiers favoris.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div className="grid gap-5">
              <label className="space-y-2 text-sm text-slate-700">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  placeholder="hello@nova.fr"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                Mot de passe
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  placeholder="********"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                />
              </label>
            </div>

            {error ? (
              <p className="rounded-3xl bg-rose-50 p-4 text-sm text-rose-700">
                {error}
              </p>
            ) : null}

            <button className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Se connecter
            </button>

            <p className="text-sm text-slate-600">
              Utilisez{" "}
              <span className="font-semibold text-slate-950">
                hello@nova.fr
              </span>{" "}
              /{" "}
              <span className="font-semibold text-slate-950">plomberie123</span>{" "}
              pour tester.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
