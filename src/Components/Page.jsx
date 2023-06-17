import * as SidebarComponents from "./Pages"

export default function Page({ pageView, id }) {
  console.log(pageView);
  const Token = SidebarComponents[pageView];
  return pageView === id ? <Token /> : null;
}