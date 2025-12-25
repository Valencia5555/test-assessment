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
    <ul style={{ listStyle: 'none', margin: 0, padding: level === 0 ? '16px 0' : '0 0 0 16px' }}>
      {menuItems.map((item) => (
        <li key={item.label}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: item.children ? 'pointer' : 'default',
              padding: '8px 16px',
              fontWeight: level === 0 ? 'bold' : 'normal',
              background: expanded[item.label] ? '#f0f0f0' : 'transparent',
              borderRadius: 4,
            }}
            onClick={() => {
              if (item.children) handleExpand(item.label);
              item.onClick?.();
            }}
          >
            {item.icon && <span style={{ marginRight: 8 }}>{item.icon}</span>}
            {item.label}
            {item.children && (
              <span style={{ marginLeft: 'auto' }}>{expanded[item.label] ? '▼' : '▶'}</span>
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
            background: 'rgba(0,0,0,0.3)',
            zIndex: 9998,
          }}
        />
      )}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: 320,
          background: '#fff',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.15)',
          zIndex: 9999,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s',
          display: 'flex',
          flexDirection: 'column',
        }}
        aria-hidden={!open}
      >
        <div style={{ padding: '16px', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>
          Menu
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>{renderItems(items)}</div>
      </div>
    </>
  );
};
