const escape = (input: string): string => {
  return input.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

const splitBySeparators = (text: string, separators: string[]): any[] => {
  const escaped = separators.map(escape);
  const re = new RegExp(`(${escaped.join('|')})`);
  return text.split(re);
};

export default class StringCalculator {
  static CUSTOM_DELIMITER_BEGIN = '//';
  static CUSTOM_DELIMITER_END = '\n';

  hasCustomDelimiter(numbersWithOption: string): boolean {
    return numbersWithOption.startsWith(StringCalculator.CUSTOM_DELIMITER_BEGIN);
  }

  getDelimiters(numbersWithOption: string): string[] {
    if (this.hasCustomDelimiter(numbersWithOption)) {
      const start = (
        numbersWithOption.indexOf(StringCalculator.CUSTOM_DELIMITER_BEGIN)
        + StringCalculator.CUSTOM_DELIMITER_BEGIN.length
      );
      const end = (
        numbersWithOption.indexOf(StringCalculator.CUSTOM_DELIMITER_END)
      );

      const customDelimiter = numbersWithOption.slice(start, end);
      const isDelimiterComplicated = (
        customDelimiter.startsWith('[')
        && customDelimiter.endsWith(']')
      );

      console.error(isDelimiterComplicated, customDelimiter.slice(1, -1));
      return isDelimiterComplicated
        ? [customDelimiter.slice(1, -1)]
        : [customDelimiter];
    }
    return [',', '\n'];
  }

  getNumbersAsString(numbersWithOption: string): string {
    if (this.hasCustomDelimiter(numbersWithOption)) {
      const start = numbersWithOption.indexOf(StringCalculator.CUSTOM_DELIMITER_END);
      return numbersWithOption.slice(start + 1);
    }
    return numbersWithOption;
  }

  add(numbersWithOption: string): number {
    const delimiters = this.getDelimiters(numbersWithOption);
    const numbersAsString = this.getNumbersAsString(numbersWithOption);

    const numbers = splitBySeparators(numbersAsString, delimiters)
      .map(Number)
      .filter(x => x <= 1000);

    const negatives = numbers.filter(x => x < 0);
    if (negatives.length) {
      throw new Error(`negatives not allowed: ${negatives.join(', ')}`);
    }

    const sum = numbers.reduce((sum, num) => sum + num);
    return sum;
  }
}
