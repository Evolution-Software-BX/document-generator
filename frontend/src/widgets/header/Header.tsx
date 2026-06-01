import { Bell, Search } from 'lucide-react';

export function Header() {
  return (
    <header className="header">
      <div>
        <p className="eyebrow">Document Generator</p>
        <h1>Contracts workspace</h1>
      </div>
      <div className="headerActions">
        <button className="iconButton" aria-label="Search">
          <Search size={18} />
        </button>
        <button className="iconButton" aria-label="Notifications">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}
