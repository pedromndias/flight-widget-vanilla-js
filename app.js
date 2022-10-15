const tableBody = document.getElementById("table-body")

let flights = [
    {
        time: "08:11",
        destination: "OMAN",
        flight: "OX 2036",
        gate: "A 01",
        remarks: "ON TIME"
    },
    {
        time: "12:39",
        destination: "LONDON",
        flight: "CL 3203",
        gate: "C 31",
        remarks: "CANCELLED"
    },
    {
        time: "13:21",
        destination: "DUBAI",
        flight: "DB 2019",
        gate: "A 19",
        remarks: "CANCELLED"
    },
    {
        time: "14:01",
        destination: "FRANKFURT",
        flight: "FR 4026",
        gate: "B 02",
        remarks: "ON TIME"
    },
    {
        time: "15:22",
        destination: "TOKYO",
        flight: "TK 2112",
        gate: "A 32",
        remarks: "DELAYED"
    }
]


const destinations = ["TOKYO", "FRANKFURT", "DUBAI", "LONDON", "OMAN", "BEIRUT"]
const remarks = ["ON TIME", "DELAYED", "CANCELLED"]
let hour = 15

// The next function will populate our table with the flights details:
function populateTable() {
    // Let's use a for-of loop for each flight:
    for (const flight of flights) {
        // For each flight we create a table row:
        const tableRow = document.createElement("tr")
        // Now we use a for-in loop to go through each flight's object:
        for (const flightDetail in flight) {
            // For each flightDetail we create a table cell:
            const tableCell = document.createElement("td")

            // For the letters animation let's create an array consisting of each letter:
            const word = Array.from(flight[flightDetail])
            // For each letter we create a div. Note the index and entries method so we can access it later for the timeout:
            for(const [index, letter] of word.entries()) {
                const letterElement = document.createElement("div")

                // Each letter's animation should come 0.1 after each other (multiplies with the index of the loop):
                setTimeout(() => {
                    // Let's add the special class for the animation:
                    letterElement.classList.add("flip")
                    // And set its textContent as the letter itself:
                    letterElement.textContent = letter
                    // We append it to the tableCell:
                    tableCell.append(letterElement)
                }, 100 * index)

            }
            // Now we append each tableCell to our tableRow:
            tableRow.append(tableCell)
        }
        // We have to append each tableRow to our tableBody:
        tableBody.append(tableRow)
    }
}

populateTable()

// The next function will generate random time:
function generateTime() {
    let displayHour = hour
    if (hour < 24) {
        hour++
    }
    if (hour >= 24) {
        hour = 0
        displayHour = hour
    }
    if (hour < 10) {
        displayHour = "0" + hour
    }

    return displayHour + ":" + generateRandomNumber(5) + generateRandomNumber()
}

// The next function will generate random letters:
function generateRandomLetter() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length))
}

// The next function will generate random number. Note the maxNumber parameter (for the special case of time)
function generateRandomNumber(maxNumber) {
    const numbers = "0123456789"
    if (maxNumber) {
        const newNumbers = numbers.slice(0, maxNumber + 1)
        return newNumbers.charAt(Math.floor(Math.random() * newNumbers.length))
    }
    return numbers.charAt(Math.floor(Math.random() * numbers.length))
}

// The next function will generate random flight combinations from the arrays provided:
function shuffleUp() {
    // First we delete the first item in the flights array:
    flights.shift()
    // Then we add data to the end of the array (note the Math methods and the functions applied)
    flights.push({
        time: generateTime(),
        destination: destinations[Math.floor(Math.random() * destinations.length)],
        flight: generateRandomLetter() + generateRandomLetter() + " " + generateRandomNumber() + generateRandomNumber() + generateRandomNumber() + generateRandomNumber(),
        gate: generateRandomLetter() + " " + generateRandomNumber() + generateRandomNumber(),
        remarks: remarks[Math.floor(Math.random() * remarks.length)]
    })

    // Now we clear the table content and add random data:
    tableBody.textContent = ""
    populateTable()
}

// The shuffleUp function should run every 5 seconds:
setInterval(shuffleUp, 5000)