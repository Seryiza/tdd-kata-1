# TDD Kata 1

Решение [задачи от Roy Osherove](https://osherove.com/tdd-kata-1/), используя методологию TDD.

Использован [Jest](https://facebook.github.io/jest/). Получил мотивацию сделать это, прочитав [статью на FCC](https://www.freecodecamp.org/news/a-quick-introduction-to-test-driven-development-with-jest-cac71cb94e50/).

## Как запустить тесты?
```bash
$ npm run test
```

## Что я получил?

Я получил крутой (почти первый) опыт работы с TDD. Увидел свои ошибки и постарался сделать выводы.

## Мои ошибки

* **Преждевременные обобщение и оптимизация.** Я слишком рано переходил от этапа "одна вещь" -> "неопределённо много вещей". Это позволяло мне в будущем (в последующих тестах) экономить время, но это "будущее" в бизнес-проектах может и не наступить.

  * (Тест #1) К концу написания реализации, у меня уже был код, обрабатывающий неопределённое количество чисел. Тут стоило сделать нечто вроде `[a, b] = numbers.split(',')`, но я перешёл сразу к функциональному подходу через `.split(...).map(...).reduce(...)`. Некритично, наверное. К тому же мне кажется это больше правильным решением, чем не.

  * (Тест #4) В описании теста не было уточнения, что разделитель состоит из одного символа. Может это подразумевалось, но я не уловил `:(`. Из-за этого сделал реализацию с поддержкой любой длины, которую потом дважды переписывал по ходу следующих заданий.

* **Выбор микроскопа и молотка.** В частности выбор между прямой обработки строк и использованием регулярных выражений. После рефакторинга у меня активно используются регулярные. Не думаю, что это плохая идея, но в реальных проектах я бы их спрятал подальше за абстракциями.

* **Невнимательность.**
  * (Тест #?) Отвлёкся, переключился на другие дела, потерял контекст, забыл написать тест перед кодом. Упс.

## Выводы

* **TDD - относительна простая концепция.** Насколько простая, что даже сложно её соблюдать: думаю, если взять TDD за привычку, то это неизбежно повлияет на взгляды программирования.

* **TDD принуждает писать тесты.** Потому что сначала тесты, потом код. Я всё ещё могу себе позволить написать код и отложить написание тестов на потом. Не стоит даже говорить, насколько тесты помогают при рефакторинге.
