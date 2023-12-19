import type { Meta, StoryObj } from "@storybook/react";
import WebLayout from ".";

const meta: Meta<typeof WebLayout> = {
  component: WebLayout,
};

export default meta;
type Story = StoryObj<typeof WebLayout>;

export const Primary: Story = {
  render: () => (
    <WebLayout sidebar={<div>Sidebar</div>}>Page content</WebLayout>
  ),
};
