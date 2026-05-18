// Trajexpress — Page admin (protégée par code)
const AdminLock = ({ onUnlock, showToast }) => {
  const [code, setCode] = React.useState("");
  const [err, setErr] = React.useState(false);
  const [verifying, setVerifying] = React.useState(false);

  // Hash du code saisi avec SHA-256, comparé au hash stocké (jamais le code en clair)
  const submitCode = async (e) => {
    e.preventDefault();
    setVerifying(true);
    try {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(code.trim().toUpperCase()));
      const hex = [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
      if (hex === window.TJX_DATA.ADMIN_CODE_HASH) {
        onUnlock();
        showToast("Bienvenue dans l'espace propriétaire");
      } else {
        setErr(true);
        setTimeout(() => setErr(false), 800);
      }
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="page">
      <div className="admin-lock">
        <div style={{ display: "inline-flex", width: 56, height: 56, borderRadius: "50%", background: "var(--blue-tint)", alignItems: "center", justifyContent: "center", color: "var(--blue-deep)" }}>
          <Icon name="lock" size={26} color="var(--blue-deep)" />
        </div>
        <h2>Espace propriétaire</h2>
        <p>Entrez votre code d'accès pour ouvrir le tableau de bord.</p>
        <form onSubmit={submitCode}>
          <input
            className="input admin-code-input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="••-••••-••••"
            style={{ borderColor: err ? "var(--red)" : undefined, animation: err ? "shake 0.4s" : undefined }}
            autoFocus
          />
          <button className="btn btn-primary btn-block btn-lg" style={{ marginTop: 14 }} type="submit" disabled={verifying}>
            {verifying ? "Vérification…" : "Déverrouiller"}
          </button>
        </form>
        <div className="admin-hint" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <Icon name="shield" size={11} color="var(--ink-3)" />
          Accès strictement réservé à l'administrateur de Trajexpress.
        </div>
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
  const isEmpty = ADMIN_TRANSACTIONS.length === 0;
  const fmt = (n) => isEmpty ? "—" : `${n.toFixed(2)} $`;

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
              <div className="val">{fmt(totalRev)}</div>
              <div className="trend" style={{ color: "var(--ink-3)" }}>{isEmpty ? "En attente de la première transaction" : "▲ nouvelle période"}</div>
            </div>
            <div className="admin-stat">
              <div className="label-stat">Inscriptions voyageurs</div>
              <div className="val">{fmt(travRev)}</div>
              <div className="trend" style={{ color: "var(--ink-3)" }}>{travRev > 0 ? `${(travRev / 3).toFixed(0)} nouveaux comptes` : "Aucun pour le moment"}</div>
            </div>
            <div className="admin-stat red">
              <div className="label-stat">Places chauffeurs</div>
              <div className="val">{fmt(driverRev)}</div>
              <div className="trend" style={{ color: "var(--ink-3)" }}>{driverRev > 0 ? `${(driverRev / 2).toFixed(0)} sièges publiés` : "Aucune publication"}</div>
            </div>
            <div className="admin-stat">
              <div className="label-stat">Utilisateurs inscrits</div>
              <div className="val">{ADMIN_USERS.length}</div>
              <div className="trend" style={{ color: "var(--ink-3)" }}>{ADMIN_USERS.length > 0 ? "comptes actifs" : "En attente du premier inscrit"}</div>
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
              <div className="chart" style={{ height: 240, alignItems: "center", justifyContent: "center", color: "var(--ink-3)", fontSize: 14, fontStyle: "italic" }}>
                {isEmpty ? "Le graphique apparaîtra dès la première transaction." : null}
              </div>
            </div>
            <div className="card">
              <h3 style={{ margin: "0 0 14px", fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Répartition</h3>
              <div style={{ position: "relative", width: 180, height: 180, margin: "0 auto 14px" }}>
                <svg viewBox="0 0 36 36" width="180" height="180">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--bg-soft)" strokeWidth="4" />
                  {!isEmpty && <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--blue)" strokeWidth="4"
                    strokeDasharray={`${(travRev / totalRev * 100).toFixed(1)} 100`} strokeDashoffset="25" transform="rotate(-90 18 18)" />}
                  {!isEmpty && <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--red)" strokeWidth="4"
                    strokeDasharray={`${(driverRev / totalRev * 100).toFixed(1)} 100`}
                    strokeDashoffset={`${25 - (travRev / totalRev * 100)}`} transform="rotate(-90 18 18)" />}
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div className="muted small">Total mois</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 26, color: "var(--blue-deep)" }}>{isEmpty ? "—" : `${totalRev.toFixed(0)} $`}</div>
                </div>
              </div>
              <div className="row-between small" style={{ marginBottom: 6 }}>
                <span className="row-gap"><span className="dot" style={{ background: "var(--blue)" }}></span> Voyageurs (3 $)</span>
                <b style={{ color: "var(--blue-deep)" }}>{fmt(travRev)}</b>
              </div>
              <div className="row-between small">
                <span className="row-gap"><span className="dot" style={{ background: "var(--red)" }}></span> Chauffeurs (2 $/place)</span>
                <b style={{ color: "var(--red-deep)" }}>{fmt(driverRev)}</b>
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
                {isEmpty && (
                  <tr><td colSpan="6" className="text-c muted" style={{ padding: "32px 14px", fontStyle: "italic" }}>Aucune transaction pour l'instant. Les paiements apparaîtront ici en temps réel.</td></tr>
                )}
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
              <div className="val">{fmt(totalRev)}</div>
              <div className="trend" style={{ color: "var(--ink-3)" }}>{isEmpty ? "première période" : "période en cours"}</div>
            </div>
            <div className="admin-stat">
              <div className="label-stat">En attente</div>
              <div className="val">{fmt(ADMIN_TRANSACTIONS.filter(t => t.status !== "Encaissé").reduce((s, t) => s + t.amount, 0))}</div>
              <div className="trend" style={{ color: "var(--ink-3)" }}>{ADMIN_TRANSACTIONS.filter(t => t.status !== "Encaissé").length} transaction(s)</div>
            </div>
            <div className="admin-stat red">
              <div className="label-stat">Trajets actifs</div>
              <div className="val">{TRIPS_SEED.length}</div>
              <div className="trend" style={{ color: "var(--ink-3)" }}>publiés par les chauffeurs</div>
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
                {isEmpty && (
                  <tr><td colSpan="6" className="text-c muted" style={{ padding: "40px 14px", fontStyle: "italic" }}>Aucune transaction enregistrée. Les paiements Stripe apparaîtront ici automatiquement.</td></tr>
                )}
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
              <span><b style={{ color: "var(--blue-deep)" }}>{ADMIN_USERS.filter(u => u.role === "Voyageur").length}</b> voyageur(s)</span>
              <span>·</span>
              <span><b style={{ color: "var(--red-deep)" }}>{ADMIN_USERS.filter(u => u.role === "Chauffeur").length}</b> chauffeur(s)</span>
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
              {ADMIN_USERS.length === 0 && (
                <tr><td colSpan="6" className="text-c muted" style={{ padding: "40px 14px", fontStyle: "italic" }}>Aucun utilisateur inscrit pour l'instant. Les nouveaux comptes apparaîtront ici.</td></tr>
              )}
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
              {TRIPS_SEED.length === 0 && (
                <tr><td colSpan="7" className="text-c muted" style={{ padding: "40px 14px", fontStyle: "italic" }}>Aucun trajet publié sur la plateforme pour le moment.</td></tr>
              )}
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
          <div className="notice notice-blue" style={{ marginBottom: 14 }}>
            <b>Code stocké sous forme de hash SHA-256.</b>
            La valeur en clair n'est plus présente nulle part dans le code source. En production, elle vit uniquement dans la variable d'environnement Vercel <span style={{ fontFamily: "var(--font-mono)", background: "white", padding: "1px 6px", borderRadius: 4 }}>ADMIN_ACCESS_CODE_HASH</span>.
          </div>
          <div className="field">
            <label className="label">Empreinte actuelle (hash)</label>
            <input className="input" readOnly value={window.TJX_DATA.ADMIN_CODE_HASH.slice(0, 16) + "…" + window.TJX_DATA.ADMIN_CODE_HASH.slice(-8)} style={{ fontFamily: "var(--font-mono)", fontSize: 13 }} />
            <div className="help">Cette empreinte ne permet pas de retrouver le code d'origine. Pour changer le code, générez-en un nouveau ci-dessous.</div>
          </div>
          <button className="btn btn-red" onClick={() => alert("En production : génère un nouveau code, l'envoie au courriel propriétaire, et révoque l'ancien.")}><Icon name="shield" size={13} color="white" /> Générer un nouveau code et l'envoyer par courriel</button>
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
