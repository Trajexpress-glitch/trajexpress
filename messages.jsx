// Trajexpress — Messagerie entre voyageurs et chauffeurs
//
// Note technique : pour un vrai chat en temps réel entre deux utilisateurs
// différents, il faut Supabase Realtime ou un service équivalent.
// Cette version stocke les messages dans localStorage du navigateur ;
// elle fonctionne donc localement pour démontrer l'UX et tester le flux.

const STORAGE_KEY = "tjx_messages_v1";

const loadConversations = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  // Conversations d'exemple pour les nouveaux comptes
  return [
    {
      id: "conv-1",
      with: { name: "Marc-André T.", initials: "MA", role: "Chauffeur" },
      trip: { from: "Québec", to: "Montréal", date: "Demain · 06:15" },
      lastSeen: Date.now() - 14 * 60 * 1000,
      messages: [
        { id: 1, from: "them", text: "Bonjour ! Je vois que vous avez réservé 2 sièges pour demain. C'est confirmé.", time: Date.now() - 3 * 60 * 60 * 1000 },
        { id: 2, from: "them", text: "Je vous prends à la Gare du Palais à 06h15 pile. Faites-moi signe quand vous arrivez.", time: Date.now() - 2.95 * 60 * 60 * 1000 },
        { id: 3, from: "me", text: "Parfait, merci ! Je serai à l'heure. Est-ce qu'il y a moyen de mettre une valise ?", time: Date.now() - 90 * 60 * 1000 },
        { id: 4, from: "them", text: "Oui, une valise cabine et un sac à dos par voyageur, aucun problème.", time: Date.now() - 14 * 60 * 1000 }
      ]
    }
  ];
};

const saveConversations = (convs) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(convs)); } catch (e) {}
};

const formatTime = (ts) => {
  const d = new Date(ts);
  const today = new Date();
  const diff = today - d;
  if (diff < 60 * 1000) return "à l'instant";
  if (diff < 60 * 60 * 1000) return `il y a ${Math.floor(diff / 60000)} min`;
  if (diff < 24 * 60 * 60 * 1000) return d.toLocaleTimeString("fr-CA", { hour: "2-digit", minute: "2-digit" });
  return d.toLocaleDateString("fr-CA", { day: "numeric", month: "short" });
};

const Messages = ({ navigate, currentUser, openConvId }) => {
  const [convs, setConvs] = React.useState(loadConversations);
  const [activeId, setActiveId] = React.useState(openConvId || (loadConversations()[0]?.id));
  const [draft, setDraft] = React.useState("");
  const scrollRef = React.useRef(null);

  React.useEffect(() => { saveConversations(convs); }, [convs]);
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [activeId, convs]);

  if (!currentUser) {
    return (
      <div className="page">
        <div className="admin-lock" style={{ marginTop: 60 }}>
          <div style={{ display: "inline-flex", width: 56, height: 56, borderRadius: "50%", background: "var(--blue-tint)", alignItems: "center", justifyContent: "center", color: "var(--blue-deep)" }}>
            <Icon name="chat" size={26} color="var(--blue-deep)" />
          </div>
          <h2>Messagerie réservée aux membres</h2>
          <p>Connectez-vous pour discuter avec vos chauffeurs et voyageurs.</p>
          <div className="row-gap" style={{ justifyContent: "center" }}>
            <button className="btn btn-ghost btn-lg" onClick={() => navigate("signin")}>Se connecter</button>
            <button className="btn btn-primary btn-lg" onClick={() => navigate("signup")}>Créer un compte</button>
          </div>
        </div>
      </div>
    );
  }

  const active = convs.find(c => c.id === activeId);

  const send = (e) => {
    e.preventDefault();
    if (!draft.trim() || !active) return;
    const newMsg = { id: Date.now(), from: "me", text: draft.trim(), time: Date.now() };
    setConvs(convs.map(c => c.id === active.id ? { ...c, messages: [...c.messages, newMsg], lastSeen: Date.now() } : c));
    setDraft("");
  };

  return (
    <div className="page" style={{ paddingTop: 22 }}>
      <div className="row-between" style={{ marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 36, margin: 0, color: "var(--blue-deep)" }}>
            Mes <em style={{ color: "var(--red-deep)", fontStyle: "italic" }}>messages</em>
          </h1>
          <p className="muted" style={{ margin: "4px 0 0" }}>Coordonnez vos trajets avec vos chauffeurs et voyageurs.</p>
        </div>
      </div>

      <div className="messages-shell">
        <aside className="messages-list">
          {convs.length === 0 ? (
            <div className="text-c" style={{ padding: "40px 20px", color: "var(--ink-3)" }}>
              <Icon name="chat" size={28} color="var(--ink-3)" />
              <div style={{ marginTop: 8, fontStyle: "italic" }}>Aucune conversation pour l'instant.</div>
            </div>
          ) : convs.map(c => {
            const last = c.messages[c.messages.length - 1];
            const isActive = c.id === activeId;
            return (
              <button key={c.id} className={`conv-item ${isActive ? "active" : ""}`} onClick={() => setActiveId(c.id)}>
                <div className="avatar">{c.with.initials}</div>
                <div className="conv-item-body">
                  <div className="conv-item-top">
                    <span className="conv-item-name">{c.with.name}</span>
                    <span className="conv-item-time">{formatTime(c.lastSeen)}</span>
                  </div>
                  <div className="conv-item-preview">{last ? last.text : "—"}</div>
                  <div className="conv-item-trip">{c.trip.from} → {c.trip.to} · {c.trip.date}</div>
                </div>
              </button>
            );
          })}
        </aside>

        <section className="messages-thread">
          {!active ? (
            <div className="text-c" style={{ padding: "100px 20px", color: "var(--ink-3)" }}>
              <Icon name="chat" size={36} color="var(--ink-3)" />
              <div style={{ marginTop: 12, fontStyle: "italic" }}>Sélectionnez une conversation pour commencer.</div>
            </div>
          ) : (
            <>
              <div className="thread-head">
                <div className="row-gap">
                  <div className="avatar avatar-lg">{active.with.initials}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 17 }}>{active.with.name}</div>
                    <div className="small muted">{active.with.role} · {active.trip.from} → {active.trip.to}</div>
                  </div>
                </div>
                <div className="row-gap">
                  <span className="pill pill-blue"><span className="dot" style={{ background: "var(--green)" }}></span> En ligne</span>
                </div>
              </div>

              <div className="thread-scroll" ref={scrollRef}>
                {active.messages.map((m, i) => {
                  const prev = active.messages[i - 1];
                  const showTime = !prev || m.time - prev.time > 30 * 60 * 1000;
                  return (
                    <React.Fragment key={m.id}>
                      {showTime && (
                        <div className="thread-time">{new Date(m.time).toLocaleString("fr-CA", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</div>
                      )}
                      <div className={`bubble ${m.from === "me" ? "me" : "them"}`}>
                        <div className="bubble-text">{m.text}</div>
                      </div>
                    </React.Fragment>
                  );
                })}
                {active.messages.length === 0 && (
                  <div className="text-c muted" style={{ padding: 40, fontStyle: "italic" }}>Aucun message pour le moment. Brisez la glace !</div>
                )}
              </div>

              <form className="thread-input" onSubmit={send}>
                <input
                  className="input"
                  placeholder={`Message à ${active.with.name.split(" ")[0]}…`}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                />
                <button type="submit" className="btn btn-primary" disabled={!draft.trim()}>
                  <Icon name="arrow" size={14} color="white" />
                </button>
              </form>
              <div className="thread-note">
                <Icon name="shield" size={11} color="var(--ink-3)" />
                <span>Restez respectueux. Toute conduite déplacée peut être signalée à Trajexpress.</span>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

// Fonction utilitaire pour démarrer ou retrouver une conversation depuis ailleurs
window.startConversation = (driver, trip) => {
  const convs = loadConversations();
  const existing = convs.find(c => c.with.name === driver.name && c.trip.from === trip.from && c.trip.to === trip.to);
  if (existing) return existing.id;
  const newConv = {
    id: `conv-${Date.now()}`,
    with: { name: driver.name, initials: driver.initials, role: "Chauffeur" },
    trip: { from: trip.from, to: trip.to, date: trip.date },
    lastSeen: Date.now(),
    messages: []
  };
  saveConversations([newConv, ...convs]);
  return newConv.id;
};

window.Messages = Messages;
