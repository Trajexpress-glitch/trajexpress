// Trajexpress — Page admin (protégée par code)
const AdminLock = ({ onUnlock, showToast }) => {
  const [code, setCode] = React.useState("");
  const [err, setErr] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === window.TJX_DATA.ADMIN_CODE) {
      onUnlock();
      showToast("Bienvenue dans l'espace propriétaire");
    } else {
      setErr(true);
      setTimeout(() => setErr(false), 800);
    }
  };

  return (
    <div className="page">
      <div className="admin-lock">
        <div style={{ display: "inline-flex", width: 56, height: 56, borderRadius: "50%", background: "var(--blue-tint)", alignItems: "center", justifyContent: "center", color: "var(--blue-deep)" }}>
          <Icon name="lock" size={26} color="var(--blue-deep)" />
        </div>
        <h2>Espace propriétaire</h2>
        <p>Cette section est réservée à l'administrateur de Trajexpress. Entrez votre code d'accès.</p>
        <form onSubmit={submit}>
          <input
            className="input admin-code-input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="••-••••-••••"
            style={{ borderColor: err ? "var(--red)" : undefined, animation: err ? "shake 0.4s" : undefined }}
            autoFocus
          />
          <button className="btn btn-primary btn-block btn-lg" style={{ marginTop: 14 }} type="submit">Déverrouiller</button>
        </form>
        <div className="admin-hint">Code de démonstration : <b style={{ color: "var(--blue-deep)", fontFamily: "var(--font-mono)" }}>{window.TJX_DATA.ADMIN_CODE}</b></div>
      </div>
      <style>{`@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }`}</style>
    </div>
  );
};

const AdminDashboard = ({ navigate, onLock }) => {
  const [tab, setTab] = React.useState("overview");
  const { ADMIN_TRANSACTIONS, ADMIN_USERS, TRIPS_SEED } = window.TJX_DATA;

  const totalRev = ADMIN_TRANSACTIONS.reduce((s, t) => s + (t.status === "Encaissé" ? t.amount : 0), 0);
  const travRev = ADMIN_TRANSACTIONS.filter(t => t.type.includes("voyageur") && t.status === "Encaissé").reduce((s, t) => s + t.amount, 0);
  const driverRev = ADMIN_TRANSACTIONS.filter(t => t.type.includes("chauffeur") && t.status === "Encaissé").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="page">
      <div className="row-between" style={{ marginBottom: 22 }}>
        <div>
          <div className="row-gap" style={{ marginBottom: 8 }}>
            <span className="pill pill-ink"><Icon name="shield" size={11} color="white" /> Espace propriétaire</span>
            <span className="pill"><span className="dot" style={{ background: "var(--green)" }}></span> Système en ligne</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 36, margin: 0, color: "var(--blue-deep)" }}>Tableau de bord <em style={{ color: "var(--red-deep)" }}>Trajexpress</em></h1>
          <p className="muted" style={{ margin: "4px 0 0" }}>Bonjour, propriétaire. Aperçu de la plateforme au 16 mai 2026.</p>
        </div>
        <button className="btn btn-ghost" onClick={onLock}><Icon name="lock" size={14} /> Verrouiller</button>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid var(--line)" }}>
        {[
          { id: "overview", label: "Vue d'ensemble" },
          { id: "revenue", label: "Revenus & transactions" },
          { id: "users", label: "Utilisateurs" },
          { id: "trips", label: "Trajets publiés" },
          { id: "settings", label: "Paramètres" }
        ].map(t => (
          <button key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: "12px 18px",
              fontSize: 14,
              fontWeight: 600,
              color: tab === t.id ? "var(--blue-deep)" : "var(--ink-2)",
              borderBottom: tab === t.id ? "2px solid var(--red)" : "2px solid transparent",
              marginBottom: -1
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <>
          <div className="admin-stats">
            <div className="admin-stat">
              <div className="label-stat">Revenu total (mois)</div>
              <div className="val">{totalRev.toFixed(2)} $</div>
              <div className="trend">▲ + 22 % vs. avril</div>
            </div>
            <div className="admin-stat">
              <div className="label-stat">Inscriptions voyageurs</div>
              <div className="val">{travRev.toFixed(0)} $</div>
              <div className="trend">{(travRev / 3).toFixed(0)} nouveaux comptes</div>
            </div>
            <div className="admin-stat red">
              <div className="label-stat">Places chauffeurs</div>
              <div className="val">{driverRev.toFixed(0)} $</div>
              <div className="trend">{(driverRev / 2).toFixed(0)} sièges publiés</div>
            </div>
            <div className="admin-stat">
              <div className="label-stat">Utilisateurs actifs</div>
              <div className="val">2 137</div>
              <div className="trend">+ 84 cette semaine</div>
            </div>
          </div>

          <div className="admin-grid">
            <div className="card">
              <div className="row-between" style={{ marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Revenus journaliers (14 jours)</h3>
                <div className="row-gap small">
                  <span className="row-gap"><span className="dot" style={{ background: "var(--blue)" }}></span> Inscriptions</span>
                  <span className="row-gap"><span className="dot" style={{ background: "var(--red)" }}></span> Places</span>
                </div>
              </div>
              <div className="chart" style={{ height: 240 }}>
                {[
                  [12, 8], [9, 14], [15, 6], [21, 12], [18, 16], [6, 4], [3, 2],
                  [24, 18], [27, 20], [21, 16], [33, 22], [30, 28], [9, 6], [12, 14]
                ].map((v, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, justifyContent: "flex-end", position: "relative" }}>
                    <div className="bar red" style={{ height: `${(v[1] / 40) * 100}%`, borderRadius: 0 }}></div>
                    <div className="bar" style={{ height: `${(v[0] / 40) * 100}%`, borderRadius: "6px 6px 0 0" }}>
                      {i % 2 === 0 && <div className="bar-label">{3 + i}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <h3 style={{ margin: "0 0 14px", fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Répartition</h3>
              <div style={{ position: "relative", width: 180, height: 180, margin: "0 auto 14px" }}>
                <svg viewBox="0 0 36 36" width="180" height="180">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--bg-soft)" strokeWidth="4" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--blue)" strokeWidth="4"
                    strokeDasharray={`${(travRev / totalRev * 100).toFixed(1)} 100`} strokeDashoffset="25" transform="rotate(-90 18 18)" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--red)" strokeWidth="4"
                    strokeDasharray={`${(driverRev / totalRev * 100).toFixed(1)} 100`}
                    strokeDashoffset={`${25 - (travRev / totalRev * 100)}`} transform="rotate(-90 18 18)" />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div className="muted small">Total mois</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 26, color: "var(--blue-deep)" }}>{totalRev.toFixed(0)} $</div>
                </div>
              </div>
              <div className="row-between small" style={{ marginBottom: 6 }}>
                <span className="row-gap"><span className="dot" style={{ background: "var(--blue)" }}></span> Voyageurs (3 $)</span>
                <b style={{ color: "var(--blue-deep)" }}>{travRev.toFixed(0)} $</b>
              </div>
              <div className="row-between small">
                <span className="row-gap"><span className="dot" style={{ background: "var(--red)" }}></span> Chauffeurs (2 $/place)</span>
                <b style={{ color: "var(--red-deep)" }}>{driverRev.toFixed(0)} $</b>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: 18 }}>
            <div className="row-between" style={{ marginBottom: 12 }}>
              <h3 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Dernières transactions</h3>
              <button className="btn btn-text" onClick={() => setTab("revenue")}>Voir tout →</button>
            </div>
            <table className="table">
              <thead><tr><th>ID</th><th>Date</th><th>Type</th><th>Utilisateur</th><th>Montant</th><th>État</th></tr></thead>
              <tbody>
                {ADMIN_TRANSACTIONS.slice(0, 5).map(t => (
                  <tr key={t.id}>
                    <td style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{t.id}</td>
                    <td>{t.date}</td>
                    <td>{t.type}</td>
                    <td>{t.user}</td>
                    <td><b style={{ color: "var(--blue-deep)" }}>{t.amount.toFixed(2)} $</b></td>
                    <td><span className={`pill ${t.status === "Encaissé" ? "pill-green" : "pill-gold"}`}>{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "revenue" && (
        <>
          <div className="admin-stats" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div className="admin-stat">
              <div className="label-stat">Encaissé ce mois</div>
              <div className="val">{totalRev.toFixed(2)} $</div>
              <div className="trend">▲ + 22 %</div>
            </div>
            <div className="admin-stat">
              <div className="label-stat">En attente</div>
              <div className="val">3,00 $</div>
              <div className="trend" style={{ color: "var(--ink-3)" }}>1 transaction</div>
            </div>
            <div className="admin-stat red">
              <div className="label-stat">Projeté fin de mois</div>
              <div className="val">≈ 92 $</div>
              <div className="trend">basé sur la tendance</div>
            </div>
          </div>
          <div className="card">
            <div className="row-between" style={{ marginBottom: 12 }}>
              <h3 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Toutes les transactions</h3>
              <div className="row-gap">
                <input className="input" placeholder="Rechercher…" style={{ width: 220 }} />
                <button className="btn btn-ghost">Exporter CSV</button>
              </div>
            </div>
            <table className="table">
              <thead><tr><th>ID</th><th>Date</th><th>Type</th><th>Utilisateur</th><th>Montant</th><th>État</th></tr></thead>
              <tbody>
                {ADMIN_TRANSACTIONS.map(t => (
                  <tr key={t.id}>
                    <td style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{t.id}</td>
                    <td>{t.date}</td>
                    <td>{t.type}</td>
                    <td>{t.user}</td>
                    <td><b style={{ color: "var(--blue-deep)" }}>{t.amount.toFixed(2)} $</b></td>
                    <td><span className={`pill ${t.status === "Encaissé" ? "pill-green" : "pill-gold"}`}>{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "users" && (
        <div className="card">
          <div className="row-between" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Utilisateurs inscrits</h3>
            <div className="row-gap small muted">
              <span><b style={{ color: "var(--blue-deep)" }}>1 384</b> voyageurs</span>
              <span>·</span>
              <span><b style={{ color: "var(--red-deep)" }}>753</b> chauffeurs</span>
            </div>
          </div>
          <table className="table">
            <thead><tr><th>Nom</th><th>Rôle</th><th>Trajets</th><th>Inscrit depuis</th><th>État</th><th></th></tr></thead>
            <tbody>
              {ADMIN_USERS.map((u, i) => (
                <tr key={i}>
                  <td>
                    <div className="row-gap">
                      <div className="avatar" style={{ width: 32, height: 32, fontSize: 12 }}>{u.name.split(" ").map(s => s[0]).join("")}</div>
                      <b style={{ color: "var(--ink)" }}>{u.name}</b>
                    </div>
                  </td>
                  <td><span className={`pill ${u.role === "Chauffeur" ? "pill-red" : "pill-blue"}`}>{u.role}</span></td>
                  <td>{u.trips}</td>
                  <td>{u.since}</td>
                  <td><span className={`pill ${u.status === "En attente" ? "pill-gold" : "pill-green"}`}>{u.status}</span></td>
                  <td><button className="btn btn-text" style={{ padding: 6 }}>Voir</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "trips" && (
        <div className="card">
          <h3 style={{ margin: "0 0 14px", fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Trajets actifs sur la plateforme</h3>
          <table className="table">
            <thead><tr><th>ID</th><th>Chauffeur</th><th>Itinéraire</th><th>Date</th><th>Sièges</th><th>Prix</th><th>Frais perçus</th></tr></thead>
            <tbody>
              {TRIPS_SEED.map(t => (
                <tr key={t.id}>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{t.id}</td>
                  <td>{t.driver.name}</td>
                  <td><b style={{ color: "var(--ink)" }}>{t.from}</b> → {t.to}</td>
                  <td>{t.date} {t.start}</td>
                  <td>{t.totalSeats - t.seats}/{t.totalSeats}</td>
                  <td>{t.price} $</td>
                  <td><b style={{ color: "var(--red-deep)" }}>{(t.totalSeats * 2).toFixed(2)} $</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "settings" && (
        <div className="card" style={{ maxWidth: 640 }}>
          <h3 style={{ margin: "0 0 18px", fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Tarification de la plateforme</h3>
          <div className="field-row">
            <div className="field">
              <label className="label">Inscription voyageur</label>
              <div style={{ position: "relative" }}>
                <input className="input" defaultValue="3.00" style={{ paddingRight: 36 }} />
                <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "var(--ink-3)" }}>$</span>
              </div>
              <div className="help">Frais uniques perçus à l'inscription d'un voyageur.</div>
            </div>
            <div className="field">
              <label className="label">Frais par siège chauffeur</label>
              <div style={{ position: "relative" }}>
                <input className="input" defaultValue="2.00" style={{ paddingRight: 36 }} />
                <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "var(--ink-3)" }}>$</span>
              </div>
              <div className="help">Prélevé sur chaque siège publié par un chauffeur.</div>
            </div>
          </div>
          <div className="divider"></div>
          <h3 style={{ margin: "0 0 14px", fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Code d'accès propriétaire</h3>
          <div className="field">
            <label className="label">Code actuel</label>
            <input className="input admin-code-input" defaultValue={window.TJX_DATA.ADMIN_CODE} style={{ fontSize: 16 }} />
            <div className="help">Changez ce code régulièrement pour sécuriser l'accès au tableau de bord.</div>
          </div>
          <button className="btn btn-primary">Enregistrer les modifications</button>
        </div>
      )}
    </div>
  );
};

const AdminPage = (props) => {
  const [unlocked, setUnlocked] = React.useState(false);
  return unlocked
    ? <AdminDashboard {...props} onLock={() => setUnlocked(false)} />
    : <AdminLock {...props} onUnlock={() => setUnlocked(true)} />;
};

window.AdminPage = AdminPage;
