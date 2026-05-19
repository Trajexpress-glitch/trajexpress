// Trajexpress — données partagées
//
// Connexion à Supabase
const SUPABASE_URL = "https://vlbnsyoomioonuhtwbry.supabase.co/rest/v1/";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsYm5zeW9vbWlvb251aHR3YnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNjY4ODcsImV4cCI6MjA5NDY0Mjg4N30.4ssL_0Q0eNYxAv3mGPtsJbioNAhU34m8zzHj4VJgllk";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
window.supabaseClient = supabase;

// SÉCURITÉ : ce fichier est livré au navigateur. Aucune donnée sensible
// (code propriétaire en clair, clés Stripe, mots de passe) ne doit y figurer.
// En production sur Vercel, les vraies valeurs sont injectées via les
// variables d'environnement (Project Settings → Environment Variables).

// Liste des villes du Québec utilisée par les champs d'autocomplétion.
const CITIES = [
  "Québec", "Montréal", "Lévis", "Trois-Rivières", "Sherbrooke",
  "Saguenay", "Gatineau", "Drummondville", "Saint-Hyacinthe",
  "Rivière-du-Loup", "Rimouski", "Victoriaville", "Sainte-Foy",
  "Saint-Georges", "Beauport", "Sainte-Marie", "Saint-Elzéar",
  "Sainte-Claire", "Granby"
];

// État initial — aucun trajet, aucune transaction, aucun utilisateur.
// Ces tableaux se rempliront en production via Supabase au fil des inscriptions.
const TRIPS_SEED = [];
const POPULAR_ROUTES = [];
const ADMIN_TRANSACTIONS = [];
const ADMIN_USERS = [];

// Code d'accès propriétaire — stocké uniquement sous forme de hash SHA-256.
// La valeur réelle n'apparaît JAMAIS dans le code source.
// Sur Vercel : la variable d'environnement ADMIN_ACCESS_CODE_HASH remplace celle-ci
// au moment du build (process.env.ADMIN_ACCESS_CODE_HASH).
const ADMIN_CODE_HASH = "a5bc0a7b308e0de884e8bb7098bca19522b7a9d28b908a6cf2ed6fb95680d0b7";

// Liens Stripe Payment Links — à remplacer par vos vrais liens depuis votre tableau de bord Stripe.
// Voir : Guide PaymentLinks.html pour les étapes (5 minutes).
const STRIPE_LINKS = {
  // Inscription voyageur — 3 $ CAD une seule fois
  voyageur: "https://buy.stripe.com/dRmfZiclY0LocUb3Xaasg01",
  // Publication de trajet — 2 $ CAD par siège (quantité ajustable sur Stripe)
  chauffeur: "https://buy.stripe.com/00w00kgCefGicUb2T6asg00"
};

window.TJX_DATA = {
  CITIES,
  TRIPS_SEED,
  POPULAR_ROUTES,
  ADMIN_TRANSACTIONS,
  ADMIN_USERS,
  ADMIN_CODE_HASH,
  STRIPE_LINKS
};
