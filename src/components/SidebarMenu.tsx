import React, { useState } from 'react';

export interface SidebarMenuItem {
  label: string;
  icon?: React.ReactNode;
  children?: SidebarMenuItem[];
  onClick?: () => void;
}

interface SidebarMenuProps {
  open: boolean;
  items: SidebarMenuItem[];
  onClose: () => void;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ open, items, onClose }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const handleExpand = (label: string) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const renderItems = (menuItems: SidebarMenuItem[], level = 0) => (
    <ul
      className="sidebar-menu-list"
      style={{
        listStyle: 'none',
        margin: 0,
        padding: level === 0 ? '0 0' : '0 0 0 18px',
      }}
    >
      {menuItems.map((item) => (
        <li key={item.label}>
          <div
            tabIndex={0}
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: item.children ? 'pointer' : 'default',
              padding: '10px 22px',
              fontWeight: level === 0 ? 600 : 400,
              background: expanded[item.label] ? '#e0e7ef' : 'transparent',
              color: expanded[item.label] ? '#2563eb' : '#334155',
              outline: 'none',
              border: 'none',
              fontSize: level === 0 ? 17 : 15,
              marginBottom: 2,
              borderRadius: 6,
              boxShadow: expanded[item.label] ? '0 2px 8px 0 rgba(30,41,59,0.04)' : undefined,
              transition: 'background 0.18s, color 0.18s',
            }}
            onClick={() => {
              if (item.children) handleExpand(item.label);
              item.onClick?.();
            }}
            onKeyDown={e => {
              if ((e.key === 'Enter' || e.key === ' ') && item.children) handleExpand(item.label);
            }}
          >
            {item.icon && <span style={{ marginRight: 10 }}>{item.icon}</span>}
            {item.label}
            {item.children && (
              <span style={{ marginLeft: 'auto', fontSize: 15, opacity: 0.7 }}>{expanded[item.label] ? '▼' : '▶'}</span>
            )}
          </div>
          {item.children && expanded[item.label] && renderItems(item.children, level + 1)}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(30, 41, 59, 0.25)',
            zIndex: 9998,
            backdropFilter: 'blur(2px)',
            transition: 'background 0.3s',
          }}
        />
      )}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: 340,
          background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
          boxShadow: '-4px 0 24px 0 rgba(30,41,59,0.13)',
          borderLeft: '1.5px solid #e2e8f0',
          zIndex: 9999,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(.4,1.2,.4,1)',
          display: 'flex',
          flexDirection: 'column',
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          overflow: 'hidden',
        }}
        aria-hidden={!open}
      >
        <div style={{
          padding: '20px 24px 16px 24px',
          borderBottom: '1.5px solid #e2e8f0',
          fontWeight: 700,
          fontSize: 20,
          letterSpacing: 0.5,
          color: '#334155',
          background: 'rgba(255,255,255,0.85)',
          boxShadow: '0 2px 8px 0 rgba(30,41,59,0.03)',
        }}>
          Menu
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 0 18px 0' }}>{renderItems(items)}</div>
      </div>
      <style>{`
        .sidebar-menu-list li div {
          border-radius: 6px;
          transition: background 0.18s, color 0.18s;
        }
        .sidebar-menu-list li div:hover, .sidebar-menu-list li div:focus {
          background: #e0e7ef;
          color: #2563eb;
        }
      `}</style>
    </>
  );
};
