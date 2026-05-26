import { el } from "../shared/dom.js";
import { canManageNews } from "../shared/roles.js";
import { currentUser, nextId } from "../state.js";

export function NewsPage(ctx) {
  const canEdit = canManageNews(currentUser(ctx.state));
  return el("section", { class: "cards-page" }, [
    el("div", { class: "section-head" }, [
      el("h1", {}, [ctx.t("news")]),
      canEdit ? el("button", { class: "primary-button", onclick: () => ctx.openNewsModal() }, [ctx.t("createPost")]) : ""
    ]),
    el("div", { class: "timeline" }, ctx.state.news.map((item) =>
      el("article", { class: "news-item" }, [
        el("time", {}, [item.date]),
        el("span", { class: "tag" }, [item.type]),
        el("h2", {}, [item.title]),
        el("p", {}, [item.body]),
        canEdit ? el("button", {
          class: "text-button",
          onclick: () => {
            ctx.state.news = ctx.state.news.filter((news) => news.id !== item.id);
            ctx.persist();
            ctx.render();
          }
        }, [ctx.t("deletePost")]) : ""
      ])
    ))
  ]);
}

export function createNews(ctx, values) {
  ctx.state.news.unshift({ id: nextId(ctx.state.news), ...values });
  ctx.persist();
}
