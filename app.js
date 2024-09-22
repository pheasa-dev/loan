function calculateLoan() {
    // Get input values
    const amount = document.getElementById('amount').value;
    const interest = document.getElementById('interest').value;
    const years = document.getElementById('years').value;

    // Validate inputs
    if (amount === '' || interest === '' || years === '') {
        alert('Please fill in all fields');
        return;
    }

    // Calculate
    const principal = parseFloat(amount);
    const calculateInterest = parseFloat(interest) / 100 / 12;
    const calculatePayments = parseFloat(years) * 12;

    // Monthly payment formula
    const x = Math.pow(1 + calculateInterest, calculatePayments);
    const monthly = (principal * x * calculateInterest) / (x - 1);

    // Display results
    if (isFinite(monthly)) {
        document.getElementById('monthly-payment').innerHTML = monthly.toFixed(2);
        document.getElementById('total-payment').innerHTML = (monthly * calculatePayments).toFixed(2);
        document.getElementById('total-interest').innerHTML = ((monthly * calculatePayments) - principal).toFixed(2);
    } else {
        alert('Please check your numbers');
    }
}
