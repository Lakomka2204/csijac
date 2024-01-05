export default defineEventHandler(async (event) => {
  
  return {
    badi: event._requestBody,
    ip:getRequestIP(event, {xForwardedFor:true}),

  };
})
