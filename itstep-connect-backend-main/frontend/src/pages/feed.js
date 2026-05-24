import { api } from "../api.js";
import { PostCard } from "../components/postCard.js";
import { el, icon } from "../shared/dom.js";
import { currentUser, nextId } from "../state.js";

export function FeedPage(ctx) {
  const user = currentUser(ctx.state);
  const submitQuick = async (event) => {
    event.preventDefault();
    const text = event.currentTarget.elements.quick.value.trim();
    if (!text) return;
    const post = { id: nextId(ctx.state.posts), user_id: user.id, title: ctx.t("whatHappening"), content: text, created_at: new Date().toISOString(), likes: [], image: "" };
    ctx.state.posts.unshift(post);
    event.currentTarget.reset();
    ctx.persist();
    ctx.render();
    if (ctx.state.token) {
      try { await api.createPost(ctx.state.token, { title: post.title, content: post.content, user_id: user.id }); }
      catch { ctx.state.apiOnline = false; ctx.persist(); }
    }
  };

  return el("section", { class: "page-grid" }, [
    el("div", { class: "main-column" }, [
      el("form", { class: "composer", onsubmit: submitQuick }, [
        el("img", { src: user.avatar, alt: user.first_name }),
        el("input", { name: "quick", placeholder: ctx.t("whatHappening"), autocomplete: "off" }),
        el("button", { class: "primary-button" }, [ctx.t("post")]),
        el("button", { type: "button", class: "icon-button", onclick: () => ctx.openPostModal(), html: icon("plus") })
      ]),
      ...ctx.state.posts.map((post) => PostCard(ctx, post))
    ]),
    el("aside", { class: "right-panel" }, [
      el("h3", {}, [ctx.t("news")]),
      ...ctx.state.news.slice(0, 3).map((item) => el("button", { class: "side-item", onclick: () => ctx.go("news") }, [el("b", {}, [item.title]), el("small", {}, [item.date])])),
      el("h3", {}, [ctx.t("clubs")]),
      ...ctx.state.clubs.slice(0, 3).map((club) => el("button", { class: "side-item", onclick: () => ctx.go("clubs") }, [el("b", {}, [club.name]), el("small", {}, [club.schedule])]))
    ])
  ]);
}
