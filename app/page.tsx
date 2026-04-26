"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { availableReasons, plumbers } from "@/lib/data";

export default function Home() {
  const [selectedId, setSelectedId] = useState(plumbers[0].id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [problem, setProblem] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const photoPreview = useMemo(
    () => (selectedPhoto ? URL.createObjectURL(selectedPhoto) : null),
    [selectedPhoto]
  );

  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const selected =
    plumbers.find((plumber) => plumber.id === selectedId) ?? plumbers[0];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setName("");
    setPhone("");
    setAddress("");
    setProblem("");
    setSelectedPhoto(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-light-radial" />
      <main className="relative mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-5 rounded-4xl border border-slate-200/80 bg-white/90 px-6 py-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-sky-600">
              Nova Intervention
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Réservez un plombier proche en quelques clics.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Un parcours agréable, mobile-first et fluide pour choisir votre
              intervention, puis accéder à votre dashboard.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Se connecter
            </Link>
            <Link
              href="/profile"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-400 hover:bg-slate-100"
            >
              Voir le dashboard
            </Link>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {availableReasons.map((reason) => (
                <div
                  key={reason}
                  className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {reason}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-4xl border border-slate-200/80 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-sky-600">
                    Accueil
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                    Plombiers proches, transparence totale.
                  </h2>
                </div>
                <span className="rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">
                  4 plombiers disponibles maintenant
                </span>
              </div>
              <p className="mt-4 text-slate-600">
                Comparez spécialités, tarifs et disponibilités, puis passez à
                l’étape suivante en un seul geste.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-4xl bg-slate-950 text-white shadow-[0_32px_120px_rgba(15,23,42,0.18)]">
            <Image
              src="/plombier.png"
              alt="Plombier en intervention"
              className="h-96 w-full object-cover"
              width={1200}
              height={720}
              unoptimized
            />
            <div className="space-y-4 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
                Service expert
              </p>
              <h2 className="text-3xl font-semibold">
                Dépannage express et service premium
              </h2>
              <p className="text-slate-300">
                Un univers clair et moderne pour commander un plombier, gérer
                vos interventions et visualiser vos dépenses.
              </p>
            </div>
          </div>
        </section>

        <section id="plumbers" className="mt-14">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-600">
                Plombiers disponibles
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                Choisissez le meilleur professionnel à proximité
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Sélectionnez un profil pour voir ses disponibilités, tarif et avis
              avant de réserver.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {plumbers.map((plumber) => (
              <button
                key={plumber.id}
                type="button"
                onClick={() => setSelectedId(plumber.id)}
                className={`group rounded-[1.75rem] border p-6 text-left transition duration-300 ${
                  selectedId === plumber.id
                    ? "border-sky-500/30 bg-sky-50 shadow-lg"
                    : "border-slate-200/80 bg-white hover:-translate-y-1 hover:shadow-xl"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-slate-950">
                      {plumber.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {plumber.specialty}
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-900">
                    {plumber.distance}
                  </span>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-3xl bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                      Tarif
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-950">
                      {plumber.rate}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                      Disponible
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-950">
                      {plumber.nextAvailable}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                      Éval.
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-950">
                      {plumber.rating.toFixed(1)} ★
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-4xl border border-slate-200/80 bg-white p-6 shadow-xl transition duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-sky-600">
                  Détails du plombier
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                  {selected.name}
                </h2>
              </div>
              <span className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
                {selected.completed}% interventions réussies
              </span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Spécialité</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                  {selected.specialty}
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Expérience</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                  {selected.experience}
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Distance</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                  {selected.distance}
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Taux horaire</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                  {selected.rate}
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Prochaine dispo</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                  {selected.nextAvailable}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-3xl bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">
                Rapide
              </span>
              <span className="rounded-3xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                Dispo mobile
              </span>
              <span className="rounded-3xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                Tarifs transparents
              </span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex min-w-45 items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Réserver ce plombier
              </button>
              <Link
                href="/profile"
                className="inline-flex min-w-45 items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-400 hover:bg-slate-100"
              >
                Voir mon dashboard
              </Link>
            </div>
          </div>

          <section id="booking-form" className="rounded-4xl border border-slate-200/80 bg-white p-6 shadow-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Réservation</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-950">Formulaire de demande</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                {selected.name}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  Nom complet
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    placeholder="Jean Dupont"
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  Téléphone
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                    placeholder="06 12 34 56 78"
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-700 sm:col-span-2">
                  Adresse du chantier
                  <input
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    required
                    placeholder="12 rue de la République, 75011 Paris"
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm text-slate-700">
                Description du problème
                <textarea
                  value={problem}
                  onChange={(event) => setProblem(event.target.value)}
                  required
                  rows={4}
                  placeholder="Fuite sous l'évier, problème de ballon d'eau chaude..."
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  Photo du chantier
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => setSelectedPhoto(event.target.files?.[0] ?? null)}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                  />
                </label>
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                  {photoPreview ? (
                    <Image
                      src={photoPreview}
                      alt="Aperçu de la photo"
                      width={400}
                      height={220}
                      className="mt-3 h-32 w-full rounded-3xl object-cover"
                      unoptimized
                    />
                  ) : (
                    "Ajoutez une photo avant / pendant l’intervention si possible."
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
                >
                  Envoyer la demande
                </button>
                {submitted ? (
                  <p className="rounded-3xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    Demande envoyée ! Un plombier vous recontactera bientôt.
                  </p>
                ) : null}
              </div>
            </form>
          </section>

          <div className="rounded-4xl border border-slate-200/80 bg-white p-6 shadow-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-600">
              Votre tableau de bord
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Budget et suivi
            </h2>
            <p className="mt-4 text-slate-600">
              Votre espace personnel montre vos dernières dépenses, vos
              prochaines interventions et votre adresse de facturation.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Dépenses ce mois</p>
                <p className="mt-3 text-3xl font-semibold text-slate-950">
                  1 420€
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Demandes envoyées</p>
                <p className="mt-3 text-3xl font-semibold text-slate-950">5</p>
              </div>
            </div>
            <div className="mt-8 rounded-[1.75rem] bg-slate-950 p-6 text-white shadow-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
                Conseil
              </p>
              <p className="mt-3 text-base leading-7 text-slate-100">
                En cas d’urgence, choisissez un plombier avec une disponibilité
                le jour même et un bon ratio qualité/prix.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
