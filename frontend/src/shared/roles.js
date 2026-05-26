export const ROLE = {
  STUDENT: "student",
  TEACHER: "teacher",
  DIRECTOR: "director"
};

export function normalizeRole(role) {
  return role === "admin" ? ROLE.DIRECTOR : role || ROLE.STUDENT;
}

export function canOpenAdmin(user) {
  const role = normalizeRole(user?.role);
  return role === ROLE.TEACHER || role === ROLE.DIRECTOR;
}

export function canModeratePosts(user) {
  return canOpenAdmin(user);
}

export function canManageUsers(user) {
  return normalizeRole(user?.role) === ROLE.DIRECTOR;
}

export function canManageClubs(user) {
  return canOpenAdmin(user);
}

export function canManageNews(user) {
  return canOpenAdmin(user);
}

export function nextRole(role) {
  const order = [ROLE.STUDENT, ROLE.TEACHER, ROLE.DIRECTOR];
  const current = normalizeRole(role);
  return order[(order.indexOf(current) + 1) % order.length];
}
