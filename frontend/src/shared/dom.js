export function el(tag, options = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(options).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (key === "class") node.className = value;
    else if (key === "dataset") Object.assign(node.dataset, value);
    else if (key.startsWith("on") && typeof value === "function") node.addEventListener(key.slice(2).toLowerCase(), value);
    else if (key === "html") node.innerHTML = value;
    else node.setAttribute(key, value);
  });
  children.forEach((child) => node.append(child?.nodeType ? child : document.createTextNode(String(child))));
  return node;
}

export function icon(name) {
  const icons = {
    home: "M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3V10.5Z",
    search: "M10.5 18a7.5 7.5 0 1 1 5.3-12.8A7.5 7.5 0 0 1 10.5 18Zm5.8-1.7L21 21",
    bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4",
    mail: "M4 5h16v14H4V5Zm0 2 8 6 8-6",
    user: "M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
    bookmark: "M6 3h12v18l-6-4-6 4V3Z",
    settings: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19.4 15a1.8 1.8 0 0 0 .36 2l.05.05-2.12 2.12-.05-.05a1.8 1.8 0 0 0-2-.36 1.8 1.8 0 0 0-1.1 1.65V20h-3v-.07A1.8 1.8 0 0 0 10.4 18.3a1.8 1.8 0 0 0-2 .36l-.05.05-2.12-2.12.05-.05a1.8 1.8 0 0 0 .36-2 1.8 1.8 0 0 0-1.65-1.1H5v-3h.07A1.8 1.8 0 0 0 6.7 9.6a1.8 1.8 0 0 0-.36-2l-.05-.05 2.12-2.12.05.05a1.8 1.8 0 0 0 2 .36A1.8 1.8 0 0 0 11.6 4.2V4h3v.07a1.8 1.8 0 0 0 1.1 1.65 1.8 1.8 0 0 0 2-.36l.05-.05 2.12 2.12-.05.05a1.8 1.8 0 0 0-.36 2 1.8 1.8 0 0 0 1.65 1.1H21v3h-.07A1.8 1.8 0 0 0 19.4 15Z",
    heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z",
    comment: "M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-4-.96L3 20l1.1-4.2A8.4 8.4 0 1 1 21 11.5Z",
    plus: "M12 5v14M5 12h14",
    x: "M6 6l12 12M18 6 6 18",
    send: "M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z",
    trash: "M3 6h18M8 6V4h8v2m-9 0 1 15h8l1-15",
    edit: "M4 20h4L18.5 9.5a2.8 2.8 0 0 0-4-4L4 16v4Z",
    users: "M17 21a5 5 0 0 0-10 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm9 10a4 4 0 0 0-5-3.9M17 3.2a3.5 3.5 0 0 1 0 6.6",
    news: "M4 5h13v14H4V5Zm13 3h3v11a2 2 0 0 1-2 2H6M7 9h7M7 13h7M7 17h4",
    map: "M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Zm0 0V3m6 18V6",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
  };
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="${icons[name] || icons.home}"/></svg>`;
}

export function formatDate(value, lang) {
  const date = value ? new Date(value) : new Date();
  return new Intl.DateTimeFormat(lang === "ru" ? "ru-RU" : "en-US", { month: "short", day: "numeric" }).format(date);
}

export function initials(user) {
  return `${user?.first_name?.[0] || "I"}${user?.last_name?.[0] || "C"}`.toUpperCase();
}
