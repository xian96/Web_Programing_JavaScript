const au = require('./arrayUtils');
const su = require('./stringUtils');
const ou = require('./objUtils');
// blow is all functions test case in pass and not pass.
// I leave the first 4 function(8 test case) uncomment for submmition

// arrayUtils.js
// head Tests
try {
    // Should Pass
    const headOne = au.head([2, 3, 4]);
    console.log(au.head([1, 2, 3])); // Returns: 1

} catch (e) {
    console.log(e);
}
// head Fail
try {
    // const headTwo = head(1234); // throws an error
    au.head([]) // throws an error
    au.head("banana"); // throws an error
    au.head(); // throws an error
    console.error('head did not error');
} catch (e) {
    console.log('head failed successfully');
    console.log(e);
}

// last(array)Tests
try {
    console.log(au.last([1, 2, 3])); // Returns: 3
} catch (e) {
    console.log(e);
}
// last fail
try {
    console.log(au.last([]));
} catch (e) {
    console.log(e);
}

// remove(array, index) Tests
try {
    console.log(au.remove([5, 6, 7], 1)); // Returns: [5, 7]
} catch (e) {
    console.log(e);
}
// remove fail
try {
    console.log(au.remove([5, 6, 7], 3));
} catch (e) {
    console.log(e);
}

// range(end, value) Tests
try {
    console.log(au.range(4)); // Returns: [0, 1, 2, 3]
    console.log(au.range(4, 'hi')); // Returns: ["hi", "hi", "hi", "hi"]
} catch (e) {
    console.log(e);
}
// range fail
try {
    console.log(au.range(-1, 'hi'));
} catch (e) {
    console.log(e);
}

// countElements(array) Tests
try {
    console.log(au.countElements([13, '13', 13, 'hello', true, true]));
    console.log(au.countElements([]));

    /* Returns: 
    {
      "13": 3,
      "hello": 1,
      "true": 2
    }
    */
} catch (e) {
    console.log(e);
}
// countElement fail
try {
    console.log(au.countElements("string00"));
} catch (e) {
    console.log(e);
}


// isEqual(arrayOne, arrayTwo) Tests
try {
    console.log(au.isEqual([1, 2, 3], [1, 2, 3])); // Returns: true
    console.log(au.isEqual([1, 2, 3], [4, 5, 6])); // Returns: false
    console.log(au.isEqual([1, 3, 2], [1, 2, 3])); // Returns: false
    console.log(au.isEqual([1, 2], [1, 2, 3])); // Returns: false
} catch (e) {
    console.log(e);
}
// isEqual fail
try {
    console.log(au.isEqual("1,2,3", [1, 2, 3]));
} catch (e) {
    console.log(e);
}

// stringUtils.js
// capitalize(string) Tests
try {
    console.log(su.captitalize('foobar')); // Returns: "Foobar"
    console.log(su.captitalize('FOOBAR')); // Returns: "Foobar"
} catch (e) {
    console.log(e);
}
// capitalize fail
try {
    console.log(su.captitalize(['array00']));
} catch (e) {
    console.log(e);
}

// repeat(string, num) Tests
try {
    console.log(su.repeat('abc', 3)); // Returns: "abcabcabc"
    console.log(su.repeat('abc', 1)); // Returns: "abc" 
    console.log(su.repeat('abc', 0)); // Returns: ""
} catch (e) {
    console.log(e);
}
// repeat fail
try {
    console.log(su.repeat(['array00'], -1));
} catch (e) {
    console.log(e);
}

// countChars(string) Tests
try {
    console.log(su.countChars('Hello, the pie is in the oven'));
    /* Returns:
    {
      " ": 6,
      ",": 1,
      "H": 1,
      "e": 5,
      "h": 2,
      "i": 3,
      "l": 2,
      "n": 2,
      "o": 2,
      "p": 1,
      "s": 1,
      "t": 2,
      "v": 1
    }
    */
} catch (e) {
    console.log(e);
}
// countChars fail
try {
    console.log(su.countChars(['array00']));
} catch (e) {
    console.log(e);
}

// objUtils.js
// extend(...args) Tests
try {

    const first = { x: 2, y: 3 };
    const second = { a: 70, x: 4, z: 5 };
    const third = { x: 0, y: 9, q: 10 };

    const firstSecondThird = ou.extend(first, second, third);
    console.log(firstSecondThird);
    // { x: 2, y: 3, a: 70, z: 5, q: 10 }

    const secondThird = ou.extend(second, third);
    console.log(secondThird);
    // { a: 70, x: 4, z: 5, y: 9, q: 10 } 

    const thirdFirstSecond = ou.extend(third, first, second);
    console.log(thirdFirstSecond);
    // { x: 0, y: 9, q: 10, a: 70, z: 5 }
} catch (e) {
    console.log(e);
}
// extend fail
try {
    console.log(ou.extend({ x: 2, y: 3 }, undefined));  
} catch (e) {
    console.log(e);
}

// smush(...args) Tests
try {
    const first = { x: 2, y: 3 };
    const second = { a: 70, x: 4, z: 5 };
    const third = { x: 0, y: 9, q: 10 };

    const firstSecondThird = ou.smush(first, second, third);
    console.log(firstSecondThird);
    // { x: 0, y: 9, a: 70, z: 5, q: 10 }

    const secondThird = ou.smush(second, third);
    console.log(secondThird);
    // { a: 70, x: 0, z: 5, y: 9, q: 10 }

    const thirdFirstSecond = ou.smush(third, first, second);
    console.log(thirdFirstSecond);
    // { x: 4, y: 3, q: 10, a: 70, z: 5 }
} catch (e) {
    console.log(e);
}
// smush fail
try {
    console.log(ou.smush({ x: 2, y: 3 }, undefined));  
} catch (e) {
    console.log(e);
}

// mapValues(object, func) Tests
try {
    console.log(ou.mapValues({ a: 1, b: 2, c: 3 }, n => n + 1));
    /* Returns:
    {
      a: 2,
      b: 3,
      c: 4
    }
    */
} catch (e) {
    console.log(e);
}
// mapValues fail
try {
    console.log(ou.mapValues({ a: 1, b: 2, c: 3 }, "string"));  
} catch (e) {
    console.log(e);
}