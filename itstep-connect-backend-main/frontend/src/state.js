import { demoClubs, demoComments, demoMessages, demoNews, demoPosts, demoUsers } from "./data/mockData.js";

const STORAGE_KEY = "itstep-connect-state-v1";

const defaultState = {
  lang: "ru",
  token: "",
  apiOnline: false,
  route: "login",
  currentUserId: 1,
  users: demoUsers,
  posts: demoPosts,
  comments: demoComments,
  clubs: demoClubs,
  news: demoNews,
  messages: demoMessages,
  friends: [{ user_id: 1, friend_id: 2, status: "accepted" }, { user_id: 3, friend_id: 1, status: "pending" }],
  notifications: [
    { id: 1, text: "Sophia sent a friend request", read: false },
    { id: 2, text: "New event was added to college news", read: false }
  ]
};

export function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return stored ? { ...defaultState, ...stored } : structuredClone(defaultState);
  } catch {
    return structuredClone(defaultState);
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function currentUser(state) {
  return state.users.find((user) => user.id === state.currentUserId) || state.users[0];
}

export function getUser(state, id) {
  return state.users.find((user) => Number(user.id) === Number(id)) || state.users[0];
}

export function nextId(items) {
  return Math.max(0, ...items.map((item) => Number(item.id) || 0)) + 1;
}
