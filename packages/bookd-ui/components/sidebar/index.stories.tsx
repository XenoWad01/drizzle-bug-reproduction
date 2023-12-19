import type { Meta, StoryObj } from "@storybook/react";
import Sidebar from ".";

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

const mockUrls = [
  {
    label: "Url 1",
    path: "/url/1",
    navigate: () => console.log("Navigated to path Url 1"),
  },
  {
    label: "Url 2",
    path: "/url/2",
    navigate: () => console.log("Navigated to path Url 2"),
  },
  {
    label: "Url 3",
    path: "/url/3",
    navigate: () => console.log("Navigated to path Url 3"),
  },
];

export const Primary: Story = {
  args: {
    urls: mockUrls,
  },
  render: (props) => <Sidebar {...props} />,
};
