import { el } from "../shared/dom.js";

export function NotificationsPage(ctx) {
  return el("section", { class: "cards-page" }, [
    el("h1", {}, [ctx.t("notifications")]),
    ...ctx.state.notifications.map((item) => el("button", {
      class: `notification ${item.read ? "" : "unread"}`,
      onclick: () => {
        item.read = true;
        ctx.persist();
        ctx.render();
      }
    }, [item.text]))
  ]);
}
