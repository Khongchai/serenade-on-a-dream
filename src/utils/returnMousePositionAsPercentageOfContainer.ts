export default function returnMousePositionAsPercentageOfContainer(
  //clientX
  mouseClientX: number,
  //getBoundingClientRect().x
  containerBoundingX: number,
  //clientWidth
  containerWidth: number
) {
  const percentage =
    inverseLerp(
      containerBoundingX,
      containerBoundingX + containerWidth,
      mouseClientX
    ) * 100;
  return percentage;
}

function inverseLerp(x: number, y: number, v: number) {
  return (v - x) / (y - x);
}
