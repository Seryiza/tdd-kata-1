import StringCalculator from './kata';

test('Empty string should be zero', () => {
  const calc = new StringCalculator();
  expect(calc.add('')).toBe(0);
});
