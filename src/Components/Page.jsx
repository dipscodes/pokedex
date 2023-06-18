import * as SidebarComponents from "./Pages"

export default function Page({ pageView, id }) {
  const Token = SidebarComponents[pageView];
  return pageView === id ? <Token /> : null;
}