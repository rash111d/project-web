import { el, icon } from "../shared/dom.js";
import { currentUser } from "../state.js";

export function Topbar(ctx) {
  const user = currentUser(ctx.state);
  return el("header", { class: "topbar" }, [
    el("button", { class: "icon-button mobile-menu", onclick: ctx.toggleMenu, title: "Menu", html: icon("home") }),
    el("div", { class: "searchbar" }, [
      el("span", { html: icon("search") }),
      el("input", {
        placeholder: ctx.t("searchPlaceholder"),
        value: ctx.query || "",
        oninput: (event) => {
          ctx.query = event.target.value;
          if (ctx.state.route !== "search") ctx.go("search");
          else ctx.render();
        }
      })
    ]),
    el("button", { class: "status-pill" }, [ctx.state.apiOnline ? ctx.t("apiOnline") : ctx.t("apiDemo")]),
    el("button", {
      class: "lang-toggle",
      onclick: () => {
        ctx.state.lang = ctx.state.lang === "ru" ? "en" : "ru";
        ctx.persist();
        ctx.render();
      }
    }, [ctx.state.lang === "ru" ? "EN" : "RU"]),
    el("button", { class: "avatar-button", onclick: () => ctx.go("profile", { id: user.id }) }, [
      el("img", { src: user.avatar, alt: user.first_name })
    ])
  ]);
}
