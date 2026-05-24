import { api } from "../api.js";
import { el, formatDate, icon } from "../shared/dom.js";
import { canModeratePosts } from "../shared/roles.js";
import { currentUser, getUser, nextId } from "../state.js";

export function PostCard(ctx, post, options = {}) {
  const author = getUser(ctx.state, post.user_id);
  const viewer = currentUser(ctx.state);
  const comments = ctx.state.comments.filter((comment) => Number(comment.post_id) === Number(post.id));
  const liked = (post.likes || []).includes(viewer.id);
  const open = ctx.openComments.has(post.id) || options.expanded;

  const addComment = async (event) => {
    event.preventDefault();
    const input = event.currentTarget.elements.comment;
    const content = input.value.trim();
    if (!content) return;
    const localComment = { id: nextId(ctx.state.comments), post_id: post.id, user_id: viewer.id, content, created_at: new Date().toISOString() };
    ctx.state.comments.push(localComment);
    input.value = "";
    ctx.persist();
    ctx.render();
    if (ctx.state.token) {
      try { await api.createComment(ctx.state.token, { post_id: post.id, content }); }
      catch { ctx.state.apiOnline = false; ctx.persist(); }
    }
  };

  return el("article", { class: "post-card" }, [
    el("div", { class: "post-head" }, [
      el("button", { class: "author", onclick: () => ctx.go("profile", { id: author.id }) }, [
        el("img", { src: author.avatar, alt: author.first_name }),
        el("span", {}, [`${author.first_name} ${author.last_name}`, el("small", {}, [`@${author.first_name.toLowerCase()} · ${formatDate(post.created_at || post.CreatedAt, ctx.state.lang)}`])])
      ]),
      viewer.id === post.user_id || canModeratePosts(viewer)
        ? el("div", { class: "post-actions" }, [
          el("button", { class: "icon-button", title: ctx.t("editPost"), onclick: () => ctx.openPostModal(post), html: icon("edit") }),
          el("button", {
            class: "icon-button danger",
            title: ctx.t("deletePost"),
            onclick: async () => {
              ctx.state.posts = ctx.state.posts.filter((item) => item.id !== post.id);
              ctx.state.comments = ctx.state.comments.filter((item) => item.post_id !== post.id);
              ctx.persist();
              ctx.render();
              if (ctx.state.token) {
                try { await api.deletePost(ctx.state.token, post.id); }
                catch { ctx.state.apiOnline = false; ctx.persist(); }
              }
            },
            html: icon("trash")
          })
        ])
        : ""
    ]),
    el("h3", {}, [post.title || "Post"]),
    el("p", { class: "post-text" }, [post.content]),
    post.image ? el("img", { class: "post-image", src: post.image, alt: post.title }) : "",
    el("div", { class: "post-toolbar" }, [
      el("button", {
        class: liked ? "liked" : "",
        onclick: () => {
          post.likes = post.likes || [];
          post.likes = liked ? post.likes.filter((id) => id !== viewer.id) : [...post.likes, viewer.id];
          ctx.persist();
          ctx.render();
        }
      }, [el("span", { html: icon("heart") }), `${ctx.t("like")} ${post.likes?.length || 0}`]),
      el("button", {
        onclick: () => {
          ctx.openComments.has(post.id) ? ctx.openComments.delete(post.id) : ctx.openComments.add(post.id);
          ctx.render();
        }
      }, [el("span", { html: icon("comment") }), `${ctx.t("comments")} ${comments.length}`]),
      el("button", { onclick: () => navigator.clipboard?.writeText(location.href) }, [ctx.t("share")])
    ]),
    open ? el("section", { class: "comments" }, [
      ...comments.map((comment) => {
        const user = getUser(ctx.state, comment.user_id);
        return el("div", { class: "comment" }, [
          el("img", { src: user.avatar, alt: user.first_name }),
          el("div", {}, [
            el("b", {}, [`${user.first_name} ${user.last_name}`]),
            el("p", {}, [comment.content])
          ])
        ]);
      }),
      el("form", { class: "comment-form", onsubmit: addComment }, [
        el("input", { name: "comment", placeholder: ctx.t("writeComment"), autocomplete: "off" }),
        el("button", { class: "icon-button primary", html: icon("send"), title: ctx.t("send") })
      ])
    ]) : ""
  ]);
}
