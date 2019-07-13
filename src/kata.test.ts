import StringCalculator from './kata';

test('Empty string should be zero', () => {
  const calc = new StringCalculator();
  expect(calc.add('')).toBe(0);
});

test('String with a number should return it number', () => {
  const calc = new StringCalculator();
  expect(calc.add('2')).toBe(2);
  expect(calc.add('100')).toBe(100);
});

test('String with two numbers should return it sum', () => {
  const calc = new StringCalculator();
  expect(calc.add('1,2')).toBe(3);
  expect(calc.add('100,200')).toBe(300);
});
