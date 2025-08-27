import { Link } from "react-router-dom";
import "../app/globals.css";

export const metadata = {
  title: "Wähle Deine Eigene Entscheidung",
  description: "Entscheidungsbasierte Schulabenteuer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <header>
          <div className="header-inner">
            <h1>Wähle Deine Eigene Entscheidung</h1>
            <nav className="nav">
              <Link to="/">Startseite</Link>
              <Link to="/character">Charakter</Link>
              <Link href="/game">Spiel</Link>
              <Link href="/status">Status</Link>
              <Link href="/final">Finale</Link>
            </nav>
          </div>
        </header>
        <main className="stack">{children}</main>
        <footer>
          <div className="footer-inner">© 2025 Schulspiel-Projekt</div>
        </footer>
      </body>
    </html>
  );
}
