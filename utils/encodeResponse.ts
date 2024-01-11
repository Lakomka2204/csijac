const BASE_DIV = 16;
export default function encodeResponse(data: object) {
  const s = JSON.stringify(data);
  const b = btoa(s);
  const fragmentLength = b.length / BASE_DIV;
  let encArray: string[] = [];
  const sepLength = Math.floor(fragmentLength) + +(fragmentLength % 1 != 0);
  for (let i = 0; i < sepLength; i++) {
    const pos = i * BASE_DIV;
    encArray[i] = b.substring(pos, pos + BASE_DIV);
  }
  encArray = encArray.reverse();
  const encResponse: Record<string, string> = {};
  for (let i in encArray) {
    encResponse[(+i + 10).toString(16).padStart(2, "_")] = encArray[i];
  }
  const sortedData: Record<string, string> = Object.fromEntries(
    Object.entries(encResponse).sort(([, valueA], [, valueB]) =>
      valueA.localeCompare(valueB)
    )
  );
  console.log(data,'> to >',sortedData);
  return sortedData;
}

