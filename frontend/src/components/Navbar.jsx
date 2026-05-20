const Navbar = () => {
  return (
    <header style={{
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 24px',
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '6px',
            backgroundColor: '#111827',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ color: '#fff', fontSize: '12px', fontWeight: '700', letterSpacing: '-0.5px', lineHeight: 1 }}>R</span>
          </div>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827', letterSpacing: '-0.2px' }}>ResolveDesk</span>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {[
            { label: 'Tickets', active: true },
            { label: 'Reports', active: false },
            { label: 'Settings', active: false },
          ].map(item => (
            <span key={item.label} style={{
              fontSize: '13px',
              fontWeight: item.active ? '500' : '400',
              color: item.active ? '#111827' : '#9ca3af',
              padding: '6px 10px',
              borderRadius: '5px',
              cursor: item.active ? 'default' : 'not-allowed',
              backgroundColor: item.active ? '#f3f4f6' : 'transparent',
            }}>
              {item.label}
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;