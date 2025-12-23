export async function sleep(timeout: number) {
  return new Promise<void>((r) => setTimeout(r, timeout));
}
