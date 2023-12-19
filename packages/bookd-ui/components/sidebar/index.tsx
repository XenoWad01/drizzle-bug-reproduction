import { FC } from "react";
import "./index.css";

type Url = {
  path: string;
  label: string;
  navigate: () => void;
};

type Recent = {
  path: string;
  label: string;
};

type SidebarProps = {
  HeaderLogo: React.ReactNode;
  urls: Url[];
  recents?: Recent[];
  settingsPath: string;
};

const Sidebar: FC<SidebarProps> = ({
  HeaderLogo,
  urls,
  recents,
  settingsPath,
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        {HeaderLogo}
        <>Searchbar</>
      </div>

      <div className="sidebar-content">
        <div className="sidebar-content-urls">
          {urls?.length ? urls.map((url) => url.label) : "No URLs"}
        </div>

        <hr />

        {recents?.length ? (
          <div className="sidebar-content-recents">
            {recents.map((recent) => recent.label)}
          </div>
        ) : null}
      </div>

      <div className="sidebar-footer">
        <>Settings {settingsPath}</>
      </div>
    </div>
  );
};

export default Sidebar;
