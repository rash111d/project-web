import { el, icon } from "../shared/dom.js";

export function Modal(ctx, title, body) {
  return el("div", { class: "modal-backdrop", onclick: (event) => event.target.classList.contains("modal-backdrop") && ctx.closeModal() }, [
    el("section", { class: "modal" }, [
      el("div", { class: "modal-head" }, [
        el("h2", {}, [title]),
        el("button", { class: "icon-button", onclick: ctx.closeModal, html: icon("x") })
      ]),
      body
    ])
  ]);
}
