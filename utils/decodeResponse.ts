export default function decodeResponse(data: Record<string, string>) {
  if (!data) return null;
  const kLength = Object.keys(data).length;
  const decArr: string[] = new Array<string>(kLength);
  for (let key in data) {
    const val = data[key];
    const index = kLength - (parseInt(key.replace("_", ""), 16) - 10);
    decArr[index] = val;
  }
  const base = decArr.join("");
  let json;
  if (process.client) json = atob(base);
  else json = Buffer.from(base, "base64").toString("utf-8");
  return JSON.parse(json);
}
