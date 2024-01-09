import getPGClient from "~/server/databases/db";
import { login } from "~/server/utils/auth";
import decodeResponse from "~/utils/decodeResponse";
/*
{
  username : str 0 - 32
  password : str 0 - 32
}
*/
export default defineEventHandler(async (event) => {
  const authCookie = getCookie(event, "A1");
  if (authCookie) return setResponseStatus(event, 405, "doubleLogin");
  const b = await readBody(event);
  const dec = decodeResponse(b);
  console.log("DEC", dec);
  if (
    !dec?.username ||
    !dec?.password
  )
    return setResponseStatus(event, 400, "noProp");
  const reqIp = getRequestIP(event, { xForwardedFor: true });
  if (!reqIp)
    return setResponseStatus(event,400,"Bruhh nigga where yo IP address go issue yourself a new one");
  const reqUA = getHeader(event, "User-Agent");
  if (!reqUA)
    return setResponseStatus(event,400,"Bot detected");
  try{
    const cookie = getCookie(event,"A1");
    if (cookie)
      setResponseStatus(event,403,"doubleLogin");
    const userToken = await login(dec.username,dec.password,reqIp,reqUA);
    setCookie(event,"A1",userToken);
    return setResponseStatus(event,200);
  }
  catch (cError : any) { // custom error
    return setResponseStatus(event,cError[0],cError[1]);
  }
});
