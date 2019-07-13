// Better use third-party library for regexps instead my escape and matchAll functions
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

  hasCustomDelimiter(numbersWithOptions: string): boolean {
    return numbersWithOptions.startsWith(StringCalculator.CUSTOM_DELIMITER_BEGIN);
  }

  getDelimiters(numbersWithOptions: string): string[] {
    if (this.hasCustomDelimiter(numbersWithOptions)) {
      const start = (
        numbersWithOptions.indexOf(StringCalculator.CUSTOM_DELIMITER_BEGIN)
        + StringCalculator.CUSTOM_DELIMITER_BEGIN.length
      );
      const end = (
        numbersWithOptions.indexOf(StringCalculator.CUSTOM_DELIMITER_END)
      );

      const option = numbersWithOptions.slice(start, end);
      const customDelimiters = matchAll(/\[(.*?)\]/g, option);
      return customDelimiters || [option];
    }
    return [',', '\n'];
  }

  getNumbersAsString(numbersWithOptions: string): string {
    if (this.hasCustomDelimiter(numbersWithOptions)) {
      const start = numbersWithOptions.indexOf(StringCalculator.CUSTOM_DELIMITER_END);
      return numbersWithOptions.slice(start + 1);
    }
    return numbersWithOptions;
  }

  add(numbersWithOptionss: string): number {
    const delimiters = this.getDelimiters(numbersWithOptionss);
    const numbersAsString = this.getNumbersAsString(numbersWithOptionss);

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
