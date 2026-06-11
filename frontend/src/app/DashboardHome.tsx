'use client';

import { useEffect, useState } from 'react';
import { FileCheck, FileText, FolderOpen, Users } from 'lucide-react';
import { CreateDocumentForm } from '@/features/create-document/CreateDocumentForm';
import { getDashboardStats } from '@/shared/api/contracts.api';
import type { DashboardStats } from '@/shared/api/contracts.api';

const initialStats: DashboardStats = {
  clientsCount: 0,
  contractsCount: 0,
  templatesCount: 0,
  generatedCount: 0,
};

export function DashboardHome() {
  const [stats, setStats] = useState<DashboardStats>(initialStats);

  async function refreshStats() {
    const nextStats = await getDashboardStats();
    setStats(nextStats);
  }

  useEffect(() => {
    refreshStats().catch(() => undefined);
  }, []);

  const metrics = [
    { label: 'Clients', value: stats.clientsCount, icon: Users },
    { label: 'Contracts', value: stats.contractsCount, icon: FileText },
    { label: 'Templates', value: stats.templatesCount, icon: FolderOpen },
    { label: 'Generated', value: stats.generatedCount, icon: FileCheck },
  ];

  return (
    <>
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
        <CreateDocumentForm onGenerated={() => refreshStats().catch(() => undefined)} />
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
    </>
  );
}
