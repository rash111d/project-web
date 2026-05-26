import { PostCard } from "../components/postCard.js";
import { el } from "../shared/dom.js";

export function SearchPage(ctx) {
  const q = (ctx.query || "").toLowerCase().trim();
  const users = ctx.state.users.filter((user) => `${user.first_name} ${user.last_name} ${user.email} ${user.direction}`.toLowerCase().includes(q));
  const posts = ctx.state.posts.filter((post) => `${post.title} ${post.content}`.toLowerCase().includes(q));
  const clubs = ctx.state.clubs.filter((club) => `${club.name} ${club.category} ${club.description}`.toLowerCase().includes(q));
  const news = ctx.state.news.filter((item) => `${item.title} ${item.body} ${item.type}`.toLowerCase().includes(q));
  return el("section", { class: "search-page" }, [
    el("h1", {}, [ctx.t("search")]),
    el("div", { class: "search-results" }, [
      el("section", { class: "result-panel" }, [
        el("h2", {}, [ctx.t("profile")]),
        ...(q ? users : ctx.state.users).map((user) => el("button", { class: "person-row", onclick: () => ctx.go("profile", { id: user.id }) }, [
          el("img", { src: user.avatar, alt: user.first_name }),
          el("span", {}, [`${user.first_name} ${user.last_name}`, el("small", {}, [user.direction])])
        ]))
      ]),
      el("section", { class: "result-panel" }, [
        el("h2", {}, [ctx.t("clubs")]),
        ...(q ? clubs : ctx.state.clubs).map((club) => el("button", { class: "side-item", onclick: () => ctx.go("clubs") }, [el("b", {}, [club.name]), el("small", {}, [club.category])]))
      ]),
      el("section", { class: "result-panel wide" }, [
        el("h2", {}, [ctx.t("home")]),
        ...(q ? posts : ctx.state.posts).map((post) => PostCard(ctx, post))
      ]),
      el("section", { class: "result-panel" }, [
        el("h2", {}, [ctx.t("news")]),
        ...(q ? news : ctx.state.news).map((item) => el("button", { class: "side-item", onclick: () => ctx.go("news") }, [el("b", {}, [item.title]), el("small", {}, [item.date])]))
      ])
    ])
  ]);
}
