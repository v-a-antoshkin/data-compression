let tests = [test1, test2, test3, test4, test5, test6, test7, test8, test9, test10, test11, test12, test13, test14, test15, test16, test17, test18];

function compressTest() {
    let mass = input.value.split(',').map((a) => +a);
    let compress_str = compress(mass);
    output.value = compress_str;
    result.value = decompress(compress_str);
    coefficient.value = compress_str.length / str.value.length;
    compare.checked = compareMass(mass, result.value.split(',').map((a) => +a))
}

function compareMass(a, b) {
    let sortMass1 = Array(301).fill(0);
    let sortMass2 = Array(301).fill(0);
    a.forEach( element => {
        sortMass1[element]++
    });
    b.forEach( element => {
        sortMass2[element]++
    });
    sortMass1.forEach( (element, index) => {
        if (sortMass2[index] != element) {
            return false;
        }
    });
    return true;
}

// Однозначное число
function test1() {
    return [1];
}

// Два одинаковых однозначных числа
function test2() {
    return [1, 1];
}

// Три одинаковых однозначных числа
function test3() {
    return [1, 1, 1];
}

// Четыре одинаковых однозначных числа
function test4() {
    return [1, 1, 1, 1];
}

// Два различных однозначных числа
function test5() {
    return [1, 2];
}

// Три различных однозначных числа
function test6() {
    return [1, 2, 3];
}

// Все разных однозначных числа
function test7() {
    return [...Array(10).keys()];
}

// Все одинаковые однозначные числа
function test8() {
    return Array(10).fill(1);
}

// Все разные двузначные числа
function test9() {
    return [...Array(90).keys()].map(a => a + 10)
}

// Все одинаковые двузначные числа
function test10() {
    return Array(90).fill(10);
}

// Все разные трехзначные числа
function test11() {
    return [...Array(201).keys()].map(a => a + 100);
}

// Все одинаковые трехзначные числа
function test12() {
    return Array(201).fill(100);
}

// Все числа по 3
function test13() {
    let array = Array(900);
    for (let index = 0; index < 300; index++) {
        array[index * 3] = index + 1;
        array[index * 3 + 1] = index + 1;
        array[index * 3 + 2] = index + 1;
    }
    return array;
}

// 50 случайных чисел
function test14(num = 50) {
    array = Array(num);
    for (let i = 0; i < array.length; i++) {
        array[i] = randomInteger(1, 300);
    }
    return array;
}

// 100 случайных чисел
function test15() {
    return test14(100);
}

// 500 случайных чисел
function test16() {
    return test14(500);
}

// 1000 случайных чисел
function test17() {
    return test14(1000);
}

// Четыре разных однозначных числа
function test18() {
    return [1, 2, 3, 4];
}
function selectTest(number) {
    input.value = tests[number]();
    str.value = input.value.replaceAll(',','')
    compressTest();
}

function changeMass() {
    str.value = input.value.replaceAll(',','')
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }