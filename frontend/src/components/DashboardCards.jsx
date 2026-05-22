const DashboardCards = ({ complaints }) => {
  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === 'Pending' || !c.status).length;
  const inProgress = complaints.filter((c) => c.status === 'In Progress').length;
  const resolved = complaints.filter((c) => c.status === 'Resolved').length;

  const stats = [
    { label: 'All tickets', value: total, color: '#111827' },
    { label: 'Pending', value: pending, color: '#d97706' },
    { label: 'In progress', value: inProgress, color: '#2563eb' },
    { label: 'Resolved', value: resolved, color: '#059669' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6" style={{ paddingTop: '32px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#fff',
        overflow: 'hidden',
      }}>
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              padding: '20px 24px',
              borderRight: i < stats.length - 1 ? '1px solid #e5e7eb' : 'none',
            }}
          >
            <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', fontWeight: '400' }}>
              {stat.label}
            </p>
            <p style={{ fontSize: '28px', fontWeight: '600', color: stat.color, lineHeight: 1, letterSpacing: '-0.5px' }}>
              {String(stat.value).padStart(2, '0')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;