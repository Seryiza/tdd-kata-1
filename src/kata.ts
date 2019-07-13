// Note: better use third-party library for regexps instead my escape and matchAll functions

/**
 * Escaping string to use in regexp.
 *
 * @param input Input text to escape
 */
const escape = (input: string): string => {
  return input.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

/**
 * Return all matches of regexp in text.
 * Note: requires a group in regexp-.
 *
 * @param re
 * @param text
 */
const matchAll = (re: RegExp, text: string): string[] => {
  const matched = [];

  let match: string[];
  while (match = re.exec(text)) {
    matched.push(match[1]);
  }
  return matched;
};

/**
 * Split text by separators.
 *
 * @param text
 * @param separators
 */
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

  /**
   * Return delimiters from options (if exists) or default settings.
   *
   * @example
   * // -> [';']
   * getDelimiters('//;\n1;2;3');
   *
   * @example
   * // -> ['***', '%']
   * getDelimiters('//[***][%]\n1***2%3');
   *
   * @example
   * // -> default settings
   * getDelimiters('1,2,3');
   *
   * @param numbersWithOptions
   */
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

  /**
   * Return numbers without options from string.
   *
   * @param numbersWithOptions
   */
  getNumbersAsString(numbersWithOptions: string): string {
    if (this.hasCustomDelimiter(numbersWithOptions)) {
      const start = numbersWithOptions.indexOf(StringCalculator.CUSTOM_DELIMITER_END);
      return numbersWithOptions.slice(start + 1);
    }
    return numbersWithOptions;
  }

  /**
   * Return sum of numbers.
   *
   * @param numbersWithOptionss
   */
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

    return numbers.reduce((sum, num) => sum + num);
  }
}
