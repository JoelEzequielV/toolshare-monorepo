import type { Meta, StoryObj } from '@storybook/react';
import { ToolCard } from '../components/ToolCard';

const meta: Meta<typeof ToolCard> = {
  title: 'Components/ToolCard',
  component: ToolCard,
};
export default meta;

type Story = StoryObj<typeof ToolCard>;

export const Disponible: Story = {
  args: {
    name: 'Martillo',
    description: 'Martillo de acero inoxidable',
    available: true,
  },
};

export const Prestada: Story = {
  args: {
    name: 'Destornillador',
    description: 'Punta estrella',
    available: false,
  },
};
