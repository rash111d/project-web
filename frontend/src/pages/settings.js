import { el } from "../shared/dom.js";
import { currentUser } from "../state.js";

export function SettingsPage(ctx) {
  const user = currentUser(ctx.state);
  const save = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    Object.assign(user, data);
    user.interests = data.interests.split(",").map((item) => item.trim()).filter(Boolean);
    ctx.persist();
    ctx.go("profile", { id: user.id });
  };
  return el("section", { class: "settings-page" }, [
    el("h1", {}, [ctx.t("settings")]),
    el("form", { class: "settings-form", onsubmit: save }, [
      el("label", {}, [ctx.t("firstName"), el("input", { name: "first_name", value: user.first_name })]),
      el("label", {}, [ctx.t("lastName"), el("input", { name: "last_name", value: user.last_name })]),
      el("label", {}, [ctx.t("group"), el("input", { name: "group", value: user.group })]),
      el("label", {}, [ctx.t("course"), el("input", { name: "course", value: user.course })]),
      el("label", {}, [ctx.t("direction"), el("input", { name: "direction", value: user.direction })]),
      el("label", {}, [ctx.t("about"), el("textarea", { name: "bio" }, [user.bio])]),
      el("label", {}, [ctx.t("interests"), el("input", { name: "interests", value: (user.interests || []).join(", ") })]),
      el("button", { class: "primary-button" }, [ctx.t("save")])
    ]),
    el("section", { class: "settings-list" }, [
      el("button", {}, [ctx.t("theme"), el("span", {}, [ctx.t("dark")])]),
      el("button", {
        onclick: () => {
          ctx.state.lang = ctx.state.lang === "ru" ? "en" : "ru";
          ctx.persist();
          ctx.render();
        }
      }, [ctx.t("language"), el("span", {}, [ctx.state.lang.toUpperCase()])])
    ])
  ]);
}
