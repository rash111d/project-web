import { el, icon } from "../shared/dom.js";
import { canOpenAdmin } from "../shared/roles.js";
import { currentUser } from "../state.js";

const nav = [
  ["feed", "home", "home"],
  ["navigation", "map", "explore"],
  ["notifications", "bell", "notifications"],
  ["messages", "mail", "messages"],
  ["profile", "user", "profile"],
  ["clubs", "users", "clubs"],
  ["news", "news", "news"],
  ["search", "search", "search"],
  ["admin", "shield", "admin"],
  ["settings", "settings", "settings"]
];

export function Sidebar(ctx) {
  const user = currentUser(ctx.state);
  const items = nav.filter(([route]) => route !== "admin" || canOpenAdmin(user));
  return el("aside", { class: "sidebar" }, [
    el("button", { class: "brand", onclick: () => ctx.go("feed") }, [
      el("span", { class: "brand-mark" }, ["IT"]),
      el("span", {}, [ctx.t("appName")])
    ]),
    el("nav", { class: "nav" }, items.map(([route, iconName, label]) =>
      el("button", { class: `nav-item ${ctx.state.route === route ? "active" : ""}`, onclick: () => ctx.go(route) }, [
        el("span", { html: icon(iconName) }),
        el("span", {}, [ctx.t(label)]),
        route === "notifications" ? el("b", { class: "badge" }, [String(ctx.state.notifications.filter((item) => !item.read).length)]) : ""
      ])
    )),
    el("div", { class: "sidebar-user", onclick: () => ctx.go("profile", { id: user.id }) }, [
      el("img", { src: user.avatar, alt: user.first_name }),
      el("span", {}, [`${user.first_name} ${user.last_name}`]),
      el("small", {}, [user.direction])
    ]),
    el("button", { class: "logout", onclick: ctx.logout }, [el("span", { html: icon("x") }), ctx.t("logout")])
  ]);
}
