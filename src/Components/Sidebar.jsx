import Page from './Page';
import SidebarIcon from './SidebarIcon';
import { useState, useRef } from 'react';
// import { StatusContext } from 'renderer/Context';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { FaClipboardList } from 'react-icons/fa';

function getAllPages() {
  const sideBarIcons = {
    Search: <AiOutlineSearch size={30} />,
    Listing: <FaClipboardList size={30} />,
    Bookmarks: <BsFillBookmarkCheckFill size={30} />,
  };
  return sideBarIcons;
}

export default function Sidebar() {
  // eslint-disable-next-line no-unused-vars
  const [pageView, setPageView] = useState('Search');
  const icons = useRef(getAllPages());

  return (
      <div className="flex flex-row w-full">
        <div className="h-screen w-16 bg-discord-sidebar">
          {Object.keys(icons.current).map((key) => (
            <SidebarIcon
              key={key}
              icon={icons.current[key]}
              onClick={() => {
                setPageView(key);
              }}
              onKeyDown={() => {
                setPageView(key);
              }}
            />
          ))}
        </div>
        <Page pageView={pageView} id="Search" />
        <Page pageView={pageView} id="Listing" />
        <Page pageView={pageView} id="Bookmarks" />
      </div>
  );
}
