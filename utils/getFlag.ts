export default function getFlag(code: string | undefined):string {
    if (!code) return '';
    return `https://flagcdn.com/32x24/${code}.webp`;
}