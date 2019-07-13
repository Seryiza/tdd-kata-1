export default class StringCalculator {
  add(numbers: string): number {
    const sum = numbers
      .split(',')
      .map(Number)
      .reduce((sum, num) => sum + num);

    return sum;
  }
}
