import { el } from "../shared/dom.js";

export function NavigationPage(ctx) {
  const items = [
    [ctx.t("guideClubs"), "Backend Lab, Design Studio, Cyber Club, Media Club"],
    [ctx.t("guideHelp"), "Student council, admin office, mentor, club responsible person"],
    [ctx.t("guideSchedule"), "Main college portal, group chat, curator announcements"],
    [ctx.t("guidePeople"), "Use search, profile cards, office contacts and club pages"],
    [ctx.t("guideActivities"), "Lectures, hackathons, clubs, project defenses, media events"]
  ];
  return el("section", { class: "cards-page" }, [
    el("h1", {}, [ctx.t("studentsGuide")]),
    el("div", { class: "guide-grid" }, items.map(([title, body], index) =>
      el("article", { class: "guide-card" }, [
        el("span", { class: "step" }, [String(index + 1)]),
        el("h2", {}, [title]),
        el("p", {}, [body])
      ])
    ))
  ]);
}
