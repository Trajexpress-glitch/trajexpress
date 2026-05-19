// Trajexpress — App principale
const { useState } = React;

function App() {
  const [route, setRoute] = useState("home");
  const [searchQuery, setSearchQuery] = useState({ from: "Québec", to: "Montréal", date: "2026-05-18", passengers: 1 });
  const [activeTrip, setActiveTrip] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [postedTrips, setPostedTrips] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [toast, setToast] = useState(null);

  const navigate = (r) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: "instant" });
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
