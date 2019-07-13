const splitBySeparators = (text: string, separators: string[]): any[] => {
  const splitted = [];
  
  const separatorsIndices = [];
  for (let i = 0; i < text.length; i++) {
    const isSeparator = separators.some(sep => sep === text[i]);
    if (isSeparator) {
      separatorsIndices.push(i);
    }
  }

  const sliceIndices = [-1, ...separatorsIndices, text.length];
  for (let i = 0; i < sliceIndices.length - 1; i++) {
    const start = sliceIndices[i] + 1;
    const end = sliceIndices[i + 1];
    splitted.push(text.slice(start, end));
  }
  
  return splitted;
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
      )
      
      return [numbersWithOption.slice(start, end)];
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

    const sum = splitBySeparators(numbersAsString, delimiters)
      .map(Number)
      .reduce((sum, num) => sum + num);

    return sum;
  }
}
