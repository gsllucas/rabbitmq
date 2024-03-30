export async function sleep(time = 1000) {
  await new Promise((resolve) => setInterval(() => resolve(true), time));
}
