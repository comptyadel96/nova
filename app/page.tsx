"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { availableReasons, plumbers } from "@/lib/data";

type BookingStep = "initial" | "estimation" | "contact";

export default function Home() {
  const [step, setStep] = useState<BookingStep>("initial");
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [selectedPlumberId, setSelectedPlumberId] = useState(plumbers[0].id);
  const [analysis, setAnalysis] = useState<{
    interventionType: string;
    estimate: string;
  } | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const photoPreview = useMemo(
    () => (selectedPhoto ? URL.createObjectURL(selectedPhoto) : null),
    [selectedPhoto],
  );

  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const selected =
    plumbers.find((plumber) => plumber.id === selectedPlumberId) ?? plumbers[0];

  const handlePhotoCapture = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      return;
    }

    setSelectedPhoto(file);
    setAnalysis(null);
    setAnalysisError(null);
    setAnalysisLoading(true);

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await fetch("/api/vision", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Impossible d'analyser l'image.");
      }

      setAnalysis({
        interventionType:
          result.interventionType || "Intervention a confirmer",
        estimate: result.estimate || "45EUR",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Une erreur est survenue pendant l'analyse.";
      setAnalysisError(message);
      setAnalysis({
        interventionType: "Intervention a verifier",
        estimate: "45EUR",
      });
    } finally {
      setAnalysisLoading(false);
      const randomPlumber = plumbers[Math.floor(Math.random() * plumbers.length)];
      setSelectedPlumberId(randomPlumber.id);
      setStep("estimation");
    }
  };

  const handleSubmitContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setPhone("");
      setAddress("");
      setSelectedPhoto(null);
      setStep("initial");
    }, 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-light-radial" />
      <main className="relative mx-auto max-w-2xl px-5 py-8 sm:px-6 lg:px-8">
        <header className="mb-12 flex flex-col gap-5 rounded-4xl border border-slate-200/80 bg-white/90 px-6 py-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-sky-600">
              Nova Intervention
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Reservez un depannage plomberie.
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              3 etapes simples : photo • estimation • confirmation.
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
              Dashboard
            </Link>
          </div>
        </header>

        {/* STEP 1: INITIAL - Take Photo */}
        {step === "initial" && (
          <section className="space-y-6">
            <div className="rounded-4xl border border-slate-200/80 bg-white p-8 shadow-xl">
              <div className="mb-8 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-sky-600">
                  Etape 1 / 3
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                  Prenez une photo
                </h2>
                <p className="mt-4 text-slate-600">
                  Montrez-nous votre probleme en une photo. Nous analyserons et
                  proposerons une estimation.
                </p>
              </div>

              <label className="group block cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoCapture}
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 py-16 transition group-hover:border-sky-400 group-hover:bg-sky-50/30">
                  <svg
                    className="h-16 w-16 text-sky-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-slate-950">
                      Cliquez pour photographier
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      ou glissez une image
                    </p>
                  </div>
                </div>
              </label>
            </div>

            <div className="rounded-4xl border border-slate-200/80 bg-white p-6 shadow-lg">
              <p className="text-sm font-semibold text-slate-700 mb-4">
                Problemes courants :
              </p>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                {availableReasons.slice(0, 4).map((reason) => (
                  <div
                    key={reason}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                  >
                    {reason}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* STEP 2: ESTIMATION - Show Quote */}
        {step === "estimation" && selectedPhoto && (
          <section className="space-y-6">
            <div className="rounded-4xl border border-slate-200/80 bg-white p-8 shadow-xl">
              <div className="mb-6 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-sky-600">
                  Etape 2 / 3
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                  Votre estimation
                </h2>
              </div>

              <div className="mb-8 rounded-3xl overflow-hidden bg-slate-100 h-64 flex items-center justify-center">
                {photoPreview && (
                  <Image
                    src={photoPreview}
                    alt="Votre photo"
                    width={500}
                    height={400}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                )}
              </div>

              <div className="mb-8 rounded-3xl border border-sky-200/50 bg-sky-50/50 p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-sky-600 font-semibold mb-4">
                  Plombier recommande
                </p>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-2xl font-semibold text-slate-950">
                      {selected.name}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      {selected.specialty}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-900">
                    {selected.distance}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white p-3 text-center">
                    <p className="text-xs text-slate-500">Tarif/h</p>
                    <p className="mt-1 font-semibold text-slate-950">
                      {selected.rate}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white p-3 text-center">
                    <p className="text-xs text-slate-500">Dispo</p>
                    <p className="mt-1 font-semibold text-slate-950">
                      {selected.nextAvailable}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white p-3 text-center">
                    <p className="text-xs text-slate-500">Note</p>
                    <p className="mt-1 font-semibold text-slate-950">
                      {selected.rating.toFixed(1)}*
                    </p>
                  </div>
                </div>
              </div>

              {analysisError && (
                <div className="mb-6 rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                  {analysisError}
                </div>
              )}

              <div className="mb-8 rounded-3xl bg-slate-950 text-white p-6 text-center">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-300 mb-2">
                  Estimation
                </p>
                <p className="text-5xl font-bold">
                  {analysis?.estimate ?? (analysisLoading ? "..." : "45EUR")}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {analysis?.interventionType
                    ? analysis.interventionType
                    : "Pour diagnostic + intervention simple"}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setStep("contact")}
                  className="flex-1 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  Continuer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep("initial");
                    setSelectedPhoto(null);
                  }}
                  className="flex-1 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Changer la photo
                </button>
              </div>
            </div>
          </section>
        )}

        {/* STEP 3: CONTACT - Confirm & Enter Details */}
        {step === "contact" && (
          <section>
            <div className="rounded-4xl border border-slate-200/80 bg-white p-8 shadow-xl">
              <div className="mb-8 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-sky-600">
                  Etape 3 / 3
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                  Confirmez votre demande
                </h2>
                <p className="mt-4 text-slate-600">
                  Completez vos informations pour que {selected.name} vous
                  recontacte rapidement.
                </p>
              </div>

              <form onSubmit={handleSubmitContact} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-700">
                    Nom complet
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      placeholder="Jean Dupont"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700">
                    Telephone
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      required
                      placeholder="06 12 34 56 78"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                    />
                  </label>
                </div>

                <label className="space-y-2 text-sm text-slate-700">
                  Adresse du chantier
                  <input
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    required
                    placeholder="12 rue de la Republique, 75011 Paris"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                  />
                </label>

                <div className="rounded-3xl border border-sky-200/50 bg-sky-50/50 p-4">
                  <p className="text-sm text-slate-700 font-medium mb-2">
                    Recapitulatif
                  </p>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p>
                      <span className="font-semibold">Plombier :</span>{" "}
                      {selected.name}
                    </p>
                    <p>
                      <span className="font-semibold">Estimation :</span>{" "}
                      {analysis?.estimate ?? "45EUR"}
                    </p>
                    <p>
                      <span className="font-semibold">Disponibilite :</span>{" "}
                      {selected.nextAvailable}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    className="flex-1 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Envoyer la demande
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("estimation")}
                    className="flex-1 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                  >
                    Retour
                  </button>
                </div>

                {submitted && (
                  <div className="rounded-3xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700 text-center font-semibold">
                    Demande envoyee ! Un plombier vous recontactera bientot.
                  </div>
                )}
              </form>
            </div>
          </section>
        )}

        {/* Info Section */}
        {step === "initial" && (
          <section className="mt-12 rounded-4xl border border-slate-200/80 bg-white p-6 shadow-lg">
            <p className="text-sm font-semibold text-slate-700 mb-4">
              Pourquoi cette approche ?
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="text-sky-600 font-bold">*</span>
                <span>Zero friction : commencez directement par une photo</span>
              </li>
              <li className="flex gap-3">
                <span className="text-sky-600 font-bold">*</span>
                <span>Estimation instantanee adaptee a votre probleme</span>
              </li>
              <li className="flex gap-3">
                <span className="text-sky-600 font-bold">*</span>
                <span>Formulaire court en fin de parcours uniquement</span>
              </li>
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
