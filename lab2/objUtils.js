function checkObject(object) {
    // it is an object and not undefined;
    if (object == undefined)
        throw `${object} is not exitst`;
    if (typeof object != "object")
        throw `${object} is not object`;
    return;
}

/* that it is an object and not undefined; if any
 are undefined. You must also check that there
 are at least 2 arguments.*/
function checkContainTwoObject(...args) {
    // it is an object and not undefined;
    if (args == undefined)
        throw `${args} is not exitst`;
    else if (!Array.isArray(args))
        throw `${args} is not array`;
    // check that there are at least 2 arguments.
    else if (args.length < 2)
        throw `${args} at least have 2 arguments`;
    else {
        args.forEach(element => checkObject(element));
    }
    return;
}

function extend(...args) {
    checkContainTwoObject(...args);
    let newObject = {};
    let length = args.length;
    for (let i = 0; i < length; i++) {
        let element = args.shift();
        // let map = new Map(Object.en tries(e));
        // Object.entries(element).forEach([key, value])
        for (let [key, value] of Object.entries(element)) {
            // console.log(key, value);
            if (!newObject[key])
                newObject[key] = value;
        }
    }
    return newObject;
}

function smush(...args) {
    checkContainTwoObject(...args);
    let newObject = {};
    let length = args.length;
    for (let i = 0; i < length; i++) {
        let element = args.shift();
        for (let [key, value] of Object.entries(element)) {
            // console.log(key, value);
            newObject[key] = value;
        }
    }
    return newObject;
}

function checkFunc(func) {
    // it is an function and not undefined;
    if (func == undefined)
        throw `${func} is not exitst`;
    if (typeof func != "function")
        throw `${func} is not function`;
    return;
}

function mapValues(object, func) {
    checkObject(object);
    checkFunc(func);
    let newObject = {};
    let length = Object.entries(object).length;
    for (let [key, value] of Object.entries(object)) {
        newObject[key] = func(value);
    }
    return newObject;
}

module.exports = { extend, smush, mapValues }