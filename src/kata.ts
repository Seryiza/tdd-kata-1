const escape = (input: string): string => {
  return input.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

const matchAll = (re: RegExp, text: string): string[] => {
  const matched = [];

  let match: string[];
  while (match = re.exec(text)) {
    matched.push(match[1]);
  }
  return matched;
};

const splitBySeparators = (text: string, separators: string[]): any[] => {
  const escaped = separators.map(escape);
  const re = new RegExp(`(${escaped.join('|')})`);
  return text.split(re);
};

export default class StringCalculator {
  static NUMBER_LIMIT = 1000;
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

      const option = numbersWithOption.slice(start, end);
      const customDelimiters = matchAll(/\[(.*?)\]/g, option);
      return customDelimiters || [option];
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
      .filter(x => x <= StringCalculator.NUMBER_LIMIT);

    const negatives = numbers.filter(x => x < 0);
    if (negatives.length) {
      throw new Error(`negatives not allowed: ${negatives.join(', ')}`);
    }

    const sum = numbers.reduce((sum, num) => sum + num);
    return sum;
  }
}
