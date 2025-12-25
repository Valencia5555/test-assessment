import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SidebarMenu, SidebarMenuItem } from './SidebarMenu';

const meta: Meta<typeof SidebarMenu> = {
  title: 'Components/SidebarMenu',
  component: SidebarMenu,
};
export default meta;

type Story = StoryObj<typeof SidebarMenu>;

const oneLevelItems: SidebarMenuItem[] = [
  { label: 'Home' },
  { label: 'Profile' },
  { label: 'Settings' },
];

const twoLevelItems: SidebarMenuItem[] = [
  {
    label: 'Dashboard',
    children: [
      { label: 'Analytics' },
      { label: 'Reports' },
    ],
  },
  {
    label: 'Account',
    children: [
      { label: 'Profile' },
      { label: 'Security' },
    ],
  },
  { label: 'Help' },
];

export const OneLevel: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Sidebar</button>
        <SidebarMenu open={open} items={oneLevelItems} onClose={() => setOpen(false)} />
      </>
    );
  },
};

export const TwoLevel: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Sidebar</button>
        <SidebarMenu open={open} items={twoLevelItems} onClose={() => setOpen(false)} />
      </>
    );
  },
};

export const ClosedState: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Sidebar</button>
        <SidebarMenu open={open} items={twoLevelItems} onClose={() => setOpen(false)} />
      </>
    );
  },
};
