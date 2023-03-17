export const ADMIN = 1;

export const parseUserRole = (token) => {
  try {
    if (token !== null) {
      return JSON.parse(atob(token.split(".")[1])).Role;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

