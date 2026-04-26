export type Plumber = {
  id: string;
  name: string;
  specialty: string;
  distance: string;
  rating: number;
  rate: string;
  nextAvailable: string;
  experience: string;
  jobs: number;
  completed: number;
};

export const plumbers: Plumber[] = [
  {
    id: "maxime",
    name: "Maxime Leroy",
    specialty: "Réparation de fuites",
    distance: "1,2 km",
    rating: 4.9,
    rate: "55€/h",
    nextAvailable: "Aujourd’hui 14h-16h",
    experience: "12 ans d’expérience sur les urgences domestiques.",
    jobs: 276,
    completed: 98,
  },
  {
    id: "clara",
    name: "Clara Dubois",
    specialty: "Chauffe-eau & ballon",
    distance: "2,8 km",
    rating: 4.8,
    rate: "62€/h",
    nextAvailable: "Demain 09h-11h",
    experience: "Spécialiste installation & entretien de chauffe-eau.",
    jobs: 189,
    completed: 96,
  },
  {
    id: "youssef",
    name: "Youssef Karim",
    specialty: "Débouchage rapide",
    distance: "3,5 km",
    rating: 4.7,
    rate: "50€/h",
    nextAvailable: "Aujourd’hui 18h-20h",
    experience: "Interventions express dans Paris et proche banlieue.",
    jobs: 214,
    completed: 92,
  },
  {
    id: "amelie",
    name: "Amélie Martin",
    specialty: "Remplacement d’équipements",
    distance: "4,0 km",
    rating: 4.9,
    rate: "68€/h",
    nextAvailable: "Mercredi 10h-12h",
    experience: "Installation de nouvelles colonnes et robinets haut de gamme.",
    jobs: 158,
    completed: 99,
  },
];

export const availableReasons = [
  "Intervention de proximité",
  "Devis gratuit avant intervention",
  "Tarifs affichés et transparents",
];

export const authUser = {
  email: "hello@nova.fr",
  password: "plomberie123",
};

export const user = {
  name: "Aurélie Martin",
  email: "hello@nova.fr",
  address: "18 rue de la Pompe, 75016 Paris",
  spent: "1 420€",
  requests: 5,
  rating: 4.9,
};

export const interventions = [
  {
    date: "08 avril 2026",
    plumber: "Maxime Leroy",
    service: "Réparation de fuite",
    price: "120€",
    status: "Terminée",
  },
  {
    date: "28 mars 2026",
    plumber: "Clara Dubois",
    service: "Entretien chauffe-eau",
    price: "180€",
    status: "Terminée",
  },
  {
    date: "14 mars 2026",
    plumber: "Youssef Karim",
    service: "Débouchage canalisation",
    price: "95€",
    status: "Terminée",
  },
];

export const savedPlumbers = [
  {
    name: "Clara Dubois",
    specialty: "Chauffe-eau & ballon",
    availability: "Demain matin",
    rate: "62€/h",
  },
  {
    name: "Maxime Leroy",
    specialty: "Réparation de fuites",
    availability: "Aujourd’hui après-midi",
    rate: "55€/h",
  },
];

export const monthlySpending = [
  { month: "Nov", amount: 980 },
  { month: "Déc", amount: 1_130 },
  { month: "Jan", amount: 870 },
  { month: "Fév", amount: 1_420 },
  { month: "Mar", amount: 1_060 },
];
