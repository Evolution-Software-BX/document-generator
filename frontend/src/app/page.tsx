import { FileCheck, FileText, FolderOpen, Users } from 'lucide-react';
import { Header } from '@/widgets/header/Header';
import { Sidebar } from '@/widgets/sidebar/Sidebar';

const metrics = [
  { label: 'Clients', value: '0', icon: Users },
  { label: 'Contracts', value: '0', icon: FileText },
  { label: 'Templates', value: '0', icon: FolderOpen },
  { label: 'Generated', value: '0', icon: FileCheck },
];

export default function Home() {
  return (
    <main className="shell">
      <Sidebar />
      <section className="workspace">
        <Header />
        <section className="metricsGrid">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <article className="metric" key={metric.label}>
                <div className="metricIcon">
                  <Icon size={20} />
                </div>
                <div>
                  <p>{metric.label}</p>
                  <strong>{metric.value}</strong>
                </div>
              </article>
            );
          })}
        </section>
        <section className="contentGrid">
          <div className="panel">
            <div className="panelHeader">
              <h2>Recent contracts</h2>
              <button>New contract</button>
            </div>
            <div className="emptyState">
              <FileText size={28} />
              <p>No contracts yet</p>
            </div>
          </div>
          <div className="panel">
            <div className="panelHeader">
              <h2>Templates</h2>
              <button>Upload</button>
            </div>
            <div className="emptyState">
              <FolderOpen size={28} />
              <p>No templates uploaded</p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
