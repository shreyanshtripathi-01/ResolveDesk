import { useState } from 'react';
import { updateComplaint, deleteComplaint } from '../services/api';

const statuses = ['Pending', 'In Progress', 'Resolved'];

const statusConfig = {
  'Pending':     { dot: '#d97706', text: '#92400e', bg: '#fffbeb', border: '#fde68a' },
  'In Progress': { dot: '#2563eb', text: '#1e40af', bg: '#eff6ff', border: '#bfdbfe' },
  'Resolved':    { dot: '#059669', text: '#065f46', bg: '#ecfdf5', border: '#a7f3d0' },
};

const StatusBadge = ({ status }) => {
  const s = statusConfig[status] || statusConfig['Pending'];
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '12px',
      fontWeight: '500',
      color: s.text,
      backgroundColor: s.bg,
      border: `1px solid ${s.border}`,
      borderRadius: '4px',
      padding: '2px 8px',
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: s.dot, flexShrink: 0 }} />
      {status || 'Pending'}
    </span>
  );
};

const ComplaintList = ({ complaints, onComplaintUpdated }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleStatusChange = async (id, status) => {
    try {
      await updateComplaint(id, status);
      onComplaintUpdated();
    } catch {
      alert('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this ticket? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await deleteComplaint(id);
      onComplaintUpdated();
    } catch {
      alert('Failed to delete ticket.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6" style={{ paddingTop: '20px', paddingBottom: '64px' }}>
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        {/* Table header bar */}
        <div style={{
          padding: '12px 20px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fafafa',
        }}>
          <span style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>
            Open tickets
          </span>
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>
            {complaints.length} {complaints.length === 1 ? 'ticket' : 'tickets'}
          </span>
        </div>

        {complaints.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#9ca3af' }}>No tickets yet.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                {['ID', 'Title', 'Description', 'Category', 'Status', ''].map((h, i) => (
                  <th key={i} style={{
                    padding: '10px 16px',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#9ca3af',
                    textAlign: 'left',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {complaints.map((c, idx) => (
                <tr
                  key={c.id}
                  style={{
                    borderBottom: idx < complaints.length - 1 ? '1px solid #f3f4f6' : 'none',
                    transition: 'background-color 0.1s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fafafa'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#9ca3af', whiteSpace: 'nowrap' }}>
                    #{c.id}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '500', color: '#111827', maxWidth: '200px' }}>
                    <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {c.title}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280', maxWidth: '260px' }}>
                    <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={c.description}>
                      {c.description}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                    <span style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontWeight: '400',
                    }}>
                      {c.category}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                    <StatusBadge status={c.status} />
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                      <select
                        value={c.status || 'Pending'}
                        onChange={e => handleStatusChange(c.id, e.target.value)}
                        style={{
                          fontSize: '12px',
                          padding: '4px 8px',
                          border: '1px solid #d1d5db',
                          borderRadius: '5px',
                          backgroundColor: '#fff',
                          color: '#374151',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          outline: 'none',
                        }}
                      >
                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <button
                        onClick={() => handleDelete(c.id)}
                        disabled={deletingId === c.id}
                        style={{
                          fontSize: '12px',
                          color: deletingId === c.id ? '#9ca3af' : '#6b7280',
                          background: 'none',
                          border: 'none',
                          cursor: deletingId === c.id ? 'not-allowed' : 'pointer',
                          padding: '4px 6px',
                          borderRadius: '4px',
                          fontFamily: 'inherit',
                          transition: 'color 0.1s, background-color 0.1s',
                        }}
                        onMouseEnter={e => { if (deletingId !== c.id) { e.target.style.color = '#dc2626'; e.target.style.backgroundColor = '#fef2f2'; }}}
                        onMouseLeave={e => { e.target.style.color = '#6b7280'; e.target.style.backgroundColor = 'transparent'; }}
                      >
                        {deletingId === c.id ? 'Deleting…' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ComplaintList;