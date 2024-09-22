function calculateLoan() {
    const amount = document.getElementById('amount').value;
    const interest = document.getElementById('interest').value;
    const years = document.getElementById('years').value;

    if (amount === '' || interest === '' || years === '') {
        alert('Please fill in all fields');
        return;
    }

    const principal = parseFloat(amount);
    const calculateInterest = parseFloat(interest) / 100 / 12;
    const calculatePayments = parseFloat(years) * 12;

    const x = Math.pow(1 + calculateInterest, calculatePayments);
    const monthly = (principal * x * calculateInterest) / (x - 1);

    if (isFinite(monthly)) {
        document.getElementById('monthly-payment').innerHTML = monthly.toFixed(2);
        document.getElementById('total-payment').innerHTML = (monthly * calculatePayments).toFixed(2);
        document.getElementById('total-interest').innerHTML = ((monthly * calculatePayments) - principal).toFixed(2);

        PaymentSchedule(principal, monthly, calculateInterest, calculatePayments);
        document.getElementById('results').style.display = 'block';
    } else {
        alert('Please check your numbers');
    }
}

function PaymentSchedule(principal, monthly, rate, payments) {
    const tbody = document.getElementById('payment-schedule').querySelector('tbody');
    tbody.innerHTML = ''; // Clear previous schedule
    let balance = principal;
    for (let i = 1; i <= payments; i++) {
        const interestPaid = balance * rate;
        const principalPaid = monthly - interestPaid;
        balance -= principalPaid;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i}</td>
            <td>${principalPaid.toFixed(2)}</td>
            <td>${interestPaid.toFixed(2)}</td>
            <td>${balance.toFixed(2)}</td>
        `;
        // tbody.appendChild(row);
    }
}

function clearForm() {
    document.getElementById('loan-form').reset();
    document.getElementById('results').style.display = 'none';
}

function printResults() {
    const results = document.getElementById('results').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = results;
    window.print();
    document.body.innerHTML = originalContent;
}
