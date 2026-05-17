// Trajexpress — données mock partagées
const CITIES = [
  "Québec", "Montréal", "Lévis", "Trois-Rivières", "Sherbrooke",
  "Saguenay", "Gatineau", "Drummondville", "Saint-Hyacinthe",
  "Rivière-du-Loup", "Rimouski", "Victoriaville", "Sainte-Foy",
  "Saint-Georges", "Beauport"
];

const TRIPS_SEED = [
  {
    id: "TJX-2041",
    from: "Québec", fromAddr: "Gare du Palais, 450 rue de la Gare-du-Palais",
    to: "Montréal", toAddr: "Gare d'autocars, 1717 rue Berri",
    start: "06:15", end: "09:20", duration: "3h05",
    date: "Lun. 18 mai",
    price: 28, seats: 3, totalSeats: 4,
    driver: { name: "Marc-André T.", initials: "MA", rating: 4.9, trips: 142, verified: true, year: 2021, car: "Toyota Corolla", color: "Gris ardoise" },
    instant: true,
    rules: { smoke: false, pets: true, music: true, talk: "Modéré" },
    detour: "Lévis"
  },
  {
    id: "TJX-2042",
    from: "Québec", fromAddr: "Université Laval, Pavillon Desjardins",
    to: "Montréal", toAddr: "UQAM, Pavillon Hubert-Aquin",
    start: "07:30", end: "10:40", duration: "3h10",
    date: "Lun. 18 mai",
    price: 25, seats: 1, totalSeats: 3,
    driver: { name: "Sophie L.", initials: "SL", rating: 4.8, trips: 87, verified: true, year: 2019, car: "Honda Civic", color: "Bleu nuit" },
    instant: false,
    rules: { smoke: false, pets: false, music: true, talk: "Bavard" },
    detour: null
  },
  {
    id: "TJX-2043",
    from: "Québec", fromAddr: "Sainte-Foy, Place Laurier",
    to: "Montréal", toAddr: "Centre-ville, Métro Bonaventure",
    start: "08:45", end: "12:00", duration: "3h15",
    date: "Lun. 18 mai",
    price: 30, seats: 2, totalSeats: 3,
    driver: { name: "David B.", initials: "DB", rating: 4.7, trips: 56, verified: true, year: 2022, car: "Mazda CX-5", color: "Blanc cristal" },
    instant: true,
    rules: { smoke: false, pets: false, music: true, talk: "Au choix" },
    detour: "Drummondville"
  },
  {
    id: "TJX-2044",
    from: "Québec", fromAddr: "Beauport, Galeries de la Capitale",
    to: "Trois-Rivières", toAddr: "Centre-ville, Place de l'Hôtel-de-Ville",
    start: "10:00", end: "11:35", duration: "1h35",
    date: "Lun. 18 mai",
    price: 18, seats: 4, totalSeats: 4,
    driver: { name: "Émilie R.", initials: "ER", rating: 5.0, trips: 213, verified: true, year: 2020, car: "Subaru Outback", color: "Vert forêt" },
    instant: true,
    rules: { smoke: false, pets: true, music: true, talk: "Bavard" },
    detour: null
  },
  {
    id: "TJX-2045",
    from: "Québec", fromAddr: "Lévis, Terminus de la traverse",
    to: "Sherbrooke", toAddr: "Université de Sherbrooke",
    start: "14:00", end: "17:30", duration: "3h30",
    date: "Lun. 18 mai",
    price: 35, seats: 1, totalSeats: 3,
    driver: { name: "Jean-François P.", initials: "JF", rating: 4.6, trips: 41, verified: true, year: 2018, car: "Hyundai Elantra", color: "Argent" },
    instant: false,
    rules: { smoke: false, pets: false, music: false, talk: "Silencieux" },
    detour: "Drummondville"
  },
  {
    id: "TJX-2046",
    from: "Québec", fromAddr: "Charlesbourg, IGA Henri-Bourassa",
    to: "Saguenay", toAddr: "Chicoutimi, Place du Royaume",
    start: "16:30", end: "18:55", duration: "2h25",
    date: "Lun. 18 mai",
    price: 32, seats: 2, totalSeats: 4,
    driver: { name: "Pierre-Olivier M.", initials: "PO", rating: 4.9, trips: 178, verified: true, year: 2023, car: "Tesla Model 3", color: "Rouge multicouches" },
    instant: true,
    rules: { smoke: false, pets: true, music: true, talk: "Au choix" },
    detour: null
  }
];

const POPULAR_ROUTES = [
  { from: "Québec", to: "Montréal", trips: 24, price: 25 },
  { from: "Québec", to: "Trois-Rivières", trips: 14, price: 15 },
  { from: "Québec", to: "Sherbrooke", trips: 8, price: 32 },
  { from: "Québec", to: "Saguenay", trips: 11, price: 28 },
  { from: "Lévis", to: "Montréal", trips: 9, price: 25 },
  { from: "Québec", to: "Gatineau", trips: 5, price: 45 },
  { from: "Québec", to: "Rimouski", trips: 6, price: 38 },
  { from: "Sherbrooke", to: "Montréal", trips: 12, price: 18 }
];

const ADMIN_CODE = "QC-2026-TRAJ";

const ADMIN_TRANSACTIONS = [
  { id: "TX-9821", date: "16 mai 2026", type: "Inscription voyageur", user: "Léa Tremblay", amount: 3.00, status: "Encaissé" },
  { id: "TX-9820", date: "16 mai 2026", type: "Places chauffeur ×4", user: "Marc-André T.", amount: 8.00, status: "Encaissé" },
  { id: "TX-9819", date: "16 mai 2026", type: "Inscription voyageur", user: "Hugo Côté", amount: 3.00, status: "Encaissé" },
  { id: "TX-9818", date: "15 mai 2026", type: "Places chauffeur ×3", user: "Sophie L.", amount: 6.00, status: "Encaissé" },
  { id: "TX-9817", date: "15 mai 2026", type: "Inscription voyageur", user: "Anaïs Roy", amount: 3.00, status: "Encaissé" },
  { id: "TX-9816", date: "15 mai 2026", type: "Places chauffeur ×4", user: "Émilie R.", amount: 8.00, status: "Encaissé" },
  { id: "TX-9815", date: "15 mai 2026", type: "Inscription voyageur", user: "Olivier G.", amount: 3.00, status: "En attente" },
  { id: "TX-9814", date: "14 mai 2026", type: "Places chauffeur ×3", user: "David B.", amount: 6.00, status: "Encaissé" }
];

const ADMIN_USERS = [
  { name: "Marc-André T.", role: "Chauffeur", trips: 142, since: "Jan 2024", status: "Actif" },
  { name: "Léa Tremblay", role: "Voyageur", trips: 12, since: "Mai 2026", status: "Actif" },
  { name: "Sophie L.", role: "Chauffeur", trips: 87, since: "Mar 2024", status: "Actif" },
  { name: "Hugo Côté", role: "Voyageur", trips: 3, since: "Mai 2026", status: "Actif" },
  { name: "Émilie R.", role: "Chauffeur", trips: 213, since: "Sep 2023", status: "Vérifié★" },
  { name: "Olivier G.", role: "Voyageur", trips: 0, since: "Mai 2026", status: "En attente" }
];

window.TJX_DATA = { CITIES, TRIPS_SEED, POPULAR_ROUTES, ADMIN_CODE, ADMIN_TRANSACTIONS, ADMIN_USERS };
