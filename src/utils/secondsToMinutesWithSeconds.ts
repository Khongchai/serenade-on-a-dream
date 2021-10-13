export default function secondsToMinuteWithSeconds(timeInSeconds: number) {
  let secondsRemainder: string | number = timeInSeconds % 60;
  let minute: string | number = (timeInSeconds - secondsRemainder) / 60;

  //beautify format to 00 instead of 0
  secondsRemainder =
    secondsRemainder < 10 ? `0${~~secondsRemainder}` : ~~secondsRemainder;
  return minute + ":" + secondsRemainder;
}
