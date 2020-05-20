
let startBtn = document.getElementById("start"),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');


let money,
    timeData;

startBtn.addEventListener('click', function () {
    timeData = prompt("Enter date", "YYYY-MM-DD");
    //проверка на числоваой ввод
    while (isNaN(money) || money === '' || money == null) {//возвращает true
        // если введено не число
        money = +prompt("\n" +
            "Your budget for a month?", '');
        startBtn.disabled = 'true';
        startBtn.style.background = 'silver';
    }
    //фиксируется в объект то что указал пользователь
    appData.budget = money;
    appData.timeData = timeData;
    budgetValue.textContent = money;
    //переводим в реальную дату введенная пользователем
    yearValue.value = new Date(Date.parse(timeData)).getFullYear();
    monthValue.value = new Date(Date.parse(timeData)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(timeData)).getDate();

});

let sum = 0;
expensesBtn.addEventListener('click', function () {
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
        //Присваиваем введенные данные в свойство expenses
        if (typeof (a) === 'string' && typeof (a) != null && typeof (b) != null
            && a !== '' && b !== '' && a.length < 10) {
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i--;
        }
        expensesValue.textContent = sum;
    }
    expensesBtn.disabled = true;
    expensesBtn.style.background = 'silver';

});

optionalExpensesBtn.addEventListener('click', () => {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
    optionalExpensesBtn.disabled = true;
    optionalExpensesBtn.style.background = 'silver';
});


countBtn.addEventListener('click', () => {
    if (appData.budget !== undefined) {

        appData.moneyPerDay = ((appData.budget - sum ) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Minimum level of wealth"
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 300) {
            levelValue.textContent = "Average level of wealth";
        } else if (appData.moneyPerDay > 300) {
            levelValue.textContent = "Bourgeois";
        } else
            levelValue.textContent = "Error";
    } else {
        dayBudgetValue.textContent = "Error!!!\n Start calculation";
    }
    countBtn.disabled = true;
    countBtn.style.background = 'silver';
});

incomeItem.addEventListener('input', () => {
    let items = incomeItem.value;
    if (isNaN(items) || items !== '') {
        appData.income = items.split(',');
        incomeValue.textContent = appData.income;
    }
});

//checkbox
checkSavings.addEventListener('click', () => {
    if (appData.savings === true)
        appData.savings = false;
    else
        appData.savings = true;
});

sumValue.addEventListener('input', () => {
    if (appData.savings === true) {
        let summ = +sumValue.value;
        let percent = +percentValue.value;
        appData.monthIncome = summ / 100 / 12 * percent;
        appData.yearIncome = summ / 100 * percent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', () => {
    if (appData.savings === true) {
        let sum = +sumValue.value;
        let percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget: money,
    date: timeData,
    expenses: {},   //затраты
    optionalExpenses: {},
    income: [],
    savings: false
};

