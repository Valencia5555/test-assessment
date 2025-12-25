import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Text: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <Input value={value} onChange={setValue} placeholder="Text input" />;
  },
};

export const Password: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <Input type="password" value={value} onChange={setValue} placeholder="Password" />;
  },
};

export const PasswordWithToggle: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <Input type="password" value={value} onChange={setValue} placeholder="Password" clearable />;
  },
};

export const Number: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <Input type="number" value={value} onChange={setValue} placeholder="Number" />;
  },
};

export const ClearableText: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <Input value={value} onChange={setValue} placeholder="Clearable text" clearable />;
  },
};
