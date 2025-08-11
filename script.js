
let entries = [];
let daysInMonth = 30;
let calendarDays = [];
let selectedRequiredMAB = 0;

function renderCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';
    for (let i = 1; i <= daysInMonth; i++) {
        let dayDiv = document.createElement('div');
        dayDiv.textContent = i;
        dayDiv.className = 'day';
        if (calendarDays.includes(i)) {
            dayDiv.classList.add('highlight');
        }
        calendar.appendChild(dayDiv);
    }
}

function continueToCalculator() {
    selectedRequiredMAB = parseFloat(document.getElementById('requiredMAB').value);
    document.getElementById('accountSection').style.display = 'none';
    document.getElementById('calculatorSection').style.display = 'block';
    renderCalendar();
}

function addEntry() {
    let fromDay = parseInt(document.getElementById('fromDay').value);
    let toDay = parseInt(document.getElementById('toDay').value);
    let balance = parseFloat(document.getElementById('balance').value);

    if (isNaN(fromDay) || isNaN(toDay) || isNaN(balance) || fromDay > toDay || fromDay < 1 || toDay > daysInMonth) {
        alert("Please enter valid values.");
        return;
    }

    entries.push({ fromDay, toDay, balance });
    for (let d = fromDay; d <= toDay; d++) {
        if (!calendarDays.includes(d)) calendarDays.push(d);
    }

    renderEntries();
    renderCalendar();
}

function renderEntries() {
    let listDiv = document.getElementById('entries');
    listDiv.innerHTML = "<strong>Entries:</strong><br>";
    entries.forEach(e => {
        listDiv.innerHTML += `Range: ${e.fromDay}-${e.toDay}, Balance: ₹${e.balance} <br>`;
    });
}

function calculateMAB() {
    if (entries.length === 0) {
        alert("Please add at least one entry.");
        return;
    }

    let total = 0;
    entries.forEach(e => {
        let days = e.toDay - e.fromDay + 1;
        total += e.balance * days;
    });

    let average = total / daysInMonth;
    let resultDiv = document.getElementById('result');

    if (average >= selectedRequiredMAB) {
        resultDiv.innerHTML = ` Monthly Average Balance = ₹${average.toFixed(2)} (Meets requirement of ₹${selectedRequiredMAB})`;
        resultDiv.className = 'result';
    } else {
        resultDiv.innerHTML = `Monthly Average Balance = ₹${average.toFixed(2)} (Below requirement of ₹${selectedRequiredMAB})`;
        resultDiv.className = 'result fail';
    }
}