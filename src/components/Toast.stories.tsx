import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastType } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
};
export default meta;

type Story = StoryObj<typeof Toast>;

const types: ToastType[] = ['success', 'error', 'info', 'warning'];

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {types.map((type) => (
        <Toast key={type} message={`This is a ${type} toast`} type={type} duration={3000} />
      ))}
    </div>
  ),
};

export const DifferentDurations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Toast message="Short duration (1s)" type="info" duration={1000} />
      <Toast message="Long duration (5s)" type="success" duration={5000} />
    </div>
  ),
};

export const Closable: Story = {
  render: () => {
    const [show, setShow] = useState(true);
    return show ? (
      <Toast message="Manually close me" type="warning" closable onClose={() => setShow(false)} />
    ) : (
      <button onClick={() => setShow(true)}>Show Toast</button>
    );
  },
};
