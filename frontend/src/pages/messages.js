import { el } from "../shared/dom.js";
import { currentUser, getUser, nextId } from "../state.js";

export function MessagesPage(ctx) {
  const viewer = currentUser(ctx.state);
  const selected = Number(ctx.params.id || ctx.state.users.find((user) => user.id !== viewer.id)?.id);
  const peer = getUser(ctx.state, selected);
  const thread = ctx.state.messages.filter((msg) =>
    (msg.from === viewer.id && msg.to === peer.id) || (msg.from === peer.id && msg.to === viewer.id)
  );
  const send = (event) => {
    event.preventDefault();
    const input = event.currentTarget.elements.message;
    const text = input.value.trim();
    if (!text) return;
    ctx.state.messages.push({ id: nextId(ctx.state.messages), chat_id: `${viewer.id}-${peer.id}`, from: viewer.id, to: peer.id, text, created_at: new Date().toISOString() });
    input.value = "";
    ctx.persist();
    ctx.render();
  };
  return el("section", { class: "messages-page" }, [
    el("aside", { class: "chat-list" }, ctx.state.users.filter((user) => user.id !== viewer.id).map((user) =>
      el("button", { class: `person-row ${user.id === peer.id ? "active" : ""}`, onclick: () => ctx.go("messages", { id: user.id }) }, [
        el("img", { src: user.avatar, alt: user.first_name }),
        el("span", {}, [`${user.first_name} ${user.last_name}`, el("small", {}, [user.direction])])
      ])
    )),
    el("section", { class: "chat-panel" }, [
      el("div", { class: "chat-head" }, [el("img", { src: peer.avatar, alt: peer.first_name }), el("h2", {}, [`${peer.first_name} ${peer.last_name}`])]),
      el("div", { class: "chat-body" }, thread.map((msg) => el("p", { class: msg.from === viewer.id ? "bubble mine" : "bubble" }, [msg.text]))),
      el("form", { class: "chat-form", onsubmit: send }, [
        el("input", { name: "message", placeholder: ctx.t("messages"), autocomplete: "off" }),
        el("button", { class: "primary-button" }, [ctx.t("send")])
      ])
    ])
  ]);
}
