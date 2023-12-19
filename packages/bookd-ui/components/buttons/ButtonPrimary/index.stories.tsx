import type { Meta, StoryObj } from "@storybook/react";
import ButtonPrimary, { ButtonSizes } from "./index";

const meta: Meta<typeof ButtonPrimary> = {
  component: ButtonPrimary,
};

export default meta;
type Story = StoryObj<typeof ButtonPrimary>;

export const Primary: Story = {
  render: () => (
    <ButtonPrimary
      size={ButtonSizes.default}
      text="click me!"
      onClick={() => console.log("clicked!!!")}
    />
  ),
};
