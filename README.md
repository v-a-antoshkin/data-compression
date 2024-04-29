#Лаборатория системных технологий

##Тестовое задание

Есть множество (массив, где порядок не важен) целых чисел в диапазоне от 1 до 300. 
Количество чисел - до 1000. Напишите функцию сериализации / десериализации в строку, чтобы итоговая строка была компактной.
**Цель задачи** - максимально сжать данные относительно простой сериализации без алгоритма сжатия (хотя бы 50% в среднем). 
Сериализованная строка должна содержать только ASCII символы. Можно использовать любой язык программирования.
Вместе с решением нужно прислать набор тестов - исходная строка, сжатая строка, коэффициент сжатия.
**Примеры тестов**: простейшие короткие, случайные - 50 чисел, 100 чисел, 500 чисел, 1000 чисел, граничные - все числа 1 знака, все числа из 2х знаков, все числа из 3х знаков, каждого числа по 3 - всего чисел 900.

Решение задачи:
Все однозначные числа кодируются 4 битами
0 — 0000
1 — 0001
2 — 0010
3 — 0011
4 — 0100
5 — 0101
6 — 0110
7 — 0111
8 — 1000
9 — 1001

Для 1 числа коэффициент сжатия 1
Для 2 чисел коэффициент сжатия 0.5
Для 3 чисел коэффициент сжатия 0.66 Меньше не получается 4 бита теряются на ASCII символ, который всегда 8 бит
Для 4 чисел коэффициент сжатия 0.5
Для одинаковых чисел добавляется к коду числа количество повторений.
Количество повторений кодируется следующим образом:
Задается разделитель размером 4 бита:
1010 для количества от 0 до 255
1011 для количества от 256 до 511
1100 для количества от 512 до 767
1101 для количества от 768 до 1023
После этого задается количество повторений 8 битами
Например, если число 1 повторяется 4 раза оно кодируется следующим образом:
1010000001000001
разделитель количества 1010
количество повторений 00000100
число 0001
Всего требуется 16 бит. Учет повторений становится эффективными только тогда, когда числа повторяются больше 3 раз.

Для двухзначных и трехзначных чисел используется кодирование с использованием 6 бит.
Для это весь диапазон чисел от 10 до 300 разбивается на 6 групп по 50 чисел в каждой группе. Каждая группа кодируется 6 битным числом:
111000: 10 — 59
111001: 60 — 109
111010: 110- 159
111011: 160 - 209
111100: 210 - 259
111101: 260 - 309

В каждой группе числа кодируются 6 битами в диапазоне:
0 – 000000 
1 – 000001
49 – 110001

Например, для кодирования числа 10 будет нужен 12 битный код:
111000000000
номер группы (111000) и номер числа в ней (000000) 

Для одного двузначного числа коэффициент сжатия будет 75% = 12 / 16 * 100
Для одного трехзначного числа коэффициент сжатия будет 50% = 12 / 24* 100
Для двух двузначных чисел одной группы код будет 18 битный, например для чисел 10 и 11:
111000000000000001
Коэффициент сжатия будет 18 / 32 = 56.25 %

Для одного трехзначного числа коэффициент сжатия будет 50% = 12 / 24 * 100
Например, для числа 110 код будет 12 битный:
111010000000

Для повторяющихся двух и трехзначных чисел кодируется количество повторений следующим образом:
Задается разделитель размером 6 бит:
110010 для количества от 0 до 255
110011 для количества от 256 до 511
110100 для количества от 512 до 767
110101 для количества от 768 до 1023

После этого задается количество повторений 8 битами
Например, если число 10 повторяется 4 раза оно кодируется следующим образом:
11001000000100000000
разделитель количества 110010
количество повторений 00000100
число 000000
Всего требуется 20 бит. Учет повторений становится эффективными только тогда, когда двузначные и трехзначные числа повторяются более 3 раз.

При случайном наборе чисел возникает устойчивое сжатие в 3 и более раз, а коэффициент сжатия растет с увеличением количества чисел.
