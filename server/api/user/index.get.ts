export default defineEventHandler(async (event) => {
  const cookie = getCookie(event,"A1");
  if (!cookie)
    return setResponseStatus(event,403,"No cookie");
  
})
