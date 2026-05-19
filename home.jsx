// Trajexpress — Page d'accueil
const Home = ({ navigate, setSearchQuery, searchQuery, currentUser }) => {
  const [q, setQ] = React.useState(searchQuery || { from: "Québec", to: "Montréal", date: "2026-05-18", passengers: 1 });
  const { CITIES } = window.TJX_DATA;

  const submit = (e) => {
    e && e.preventDefault();
    setSearchQuery(q);
    navigate("search");
  };

  const useRoute = (r) => {
    const next = { ...q, from: r.from, to: r.to };
    setQ(next);
    setSearchQuery(next);
    navigate("search");
  };

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <span className="pill pill-red"><span className="dot"></span>Nouveau au Québec</span>
            <span>Trajexpress vient d'ouvrir. <b style={{ color: "var(--blue-deep)" }}>Soyez parmi les premiers</b> à voyager ou conduire.</span>
          </div>
          <h1>De Québec à partout au Québec, <em>au prix d'un café partagé.</em></h1>
          <p className="hero-sub">Trajexpress met en relation voyageurs et chauffeurs sur les routes du Québec. Trouvez un siège, partagez les frais, arrivez à destination.</p>

          <form className="search-bar" onSubmit={submit}>
            <div className="search-cell">
              <div className="search-cell-label">Départ</div>
              <input list="cities-list" value={q.from} onChange={(e) => setQ({ ...q, from: e.target.value })} placeholder="Ville de départ" />
            </div>
            <div className="search-cell">
              <div className="search-cell-label">Arrivée</div>
              <input list="cities-list" value={q.to} onChange={(e) => setQ({ ...q, to: e.target.value })} placeholder="Destination" />
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
            <div className="search-submit">
              <button type="submit">Chercher</button>
            </div>
            <datalist id="cities-list">
              {CITIES.map(c => <option key={c} value={c} />)}
            </datalist>
          </form>

          <div className="hero-meta">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="dot" style={{ background: "var(--green)", width: 9, height: 9 }}></span>
              <span>Service ouvert dans tout le Québec</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Icon name="shield" size={14} color="var(--blue-deep)" />
              <span>Paiement sécurisé via Stripe</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Icon name="money" size={14} color="var(--blue-deep)" />
              <span>Aucune commission sur les courses</span>
            </div>
          </div>
        </div>
      </section>

      <div className="page">
        <section className="section" style={{ paddingTop: 28 }}>
          <div className="row-between" style={{ marginBottom: 28 }}>
            <h2 className="section-title" style={{ margin: 0 }}>Destinations <em>suggérées</em></h2>
            <button className="btn btn-ghost" onClick={() => navigate("search")}>Voir tous les trajets <Icon name="arrow" size={14} /></button>
          </div>
          <div className="routes-grid">
            {[
              { from: "Québec", to: "Montréal" },
              { from: "Québec", to: "Trois-Rivières" },
              { from: "Québec", to: "Sherbrooke" },
              { from: "Québec", to: "Saguenay" },
              { from: "Lévis", to: "Montréal" },
              { from: "Québec", to: "Gatineau" },
              { from: "Québec", to: "Rimouski" },
              { from: "Sherbrooke", to: "Montréal" }
            ].map((r, i) => (
              <button key={i} className="route-tile" onClick={() => useRoute(r)}>
                <div className="route-tile-route">
                  {r.from} <span className="route-arrow">→</span> {r.to}
                </div>
                <div className="route-meta">
                  <span>Lancer une recherche</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Comment ça <em>marche</em></h2>
          <div className="how-grid">
            <div className="how-card">
              <div className="how-card-num">01</div>
              <h3>Inscrivez-vous</h3>
              <p>Créez votre compte en quelques minutes. Votre profil voyageur est ensuite valable à vie et vous pouvez réserver autant de trajets que vous voulez sur Trajexpress.</p>
            </div>
            <div className="how-card">
              <div className="how-card-num">02</div>
              <h3>Trouvez votre route</h3>
              <p>Filtrez par ville, heure, prix. Lisez les avis du chauffeur, l'auto, le détail du trajet. Réservez en quelques clics.</p>
            </div>
            <div className="how-card">
              <div className="how-card-num">03</div>
              <h3>Payez à l'arrivée</h3>
              <p>Les frais de déplacement sont remis directement au chauffeur à destination — en personne. Trajexpress reste hors transaction.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="card" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32, alignItems: "center", padding: 40, background: "linear-gradient(135deg, white 0%, var(--blue-tint) 100%)" }}>
            <div>
              <span className="pill pill-red"><span className="dot"></span>Pour chauffeurs</span>
              <h2 className="section-title" style={{ marginTop: 14 }}>Vous conduisez vers <em>Montréal</em> demain ?</h2>
              <p style={{ color: "var(--ink-2)", fontSize: 16, maxWidth: 480, marginBottom: 22 }}>
                Publiez vos sièges, fixez votre tarif. Les voyageurs vous paient à l'arrivée — aucune commission sur vos courses. Petits frais transparents par siège publié, détails dans votre espace chauffeur.
              </p>
              <div className="row-gap">
                <button className="btn btn-red btn-lg" onClick={() => navigate("driver")}>Devenir chauffeur <Icon name="arrow" size={14} color="white" /></button>
                <button className="btn btn-text" onClick={() => navigate("about")}>En savoir plus</button>
              </div>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <div className="card-soft" style={{ display: "flex", gap: 10, padding: 14, alignItems: "flex-start" }}>
                <Icon name="money" size={20} color="var(--blue-deep)" />
                <div className="small" style={{ color: "var(--ink-2)" }}>
                  <b style={{ color: "var(--ink)" }}>Paiement à l'arrivée.</b> Aucun virement à attendre. Vos voyageurs vous remettent l'argent directement, en main propre.
                </div>
              </div>
              <div className="card-soft" style={{ display: "flex", gap: 10, padding: 14, alignItems: "flex-start" }}>
                <Icon name="shield" size={20} color="var(--blue-deep)" />
                <div className="small" style={{ color: "var(--ink-2)" }}>
                  <b style={{ color: "var(--ink)" }}>Vous fixez vos tarifs.</b> Trajexpress ne prend aucune commission sur vos courses — seulement de petits frais transparents par siège publié.
                </div>
              </div>
              <div className="card-soft" style={{ display: "flex", gap: 10, padding: 14, alignItems: "flex-start" }}>
                <Icon name="car" size={20} color="var(--blue-deep)" />
                <div className="small" style={{ color: "var(--ink-2)" }}>
                  <b style={{ color: "var(--ink)" }}>Vos kilomètres valorisés.</b> Rentabilisez vos déplacements habituels en partageant la route avec d'autres Québécois.
                </div>
              </div>
            </div>
          </div>
        </section>

        {currentUser && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="card" style={{ background: "linear-gradient(135deg, var(--blue-deep) 0%, var(--blue) 100%)", color: "white", border: "none", padding: 32, display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }}>
              <div>
                <span className="pill" style={{ background: "rgba(255,255,255,0.15)", color: "white" }}><Icon name="shield" size={11} color="white" /> Réservé aux membres</span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 26, margin: "10px 0 6px" }}>Vous avez accès à votre espace <em style={{ color: "oklch(0.85 0.12 25)" }}>tarification</em>.</h3>
                <p style={{ color: "oklch(0.88 0.02 255)", margin: 0, maxWidth: 540 }}>Détails complets des frais Trajexpress, historique de vos paiements, factures et exemples chiffrés.</p>
              </div>
              <button className="btn btn-red btn-lg" onClick={() => navigate("pricing")}>Voir mes frais <Icon name="arrow" size={14} color="white" /></button>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

window.Home = Home;
