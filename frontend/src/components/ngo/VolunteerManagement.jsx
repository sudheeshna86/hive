import React, { useState } from 'react';

// Dummy data for demonstration
const volunteers = [
  {
    id: 1,
    name: 'Priya Sharma',
    phone: '9876543210',
    email: 'priya@example.com',
    area: 'Central Delhi',
    cases: 12,
    status: 'Active',
    avatar: '',
    history: [
      { caseId: 'CASE-001', status: 'Completed', date: '2025-09-01' }
    ]
  },
  {
    id: 2,
    name: 'Rahul Verma',
    phone: '9123456789',
    email: 'rahul@example.com',
    area: 'Lodhi Gardens',
    cases: 5,
    status: 'Pending',
    avatar: '',
    history: [
      { caseId: 'CASE-002', status: 'In Progress', date: '2025-09-03' }
    ]
  },
  {
    id: 3,
    name: 'Anita Singh',
    phone: '9561473820',
    email: 'anita@example.com',
    area: 'Noida Sector 62',
    cases: 8,
    status: 'Inactive',
    avatar: '',
    history: [
      { caseId: 'CASE-003', status: 'Verified', date: '2025-09-05' }
    ]
  }
];

// Dummy analytics data
const analytics = {
  casesHandled: [12, 5, 8],
  verificationAccuracy: [90, 75, 60],
  timeliness: [2, 3, 4],
  completedRate: [10, 3, 5]
};

// Dummy engagement data
const engagements = {
  announcements: [
    { message: 'Upcoming volunteer meeting on Oct 25.', date: '2025-10-20' },
    { message: 'Training session available for case verification procedures.', date: '2025-10-15' }
  ],
  training: [
    { name: 'Case Registration Guide', type: 'PDF', link: '#' },
    { name: 'Verification Video', type: 'Video', link: '#' }
  ],
  feedback: [
    { volunteerId: 1, comment: 'Excellent verification accuracy.' },
    { volunteerId: 2, comment: 'Needs faster case handling.' }
  ]
};

const statusStyle = {
  Active: { background: '#198754', color: '#fff' },
  Inactive: { background: '#6c757d', color: '#fff' },
  Pending: { background: '#ffc107', color: '#222' }
};

function VolunteerCard({ v, onShowHistory }) {
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '18px',
      margin: '12px 0',
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 1px 4px #ededed'
    }}>
      <div style={{
        width: '50px', height: '50px',
        background: '#f1f1f1',
        borderRadius: '50%',
        overflow: 'hidden',
        marginRight: '16px'
      }}>
        {v.avatar ?
          <img src={v.avatar} alt={v.name} style={{ width: '100%', height: '100%' }} />
          :
          <span style={{ fontSize: '24px', lineHeight: '50px', color: '#888', textAlign: 'center', display: 'block' }}>
            {v.name.charAt(0)}
          </span>
        }
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: '18px' }}>{v.name}</div>
        <div style={{ color: '#555', fontSize: '14px' }}>{v.phone} | {v.email}</div>
        <div style={{ color: '#888', margin: '3px 0' }}>{v.area}</div>
        <div style={{ fontSize: '13px' }}>Cases Registered: {v.cases}</div>
      </div>
      <div style={{
        ...statusStyle[v.status],
        borderRadius: '7px',
        padding: '6px 18px',
        fontWeight: 500,
        fontSize: '12px'
      }}>
        {v.status}
      </div>
      <button
        style={{
          marginLeft: '20px',
          background: '#1e7aab',
          color: '#fff',
          borderRadius: '6px',
          border: 'none',
          padding: '7px 12px',
          cursor: 'pointer'
        }}
        onClick={() => onShowHistory(v)}
      >
        History
      </button>
    </div>
  );
}

function VolunteerHistoryModal({ volunteer, onClose }) {
  if (!volunteer) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.15)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
    }}>
      <div style={{
        background: '#fff', borderRadius: '14px', padding: '28px', minWidth: '320px',
        boxShadow: '0 2px 8px #d9d9d9', position: 'relative'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: 14 }}>Case History for {volunteer.name}</div>
        <ul>
          {volunteer.history.map((h, idx) => (
            <li key={idx} style={{ margin: '9px 0', fontSize: '15px' }}>
              {h.caseId} &mdash; {h.status} ({h.date})
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer'
          }}>×</button>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  // Dummy leaderboard ranking
  const leaderboard = [...volunteers].sort((a, b) => b.cases - a.cases);
  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '18px' }}>Performance Analytics</div>
      <div style={{ display: 'flex', gap: '36px', marginBottom: '32px' }}>
        <div style={{
          background: '#fff', borderRadius: '12px', padding: '20px', width: '220px', boxShadow: '0 1px 6px #eee'
        }}>
          <div style={{ fontWeight: 500 }}>Cases Handled</div>
          <ul style={{ marginTop: '10px' }}>
            {volunteers.map(v => <li key={v.id}>{v.name}: {v.cases}</li>)}
          </ul>
        </div>
        <div style={{
          background: '#fff', borderRadius: '12px', padding: '20px', width: '220px', boxShadow: '0 1px 6px #eee'
        }}>
          <div style={{ fontWeight: 500 }}>Verification Accuracy</div>
          <ul style={{ marginTop: '10px' }}>
            {analytics.verificationAccuracy.map((acc, idx) =>
              <li key={idx}>{volunteers[idx].name}: {acc}%</li>
            )}
          </ul>
        </div>
        <div style={{
          background: '#fff', borderRadius: '12px', padding: '20px', width: '220px', boxShadow: '0 1px 6px #eee'
        }}>
          <div style={{ fontWeight: 500 }}>Average Timeliness</div>
          <ul style={{ marginTop: '10px' }}>
            {analytics.timeliness.map((days, idx) =>
              <li key={idx}>{volunteers[idx].name}: {days} days</li>
            )}
          </ul>
        </div>
      </div>
      <div style={{ background: '#f8f9fa', borderRadius: '10px', padding: '20px', marginBottom: '14px' }}>
        <div style={{ fontWeight: 500, marginBottom: '10px' }}>Leaderboard (Top Volunteers)</div>
        <ol>
          {leaderboard.map((v, idx) =>
            <li key={v.id} style={{ margin: '4px 0', fontWeight: idx === 0 ? 'bold' : 400 }}>
              {v.name} ({v.cases} cases)
            </li>
          )}
        </ol>
      </div>
      <button style={{
        background: '#198754', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 18px', marginTop: '10px'
      }}>
        Export Report
      </button>
    </div>
  );
}

function EngagementTab() {
  return (
    <div style={{ padding: '24px 0' }}>
      <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '12px' }}>Engagement Tools</div>
      <div style={{
        background: '#fff', borderRadius: '12px', padding: '18px', boxShadow: '0 1px 6px #ededed', marginBottom: '28px'
      }}>
        <div style={{ fontWeight: 500, marginBottom: '12px' }}>Announcements</div>
        {engagements.announcements.map((msg, idx) =>
          <div key={idx} style={{ marginBottom: '10px', color: '#222' }}>
            {msg.message}
            <span style={{ color: '#888', fontSize: '13px', marginLeft: '8px' }}>
              [{msg.date}]
            </span>
          </div>
        )}
      </div>
      <div style={{
        background: '#fff', borderRadius: '12px', padding: '18px', boxShadow: '0 1px 6px #ededed', marginBottom: '28px'
      }}>
        <div style={{ fontWeight: 500, marginBottom: '12px' }}>Training Materials</div>
        <ul>
          {engagements.training.map((t, idx) =>
            <li key={idx} style={{ margin: '6px 0' }}>
              <span style={{
                background: '#1e7aab', color: '#fff', padding: '3px 8px', borderRadius: '4px', marginRight: '6px', fontSize: '12px'
              }}>{t.type}</span>
              <a href={t.link} style={{ textDecoration: 'underline', color: '#198754' }}>{t.name}</a>
              <button style={{
                marginLeft: '12px', background: '#fff', color: '#333', border: '1px solid #1e7aab',
                borderRadius: '5px', padding: '4px 8px', cursor: 'pointer'
              }}>
                Download
              </button>
            </li>
          )}
        </ul>
      </div>
      <div style={{
        background: '#fff', borderRadius: '12px', padding: '18px', boxShadow: '0 1px 6px #ededed'
      }}>
        <div style={{ fontWeight: 500, marginBottom: '12px' }}>Feedback & Recognition</div>
        <ul>
          {engagements.feedback.map((f, idx) =>
            <li key={idx} style={{ margin: '7px 0' }}>
              <span style={{
                background: '#198754',
                color: '#fff',
                padding: '2px 10px',
                borderRadius: '6px',
                fontSize: '12px'
              }}>{volunteers.find(v => v.id === f.volunteerId)?.name}</span>
              : {f.comment}
            </li>
          )}
        </ul>
        <button style={{
          background: '#1e7aab', color: '#fff', border: 'none', borderRadius: '7px', padding: '7px 14px', marginTop: '10px'
        }}>
          Mark All as Read
        </button>
      </div>
    </div>
  );
}

export default function VolunteerManagement() {
  const [tab, setTab] = useState('profiles');
  const [search, setSearch] = useState('');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  // Tab switching
  const handleTab = (t) => setTab(t);

  // Filtering volunteers
  const filteredVolunteers = volunteers.filter(
    v => v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.area.toLowerCase().includes(search.toLowerCase()) ||
      v.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      maxWidth: '750px',
      margin: '36px auto',
      background: '#fafcff',
      borderRadius: '14px',
      boxShadow: '0 2px 16px #e6e6e6',
      padding: '31px'
    }}>
      <div style={{ display: 'flex', gap: '14px', marginBottom: '24px' }}>
        <button
          style={{ ...tabBtnStyle, background: tab === 'profiles' ? '#106341' : '#e6e6e6', color: tab === 'profiles' ? '#fff' : '#222' }}
          onClick={() => handleTab('profiles')}
        >
          Volunteer Profiles
        </button>
        <button
          style={{ ...tabBtnStyle, background: tab === 'analytics' ? '#106341' : '#e6e6e6', color: tab === 'analytics' ? '#fff' : '#222' }}
          onClick={() => handleTab('analytics')}
        >
          Performance Analytics
        </button>
        <button
          style={{ ...tabBtnStyle, background: tab === 'engagement' ? '#106341' : '#e6e6e6', color: tab === 'engagement' ? '#fff' : '#222' }}
          onClick={() => handleTab('engagement')}
        >
          Engagement Tools
        </button>
      </div>

      {tab === 'profiles' && (
        <>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '14px' }}>
            <input
              type="text"
              placeholder="Search by name, area or status"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '60%', padding: '8px 16px', borderRadius: '7px', border: '1px solid #ededed', fontSize: '15px'
              }}
            />
            <button
              style={{
                background: '#1e7aab', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 16px'
              }}
              onClick={() => setSearch('')}
            >
              Clear
            </button>
          </div>
          <div>
            {filteredVolunteers.length ? filteredVolunteers.map(v =>
              <VolunteerCard v={v} key={v.id} onShowHistory={vol => setSelectedVolunteer(vol)} />
            ) : (
              <div style={{ color: '#aaa', textAlign: 'center', padding: '40px 0' }}>No volunteers found.</div>
            )}
          </div>
          <VolunteerHistoryModal
            volunteer={selectedVolunteer}
            onClose={() => setSelectedVolunteer(null)}
          />
        </>
      )}

      {tab === 'analytics' &&
        <AnalyticsTab />
      }

      {tab === 'engagement' &&
        <EngagementTab />
      }
    </div>
  );
}

const tabBtnStyle = {
  fontSize: '15px',
  fontWeight: 500,
  padding: '10px 20px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.2s'
};
