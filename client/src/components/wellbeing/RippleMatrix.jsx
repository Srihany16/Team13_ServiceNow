import React from 'react';
import StatusBadge from '../common/StatusBadge';

const DOMAINS = ['ACADEMIC', 'EMOTIONAL', 'SOCIAL', 'FINANCIAL', 'PERSONAL'];
const title = (s) => s.charAt(0) + s.slice(1).toLowerCase();
const shortWeek = (w) => (w || '').split('-')[1] || w;

export default function RippleMatrix({ data }) {
  if (!data) return null;
  const trend = data.weeklyTrend || [];
  const now = data.currentWeek;
  const hasCurrent = trend.some((t) => t.week === now);
  const columns = hasCurrent ? trend : [...trend, { week: now }];

  const levelFor = (col, domain) =>
    col.week === now ? data.domains?.[domain] ?? col[domain.toLowerCase()] : col[domain.toLowerCase()];

  return (
    <section className="rp-card">
      <div className="rp-card-head">
        <h2>Your recent weeks</h2>
        {data.overallLevel && <StatusBadge level={data.overallLevel}>Overall {data.overallLevel}</StatusBadge>}
      </div>
      <div className="rp-scroll">
        <table className="rp-matrix">
          <thead>
            <tr>
              <th scope="col"><span className="rp-sr">Domain</span></th>
              {columns.map((c) => (
                <th key={c.week} scope="col" className={c.week === now ? 'is-now' : ''}>{shortWeek(c.week)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DOMAINS.map((d) => (
              <tr key={d}>
                <th scope="row">{title(d)}</th>
                {columns.map((c) => {
                  const level = levelFor(c, d);
                  return (
                    <td key={c.week} className={c.week === now ? 'is-now' : ''}>
                      {level ? <StatusBadge level={level} /> : <span className="rp-muted">–</span>}
                      <span className="rp-sr">{level || 'no data'}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="rp-legend">🟢 LOW &nbsp; 🟡 MEDIUM &nbsp; 🔴 HIGH</p>
    </section>
  );
}
