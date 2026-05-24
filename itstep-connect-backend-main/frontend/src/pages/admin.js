import { el } from "../shared/dom.js";
import { canManageClubs, canManageNews, canManageUsers, canModeratePosts, nextRole, normalizeRole } from "../shared/roles.js";
import { currentUser } from "../state.js";

export function AdminPage(ctx) {
  const viewer = currentUser(ctx.state);
  const blocks = [
    canManageNews(viewer) ? [ctx.t("manageNews"), ctx.state.news.length] : null,
    canModeratePosts(viewer) ? [ctx.t("moderatePosts"), ctx.state.posts.length] : null,
    canManageClubs(viewer) ? [ctx.t("manageClubs"), ctx.state.clubs.length] : null,
    canManageUsers(viewer) ? [ctx.t("manageUsers"), ctx.state.users.length] : null
  ].filter(Boolean);

  return el("section", { class: "cards-page" }, [
    el("h1", {}, [ctx.t("admin")]),
    el("div", { class: "admin-grid" }, blocks.map(([title, count]) => el("article", { class: "admin-card" }, [
      el("h2", {}, [title]),
      el("strong", {}, [String(count)]),
      el("button", { class: "secondary-button" }, [ctx.t("save")])
    ]))),
    canManageUsers(viewer) ? el("section", { class: "table-panel" }, [
      el("h2", {}, [ctx.t("manageUsers")]),
      ...ctx.state.users.map((user) => el("div", { class: "table-row" }, [
        el("span", {}, [`${user.first_name} ${user.last_name}`]),
        el("span", {}, [user.email]),
        el("button", {
          class: "text-button",
          onclick: () => {
            user.role = nextRole(user.role);
            ctx.persist();
            ctx.render();
          }
        }, [ctx.t(`role_${normalizeRole(user.role)}`)])
      ]))
    ]) : el("section", { class: "table-panel" }, [
      el("h2", {}, [ctx.t("teacherPanel")]),
      el("p", { class: "empty" }, [ctx.t("teacherPanelHint")])
    ])
  ]);
}
