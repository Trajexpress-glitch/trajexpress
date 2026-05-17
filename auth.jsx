// Trajexpress — Auth (inscription / connexion)
const Auth = ({ mode, navigate, setCurrentUser, showToast }) => {
  const [tab, setTab] = React.useState(mode === "signin" ? "signin" : "signup");
  const [role, setRole] = React.useState("traveler");
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({ firstName: "", lastName: "", email: "", phone: "", password: "", agree: false, card: "", exp: "", cvv: "" });

  const isDriver = role === "driver";
  const fee = isDriver ? 0 : 3;

  if (tab === "signin") {
    return (
      <div className="page page-narrow">
        <div className="auth-shell">
          <div className="auth-side">
            <div>
              <Brand />
              <h2 style={{ marginTop: 28 }}>Heureux de vous <em>revoir</em>.</h2>
              <p>Reprenez votre route où vous l'avez laissée. Vos trajets, vos chauffeurs préférés, vos préférences — tout est là.</p>
            </div>
            <div className="placeholder-img" style={{ height: 140 }}>route Québec → Montréal</div>
          </div>
          <div className="auth-body">
            <div className="auth-tabs">
              <button className={`auth-tab ${tab === "signin" ? "active" : ""}`} onClick={() => setTab("signin")}>Connexion</button>
              <button className={`auth-tab ${tab === "signup" ? "active" : ""}`} onClick={() => { setTab("signup"); navigate("signup"); }}>Inscription</button>
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 28, color: "var(--blue-deep)", margin: "0 0 22px" }}>Connexion</h2>
            <div className="field">
              <label className="label">Courriel</label>
              <input className="input" placeholder="vous@exemple.qc" defaultValue="lea.tremblay@exemple.qc" />
            </div>
            <div className="field">
              <label className="label">Mot de passe</label>
              <input className="input" type="password" defaultValue="••••••••••" />
            </div>
            <div className="row-between" style={{ marginBottom: 18 }}>
              <label className="checkbox-row"><input type="checkbox" /> Rester connecté</label>
              <a href="#" className="small" style={{ color: "var(--blue-deep)" }}>Mot de passe oublié ?</a>
            </div>
            <button className="btn btn-primary btn-block btn-lg" onClick={() => {
              setCurrentUser({ name: "Léa Tremblay", initials: "LT", type: "traveler" });
              showToast("Bienvenue, Léa !");
              navigate("home");
            }}>Se connecter</button>
            <div className="text-c muted small" style={{ marginTop: 16 }}>
              Pas encore inscrit ? <a href="#" onClick={(e) => { e.preventDefault(); setTab("signup"); }} style={{ color: "var(--blue-deep)", fontWeight: 600 }}>Créer un compte</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Signup flow
  return (
    <div className="page page-narrow">
      <div className="auth-shell">
        <div className="auth-side">
          <div>
            <Brand />
            <h2 style={{ marginTop: 28 }}>Bienvenue sur <em>Trajexpress</em>.</h2>
            <p>Inscrivez-vous une seule fois — vous voyagerez ensuite à travers le Québec en quelques clics.</p>
          </div>
          <div className="auth-side-list">
            <div className="row"><span className="bullet">1</span><span>Choisissez votre rôle : voyageur ou chauffeur</span></div>
            <div className="row"><span className="bullet">2</span><span>Remplissez votre profil (5 minutes)</span></div>
            <div className="row"><span className="bullet">3</span><span>{isDriver ? "Payez de petits frais par siège proposé" : "Réglez les frais d'inscription unique"}</span></div>
            <div className="row"><span className="bullet">4</span><span>Vous êtes prêt à rouler</span></div>
          </div>
        </div>
        <div className="auth-body">
          <div className="auth-tabs">
            <button className={`auth-tab ${tab === "signin" ? "active" : ""}`} onClick={() => { setTab("signin"); navigate("signin"); }}>Connexion</button>
            <button className={`auth-tab ${tab === "signup" ? "active" : ""}`} onClick={() => setTab("signup")}>Inscription</button>
          </div>

          {step === 1 && (
            <>
              <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 28, color: "var(--blue-deep)", margin: "0 0 6px" }}>Vous voyagez comment ?</h2>
              <p className="muted" style={{ marginTop: 0, marginBottom: 22 }}>Vous pourrez toujours changer plus tard.</p>

              <div style={{ display: "grid", gap: 10, marginBottom: 22 }}>
                <button onClick={() => setRole("traveler")}
                  style={{ display: "flex", gap: 14, alignItems: "center", padding: 18, borderRadius: 14, border: `2px solid ${role === "traveler" ? "var(--blue)" : "var(--line)"}`, background: role === "traveler" ? "var(--blue-tint)" : "white", textAlign: "left", cursor: "pointer", transition: "all .15s" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--blue-soft)", color: "var(--blue-deep)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="user" size={22} color="var(--blue-deep)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>Je voyage</div>
                    <div className="small muted">Trouver un siège et partager les frais</div>
                  </div>
                  <div className="small muted" style={{ textAlign: "right", lineHeight: 1.3 }}>Inscription<br/>unique</div>
                </button>
                <button onClick={() => setRole("driver")}
                  style={{ display: "flex", gap: 14, alignItems: "center", padding: 18, borderRadius: 14, border: `2px solid ${role === "driver" ? "var(--red)" : "var(--line)"}`, background: role === "driver" ? "var(--red-soft)" : "white", textAlign: "left", cursor: "pointer", transition: "all .15s" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--red-soft)", color: "var(--red-deep)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="car" size={22} color="var(--red-deep)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>Je conduis</div>
                    <div className="small muted">Publier des trajets et empocher les frais</div>
                  </div>
                  <div className="small muted" style={{ textAlign: "right", lineHeight: 1.3 }}>Inscription<br/>gratuite</div>
                </button>
              </div>
              <button className="btn btn-primary btn-block btn-lg" onClick={() => setStep(2)}>Continuer</button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 28, color: "var(--blue-deep)", margin: "0 0 22px" }}>Votre profil</h2>
              <div className="field-row">
                <div className="field"><label className="label">Prénom</label><input className="input" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="Léa" /></div>
                <div className="field"><label className="label">Nom</label><input className="input" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="Tremblay" /></div>
              </div>
              <div className="field"><label className="label">Courriel</label><input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="vous@exemple.qc" /></div>
              <div className="field-row">
                <div className="field"><label className="label">Téléphone</label><input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(418) 555-0123" /></div>
                <div className="field"><label className="label">Mot de passe</label><input className="input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Min. 8 caractères" /></div>
              </div>
              {isDriver && (
                <div className="card-soft" style={{ marginBottom: 14 }}>
                  <div style={{ fontWeight: 700, color: "var(--blue-deep)", marginBottom: 10 }}>Renseignements véhicule</div>
                  <div className="field-row">
                    <div className="field"><label className="label">Marque / modèle</label><input className="input" placeholder="Toyota Corolla" /></div>
                    <div className="field"><label className="label">Année</label><input className="input" placeholder="2021" /></div>
                  </div>
                  <div className="field-row">
                    <div className="field"><label className="label">Plaque</label><input className="input" placeholder="ABC 123" /></div>
                    <div className="field"><label className="label">Permis de conduire (N°)</label><input className="input" placeholder="T1234-567890-12" /></div>
                  </div>
                </div>
              )}
              <label className="checkbox-row"><input type="checkbox" checked={form.agree} onChange={(e) => setForm({ ...form, agree: e.target.checked })} /> J'accepte les conditions et la politique de confidentialité de Trajexpress.</label>
              <div className="row-gap" style={{ marginTop: 20 }}>
                <button className="btn btn-ghost" onClick={() => setStep(1)}>← Retour</button>
                <button className="btn btn-primary btn-block" disabled={!form.agree} onClick={() => setStep(3)}>Continuer vers le paiement</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 28, color: "var(--blue-deep)", margin: "0 0 6px" }}>
                {isDriver ? "Frais à venir" : "Frais d'inscription"}
              </h2>
              <p className="muted" style={{ marginTop: 0, marginBottom: 22 }}>
                {isDriver
                  ? "Aucun paiement maintenant — vous payerez 2 $ par siège lors de la publication de chaque trajet."
                  : "Une seule fois, valable à vie. Aucune commission sur vos trajets."}
              </p>

              {isDriver ? (
                <>
                  <div className="card-soft" style={{ marginBottom: 18 }}>
                    <div className="row-between" style={{ marginBottom: 8 }}>
                      <span className="muted small">Modèle de frais</span>
                      <span className="pill pill-red">Chauffeur</span>
                    </div>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: 38, color: "var(--red-deep)", lineHeight: 1, fontWeight: 500 }}>2,00 $ <span style={{ fontSize: 18, color: "var(--ink-2)" }}>/ siège proposé</span></div>
                    <div className="divider"></div>
                    <ul style={{ margin: 0, paddingLeft: 20, color: "var(--ink-2)", fontSize: 14, lineHeight: 1.7 }}>
                      <li>Vous fixez vous-même le prix de chaque trajet.</li>
                      <li>Les voyageurs vous paient directement à l'arrivée.</li>
                      <li>Trajexpress prélève seulement 2 $ par place au moment de publier.</li>
                      <li>Aucune commission sur les courses.</li>
                    </ul>
                  </div>
                  <button className="btn btn-red btn-block btn-lg" onClick={() => {
                    setCurrentUser({ name: `${form.firstName || "Marc-André"} ${form.lastName || "T."}`, initials: `${(form.firstName[0] || "M")}${(form.lastName[0] || "T")}`.toUpperCase(), type: "driver" });
                    showToast("Compte chauffeur créé !");
                    navigate("dashboard");
                  }}>Finaliser mon compte chauffeur</button>
                </>
              ) : (
                <>
                  <div className="card-soft" style={{ marginBottom: 18 }}>
                    <div className="price-row"><span>Inscription voyageur Trajexpress</span><span>3,00 $</span></div>
                    <div className="price-row"><span>Taxes (incluses)</span><span>—</span></div>
                    <div className="price-row total"><span>Total aujourd'hui</span><b>3,00 $</b></div>
                  </div>
                  <div className="field">
                    <label className="label">Numéro de carte</label>
                    <input className="input" value={form.card} onChange={(e) => setForm({ ...form, card: e.target.value })} placeholder="4242 4242 4242 4242" />
                  </div>
                  <div className="field-row">
                    <div className="field"><label className="label">Expiration</label><input className="input" value={form.exp} onChange={(e) => setForm({ ...form, exp: e.target.value })} placeholder="MM/AA" /></div>
                    <div className="field"><label className="label">CVV</label><input className="input" value={form.cvv} onChange={(e) => setForm({ ...form, cvv: e.target.value })} placeholder="123" /></div>
                  </div>
                  <div className="notice notice-blue" style={{ display: "flex", gap: 10 }}>
                    <Icon name="lock" size={16} color="var(--blue-deep)" />
                    <span>Paiement sécurisé. Vos données de carte ne sont jamais stockées sur nos serveurs.</span>
                  </div>
                  <div className="row-gap" style={{ marginTop: 12 }}>
                    <button className="btn btn-ghost" onClick={() => setStep(2)}>← Retour</button>
                    <button className="btn btn-primary btn-block btn-lg" onClick={() => {
                      setCurrentUser({ name: `${form.firstName || "Léa"} ${form.lastName || "Tremblay"}`, initials: `${(form.firstName[0] || "L")}${(form.lastName[0] || "T")}`.toUpperCase(), type: "traveler" });
                      showToast("Inscription réussie · 3 $ encaissés");
                      navigate("home");
                    }}>Payer 3 $ et continuer</button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

window.Auth = Auth;
