// Trajexpress — Page d'information chauffeur (frais gates derrière connexion)
const DriverInfo = ({ navigate, currentUser }) => {
  const isLogged = !!currentUser;

  return (
    <div className="page">
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 40, alignItems: "center", marginBottom: 50 }}>
        <div>
          <span className="pill pill-red"><span className="dot"></span> Devenez chauffeur</span>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 52, lineHeight: 1.05, color: "var(--blue-deep)", margin: "16px 0 14px" }}>
            Vos kilomètres <em style={{ color: "var(--red-deep)" }}>valent quelque chose.</em>
          </h1>
          <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: 520, marginBottom: 24 }}>
            Trajexpress ne prend aucune commission sur vos courses. Vous fixez vos tarifs, vos voyageurs vous paient directement à l'arrivée. La plateforme se rémunère uniquement par de petits frais transparents, dévoilés dans votre espace chauffeur.
          </p>
          <div className="row-gap">
            <button className="btn btn-red btn-lg" onClick={() => navigate("signup")}>{isLogged ? "Accéder à mon tableau de bord" : "Créer un compte chauffeur"}</button>
            <button className="btn btn-ghost btn-lg" onClick={() => navigate("search")}>Voir les trajets existants</button>
          </div>
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {isLogged ? (
            <div className="card" style={{ background: "linear-gradient(135deg, var(--blue-deep) 0%, var(--blue) 100%)", color: "white", border: "none" }}>
              <div className="muted small" style={{ color: "oklch(0.85 0.02 255)" }}>Exemple de trajet QC → Montréal</div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 38, fontWeight: 500, marginTop: 6 }}>112 $ <span style={{ fontSize: 14, opacity: 0.7 }}>encaissés</span></div>
              <div className="divider" style={{ background: "rgba(255,255,255,0.15)" }}></div>
              <div className="row-between" style={{ fontSize: 13 }}>
                <span style={{ color: "oklch(0.85 0.02 255)" }}>4 sièges × 28 $</span>
                <span>+ 112,00 $</span>
              </div>
              <div className="row-between" style={{ fontSize: 13, marginTop: 6 }}>
                <span style={{ color: "oklch(0.85 0.02 255)" }}>Frais Trajexpress (4 × 2 $)</span>
                <span style={{ color: "oklch(0.85 0.15 25)" }}>− 8,00 $</span>
              </div>
              <div className="row-between" style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.18)" }}>
                <b>Net dans votre poche</b>
                <b style={{ fontFamily: "var(--font-serif)", fontSize: 22 }}>104 $</b>
              </div>
            </div>
          ) : (
            <div className="card" style={{ background: "linear-gradient(135deg, var(--blue-deep) 0%, var(--blue) 100%)", color: "white", border: "none", position: "relative", overflow: "hidden" }}>
              <div className="muted small" style={{ color: "oklch(0.85 0.02 255)" }}>Exemple de revenu chauffeur</div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 38, fontWeight: 500, marginTop: 6, filter: "blur(6px)", userSelect: "none" }}>1•• $ encaissés</div>
              <div className="divider" style={{ background: "rgba(255,255,255,0.15)" }}></div>
              <div className="row-between" style={{ fontSize: 13, filter: "blur(4px)", userSelect: "none" }}>
                <span>•• sièges × •• $</span>
                <span>+ •••,•• $</span>
              </div>
              <div className="row-between" style={{ fontSize: 13, marginTop: 6, filter: "blur(4px)", userSelect: "none" }}>
                <span>Frais Trajexpress</span>
                <span>− •,•• $</span>
              </div>
              <div className="row-between" style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.18)", filter: "blur(4px)", userSelect: "none" }}>
                <b>Net dans votre poche</b>
                <b style={{ fontFamily: "var(--font-serif)", fontSize: 22 }}>••• $</b>
              </div>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, oklch(0.32 0.13 258 / 0.4) 0%, oklch(0.42 0.14 255 / 0.4) 100%)", backdropFilter: "blur(2px)" }}>
                <Icon name="lock" size={26} color="white" />
                <div style={{ fontWeight: 700, marginTop: 8 }}>Détails après inscription</div>
                <button className="btn btn-red" style={{ marginTop: 12 }} onClick={() => navigate("signup")}>Créer mon compte</button>
              </div>
            </div>
          )}
          <div className="card-soft" style={{ display: "flex", gap: 10, padding: 14 }}>
            <Icon name="money" size={22} color="var(--blue-deep)" />
            <div className="small" style={{ color: "var(--ink-2)" }}>
              <b style={{ color: "var(--ink)" }}>Paiement direct.</b> Aucun virement à attendre, aucune commission cachée. Vos voyageurs vous remettent l'argent à l'arrivée.
            </div>
          </div>
        </div>
      </div>

      <h2 className="section-title">Le modèle <em>Trajexpress</em></h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 50 }}>
        <div className="card">
          <div className="row-gap" style={{ marginBottom: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--blue-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="user" size={22} color="var(--blue-deep)" />
            </div>
            <h3 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)" }}>Côté voyageur</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 18, color: "var(--ink-2)", lineHeight: 1.7 }}>
            <li>Inscription <b>unique</b> à Trajexpress</li>
            <li>Les frais du trajet sont remis directement au chauffeur</li>
            <li>Aucun frais de plateforme à chaque réservation</li>
            {isLogged && <li style={{ color: "var(--blue-deep)", fontWeight: 600 }}>Montant exact : <b>3,00 $</b> à l'inscription</li>}
          </ul>
        </div>
        <div className="card">
          <div className="row-gap" style={{ marginBottom: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--red-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="car" size={22} color="var(--red-deep)" />
            </div>
            <h3 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--red-deep)" }}>Côté chauffeur</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 18, color: "var(--ink-2)", lineHeight: 1.7 }}>
            <li>Inscription <b>gratuite</b></li>
            <li>Petite contribution par siège publié</li>
            <li>Vous fixez le prix, les voyageurs payent à l'arrivée</li>
            {isLogged && <li style={{ color: "var(--red-deep)", fontWeight: 600 }}>Montant exact : <b>2,00 $</b> par siège proposé</li>}
          </ul>
        </div>
      </div>

      {!isLogged && (
        <div className="card" style={{ background: "var(--bg-soft)", padding: 28, marginBottom: 50, display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 18, alignItems: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "var(--blue-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="lock" size={24} color="var(--blue-deep)" />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, color: "var(--blue-deep)", fontWeight: 500 }}>Tarification détaillée réservée aux membres</div>
            <p className="muted" style={{ margin: "4px 0 0" }}>Créez un compte gratuit pour consulter les montants exacts, les exemples chiffrés et l'historique de vos frais.</p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => navigate("signup")}>S'inscrire</button>
        </div>
      )}

      <h2 className="section-title">Questions <em>fréquentes</em></h2>
      <div style={{ display: "grid", gap: 10, maxWidth: 800, marginBottom: 60 }}>
        {[
          { q: "Comment Trajexpress gagne-t-il de l'argent ?", a: isLogged
              ? "Uniquement par deux frais transparents : 3 $ à l'inscription d'un voyageur (une seule fois) et 2 $ par siège publié par un chauffeur. Aucune commission sur les courses."
              : "Par de petits frais transparents à l'inscription voyageur et par siège publié côté chauffeur. Aucune commission sur les courses. Les montants détaillés sont visibles dans votre espace après inscription." },
          { q: "Quand le chauffeur reçoit-il son argent ?", a: "Directement à l'arrivée, en main propre. Argent comptant ou virement Interac, selon ce que vous convenez avec vos voyageurs." },
          { q: "Que se passe-t-il si un voyageur annule ?", a: "Le siège redevient disponible sur la plateforme. Le chauffeur conserve l'avance Trajexpress déjà payée — le siège peut être rerempli sans surcoût." },
          { q: "Faut-il un permis particulier ?", a: "Un permis de conduire valide au Québec et une assurance responsabilité civile suffisent. Aucune licence commerciale n'est requise pour le covoiturage non lucratif." }
        ].map((f, i) => (
          <details key={i} className="card" style={{ padding: "16px 20px" }}>
            <summary style={{ fontWeight: 700, color: "var(--blue-deep)", cursor: "pointer", fontSize: 16 }}>{f.q}</summary>
            <p style={{ margin: "10px 0 0", color: "var(--ink-2)" }}>{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
};

// ---------- Pricing page (logged-in only) ----------
const PricingPage = ({ navigate, currentUser }) => {
  if (!currentUser) {
    return (
      <div className="page">
        <div className="admin-lock" style={{ marginTop: 80 }}>
          <div style={{ display: "inline-flex", width: 56, height: 56, borderRadius: "50%", background: "var(--blue-tint)", alignItems: "center", justifyContent: "center", color: "var(--blue-deep)" }}>
            <Icon name="lock" size={26} color="var(--blue-deep)" />
          </div>
          <h2>Tarification réservée aux membres</h2>
          <p>Connectez-vous ou créez un compte pour consulter les frais détaillés de Trajexpress.</p>
          <div className="row-gap" style={{ justifyContent: "center" }}>
            <button className="btn btn-ghost btn-lg" onClick={() => navigate("signin")}>Se connecter</button>
            <button className="btn btn-primary btn-lg" onClick={() => navigate("signup")}>Créer un compte</button>
          </div>
        </div>
      </div>
    );
  }

  const isDriver = currentUser.type === "driver";

  return (
    <div className="page">
      <div className="row-gap" style={{ marginBottom: 8 }}>
        <span className="pill pill-blue"><Icon name="shield" size={11} /> Membre</span>
        <span className="pill">{isDriver ? "Compte chauffeur" : "Compte voyageur"}</span>
      </div>
      <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 42, margin: "6px 0 8px", color: "var(--blue-deep)" }}>
        Tarification <em style={{ color: "var(--red-deep)" }}>Trajexpress</em>
      </h1>
      <p style={{ color: "var(--ink-2)", fontSize: 16, maxWidth: 680, marginBottom: 32 }}>
        Voici le détail complet des frais perçus par Trajexpress. Aucune commission cachée, aucune surprise à l'arrivée.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 32 }}>
        <div className="card" style={{ borderTop: "4px solid var(--blue)", position: "relative", overflow: "hidden" }}>
          <div className="pill pill-blue" style={{ position: "absolute", top: 18, right: 18 }}>Voyageur</div>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--blue-soft)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
            <Icon name="user" size={22} color="var(--blue-deep)" />
          </div>
          <h3 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 22, color: "var(--blue-deep)" }}>Inscription voyageur</h3>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 56, fontWeight: 500, color: "var(--blue-deep)", lineHeight: 1, margin: "18px 0 4px" }}>3,00 $</div>
          <div className="muted small">une seule fois · valable à vie</div>
          <div className="divider"></div>
          <ul style={{ margin: 0, paddingLeft: 18, color: "var(--ink-2)", lineHeight: 1.7, fontSize: 14 }}>
            <li>Compte permanent</li>
            <li>Réservations illimitées</li>
            <li>Aucun frais à la réservation</li>
            <li>Paiement du trajet directement au chauffeur</li>
          </ul>
        </div>

        <div className="card" style={{ borderTop: "4px solid var(--red)", position: "relative", overflow: "hidden" }}>
          <div className="pill pill-red" style={{ position: "absolute", top: 18, right: 18 }}>Chauffeur</div>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--red-soft)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
            <Icon name="car" size={22} color="var(--red-deep)" />
          </div>
          <h3 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 22, color: "var(--red-deep)" }}>Publication de trajet</h3>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "18px 0 4px" }}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 56, fontWeight: 500, color: "var(--red-deep)", lineHeight: 1 }}>2,00 $</div>
            <div className="muted" style={{ fontSize: 16 }}>/ siège proposé</div>
          </div>
          <div className="muted small">prélevé à la publication</div>
          <div className="divider"></div>
          <ul style={{ margin: 0, paddingLeft: 18, color: "var(--ink-2)", lineHeight: 1.7, fontSize: 14 }}>
            <li>Inscription gratuite</li>
            <li>Vous fixez le prix de chaque trajet</li>
            <li>Aucune commission sur les courses</li>
            <li>Encaissement direct des voyageurs à l'arrivée</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 32 }}>
        <h3 style={{ margin: "0 0 18px", fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)", fontSize: 22 }}>Exemples chiffrés</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          {[
            { title: "Trajet QC → Montréal", seats: 4, price: 28 },
            { title: "Trajet QC → Trois-Rivières", seats: 3, price: 18 },
            { title: "Trajet QC → Sherbrooke", seats: 2, price: 35 }
          ].map((ex, i) => {
            const gross = ex.seats * ex.price;
            const fee = ex.seats * 2;
            return (
              <div key={i} className="card-soft" style={{ padding: 18 }}>
                <div className="muted small">{ex.title}</div>
                <div className="row-between" style={{ marginTop: 10, fontSize: 13 }}>
                  <span>{ex.seats} sièges × {ex.price} $</span>
                  <b style={{ color: "var(--blue-deep)" }}>+ {gross} $</b>
                </div>
                <div className="row-between" style={{ fontSize: 13, marginTop: 4 }}>
                  <span>Frais Trajexpress</span>
                  <b style={{ color: "var(--red-deep)" }}>− {fee} $</b>
                </div>
                <div className="divider" style={{ margin: "10px 0" }}></div>
                <div className="row-between">
                  <b>Net chauffeur</b>
                  <b style={{ fontFamily: "var(--font-serif)", fontSize: 22, color: "var(--blue-deep)" }}>{gross - fee} $</b>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card">
        <h3 style={{ margin: "0 0 16px", fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--blue-deep)", fontSize: 22 }}>
          {isDriver ? "Mon historique de frais" : "Mon inscription"}
        </h3>
        {isDriver ? (
          <table className="table">
            <thead><tr><th>Date</th><th>Trajet</th><th>Sièges</th><th>Frais payés</th><th>État</th></tr></thead>
            <tbody>
              <tr><td>12 mai 2026</td><td>QC → Sherbrooke</td><td>3</td><td><b style={{ color: "var(--red-deep)" }}>6,00 $</b></td><td><span className="pill pill-green">Encaissé</span></td></tr>
              <tr><td>08 mai 2026</td><td>QC → Montréal</td><td>4</td><td><b style={{ color: "var(--red-deep)" }}>8,00 $</b></td><td><span className="pill pill-green">Encaissé</span></td></tr>
              <tr><td>05 mai 2026</td><td>QC → Trois-Rivières</td><td>4</td><td><b style={{ color: "var(--red-deep)" }}>8,00 $</b></td><td><span className="pill pill-green">Encaissé</span></td></tr>
              <tr><td>02 mai 2026</td><td>QC → Saguenay</td><td>4</td><td><b style={{ color: "var(--red-deep)" }}>8,00 $</b></td><td><span className="pill pill-green">Encaissé</span></td></tr>
            </tbody>
          </table>
        ) : (
          <div className="row-between" style={{ padding: "10px 0" }}>
            <div>
              <div style={{ fontWeight: 700 }}>Inscription voyageur Trajexpress</div>
              <div className="muted small">Payée le 16 mai 2026 · Carte ••4242</div>
            </div>
            <div className="row-gap">
              <span className="pill pill-green">Encaissé</span>
              <b style={{ fontFamily: "var(--font-serif)", fontSize: 22, color: "var(--blue-deep)" }}>3,00 $</b>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

window.DriverInfo = DriverInfo;
window.PricingPage = PricingPage;
