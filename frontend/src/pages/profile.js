import { PostCard } from "../components/postCard.js";
import { el } from "../shared/dom.js";
import { normalizeRole } from "../shared/roles.js";
import { currentUser, getUser } from "../state.js";

export function ProfilePage(ctx) {
  const id = ctx.params.id || ctx.state.currentUserId;
  const user = getUser(ctx.state, id);
  const viewer = currentUser(ctx.state);
  const posts = ctx.state.posts.filter((post) => Number(post.user_id) === Number(user.id));
  const relation = ctx.state.friends.find((item) =>
    (item.user_id === viewer.id && item.friend_id === user.id) || (item.user_id === user.id && item.friend_id === viewer.id)
  );

  const profileAction = viewer.id === user.id ? el("button", {
    class: "primary-button",
    onclick: () => ctx.openProfileModal(user)
  }, [ctx.t("editProfile")]) : el("button", {
    class: "primary-button",
    onclick: () => {
      if (!relation) ctx.state.friends.push({ user_id: viewer.id, friend_id: user.id, status: "pending" });
      else if (relation.status === "pending" && relation.friend_id === viewer.id) relation.status = "accepted";
      else ctx.state.friends = ctx.state.friends.filter((item) => item !== relation);
      ctx.persist();
      ctx.render();
    }
  }, [!relation ? ctx.t("addFriend") : relation.status === "pending" && relation.friend_id === viewer.id ? ctx.t("accept") : relation.status === "accepted" ? ctx.t("remove") : ctx.t("decline")]);

  return el("section", { class: "profile-page" }, [
    el("div", { class: "profile-cover", style: `background-image:url('${user.cover}')` }),
    el("div", { class: "profile-header" }, [
      el("img", { class: "profile-avatar", src: user.avatar, alt: user.first_name }),
      el("div", {}, [
        el("h1", {}, [`${user.first_name} ${user.last_name}`]),
        el("p", {}, [`${ctx.t(`role_${normalizeRole(user.role)}`)} · ${ctx.t("group")}: ${user.group} · ${ctx.t("course")}: ${user.course} · ${user.direction}`])
      ]),
      profileAction
    ]),
    el("div", { class: "profile-stats" }, [
      el("span", {}, [String(posts.length), el("small", {}, ["Posts"])]),
      el("span", {}, [String(ctx.state.friends.filter((item) => item.status === "accepted" && (item.user_id === user.id || item.friend_id === user.id)).length), el("small", {}, [ctx.t("friends")])]),
      el("span", {}, [String(user.clubs?.length || 0), el("small", {}, [ctx.t("clubs")])])
    ]),
    el("div", { class: "split" }, [
      el("aside", { class: "info-panel" }, [
        el("h3", {}, [ctx.t("about")]),
        el("p", {}, [user.bio]),
        el("h3", {}, [ctx.t("interests")]),
        el("div", { class: "chips" }, [...(user.interests || []).map((item) => el("span", {}, [item])), ...(user.clubs || []).map((item) => el("span", {}, [item]))])
      ]),
      el("div", { class: "main-column" }, posts.length ? posts.map((post) => PostCard(ctx, post)) : [el("p", { class: "empty" }, [ctx.t("empty")])])
    ])
  ]);
}
