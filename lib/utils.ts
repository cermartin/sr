export function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, ''));
}
