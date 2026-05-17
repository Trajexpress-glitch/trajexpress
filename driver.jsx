// Trajexpress — Espace chauffeur (tableau de bord + publication)
const DriverHub = ({ navigate, currentUser, postedTrips, addTrip, showToast }) => {
  const [tab, setTab] = React.useState("overview");

  if (!currentUser || currentUser.type !== "driver") {
    return (
      <div className="page">
        <div className="card text-c" style={{ padding: 50 }}>
          <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--blue-deep)" }}>Espace réservé aux chauffeurs</h2>
          <p className="muted">Créez un compte chauffeur pour publier vos trajets.</p>
          <button className="btn btn-red btn-lg" onClick={() => navigate("signup")}>Devenir chauffeur</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="row-between" style={{ marginBottom: 22 }}>
        <div>
          <div className="pill pill-red" style={{ marginBottom: 8 }}><span className="dot"></span> Compte chauffeur</div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 36, margin: 0, color: "var(--blue-deep)" }}>Bonjour, {currentUser.name.split(" ")[0]}.</h1>
          <p className="muted" style={{ margin: "4px 0 0" }}>Voici votre activité sur Trajexpress.</p>
        </div>
        <button className="btn btn-red btn-lg" onClick={() => setTab("post")}><Icon name="plus" size={14} color="white" /> Publier un trajet</button>
      </div>

      <div className="dash-grid">
        <aside className="dash-sidebar">
          <button className={`dash-link ${tab === "overview" ? "active" : ""}`} onClick={() => setTab("overview")}><Icon name="grid" size={16} /> Vue d'ensemble</button>
          <button className={`dash-link ${tab === "trips" ? "active" : ""}`} onClick={() => setTab("trips")}><Icon name="car" size={16} /> Mes trajets <span className="pill pill-blue" style={{ marginLeft: "auto", padding: "1px 8px" }}>{postedTrips.length + 3}</span></button>
          <button className={`dash-link ${tab === "post" ? "active" : ""}`} onClick={() => setTab("post")}><Icon name="plus" size={16} /> Publier un trajet</button>
          <button className={`dash-link ${tab === "earnings" ? "active" : ""}`} onClick={() => setTab("earnings")}><Icon name="money" size={16} /> Revenus</button>
          <button className={`dash-link ${tab === "messages" ? "active" : ""}`} onClick={() => setTab("messages")}><Icon name="chat" size={16} /> Messages <span className="pill pill-red" style={{ marginLeft: "auto", padding: "1px 8px" }}>2</span></button>
          <button className={`dash-link ${tab === "profile" ? "active" : ""}`} onClick={() => setTab("profile")}><Icon name="user" size={16} /> Profil</button>
        </aside>

        <main>
          {tab === "overview" && <DriverOverview postedTrips={postedTrips} setTab={setTab} />}
          {tab === "trips" && <DriverTrips postedTrips={postedTrips} />}
          {tab === "post" && <PostTrip addTrip={addTrip} setTab={setTab} showToast={showToast} />}
          {tab === "earnings" && <DriverEarnings postedTrips={postedTrips} />}
          {tab === "messages" && <DriverMessages />}
          {tab === "profile" && <DriverProfile currentUser={currentUser} />}
        </main>
      </div>
    </div>
  );
};

const DriverOverview = ({ postedTrips, setTab }) => (
  <>
    <div className="dash-stats">
      <div className="stat-card">
        <div className="label-stat">À recevoir cette semaine</div>
        <div className="val">240 $</div>
        <div className="sub">8 voyageurs confirmés</div>
      </div>
      <div className="stat-card accent">
        <div className="label-stat">Frais Trajexpress payés</div>
        <div className="val">14 $</div>
        <div className="sub">7 places publiées</div>
      </div>
      <div className="stat-card">
        <div className="label-stat">Note moyenne</div>
        <div className="val">4,9 ★</div>
        <div className="sub">142 trajets</div>
      </div>
      <div className="stat-card">
        <div className="label-stat">Taux de remplissage</div>
        <div className="val">87 %</div>
        <div className="sub">+ 6 % vs. mois dernier</div>
      </div>
    </div>

    <div className="card" style={{ marginBottom: 16 }}>
      <div className="row-between" style={{ marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Vos prochains trajets</h3>
        <button className="btn btn-text" onClick={() => setTab("trips")}>Voir tout →</button>
      </div>
      {[
        { date: "Demain · 06:15", from: "Québec", to: "Montréal", booked: 3, total: 4, earn: 84 },
        { date: "Ven. 20 mai · 14:00", from: "Québec", to: "Sherbrooke", booked: 1, total: 3, earn: 35 },
        { date: "Sam. 21 mai · 09:30", from: "Québec", to: "Trois-Rivières", booked: 4, total: 4, earn: 72 }
      ].map((t, i) => (
        <div key={i} className="row-between" style={{ padding: "14px 0", borderTop: i ? "1px solid var(--line)" : "none" }}>
          <div>
            <div style={{ fontWeight: 700 }}>{t.from} <span style={{ color: "var(--red)" }}>→</span> {t.to}</div>
            <div className="small muted">{t.date}</div>
          </div>
          <div className="row-gap">
            <div className="pill pill-blue">{t.booked}/{t.total} sièges</div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, color: "var(--blue-deep)", minWidth: 70, textAlign: "right" }}>{t.earn} $</div>
          </div>
        </div>
      ))}
    </div>

    <div className="card">
      <h3 style={{ margin: "0 0 16px", fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Revenus encaissés (7 derniers jours)</h3>
      <div className="chart">
        {[120, 84, 0, 56, 168, 240, 96].map((v, i) => (
          <div key={i} className="bar" style={{ height: `${(v / 240) * 100 + 4}%` }}>
            <div className="bar-label">{["L","M","M","J","V","S","D"][i]}</div>
          </div>
        ))}
      </div>
      <div className="row-between" style={{ marginTop: 32 }}>
        <span className="muted small">Total semaine</span>
        <span style={{ fontFamily: "var(--font-serif)", fontSize: 24, color: "var(--blue-deep)", fontWeight: 500 }}>764 $</span>
      </div>
    </div>
  </>
);

const DriverTrips = ({ postedTrips }) => {
  const allTrips = [
    ...postedTrips.map(t => ({ ...t, status: "Publié" })),
    { id: "TJX-2041", from: "Québec", to: "Montréal", date: "18 mai 06:15", seats: "3/4", price: 28, status: "Publié" },
    { id: "TJX-2034", from: "Québec", to: "Sherbrooke", date: "12 mai 14:00", seats: "3/3", price: 35, status: "Terminé" },
    { id: "TJX-2028", from: "Québec", to: "Montréal", date: "08 mai 06:15", seats: "4/4", price: 28, status: "Terminé" }
  ];
  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ padding: "18px 22px" }}><h3 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Mes trajets</h3></div>
      <table className="table">
        <thead>
          <tr><th>ID</th><th>Itinéraire</th><th>Départ</th><th>Sièges</th><th>Prix</th><th>État</th><th></th></tr>
        </thead>
        <tbody>
          {allTrips.map((t, i) => (
            <tr key={i}>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{t.id}</td>
              <td><b style={{ color: "var(--ink)" }}>{t.from}</b> → {t.to}</td>
              <td>{t.date}</td>
              <td>{t.seats}</td>
              <td><b style={{ color: "var(--blue-deep)" }}>{t.price} $</b></td>
              <td><span className={`pill ${t.status === "Publié" ? "pill-blue" : "pill"}`}>{t.status}</span></td>
              <td><button className="btn btn-text" style={{ padding: 6 }}>Modifier</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PostTrip = ({ addTrip, setTab, showToast }) => {
  const { CITIES } = window.TJX_DATA;
  const [t, setT] = React.useState({ from: "Québec", to: "Montréal", date: "2026-05-22", time: "07:00", price: 25, seats: 3, detour: "", smoke: false, pets: true, music: true, talk: "Au choix" });
  const fee = t.seats * 2;

  const publish = () => {
    addTrip({ id: `TJX-${Math.floor(2050 + Math.random() * 50)}`, ...t });
    showToast(`Trajet publié · ${fee} $ prélevés`);
    setTab("trips");
  };

  return (
    <div className="card">
      <h3 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)", fontSize: 22 }}>Nouveau trajet</h3>
      <p className="muted" style={{ marginTop: 4 }}>Renseignez les détails — vos voyageurs vous verront aussitôt.</p>
      <div className="divider"></div>

      <h4 style={{ fontSize: 13, color: "var(--ink-2)", margin: "0 0 12px" }}>Itinéraire</h4>
      <div className="field-row">
        <div className="field"><label className="label">Ville de départ</label><input list="cities-3" className="input" value={t.from} onChange={(e) => setT({ ...t, from: e.target.value })} /></div>
        <div className="field"><label className="label">Destination</label><input list="cities-3" className="input" value={t.to} onChange={(e) => setT({ ...t, to: e.target.value })} /></div>
      </div>
      <div className="field"><label className="label">Détour possible (optionnel)</label><input className="input" value={t.detour} onChange={(e) => setT({ ...t, detour: e.target.value })} placeholder="ex. Drummondville" /></div>
      <datalist id="cities-3">{CITIES.map(c => <option key={c} value={c} />)}</datalist>

      <div className="divider"></div>
      <h4 style={{ fontSize: 13, color: "var(--ink-2)", margin: "0 0 12px" }}>Quand et combien</h4>
      <div className="field-row">
        <div className="field"><label className="label">Date</label><input type="date" className="input" value={t.date} onChange={(e) => setT({ ...t, date: e.target.value })} /></div>
        <div className="field"><label className="label">Heure de départ</label><input type="time" className="input" value={t.time} onChange={(e) => setT({ ...t, time: e.target.value })} /></div>
      </div>
      <div className="field-row">
        <div className="field">
          <label className="label">Prix par voyageur</label>
          <div style={{ position: "relative" }}>
            <input type="number" className="input" value={t.price} onChange={(e) => setT({ ...t, price: +e.target.value })} style={{ paddingRight: 36 }} />
            <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontWeight: 700, color: "var(--ink-3)" }}>$</span>
          </div>
          <div className="help">Suggestion pour {t.from} → {t.to} : 25–30 $</div>
        </div>
        <div className="field">
          <label className="label">Sièges proposés</label>
          <select className="select" value={t.seats} onChange={(e) => setT({ ...t, seats: +e.target.value })}>
            <option value={1}>1 siège</option>
            <option value={2}>2 sièges</option>
            <option value={3}>3 sièges</option>
            <option value={4}>4 sièges</option>
          </select>
        </div>
      </div>

      <div className="divider"></div>
      <h4 style={{ fontSize: 13, color: "var(--ink-2)", margin: "0 0 12px" }}>Préférences à bord</h4>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <label className="checkbox-row"><input type="checkbox" checked={!t.smoke} onChange={(e) => setT({ ...t, smoke: !e.target.checked })} /> Non-fumeur à bord</label>
        <label className="checkbox-row"><input type="checkbox" checked={t.pets} onChange={(e) => setT({ ...t, pets: e.target.checked })} /> Animaux acceptés</label>
        <label className="checkbox-row"><input type="checkbox" checked={t.music} onChange={(e) => setT({ ...t, music: e.target.checked })} /> Musique en route</label>
        <div className="field" style={{ margin: 0 }}>
          <select className="select" value={t.talk} onChange={(e) => setT({ ...t, talk: e.target.value })}>
            <option>Silencieux</option><option>Modéré</option><option>Au choix</option><option>Bavard</option>
          </select>
        </div>
      </div>

      <div className="card-soft" style={{ marginTop: 14 }}>
        <div className="row-between">
          <div>
            <div className="muted small">Frais Trajexpress à régler maintenant</div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 30, color: "var(--red-deep)", fontWeight: 500, lineHeight: 1.1, marginTop: 4 }}>{fee.toFixed(2)} $</div>
            <div className="small muted">{t.seats} siège{t.seats > 1 ? "s" : ""} × 2 $</div>
          </div>
          <div style={{ textAlign: "right", maxWidth: 240 }}>
            <div className="muted small">Revenu estimé si trajet complet</div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 30, color: "var(--blue-deep)", fontWeight: 500, lineHeight: 1.1, marginTop: 4 }}>+ {(t.price * t.seats).toFixed(0)} $</div>
            <div className="small muted">payé directement par les voyageurs à l'arrivée</div>
          </div>
        </div>
      </div>

      <div className="row-gap" style={{ marginTop: 18 }}>
        <button className="btn btn-ghost" onClick={() => setTab("overview")}>Annuler</button>
        <button className="btn btn-red btn-block btn-lg" onClick={publish}>Payer {fee.toFixed(2)} $ et publier le trajet</button>
      </div>
    </div>
  );
};

const DriverEarnings = ({ postedTrips }) => (
  <>
    <div className="dash-stats" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
      <div className="stat-card">
        <div className="label-stat">Encaissé ce mois</div>
        <div className="val">3 248 $</div>
        <div className="sub">+ 18 % vs. avril</div>
      </div>
      <div className="stat-card">
        <div className="label-stat">Frais Trajexpress payés</div>
        <div className="val" style={{ color: "var(--red-deep)" }}>54 $</div>
        <div className="sub">27 sièges publiés</div>
      </div>
      <div className="stat-card">
        <div className="label-stat">Revenu net</div>
        <div className="val">3 194 $</div>
        <div className="sub">98,3 % de l'encaissé</div>
      </div>
    </div>
    <div className="card">
      <h3 style={{ margin: "0 0 16px", fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Historique des paiements</h3>
      <table className="table">
        <thead><tr><th>Trajet</th><th>Date</th><th>Voyageurs</th><th>Encaissé</th><th>Frais TJX</th></tr></thead>
        <tbody>
          {[
            { id: "TJX-2034", date: "12 mai", route: "QC → Sherbrooke", pax: 3, gain: 105, fee: 6 },
            { id: "TJX-2028", date: "08 mai", route: "QC → Montréal", pax: 4, gain: 112, fee: 8 },
            { id: "TJX-2020", date: "05 mai", route: "QC → Trois-Rivières", pax: 4, gain: 72, fee: 8 },
            { id: "TJX-2014", date: "02 mai", route: "QC → Saguenay", pax: 2, gain: 64, fee: 8 }
          ].map(r => (
            <tr key={r.id}>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{r.id}</td>
              <td>{r.date}</td>
              <td>{r.route} · {r.pax} pers.</td>
              <td><b style={{ color: "var(--blue-deep)" }}>+ {r.gain} $</b></td>
              <td><span style={{ color: "var(--red-deep)" }}>− {r.fee} $</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

const DriverMessages = () => (
  <div className="card">
    <h3 style={{ margin: "0 0 16px", fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Messages</h3>
    {[
      { name: "Léa T.", msg: "Bonjour ! Possible de me prendre au pont de Québec ?", time: "il y a 14 min", unread: true },
      { name: "Hugo C.", msg: "Parfait, je serai 5 min en avance demain matin.", time: "il y a 1 h", unread: true },
      { name: "Anaïs R.", msg: "Merci pour le trajet, super rencontre !", time: "Hier" }
    ].map((m, i) => (
      <div key={i} className="row-between" style={{ padding: "14px 0", borderTop: i ? "1px solid var(--line)" : "none" }}>
        <div className="row-gap">
          <div className="avatar">{m.name.split(" ").map(s => s[0]).join("")}</div>
          <div>
            <div style={{ fontWeight: 700 }}>{m.name} {m.unread && <span className="pill pill-red" style={{ marginLeft: 6, padding: "1px 8px" }}>nouveau</span>}</div>
            <div className="small muted" style={{ marginTop: 2 }}>{m.msg}</div>
          </div>
        </div>
        <div className="small muted">{m.time}</div>
      </div>
    ))}
  </div>
);

const DriverProfile = ({ currentUser }) => (
  <div className="card">
    <h3 style={{ margin: "0 0 18px", fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Mon profil chauffeur</h3>
    <div className="row-gap" style={{ gap: 18, marginBottom: 24 }}>
      <div className="avatar avatar-lg">{currentUser.initials}</div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 18 }}>{currentUser.name}</div>
        <div className="muted small"><span className="star">★</span> 4,9 — 142 trajets · Inscrit en janvier 2024</div>
        <div className="row-gap" style={{ marginTop: 8 }}>
          <span className="pill pill-blue"><Icon name="shield" size={11} /> Vérifié</span>
          <span className="pill pill-green">Permis valide</span>
        </div>
      </div>
    </div>
    <div className="field-row">
      <div className="field"><label className="label">Véhicule</label><input className="input" defaultValue="Toyota Corolla 2021" /></div>
      <div className="field"><label className="label">Couleur</label><input className="input" defaultValue="Gris ardoise" /></div>
    </div>
    <div className="field"><label className="label">Présentation aux voyageurs</label><textarea className="textarea" defaultValue="Conducteur calme, ponctuel, trajet QC-MTL chaque semaine. Bagage et musique au choix." /></div>
    <button className="btn btn-primary">Enregistrer</button>
  </div>
);

window.DriverHub = DriverHub;
