// Trajexpress — Recherche + détail
const SearchPage = ({ navigate, searchQuery, setSearchQuery, openTrip }) => {
  const { TRIPS_SEED, CITIES } = window.TJX_DATA;
  const [q, setQ] = React.useState(searchQuery || { from: "Québec", to: "Montréal", date: "2026-05-18", passengers: 1 });
  const [filters, setFilters] = React.useState({ instant: false, smokeFree: false, pets: false, maxPrice: 50, sort: "early" });

  React.useEffect(() => { setQ(searchQuery); }, [searchQuery]);

  const submit = (e) => {
    e && e.preventDefault();
    setSearchQuery(q);
  };

  let trips = TRIPS_SEED.filter(t =>
    (!q.from || t.from.toLowerCase().includes(q.from.toLowerCase())) &&
    (!q.to || t.to.toLowerCase().includes(q.to.toLowerCase())) &&
    t.price <= filters.maxPrice &&
    (!filters.instant || t.instant) &&
    (!filters.pets || t.rules.pets) &&
    (!filters.smokeFree || !t.rules.smoke)
  );

  if (filters.sort === "price") trips = [...trips].sort((a, b) => a.price - b.price);
  if (filters.sort === "rating") trips = [...trips].sort((a, b) => b.driver.rating - a.driver.rating);

  return (
    <>
      <div style={{ background: "var(--bg-soft)", borderBottom: "1px solid var(--line)", padding: "20px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <form className="search-bar" style={{ boxShadow: "var(--shadow)" }} onSubmit={submit}>
            <div className="search-cell">
              <div className="search-cell-label">Départ</div>
              <input list="cities-list-2" value={q.from} onChange={(e) => setQ({ ...q, from: e.target.value })} />
            </div>
            <div className="search-cell">
              <div className="search-cell-label">Arrivée</div>
              <input list="cities-list-2" value={q.to} onChange={(e) => setQ({ ...q, to: e.target.value })} />
            </div>
            <div className="search-cell">
              <div className="search-cell-label">Date</div>
              <input type="date" value={q.date} onChange={(e) => setQ({ ...q, date: e.target.value })} />
            </div>
            <div className="search-cell">
              <div className="search-cell-label">Voyageurs</div>
              <select value={q.passengers} onChange={(e) => setQ({ ...q, passengers: +e.target.value })}>
                <option value={1}>1 voyageur</option>
                <option value={2}>2 voyageurs</option>
                <option value={3}>3 voyageurs</option>
                <option value={4}>4 voyageurs</option>
              </select>
            </div>
            <div className="search-submit"><button type="submit">Mettre à jour</button></div>
            <datalist id="cities-list-2">{CITIES.map(c => <option key={c} value={c} />)}</datalist>
          </form>
        </div>
      </div>

      <div className="page">
        <div className="results-layout">
          <aside className="card filter-card">
            <div className="filter-group">
              <h4>Trier par</h4>
              <select className="select" value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })}>
                <option value="early">Départ le plus tôt</option>
                <option value="price">Prix croissant</option>
                <option value="rating">Note du chauffeur</option>
              </select>
            </div>
            <div className="filter-group">
              <h4>Prix maximum</h4>
              <input type="range" min="10" max="60" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: +e.target.value })} style={{ width: "100%", accentColor: "var(--red)" }} />
              <div className="row-between small" style={{ color: "var(--ink-2)", marginTop: 4 }}>
                <span>10 $</span>
                <b style={{ color: "var(--blue-deep)" }}>{filters.maxPrice} $</b>
                <span>60 $</span>
              </div>
            </div>
            <div className="filter-group">
              <h4>Options</h4>
              <label className="checkbox-row"><input type="checkbox" checked={filters.instant} onChange={(e) => setFilters({ ...filters, instant: e.target.checked })} /> Réservation instantanée <span className="count">3</span></label>
              <label className="checkbox-row"><input type="checkbox" checked={filters.smokeFree} onChange={(e) => setFilters({ ...filters, smokeFree: e.target.checked })} /> Non-fumeur <span className="count">6</span></label>
              <label className="checkbox-row"><input type="checkbox" checked={filters.pets} onChange={(e) => setFilters({ ...filters, pets: e.target.checked })} /> Animaux acceptés <span className="count">3</span></label>
            </div>
            <div className="filter-group">
              <h4>Heure de départ</h4>
              <label className="checkbox-row"><input type="checkbox" /> Avant 9 h <span className="count">2</span></label>
              <label className="checkbox-row"><input type="checkbox" /> 9 h – 12 h <span className="count">1</span></label>
              <label className="checkbox-row"><input type="checkbox" /> 12 h – 18 h <span className="count">2</span></label>
              <label className="checkbox-row"><input type="checkbox" /> Après 18 h <span className="count">1</span></label>
            </div>
          </aside>

          <main>
            <div className="results-header">
              <h2>{trips.length} trajets <em>{q.from} → {q.to}</em></h2>
              <div className="small muted">Lundi 18 mai 2026</div>
            </div>

            {trips.length === 0 ? (
              <div className="card text-c" style={{ padding: 60 }}>
                <div style={{ fontSize: 18, color: "var(--ink-2)", marginBottom: 6 }}>Aucun trajet ne correspond.</div>
                <div className="muted">Essayez d'élargir vos filtres ou de changer la date.</div>
              </div>
            ) : trips.map(t => (
              <div key={t.id} className="trip-card" onClick={() => openTrip(t)}>
                <div className="trip-time">
                  <div className="trip-time-start">{t.start}</div>
                  <div className="trip-time-dur">{t.duration}</div>
                  <div className="trip-time-end">{t.end}</div>
                </div>
                <div className="trip-route">
                  <div className="trip-route-line from"><span className="marker"></span> {t.from}<span className="muted small" style={{ marginLeft: 8 }}>· {t.fromAddr.split(",")[0]}</span></div>
                  <div className="trip-route-divider"></div>
                  <div className="trip-route-line to"><span className="marker"></span> {t.to}<span className="muted small" style={{ marginLeft: 8 }}>· {t.toAddr.split(",")[0]}</span></div>
                  <div className="row-gap small" style={{ marginTop: 6 }}>
                    {t.instant && <span className="pill pill-red"><Icon name="check" size={11} /> Instantané</span>}
                    {t.detour && <span className="pill">via {t.detour}</span>}
                    {!t.rules.smoke && <span className="pill">Non-fumeur</span>}
                  </div>
                </div>
                <div className="trip-driver">
                  <div className="avatar">{t.driver.initials}</div>
                  <div className="trip-driver-info">
                    <div className="trip-driver-name">{t.driver.name}</div>
                    <div className="trip-driver-rating">
                      <span className="star">★</span> {t.driver.rating}
                      <span className="muted">· {t.driver.trips} trajets</span>
                    </div>
                  </div>
                </div>
                <div className="trip-price-block">
                  <div className="trip-price">{t.price} $<span className="trip-price-unit"> / pers.</span></div>
                  <div className={`trip-seats ${t.seats === 1 ? "few" : ""}`}>
                    {t.seats} {t.seats > 1 ? "sièges restants" : "siège restant"}
                  </div>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
    </>
  );
};

const TripDetail = ({ trip, navigate, currentUser, addBooking, showToast }) => {
  const [seats, setSeats] = React.useState(1);
  const [confirmed, setConfirmed] = React.useState(false);

  if (!trip) return <div className="page"><div className="card text-c" style={{ padding: 60 }}>Aucun trajet sélectionné. <button className="btn btn-text" onClick={() => navigate("search")}>Retour à la recherche</button></div></div>;

  const reserve = () => {
    if (!currentUser) {
      showToast("Connectez-vous pour réserver");
      navigate("signup");
      return;
    }
    setConfirmed(true);
    addBooking({ trip, seats });
    showToast(`Réservation confirmée pour ${seats} siège${seats > 1 ? "s" : ""}`);
  };

  return (
    <div className="page">
      <button className="btn btn-text" onClick={() => navigate("search")} style={{ marginBottom: 18, paddingLeft: 0 }}>← Retour aux résultats</button>

      <div className="detail-layout">
        <div className="card" style={{ padding: 28 }}>
          <div className="row-between" style={{ marginBottom: 4 }}>
            <span className="muted small">{trip.date}</span>
            <span className="pill pill-blue"><span className="dot"></span> {trip.id}</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 36, margin: "6px 0 22px", color: "var(--blue-deep)" }}>
            {trip.from} <span style={{ color: "var(--red)" }}>→</span> {trip.to}
          </h1>

          <div className="timeline">
            <div className="timeline-step">
              <div className="timeline-time">{trip.start}</div>
              <div className="timeline-place">{trip.from}</div>
              <div className="timeline-addr">{trip.fromAddr}</div>
            </div>
            {trip.detour && (
              <div className="timeline-step" style={{ opacity: 0.85 }}>
                <div className="timeline-time" style={{ fontSize: 16, color: "var(--ink-2)" }}>— en route —</div>
                <div className="timeline-addr">arrêt possible à {trip.detour}</div>
              </div>
            )}
            <div className="timeline-step">
              <div className="timeline-time">{trip.end}</div>
              <div className="timeline-place">{trip.to}</div>
              <div className="timeline-addr">{trip.toAddr}</div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Votre chauffeur</h3>
            <div className="row-gap" style={{ gap: 16 }}>
              <div className="avatar avatar-lg">{trip.driver.initials}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 17 }}>{trip.driver.name} {trip.driver.verified && <span className="pill pill-blue" style={{ marginLeft: 6, padding: "2px 8px" }}><Icon name="shield" size={10} /> Vérifié</span>}</div>
                <div className="muted small" style={{ marginTop: 4 }}>
                  <span className="star">★ ★ ★ ★ ★</span> &nbsp;<b style={{ color: "var(--ink)" }}>{trip.driver.rating}</b> sur 5 — {trip.driver.trips} trajets effectués
                </div>
                <div className="small" style={{ marginTop: 8, color: "var(--ink-2)" }}>
                  {trip.driver.car} ({trip.driver.year}) · {trip.driver.color}
                </div>
              </div>
              <button className="btn btn-ghost"><Icon name="chat" size={14} /> Contacter</button>
            </div>
          </div>

          <div className="detail-section">
            <h3>Préférences à bord</h3>
            <div className="detail-feat-grid">
              <div className="row"><span className={trip.rules.smoke ? "check" : "cross"}><Icon name={trip.rules.smoke ? "check" : "cross"} size={14} /></span> Fumeur {trip.rules.smoke ? "accepté" : "non accepté"}</div>
              <div className="row"><span className={trip.rules.pets ? "check" : "cross"}><Icon name={trip.rules.pets ? "check" : "cross"} size={14} /></span> Animaux {trip.rules.pets ? "acceptés" : "non acceptés"}</div>
              <div className="row"><span className={trip.rules.music ? "check" : "cross"}><Icon name={trip.rules.music ? "check" : "cross"} size={14} /></span> Musique en route</div>
              <div className="row"><Icon name="chat" size={14} color="var(--blue)" /> Ambiance : {trip.rules.talk}</div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Bagages</h3>
            <p className="muted" style={{ margin: 0 }}>1 valise cabine + 1 sac à dos par voyageur. Bagage volumineux à confirmer avec le chauffeur.</p>
          </div>
        </div>

        <div>
          <div className="booking-card">
            <div className="row-between" style={{ marginBottom: 4 }}>
              <span className="muted small">Prix par voyageur</span>
              <span className="muted small">{trip.seats} sièges restants</span>
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 44, color: "var(--blue-deep)", lineHeight: 1, fontWeight: 500 }}>{trip.price} $</div>

            <div className="field" style={{ marginTop: 18 }}>
              <label className="label">Nombre de sièges</label>
              <select className="select" value={seats} onChange={(e) => setSeats(+e.target.value)}>
                {Array.from({ length: trip.seats }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n} siège{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>

            <div className="price-summary">
              <div className="price-row"><span>{seats} × {trip.price} $</span><span>{seats * trip.price} $</span></div>
              <div className="price-row total"><span>À régler au chauffeur</span><b>{seats * trip.price} $</b></div>
            </div>

            <div className="notice notice-blue">
              <b>Paiement à l'arrivée</b>
              Vous remettez le montant en main propre au chauffeur, en argent comptant ou Interac, à destination.
            </div>

            {confirmed ? (
              <div className="card-soft text-c" style={{ background: "oklch(0.95 0.05 155)", color: "oklch(0.4 0.13 155)" }}>
                <Icon name="check" size={28} color="oklch(0.4 0.13 155)" />
                <div style={{ fontWeight: 700, marginTop: 6 }}>Réservation confirmée</div>
                <div className="small">Le chauffeur a été notifié. Détails envoyés par courriel.</div>
              </div>
            ) : (
              <button className="btn btn-red btn-block btn-lg" onClick={reserve}>
                {trip.instant ? "Réserver maintenant" : "Envoyer une demande"}
              </button>
            )}
            <div className="small muted text-c" style={{ marginTop: 10 }}>
              {trip.instant ? "Confirmation immédiate" : "Réponse du chauffeur sous 2 h en moyenne"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

window.SearchPage = SearchPage;
window.TripDetail = TripDetail;
