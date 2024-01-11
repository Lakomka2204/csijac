import { getUser } from "../utils/user";

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event,"A1");
  if (cookie) {
    const user = await getUser(cookie);
    if (user)
      event.context.user = user;
  }
})
