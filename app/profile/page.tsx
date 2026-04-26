import Link from "next/link";
import {
  interventions,
  monthlySpending,
  savedPlumbers,
  user,
} from "@/lib/data";

const maxSpend = Math.max(...monthlySpending.map((item) => item.amount));

export default function ProfilePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-light-radial" />
      <main className="relative mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col gap-6 rounded-4xl border border-slate-200/80 bg-white/95 px-6 py-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-600">
              Mon espace
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Tableau de bord
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Suivez vos demandes, votre budget et retrouvez rapidement vos
              plombiers préférés.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-400 hover:bg-slate-100"
          >
            Retour à l’accueil
          </Link>
        </header>

        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-8">
            <div className="rounded-4xl border border-slate-200/80 bg-white p-6 shadow-xl transition duration-300 hover:-translate-y-1">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-sky-600">
                    Profil
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                    {user.name}
                  </h2>
                </div>
                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                  Note moyenne {user.rating} ★
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="mt-3 text-lg font-semibold text-slate-950">
                    {user.email}
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Adresse</p>
                  <p className="mt-3 text-lg font-semibold text-slate-950">
                    {user.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-4xl border border-slate-200/80 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  Dépenses
                </p>
                <p className="mt-4 text-3xl font-semibold text-slate-950">
                  {user.spent}
                </p>
              </div>
              <div className="rounded-4xl border border-slate-200/80 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  Demandes
                </p>
                <p className="mt-4 text-3xl font-semibold text-slate-950">
                  {user.requests}
                </p>
              </div>
              <div className="rounded-4xl border border-slate-200/80 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  Plombiers favoris
                </p>
                <p className="mt-4 text-3xl font-semibold text-slate-950">
                  {savedPlumbers.length}
                </p>
              </div>
            </div>

            <div className="rounded-4xl border border-slate-200/80 bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-sky-600">
                    Dernières interventions
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                    Historique
                  </h2>
                </div>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                  3 dernières
                </span>
              </div>
              <div className="mt-6 space-y-4">
                {interventions.map((intervention) => (
                  <div
                    key={intervention.date + intervention.plumber}
                    className="rounded-3xl border border-slate-200/80 bg-slate-50 p-5"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-950">
                          {intervention.service}
                        </p>
                        <p className="text-sm text-slate-500">
                          {intervention.plumber} · {intervention.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-slate-950">
                          {intervention.price}
                        </p>
                        <p className="text-sm text-slate-500">
                          {intervention.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-4xl border border-slate-200/80 bg-white p-6 shadow-xl transition duration-300 hover:-translate-y-1">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-600">
                Prochains rendez-vous
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                À venir
              </h2>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Maxime Leroy</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">
                    Aujourd’hui 14h-16h
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Clara Dubois</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">
                    Demain 09h-11h
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-4xl border border-slate-200/80 bg-white p-6 shadow-xl transition duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm uppercase tracking-[0.3em] text-sky-600">
                  Plombiers sauvegardés
                </p>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  {savedPlumbers.length}
                </span>
              </div>
              <div className="mt-6 space-y-4">
                {savedPlumbers.map((profile) => (
                  <div
                    key={profile.name}
                    className="rounded-3xl bg-slate-50 p-5"
                  >
                    <p className="text-sm font-semibold text-slate-950">
                      {profile.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {profile.specialty}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-3 text-sm text-slate-600">
                      <span>{profile.availability}</span>
                      <span className="font-semibold text-slate-950">
                        {profile.rate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-slate-200/80 bg-white p-6 shadow-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-600">
                Conseil
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Gérez vos interventions plus vite
              </h2>
              <p className="mt-4 text-slate-600">
                Enregistrez vos adresses et consultez les disponibilités pour
                réserver le plombier le plus proche dès que vous en avez besoin.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-10 rounded-4xl border border-slate-200/80 bg-white p-6 shadow-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-600">
                Dépenses mensuelles
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                Suivi des coûts
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              Graphique basé sur vos dernières interventions
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-5">
            {monthlySpending.map((item) => (
              <div
                key={item.month}
                className="flex flex-col items-center gap-3"
              >
                <div className="flex h-48 w-full items-end">
                  <div
                    className="w-full rounded-3xl bg-slate-950"
                    style={{ height: `${(item.amount / maxSpend) * 100}%` }}
                  />
                </div>
                <p className="text-sm font-semibold text-slate-950">
                  {item.month}
                </p>
                <p className="text-sm text-slate-500">{item.amount}€</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
