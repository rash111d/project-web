import { api } from "./api.js";
import { Modal } from "./components/modal.js";
import { Sidebar } from "./components/sidebar.js";
import { Topbar } from "./components/topbar.js";
import { createTranslator } from "./i18n.js";
import { AdminPage } from "./pages/admin.js";
import { AuthPage } from "./pages/auth.js";
import { ClubsPage } from "./pages/clubs.js";
import { FeedPage } from "./pages/feed.js";
import { MessagesPage } from "./pages/messages.js";
import { NavigationPage } from "./pages/navigation.js";
import { NewsPage, createNews } from "./pages/news.js";
import { NotificationsPage } from "./pages/notifications.js";
import { ProfilePage } from "./pages/profile.js";
import { SearchPage } from "./pages/search.js";
import { SettingsPage } from "./pages/settings.js";
import { el } from "./shared/dom.js";
import { canOpenAdmin } from "./shared/roles.js";
import { currentUser, loadState, nextId, saveState } from "./state.js";

const app = document.querySelector("#app");
const state = loadState();

const ctx = {
  state,
  params: {},
  query: "",
  modal: null,
  menuOpen: false,
  openComments: new Set(),
  t: createTranslator(state),
  persist: () => saveState(state),
  render,
  go(route, params = {}) {
    state.route = route;
    ctx.params = params;
    if (route !== "search") ctx.query = "";
    ctx.persist();
    render();
  },
  logout() {
    state.token = "";
    state.route = "login";
    ctx.persist();
    render();
  },
  toggleMenu() {
    ctx.menuOpen = !ctx.menuOpen;
    render();
  },
  closeModal() {
    ctx.modal = null;
    render();
  },
  openPostModal(post = null) {
    ctx.modal = () => PostModal(post);
    render();
  },
  openNewsModal() {
    ctx.modal = () => NewsModal();
    render();
  },
  openProfileModal(user) {
    ctx.modal = () => ProfileModal(user);
    render();
  }
};

function PostModal(post) {
  const user = currentUser(state);
  const submit = async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    if (post) {
      Object.assign(post, data);
    } else {
      post = { id: nextId(state.posts), user_id: user.id, created_at: new Date().toISOString(), likes: [], image: data.image || "", title: data.title, content: data.content };
      state.posts.unshift(post);
    }
    ctx.modal = null;
    ctx.persist();
    render();
    if (state.token) {
      try {
        await api.createPost(state.token, { title: post.title, content: post.content, user_id: user.id });
        state.apiOnline = true;
      } catch {
        state.apiOnline = false;
      }
      ctx.persist();
    }
  };
  return Modal(ctx, ctx.t(post ? "editPost" : "createPost"), el("form", { class: "modal-form", onsubmit: submit }, [
    el("label", {}, [ctx.t("title"), el("input", { name: "title", value: post?.title || "", required: true })]),
    el("label", {}, [ctx.t("content"), el("textarea", { name: "content", maxlength: "500", required: true }, [post?.content || ""])]),
    el("label", {}, ["Image URL", el("input", { name: "image", value: post?.image || "" })]),
    el("button", { class: "primary-button" }, [ctx.t("post")])
  ]));
}

function NewsModal() {
  const submit = (event) => {
    event.preventDefault();
    createNews(ctx, Object.fromEntries(new FormData(event.currentTarget).entries()));
    ctx.modal = null;
    render();
  };
  return Modal(ctx, ctx.t("manageNews"), el("form", { class: "modal-form", onsubmit: submit }, [
    el("label", {}, [ctx.t("title"), el("input", { name: "title", required: true })]),
    el("label", {}, ["Type", el("input", { name: "type", value: "announcement", required: true })]),
    el("label", {}, ["Date", el("input", { name: "date", type: "date", required: true })]),
    el("label", {}, [ctx.t("content"), el("textarea", { name: "body", required: true })]),
    el("button", { class: "primary-button" }, [ctx.t("save")])
  ]));
}

function ProfileModal(user) {
  const submit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    Object.assign(user, {
      first_name: data.first_name.trim(),
      last_name: data.last_name.trim(),
      group: data.group.trim(),
      course: data.course.trim(),
      direction: data.direction.trim(),
      avatar: data.avatar.trim() || user.avatar,
      cover: data.cover.trim() || user.cover,
      bio: data.bio.trim(),
      interests: data.interests.split(",").map((item) => item.trim()).filter(Boolean)
    });
    ctx.modal = null;
    ctx.persist();
    render();
  };

  return Modal(ctx, ctx.t("editProfile"), el("form", { class: "modal-form", onsubmit: submit }, [
    el("label", {}, [ctx.t("firstName"), el("input", { name: "first_name", value: user.first_name, required: true })]),
    el("label", {}, [ctx.t("lastName"), el("input", { name: "last_name", value: user.last_name, required: true })]),
    el("label", {}, [ctx.t("group"), el("input", { name: "group", value: user.group || "", required: true })]),
    el("label", {}, [ctx.t("course"), el("input", { name: "course", value: user.course || "", required: true })]),
    el("label", {}, [ctx.t("direction"), el("input", { name: "direction", value: user.direction || "", required: true })]),
    el("label", {}, [ctx.t("avatar"), el("input", { name: "avatar", value: user.avatar || "", placeholder: "https://..." })]),
    el("label", {}, [ctx.t("cover"), el("input", { name: "cover", value: user.cover || "", placeholder: "https://..." })]),
    el("label", {}, [ctx.t("about"), el("textarea", { name: "bio", maxlength: "260" }, [user.bio || ""])]),
    el("label", {}, [ctx.t("interests"), el("input", { name: "interests", value: (user.interests || []).join(", ") })]),
    el("button", { class: "primary-button" }, [ctx.t("save")])
  ]));
}

function page() {
  ctx.t = createTranslator(state);
  if (state.route === "login" || state.route === "register") return AuthPage(ctx, state.route);
  if (state.route === "admin" && !canOpenAdmin(currentUser(state))) state.route = "feed";
  const pages = {
    feed: FeedPage,
    profile: ProfilePage,
    clubs: ClubsPage,
    news: NewsPage,
    navigation: NavigationPage,
    search: SearchPage,
    messages: MessagesPage,
    admin: AdminPage,
    settings: SettingsPage,
    notifications: NotificationsPage
  };
  const Page = pages[state.route] || FeedPage;
  return el("div", { class: `app-shell ${ctx.menuOpen ? "menu-open" : ""}` }, [
    Sidebar(ctx),
    el("div", { class: "content-shell" }, [
      Topbar(ctx),
      el("main", { class: "content" }, [Page(ctx)])
    ]),
    ctx.modal ? ctx.modal() : ""
  ]);
}

function render() {
  app.replaceChildren(page());
}

async function boot() {
  if (!["login", "register"].includes(state.route)) {
    try {
      await api.health();
      state.apiOnline = true;
    } catch {
      state.apiOnline = false;
    }
  }
  saveState(state);
  render();
}

boot();
