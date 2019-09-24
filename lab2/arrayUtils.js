function checkArray(array) {
    if (array == undefined)
        throw `${array} not exists`;
    else if (!Array.isArray(array))
        throw `${array} is not an array`;
    else if (array.length == 0)
        throw `${array} is empty`;
    return array;
}

function head(array) {
    checkArray(array);
    return array[0];
}

function last(array) {
    checkArray(array);
    return array[array.length - 1]
}

function checkIndex(array, index) {
    if (index > array.length - 1)
        throw `${index} is too large`;
    else if (index < 0)
        throw `${index} is too small`;
    return;
}

function remove(array, index) {
    checkArray(array);
    checkIndex(array, index);
    array.splice(index, 1);
    return array;
}

function checkEnd(end) {
    if (end == undefined)
        throw `${end} is not exists`;
    if (!Number.isInteger(end))
        throw `${end} is not integer`;
    else if (end <= 0)
        throw `${end} is not greater than 0`;
    return;
}

function range(end, value = 0) {
    checkEnd(end);
    let newArray = new Array;
    for (var i = 0; i < end; i++) {
        newArray.push(value);
    }
    return newArray;
}

function checkArrayAllowEmpty(array) {
    if (array == undefined)
        throw `${array} not exists`;
    else if (!Array.isArray(array))
        throw `${array} is not an array`;
    return array;
}

function countElements(array) {
    checkArrayAllowEmpty(array);
    let counts = {};
    // https://stackoverflow.com/questions/15052702/count-unique-elements-in-array-without-sorting
    for (var i = 0; i < array.length; i++) {
        counts[array[i]] = 1 + (counts[array[i]] || 0);
    }
    return counts;
}

function isEqual(arrayOne, arrayTwo) {
    checkArrayAllowEmpty(arrayOne);
    checkArrayAllowEmpty(arrayTwo);
    if (arrayOne == arrayTwo)//is this mean same object?
        return true;
    if (arrayOne.length != arrayTwo.length)
        return false;
    for (let i = 0; i < arrayOne.length; i++)
        if (arrayOne[i] != arrayTwo[i])
            return false;
    return true;
}

module.exports = {head, last, remove, range, countElements, isEqual }