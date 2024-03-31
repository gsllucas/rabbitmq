export function toBuffer(value: object | string) {
  const bufferData = typeof value === 'object' ? JSON.stringify(value) : value;
  return Buffer.from(bufferData);
}
