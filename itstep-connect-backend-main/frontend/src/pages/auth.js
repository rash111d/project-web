import { api } from "../api.js";
import { el, icon } from "../shared/dom.js";
import { nextId } from "../state.js";

function field(name, placeholder, type = "text") {
  return el("label", { class: "field" }, [
    el("input", {
      name,
      type,
      placeholder,
      required: true,
      autocomplete: name
    }),
  ]);
}

export function AuthPage(ctx, mode = "login") {

  const isLogin = mode === "login";

  const submit = async (event) => {

    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const payload = Object.fromEntries(form.entries());

    try {

      const data = isLogin
        ? await api.login(payload)
        : await api.register(payload);

      ctx.state.apiOnline = true;

      if (data.error) {

        alert(data.error);
        return;
      }

      if (data.token) {
        ctx.state.token = data.token;
      }

      if (data.user) {

        const normalized = {
          id: data.user.ID || data.user.id,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          email: data.user.email,
          group: "P32",
          course: "1",
          direction: "Student",
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            `${data.user.first_name} ${data.user.last_name}`
          )}&background=2563eb&color=fff`,
          cover:
            "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
          bio: "ITSTEP Connect user",
          clubs: [],
          interests: [],
          role: "student"
        };

        ctx.state.users = [
          normalized,
          ...ctx.state.users.filter(
            (user) => user.id !== normalized.id
          )
        ];

        ctx.state.currentUserId = normalized.id;
      }

      ctx.persist();

      ctx.go("feed");

    } catch (error) {

      console.error(error);

      alert("Wrong email or password");
    }
  };

  return el("main", { class: "auth-shell" }, [
    el("section", { class: "auth-card" }, [

      el("div", { class: "auth-logo" }, [
        el("span", { class: "brand-mark" }, ["IT"]),
        el("b", {}, [ctx.t("appName")])
      ]),

      el("h1", {}, [
        isLogin ? ctx.t("loginTitle") : ctx.t("registerTitle")
      ]),

      el("p", {}, [
        isLogin ? ctx.t("loginHint") : ctx.t("registerHint")
      ]),

      el("form", {
        class: "auth-form",
        onsubmit: submit
      }, [

        !isLogin
          ? field("first_name", ctx.t("firstName"))
          : "",

        !isLogin
          ? field("last_name", ctx.t("lastName"))
          : "",

        field("email", ctx.t("email"), "email"),

        field("password", ctx.t("password"), "password"),

        el("button", { class: "primary-button" }, [
          isLogin ? ctx.t("signIn") : ctx.t("signUp")
        ])
      ]),

      el("button", {
        class: "text-button",
        onclick: () => ctx.go(
          isLogin ? "register" : "login"
        )
      }, [
        isLogin
          ? `${ctx.t("noAccount")} ${ctx.t("signUp")}`
          : `${ctx.t("hasAccount")} ${ctx.t("signIn")}`
      ]),

      el("button", {
        class: "lang-toggle auth-lang",
        onclick: () => {

          ctx.state.lang =
            ctx.state.lang === "ru"
              ? "en"
              : "ru";

          ctx.persist();

          ctx.render();
        }
      }, [
        el("span", { html: icon("settings") }),
        ctx.state.lang === "ru" ? "EN" : "RU"
      ])
    ])
  ]);
}