import { FC } from "react";
import "./index.css";

type WebLayoutProps = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
};

export const WebLayout: FC<WebLayoutProps> = ({ children, sidebar }) => {
  return (
    <div className="web-layout">
      {sidebar ? <div className="sidebar">{sidebar}</div> : null}

      <div className="content">{children}</div>
    </div>
  );
};

export default WebLayout;
