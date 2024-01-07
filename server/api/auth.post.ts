import decodeResponse from "~/utils/decodeResponse";
import encodeResponse from "~/utils/encodeResponse";

export default defineEventHandler(async (event) => {
  const b = await readBody(event);
  const dec = decodeResponse(b);
  console.log("DEC",dec);
  if (dec.user == "sosi" && dec.password == "hyu")
    return encodeResponse({correct:true,token:"asd123awftg8rahw*()hjutfg98uihnbaWf(A-W0h4yt78yht8g79unszdhbf89gu7s0dyafg780adsyfg8hn4807gh7dfgha8dhsyf789uasdgh078fh"});
    return setResponseStatus(event,403,"Wrong password");
})
