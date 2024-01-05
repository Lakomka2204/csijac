export default function decodeResponse(data:Record<string,string>) {
  const kLength = Object.keys(data).length;
  const decArr: string[] = new Array<string>(kLength);
  for(let key in data) {
    const val = data[key];
    const index = kLength - (parseInt(key.replace("_",""),16) - 10);
    console.log(key,index,val);
    decArr[index] = val;
  }
  console.log(decArr);
  const base = decArr.join("");
  console.log(base);
  const json = Buffer.from(base,'base64').toString('utf-8');
  console.log(json);
  return JSON.parse(json);
}
