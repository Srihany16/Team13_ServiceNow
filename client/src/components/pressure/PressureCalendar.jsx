import React from 'react';
import { LEVEL_META } from '../common/StatusBadge';

export default function PressureCalendar({ dailyForecast = [] }) {
  if (!dailyForecast || dailyForecast.length === 0) {
    return null;
  }

  return (
    <div className="rp-calendar-wrap">
      <div className="rp-calendar-grid">
        {dailyForecast.map((item, index) => {
          const meta = LEVEL_META[item.level] || { cls: 'lvl-none', emoji: '•' };
          return (
            <div key={item.day || index} className="rp-calendar-cell">
              <div className="rp-calendar-day">{item.day}</div>
              <span className={`rp-calendar-level ${meta.cls}`}>
                <span aria-hidden="true">{meta.emoji}</span>
                <span>{item.level}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
