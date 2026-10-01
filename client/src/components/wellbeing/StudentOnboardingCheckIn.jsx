import React, { useState } from 'react';

const QUESTIONS = [
  {
    id: 'sleep',
    label: '1. Sleep & Energy',
    prompt: 'How rested and energized do you feel today?',
    options: [
      { label: '🔋 Rested & High Energy', value: 'HIGH' },
      { label: '⚡ Decent Sleep', value: 'GOOD' },
      { label: '🥱 Restless / Low Energy', value: 'LOW' },
      { label: '🪫 Completely Drained', value: 'EXHAUSTED' }
    ]
  },
  {
    id: 'stress',
    label: '2. Current Stress Level',
    prompt: 'How would you rate your mental pressure right now?',
    options: [
      { label: '🟢 Calm & Balanced', value: 'LOW' },
      { label: '🟡 Manageable', value: 'MEDIUM' },
      { label: '🟠 Moderately Stressed', value: 'HIGH' },
      { label: '🔴 Overloaded', value: 'CRITICAL' }
    ]
  },
  {
    id: 'social',
    label: '3. Social Connection',
    prompt: 'How connected do you feel with friends or campus peers this week?',
    options: [
      { label: '💬 Very Connected', value: 'STRONG' },
      { label: '👥 Good Balance', value: 'MODERATE' },
      { label: '🚶 Feeling a Bit Isolated', value: 'LOW' },
      { label: '👤 Disconnected', value: 'ISOLATED' }
    ]
  },
  {
    id: 'academics',
    label: '4. Academic Pace',
    prompt: 'How are your assignments, classes, and deadlines feeling?',
    options: [
      { label: '🎯 Confidently on Track', value: 'ON_TRACK' },
      { label: '📝 Busy but Managing', value: 'MANAGING' },
      { label: '⏳ Falling Behind', value: 'BEHIND' },
      { label: '🚨 Extremely Overwhelmed', value: 'OVERWHELMED' }
    ]
  },
  {
    id: 'supportNeed',
    label: '5. Immediate Support Preference',
    prompt: 'What small step would support you best today?',
    options: [
      { label: '☕ Casual Chat / Coffee with a Friend', value: 'FRIEND' },
      { label: '🎓 Academic Advice / Study Tips', value: 'ACADEMIC' },
      { label: '🧘 Quiet Downtime to Recharge', value: 'REST' },
      { label: '💬 University Peer Check-in', value: 'PEER' }
    ]
  }
];

export default function StudentOnboardingCheckIn({ initialName = 'Prashant', onComplete }) {
  const [name, setName] = useState(initialName);
  const [answers, setAnswers] = useState({
    sleep: 'GOOD',
    stress: 'MEDIUM',
    social: 'MODERATE',
    academics: 'MANAGING',
    supportNeed: 'FRIEND'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  const handleOptionSelect = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const finalName = name.trim() || 'Prashant';
    setIsSubmitted(true);
    setIsEditing(false);
    onComplete?.({ name: finalName, answers });
  };

  if (!isEditing && isSubmitted) {
    return (
      <section
        style={{
          background: 'linear-gradient(135deg, #f0fbf9 0%, #d8f3ee 100%)',
          border: '1.5px solid #a4e1d6',
          borderRadius: '16px',
          padding: '16px 22px',
          marginBottom: '26px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 4px 14px rgba(23, 66, 75, 0.06)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.8rem' }}>✨</span>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#17424b' }}>
              Wellbeing Pulse Checked for {name}
            </div>
            <div style={{ fontSize: '0.88rem', color: '#1f5f6b', fontWeight: 600 }}>
              Responses logged: Sleep ({answers.sleep}) · Stress ({answers.stress}) · Connection ({answers.social})
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing(true)}
          style={{
            backgroundColor: '#ffffff',
            color: '#1f5f6b',
            border: '1px solid #a4e1d6',
            borderRadius: '999px',
            padding: '7px 16px',
            fontWeight: 800,
            fontSize: '0.84rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          ✏️ Update Answers
        </button>
      </section>
    );
  }

  return (
    <section
      style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid #d3eef1',
        borderRadius: '20px',
        padding: '24px 26px',
        marginBottom: '28px',
        boxShadow: '0 6px 20px rgba(23, 66, 75, 0.07)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
        <div>
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: 800,
              color: '#3a8394',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              display: 'inline-block',
              marginBottom: '2px'
            }}
          >
            Step 1 • Student Check-In
          </span>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#17424b', margin: '2px 0 6px', letterSpacing: '-0.4px' }}>
            Quick Wellbeing Pulse Check
          </h2>
          <p style={{ margin: 0, fontSize: '0.92rem', color: '#55737a', fontWeight: 500 }}>
            Answer 5 quick questions so RIPPLE can personalize your rhythm and support pathways.
          </p>
        </div>

        <span
          style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            padding: '5px 12px',
            borderRadius: '999px',
            backgroundColor: '#eaf7f8',
            color: '#1f5f6b'
          }}
        >
          ⏱️ ~45 seconds
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Name input */}
        <div style={{ marginBottom: '22px', backgroundColor: '#f6fcfa', padding: '14px 18px', borderRadius: '14px', border: '1px solid #d3eef1' }}>
          <label
            htmlFor="student-name"
            style={{ display: 'block', fontWeight: 800, color: '#17424b', fontSize: '0.92rem', marginBottom: '6px' }}
          >
            👤 What is your name?
          </label>
          <input
            id="student-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name (e.g. Prashant)"
            required
            style={{
              width: '100%',
              maxWidth: '360px',
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1.5px solid #bcdfe3',
              fontSize: '1rem',
              fontWeight: 700,
              color: '#17424b',
              outline: 'none',
              backgroundColor: '#ffffff'
            }}
          />
        </div>

        {/* 5 Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {QUESTIONS.map((q) => (
            <div key={q.id} style={{ borderBottom: '1px solid #eef7f8', paddingBottom: '16px' }}>
              <div style={{ fontWeight: 800, color: '#17424b', fontSize: '0.95rem' }}>
                {q.label}
              </div>
              <div style={{ fontSize: '0.86rem', color: '#55737a', margin: '2px 0 10px' }}>
                {q.prompt}
              </div>

              {/* Options */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {q.options.map((opt) => {
                  const isSelected = answers[q.id] === opt.value;
                  return (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => handleOptionSelect(q.id, opt.value)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '999px',
                        border: isSelected ? '1.5px solid #1f5f6b' : '1px solid #d3eef1',
                        backgroundColor: isSelected ? '#1f5f6b' : '#ffffff',
                        color: isSelected ? '#ffffff' : '#17424b',
                        fontSize: '0.84rem',
                        fontWeight: isSelected ? 800 : 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div style={{ marginTop: '22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ margin: 0, fontSize: '0.82rem', color: '#55737a' }}>
            🔒 <em>Confidential to your personal dashboard. No grades or permanent records impacted.</em>
          </p>
          <button
            type="submit"
            style={{
              backgroundColor: '#17424b',
              color: '#ffffff',
              border: 'none',
              borderRadius: '999px',
              padding: '10px 24px',
              fontWeight: 800,
              fontSize: '0.92rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(23, 66, 75, 0.2)',
              transition: 'background 0.15s ease'
            }}
          >
            Save & Update Dashboard →
          </button>
        </div>
      </form>
    </section>
  );
}
