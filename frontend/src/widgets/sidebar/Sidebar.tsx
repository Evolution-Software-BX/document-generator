import { FileText, Folder, LayoutDashboard, Settings, Users } from 'lucide-react';

const items = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Clients', icon: Users },
  { label: 'Contracts', icon: FileText },
  { label: 'Templates', icon: Folder },
  { label: 'Settings', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">DG</div>
      <nav className="nav">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button key={item.label} className="navItem">
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
