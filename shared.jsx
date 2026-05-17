// Trajexpress — composants partagés (header, footer, icônes, utilitaires UI)

const Icon = ({ name, size = 16, color = "currentColor" }) => {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none"/><line x1="16.5" y1="16.5" x2="21" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    pin: <path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round"/>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" stroke={color} strokeWidth="1.8" fill="none"/><line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="1.8"/><line x1="8" y1="3" x2="8" y2="7" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><line x1="16" y1="3" x2="16" y2="7" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    user: <><circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.8" fill="none"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/></>,
    car: <><path d="M5 16h14M6 11l2-5h8l2 5M5 16v4M19 16v4M5 16h14M5 11h14" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8" cy="16" r="1.5" fill={color}/><circle cx="16" cy="16" r="1.5" fill={color}/></>,
    chat: <path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z" stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round"/>,
    shield: <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round"/>,
    check: <path d="M5 12l5 5L20 7" stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    cross: <path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    money: <><circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" fill="none"/><path d="M12 7v10M15 9.5c0-1.4-1.3-2.5-3-2.5s-3 1.1-3 2.5 1.3 2.5 3 2.5 3 1.1 3 2.5-1.3 2.5-3 2.5-3-1.1-3-2.5" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/></>,
    lock: <><rect x="5" y="11" width="14" height="10" rx="2" stroke={color} strokeWidth="1.8" fill="none"/><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke={color} strokeWidth="1.8" fill="none"/></>,
    bar: <path d="M4 20V10M10 20V4M16 20V14M22 20V8M3 20h19" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/>,
    grid: <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" stroke={color} strokeWidth="1.8" fill="none"/>,
    plus: <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round"/>,
    bell: <path d="M6 17V11a6 6 0 1 1 12 0v6l1.5 2H4.5L6 17z M9 21a3 3 0 0 0 6 0" stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round"/>,
    star: <path d="M12 3l2.6 5.5 6 .9-4.4 4.2 1 6-5.2-2.8L7 19.6l1-6L3.6 9.4l6-.9L12 3z" fill={color}/>
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle" }}>
      {paths[name]}
    </svg>
  );
};

const Brand = () => (
  <div className="brand">
    <div className="brand-mark"></div>
    Trajexpress<sup>QC</sup>
  </div>
);

const Header = ({ route, navigate, currentUser }) => {
  const links = [
    { id: "home", label: "Accueil" },
    { id: "search", label: "Rechercher" },
    { id: "driver", label: "Devenir chauffeur" },
    { id: "about", label: "Comment ça marche" }
  ];
  const memberLinks = currentUser ? [{ id: "pricing", label: "Tarification" }] : [];
  return (
    <header className="header">
      <div className="header-inner">
        <button onClick={() => navigate("home")} style={{ padding: 0 }}><Brand /></button>
        <nav className="nav">
          {links.map(l => (
            <button key={l.id}
              className={`nav-link ${route === l.id || (l.id === "search" && route === "detail") ? "active" : ""}`}
              onClick={() => navigate(l.id)}>{l.label}</button>
          ))}
          {memberLinks.map(l => (
            <button key={l.id}
              className={`nav-link ${route === l.id ? "active" : ""}`}
              onClick={() => navigate(l.id)}>{l.label}</button>
          ))}
          {currentUser ? (
            <button className="btn btn-ghost" onClick={() => navigate(currentUser.type === "driver" ? "dashboard" : "search")}>
              <div className="avatar" style={{ width: 28, height: 28, fontSize: 11 }}>{currentUser.initials}</div>
              {currentUser.name.split(" ")[0]}
            </button>
          ) : (
            <>
              <button className="btn btn-ghost" onClick={() => navigate("signin")}>Connexion</button>
              <button className="btn btn-primary" onClick={() => navigate("signup")}>S'inscrire</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

const Footer = ({ navigate }) => (
  <footer className="footer">
    <div className="footer-inner">
      <Brand />
      <div className="footer-links">
        <a href="#">Aide</a>
        <a href="#">Conditions</a>
        <a href="#">Confidentialité</a>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate("admin"); }}>Espace propriétaire</a>
      </div>
      <div className="small">© 2026 Trajexpress · Québec, QC</div>
    </div>
  </footer>
);

const Toast = ({ message, onDone }) => {
  React.useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, []);
  return <div className="toast">{message}</div>;
};

Object.assign(window, { Icon, Brand, Header, Footer, Toast });
