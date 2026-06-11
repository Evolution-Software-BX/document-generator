import { FileCheck, FileText, FolderOpen, Users } from 'lucide-react';
import { CreateDocumentForm } from '@/features/create-document/CreateDocumentForm';
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
          <CreateDocumentForm />
          <div className="panel">
            <div className="panelHeader">
              <h2>Шаблоны</h2>
            </div>
            <div className="templateSummary">
              <div>
                <FolderOpen size={20} />
                <span>CRM, ООО, двойная оплата</span>
              </div>
              <div>
                <FolderOpen size={20} />
                <span>Сайт, ИП, 1 оплата с ТЗ</span>
              </div>
              <div>
                <FolderOpen size={20} />
                <span>Обучение, ООО, 1 оплата</span>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
