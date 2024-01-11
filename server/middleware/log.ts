
export default defineEventHandler(async (event) => {
  console.log(getRequestIP(event,{xForwardedFor:true}),event.path);
})
