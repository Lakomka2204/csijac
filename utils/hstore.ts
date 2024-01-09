// TOOK FROM https://www.npmjs.com/package/node-hstore?activeTab=code

function sanitize_input(input: string) {
  // http://www.postgresql.org/docs/9.0/static/sql-syntax-lexical.html [4.1.2.1-4.1.2.2]
  // single quotes (') must be replaced with double single quotes ('')
  input = input.replace(/'/, "''");
  // backslashes (\) must be replaced with double backslashes (\\)
  input = input.replace(/\\/, "\\\\");
  return input;
}

function to_string(input: boolean | number | string | object) {
  switch (typeof input) {
    case "boolean":
    case "number":
      return String(input);
    case "string":
      return sanitize_input(input);
    default:
      return "";
  }
}
function stringify(data: Record<string, any>): string {
  const hstore = Object.keys(data).map(function (key) {
    return '"' + key + '"=>"' + to_string(data[key]) + '"';
  });
  return hstore.join();
}
function parse(value: string | null | undefined): Record<string, any> | null {
  if (!value) return null;
  const result: Record<string, any> = {};
  value.split(",").forEach(function (pair) {
    const split = pair.split("=>");
    const key = split[0]
      .replace(/"/g, "")
      .replace(/^\s\s*/, "")
      .replace(/\s\s*$/, "");
    const value = split[1].replace(/"/g, "");
    result[key] = value;
  });
  return result;
}

export { parse, stringify };
