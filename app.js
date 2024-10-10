// Function to calculate monthly payments and schedule
function calculateLoan() {
    // Get input values
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const annualInterestRate = parseFloat(document.getElementById('interestRate').value) / 100 /12;
    const loanTerm = parseInt(document.getElementById('loanTerm').value);
  
    if (isNaN(loanAmount) || isNaN(annualInterestRate) || isNaN(loanTerm)) {
      alert("Please fill all fields correctly.");
      return;
    }
    const monthlyInterestRate = annualInterestRate / 12;
    const totalPayments = loanTerm * 12;
  
    // Calculate monthly payment
    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));

    const scheduleBody = document.querySelector('#paymentSchedule tbody');
    scheduleBody.innerHTML = '';
  
    // Variables to hold balance, interest, and principal
    let balance = loanAmount;
    let totalInterest = 0;
  
    // payment schedule
    for (let month = 1; month <= totalPayments; month++) {
      const interestPayment = balance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      totalInterest += interestPayment;
      // Add row to the schedule table
      const row = scheduleBody.insertRow();
      row.insertCell(0).innerText = month;
      row.insertCell(1).innerText = monthlyPayment.toFixed(2);
      row.insertCell(2).innerText = principalPayment.toFixed(2);
      row.insertCell(3).innerText = interestPayment.toFixed(2);
      row.insertCell(4).innerText = balance.toFixed(2);
    } 
    // Show the result section
    document.getElementById('resultSection').style.display = 'block';
  }
  function clearCalculator() {
    // Clear input fields
    document.getElementById("loanAmount").value = "";
    document.getElementById("interestRate").value = "";
    document.getElementById("loanTerm").value = "";
  
    // Hide the result section
     document.getElementById("resultSection").style.display = "none";

    const scheduleBody = document.querySelector("#paymentSchedule tbody");
    scheduleBody.innerHTML = "";
  }

  function printSchedule() {
    window.print();
  }
  
