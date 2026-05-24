// Trajexpress — App principale (avec routage par URL)
const { useState, useEffect } = React;

// Correspondance entre les routes internes et les URLs visibles
const ROUTES = {
  home:      "/",
  search:    "/recherche",
  detail:    "/trajet",
  signup:    "/inscription",
  signin:    "/connexion",
  driver:    "/devenir-chauffeur",
  about:     "/comment-ca-marche",
  dashboard: "/tableau-de-bord",
  pricing:   "/tarification",
  admin:     "/espace-proprietaire"
};

// Convertit un nom de route ("home") en URL ("#/") et vice-versa
const routeToHash = (r) => "#" + (ROUTES[r] || "/");
const hashToRoute = (hash) => {
  const path = (hash || "#/").replace(/^#/, "") || "/";
  return Object.keys(ROUTES).find(r => ROUTES[r] === path) || "home";
};

function App() {
  const [route, setRoute] = useState(() => hashToRoute(window.location.hash));
  const [searchQuery, setSearchQuery] = useState({ from: "Québec", to: "Montréal", date: "2026-05-18", passengers: 1 });
  const [activeTrip, setActiveTrip] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [postedTrips, setPostedTrips] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [toast, setToast] = useState(null);

  // Synchronise la route React avec l'URL : boutons précédent / suivant du navigateur
  useEffect(() => {
    const onHashChange = () => {
      setRoute(hashToRoute(window.location.hash));
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Met à jour le titre de l'onglet selon la page courante
  useEffect(() => {
    const titles = {
      home: "Trajexpress — Covoiturage au Québec",
      search: "Rechercher un trajet — Trajexpress",
      detail: "Détail du trajet — Trajexpress",
      signup: "Inscription — Trajexpress",
      signin: "Connexion — Trajexpress",
      driver: "Devenir chauffeur — Trajexpress",
      about: "Comment ça marche — Trajexpress",
      dashboard: "Mon tableau de bord — Trajexpress",
      pricing: "Tarification — Trajexpress",
      admin: "Espace propriétaire — Trajexpress"
    };
    document.title = titles[route] || "Trajexpress";
  }, [route]);

  const navigate = (r) => {
    const newHash = routeToHash(r);
    if (window.location.hash !== newHash) {
      window.location.hash = newHash; // déclenche hashchange → met à jour la route
    } else {
      setRoute(r);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };
  const openTrip = (t) => { setActiveTrip(t); navigate("detail"); };
  const showToast = (msg) => setToast(msg);
  const addTrip = (t) => setPostedTrips([t, ...postedTrips]);
  const addBooking = (b) => setBookings([b, ...bookings]);

  return (
    <div className="app">
      <Header route={route} navigate={navigate} currentUser={currentUser} />

      {route === "home" && <Home navigate={navigate} setSearchQuery={setSearchQuery} searchQuery={searchQuery} currentUser={currentUser} />}
      {route === "pricing" && <PricingPage navigate={navigate} currentUser={currentUser} />}
      {route === "search" && <SearchPage navigate={navigate} searchQuery={searchQuery} setSearchQuery={setSearchQuery} openTrip={openTrip} />}
      {route === "detail" && <TripDetail trip={activeTrip} navigate={navigate} currentUser={currentUser} addBooking={addBooking} showToast={showToast} />}
      {route === "signup" && <Auth mode="signup" navigate={navigate} setCurrentUser={setCurrentUser} showToast={showToast} />}
      {route === "signin" && <Auth mode="signin" navigate={navigate} setCurrentUser={setCurrentUser} showToast={showToast} />}
      {route === "driver" && <DriverInfo navigate={navigate} currentUser={currentUser} />}
      {route === "about" && <DriverInfo navigate={navigate} currentUser={currentUser} />}
      {route === "dashboard" && <DriverHub navigate={navigate} currentUser={currentUser} postedTrips={postedTrips} addTrip={addTrip} showToast={showToast} />}
      {route === "admin" && <AdminPage navigate={navigate} showToast={showToast} />}

      <Footer navigate={navigate} />
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
