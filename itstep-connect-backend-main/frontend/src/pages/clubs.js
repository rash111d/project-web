import { el } from "../shared/dom.js";
import { currentUser } from "../state.js";

export function ClubsPage(ctx) {
  const user = currentUser(ctx.state);
  return el("section", { class: "cards-page" }, [
    el("h1", {}, [ctx.t("clubs")]),
    el("div", { class: "cards-grid" }, ctx.state.clubs.map((club) => {
      const joined = club.members.includes(user.id);
      return el("article", { class: "club-card" }, [
        el("span", { class: "tag" }, [club.category]),
        el("h2", {}, [club.name]),
        el("p", {}, [club.description]),
        el("dl", {}, [
          el("dt", {}, [ctx.t("schedule")]), el("dd", {}, [club.schedule]),
          el("dt", {}, [ctx.t("contacts")]), el("dd", {}, [club.contact])
        ]),
        el("button", {
          class: joined ? "secondary-button" : "primary-button",
          onclick: () => {
            club.members = joined ? club.members.filter((id) => id !== user.id) : [...club.members, user.id];
            if (joined) user.clubs = (user.clubs || []).filter((name) => name !== club.name);
            else user.clubs = [...new Set([...(user.clubs || []), club.name])];
            ctx.persist();
            ctx.render();
          }
        }, [joined ? ctx.t("leaveClub") : ctx.t("joinClub")])
      ]);
    }))
  ]);
}
