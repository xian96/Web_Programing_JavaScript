const questionOne = function questionOne(arr) {
    var sum = 0;
    for(i = 0 ; i < arr.length; i++){
        sum += Math.pow(arr[i],2);
    }
    return sum;
}

const questionTwo = function questionTwo(num) { 
    var f = [];
    f[1] = 1;
    f[0] = 0;
    if(num < 1)
        return 0;
    else{
        for(var i = 2; i <= num; i++)
            f[i] = f[i-1] + f[i-2];
    }
    return f[num];
    
}

const questionThree = function questionThree(text) {
    // Implement question 3 here
    var n = 0;
    for(var i = 0; i < text.length; i++)
        if(text[i].match(/[aeiou]/))n++;

    return n;
}

const questionFour = function questionFour(num) {
    if(num < 0)
        return -1;
    var factorial = [];
    factorial[0] = 1;
    for(var i = 1; i <= num; i++){
        factorial[i] = i * factorial[i-1];
    }
    return factorial[num];
}

module.exports = {
    firstName: "jiaxian", 
    lastName: "xing", 
    studentId: "10439460",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};