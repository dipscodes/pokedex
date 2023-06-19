import { useState, useEffect } from "react";
import Moves from "./Tabs/Moves";
import HeldItems from "./Tabs/HeldItems";
import Abilities from "./Tabs/Abilities";
import TabView from "./Tabs/TabView";

const DetailsTabs = ({ pokemon }) => {
  const [tab, setTab] = useState("abilities");

  useEffect(() => {
    const activeTabClassName = "active-tab";

    // remove the activated tab class;
    const activatedTab = document.getElementsByClassName("active-tab")[0];
    activatedTab.classList.remove(activeTabClassName);

    // highlight the new tab where the active-tab class will go
    const tabToActivate = document.getElementById(tab);
    tabToActivate.classList.add(activeTabClassName);
  });

  function changeTab(tabName) {
    setTab(tabName);
  }

  return (
    <>
      <div className="flex flex-row justify-center mt-5">
        <div className="changeable-tabs flex flex-row w-10/12 justify-between ">
          <Abilities changeTab={changeTab} />
          <Moves changeTab={changeTab} />
          <HeldItems changeTab={changeTab} />
        </div>
      </div>
      <div className="flex flex-row justify-center mt-5">
        <TabView tab={tab} pokemonData={pokemon} />
      </div>
    </>
  );
};

export default DetailsTabs;
