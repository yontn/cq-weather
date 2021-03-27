export default function mpsToKph(mps: number | undefined = 0): number {
  return Number((mps * 3.6).toFixed());
}
