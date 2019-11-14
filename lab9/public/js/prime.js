(
    function () {
        const staticForm = document.getElementById("static_form");

        if (staticForm) {
            // We can store references to our elements; it's better to
            // store them once rather than re-query the DOM traversal each time
            // that the event runs.
            const inputNumberElement = document.getElementById("numberForCheck");

            const errorContainer = document.getElementById("error-container");
            const errorTextElement = errorContainer.getElementsByClassName(
              "text-goes-here"
            )[0];

            const historyAttemptsList = document.getElementById("attempts");

            // We can take advantage of functional scoping;
            // our event listener has access to its outer functional scope
            // This means that these variables are accessible in our callback
            staticForm.addEventListener("submit", event => {
                event.preventDefault();

                try {
                    // hide containers by default
                    errorContainer.classList.add("hidden");
                    historyAttemptsList.classList.add("hidden");

                    // Values come from inputs as strings, no matter what :(
                    const inputNumberValue = inputNumberElement.value;
                    if (!inputNumberValue) {
                        throw `Not provide a number!`;
                    }
                    const parsedInputNumberValue = parseInt(inputNumberValue);

                    const result = isPrime(parsedInputNumberValue)

                    var nodeLi = document.createElement("LI");   // Create a <li> node
                    if (result) {
                        nodeLi.classList.add("is-prime");
                        var trueText = document.createTextNode(`${parsedInputNumberValue} is a prime number`);         // Create a text node
                        nodeLi.appendChild(trueText);            // Append the text to <li>
                    }
                    else {
                        nodeLi.classList.add("not-prime");
                        var falseText = document.createTextNode(`${parsedInputNumberValue} is NOT a prime number`);         // Create a text node
                        nodeLi.appendChild(falseText);           // Append the text to <li>
                    }
                    historyAttemptsList.appendChild(nodeLi);     // Append <li> to <ol> with id="attempts"

                    historyAttemptsList.classList.remove("hidden");
                    errorTextElement.textContent = null;
                } catch (e) {
                    // errorContainer.appendChild(document.createTextNode(typeof e === "string" ? e : e.message));
                    const message = typeof e === "string" ? e : e.message;
                    errorTextElement.textContent = message;
                    errorContainer.classList.remove("hidden");
                }
            });
        }
    }

)();

function isPrime(n) {
    if (n <= 1) {
        return false;
    }
    else if (n === 2) {
        return true;
    } else {
        for (var x = 2; x <= Math.sqrt(n); x++) {
            if (n % x === 0) {
                return false;
            }
        }
        return true;
    }
}