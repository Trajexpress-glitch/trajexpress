// Trajexpress — Espace chauffeur (tableau de bord + publication)
const DriverHub = ({ navigate, currentUser, postedTrips, addTrip, showToast }) => {
  const [tab, setTab] = React.useState("overview");
const { error } = await window.supabaseClient
  .from("trips")
  .insert({
    driver_id: currentUser.id,
    from_city: t.from,
    to_city: t.to,
    departure: `${t.date}T${t.time}`,
    price_per_seat: t.price,
    seats_total: t.seats,
    stripe_paid: false
  });
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
          <button className={`dash-link ${tab === "trips" ? "active" : ""}`} onClick={() => setTab("trips")}><Icon name="car" size={16} /> Mes trajets <span className="pill pill-blue" style={{ marginLeft: "auto", padding: "1px 8px" }}>{postedTrips.length}</span></button>
          <button className={`dash-link ${tab === "post" ? "active" : ""}`} onClick={() => setTab("post")}><Icon name="plus" size={16} /> Publier un trajet</button>
          <button className={`dash-link ${tab === "earnings" ? "active" : ""}`} onClick={() => setTab("earnings")}><Icon name="money" size={16} /> Revenus</button>
          <button className={`dash-link ${tab === "messages" ? "active" : ""}`} onClick={() => setTab("messages")}><Icon name="chat" size={16} /> Messages</button>
          <button className={`dash-link ${tab === "profile" ? "active" : ""}`} onClick={() => setTab("profile")}><Icon name="user" size={16} /> Profil</button>
        </aside>

        <main>
          {tab === "overview" && <DriverOverview postedTrips={postedTrips} setTab={setTab} />}
          {tab === "trips" && <DriverTrips postedTrips={postedTrips} setTab={setTab} />}
          {tab === "post" && <PostTrip addTrip={addTrip} setTab={setTab} showToast={showToast} />}
          {tab === "earnings" && <DriverEarnings postedTrips={postedTrips} />}
          {tab === "messages" && <DriverMessages />}
          {tab === "profile" && <DriverProfile currentUser={currentUser} />}
        </main>
      </div>
    </div>
  );
};

const DriverOverview = ({ postedTrips, setTab }) => {
  const seatsPublished = postedTrips.reduce((s, t) => s + (t.seats || 0), 0);
  const feesPaid = seatsPublished * 2;
  const potentialRevenue = postedTrips.reduce((s, t) => s + (t.price || 0) * (t.seats || 0), 0);
  const isEmpty = postedTrips.length === 0;

  return (
  <>
    <div className="dash-stats">
      <div className="stat-card">
        <div className="label-stat">Trajets publiés</div>
        <div className="val">{postedTrips.length}</div>
        <div className="sub">{isEmpty ? "à venir" : "sur Trajexpress"}</div>
      </div>
      <div className="stat-card accent">
        <div className="label-stat">Frais Trajexpress payés</div>
        <div className="val">{feesPaid} $</div>
        <div className="sub">{seatsPublished} siège(s) publié(s)</div>
      </div>
      <div className="stat-card">
        <div className="label-stat">Revenu potentiel</div>
        <div className="val">{potentialRevenue} $</div>
        <div className="sub">si trajets complets</div>
      </div>
      <div className="stat-card">
        <div className="label-stat">Note moyenne</div>
        <div className="val">—</div>
        <div className="sub">après vos premiers trajets</div>
      </div>
    </div>

    <div className="card" style={{ marginBottom: 16 }}>
      <div className="row-between" style={{ marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Vos prochains trajets</h3>
        {!isEmpty && <button className="btn btn-text" onClick={() => setTab("trips")}>Voir tout →</button>}
      </div>
      {isEmpty ? (
        <div className="text-c" style={{ padding: "30px 20px" }}>
          <div style={{ fontSize: 15, color: "var(--ink-2)", marginBottom: 14 }}>Aucun trajet publié pour l'instant.</div>
          <button className="btn btn-red" onClick={() => setTab("post")}><Icon name="plus" size={13} color="white" /> Publier mon premier trajet</button>
        </div>
      ) : postedTrips.map((t, i) => (
        <div key={i} className="row-between" style={{ padding: "14px 0", borderTop: i ? "1px solid var(--line)" : "none" }}>
          <div>
            <div style={{ fontWeight: 700 }}>{t.from} <span style={{ color: "var(--red)" }}>→</span> {t.to}</div>
            <div className="small muted">{t.date} · {t.time}</div>
          </div>
          <div className="row-gap">
            <div className="pill pill-blue">0/{t.seats} sièges</div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, color: "var(--blue-deep)", minWidth: 70, textAlign: "right" }}>{(t.price * t.seats)} $</div>
          </div>
        </div>
      ))}
    </div>

    <div className="card">
      <h3 style={{ margin: "0 0 16px", fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Revenus encaissés</h3>
      <div className="chart" style={{ alignItems: "center", justifyContent: "center", color: "var(--ink-3)", fontStyle: "italic", fontSize: 14 }}>
        Le graphique apparaîtra après vos premiers trajets terminés.
      </div>
      <div className="row-between" style={{ marginTop: 24 }}>
        <span className="muted small">Total semaine</span>
        <span style={{ fontFamily: "var(--font-serif)", fontSize: 24, color: "var(--blue-deep)", fontWeight: 500 }}>—</span>
      </div>
    </div>
  </>
  );
};

const DriverTrips = ({ postedTrips, setTab }) => {
  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Mes trajets</h3>
        {postedTrips.length > 0 && <button className="btn btn-red" onClick={() => setTab("post")}><Icon name="plus" size={13} color="white" /> Nouveau</button>}
      </div>
      <table className="table">
        <thead>
          <tr><th>ID</th><th>Itinéraire</th><th>Départ</th><th>Sièges</th><th>Prix</th><th>État</th><th></th></tr>
        </thead>
        <tbody>
          {postedTrips.map((t, i) => (
            <tr key={i}>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{t.id}</td>
              <td><b style={{ color: "var(--ink)" }}>{t.from}</b> → {t.to}</td>
              <td>{t.date} · {t.time}</td>
              <td>0/{t.seats}</td>
              <td><b style={{ color: "var(--blue-deep)" }}>{t.price} $</b></td>
              <td><span className="pill pill-blue">Publié</span></td>
              <td><button className="btn btn-text" style={{ padding: 6 }}>Modifier</button></td>
            </tr>
          ))}
          {postedTrips.length === 0 && (
            <tr><td colSpan="7" className="text-c" style={{ padding: "50px 14px" }}>
              <div style={{ color: "var(--ink-2)", marginBottom: 14, fontStyle: "italic" }}>Vous n'avez encore publié aucun trajet.</div>
              <button className="btn btn-red" onClick={() => setTab("post")}><Icon name="plus" size={13} color="white" /> Publier mon premier trajet</button>
            </td></tr>
          )}
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
    // 1. Sauvegarde locale du trajet (sera confirm  ée par le webhook Stripe en production)
    addTrip({ id: `TJX-${Math.floor(2050 + Math.random() * 50)}`, ...t });
    // 2. Redirection vers Stripe pour encaisser les frais (2 $ × nombre de sièges)
    const link = window.TJX_DATA.STRIPE_LINKS.chauffeur;
    showToast(`Redirection vers Stripe · ${fee.toFixed(2)} $ pour ${t.seats} siège(s)…`);
    setTimeout(() => { window.location.href = link; }, 800);
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

      <div className="notice notice-blue" style={{ marginTop: 14, display: "flex", gap: 10, alignItems: "flex-start" }}>
        <Icon name="lock" size={16} color="var(--blue-deep)" />
        <div>
          <b>Paiement par Stripe.</b> Vous serez redirigé vers une page sécurisée pour régler les <b>{fee.toFixed(2)} $</b> de frais Trajexpress. Sur la page Stripe, confirmez bien la quantité de <b>{t.seats} siège(s)</b>.
        </div>
      </div>

      <div className="row-gap" style={{ marginTop: 14 }}>
        <button className="btn btn-ghost" onClick={() => setTab("overview")}>Annuler</button>
        <button className="btn btn-red btn-block btn-lg" onClick={publish}>Payer {fee.toFixed(2)} $ avec Stripe →</button>
      </div>
    </div>
  );
};

const DriverEarnings = ({ postedTrips }) => {
  const seatsPublished = postedTrips.reduce((s, t) => s + (t.seats || 0), 0);
  const feesPaid = seatsPublished * 2;
  return (
  <>
    <div className="dash-stats" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
      <div className="stat-card">
        <div className="label-stat">Encaissé ce mois</div>
        <div className="val">—</div>
        <div className="sub">Payé directement par les voyageurs</div>
      </div>
      <div className="stat-card">
        <div className="label-stat">Frais Trajexpress payés</div>
        <div className="val" style={{ color: "var(--red-deep)" }}>{feesPaid} $</div>
        <div className="sub">{seatsPublished} siège(s) publié(s)</div>
      </div>
      <div className="stat-card">
        <div className="label-stat">Revenu net</div>
        <div className="val">—</div>
        <div className="sub">après vos premières courses</div>
      </div>
    </div>
    <div className="card">
      <h3 style={{ margin: "0 0 16px", fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Historique des paiements</h3>
      <div className="notice notice-blue" style={{ marginBottom: 14 }}>
        <b>Comment fonctionnent vos revenus</b>
        Les frais de course sont remis en main propre par les voyageurs à l'arrivée (comptant ou Interac). Trajexpress n'est pas dans le circuit — nous ne facturons que les <b>2 $ par siège publié</b>.
      </div>
      <div className="text-c" style={{ padding: "30px 14px", color: "var(--ink-3)", fontStyle: "italic" }}>Aucun trajet terminé pour le moment. L'historique apparaîtra ici après vos premières courses.</div>
    </div>
  </>
  );
};

const DriverMessages = () => (
  <div className="card">
    <h3 style={{ margin: "0 0 16px", fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Messages</h3>
    <div className="text-c" style={{ padding: "50px 14px" }}>
      <div style={{ display: "inline-flex", width: 48, height: 48, borderRadius: "50%", background: "var(--blue-tint)", alignItems: "center", justifyContent: "center", color: "var(--blue-deep)", marginBottom: 10 }}>
        <Icon name="chat" size={20} color="var(--blue-deep)" />
      </div>
      <div style={{ fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>Aucun message</div>
      <div className="muted small">Les conversations avec vos voyageurs apparaîtront ici une fois vos trajets réservés.</div>
    </div>
  </div>
);

const DriverProfile = ({ currentUser }) => (
  <div className="card">
    <h3 style={{ margin: "0 0 18px", fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Mon profil chauffeur</h3>
    <div className="row-gap" style={{ gap: 18, marginBottom: 24 }}>
      <div className="avatar avatar-lg">{currentUser.initials}</div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 18 }}>{currentUser.name}</div>
        <div className="muted small">Nouveau chauffeur sur Trajexpress · inscrit aujourd'hui</div>
        <div className="row-gap" style={{ marginTop: 8 }}>
          <span className="pill pill-gold">En cours de vérification</span>
        </div>
      </div>
    </div>
    <div className="field-row">
      <div className="field"><label className="label">Véhicule</label><input className="input" placeholder="ex. Toyota Corolla 2021" /></div>
      <div className="field"><label className="label">Couleur</label><input className="input" placeholder="ex. Gris ardoise" /></div>
    </div>
    <div className="field"><label className="label">Présentation aux voyageurs</label><textarea className="textarea" placeholder="Présentez-vous en quelques lignes : routes habituelles, style de conduite, préférences…"></textarea></div>
    <button className="btn btn-primary">Enregistrer</button>
  </div>
);

window.DriverHub = DriverHub;
