/*const { returns } = require("chai-spies");

/* Your Code Here */
/*function createEmployeeRecord(employeeData){
    return{
firstName:employeeData[0],
familyName:employeeData[1],
title:employeeData[2],
payPerHour:employeeData[3],
timeInEvents:[],
timeOutEvents:[]
    }
};
function createEmployeeRecords(employeeData){
    const employeeRecords = [];
    for(let i=0; i<employeeData.length-1; i++){
        const employee = createEmployeeRecord(employeeData[i]);
        employeeRecords.push(employee);

    }
    return employeeRecords;
}
function createTimeInEvent(time, event) {
    const date = time.substring(0, 10); 
    const hour = time.substring(11, 13) + time.substring(14, 16); 
  
    event.timeInEvents.push({
      type: "TimeIn",
      hour: hour,
      date: date,
    });
  
    return event; 
  }
  function createTimeOutEvent(time, event) {
    const date = time.substring(0, 10); 
    const hour = time.substring(11, 13) + time.substring(14, 16); 
  
    event.timeOutEvents.push({
      type: "TimeOut",
      hour: hour,
      date: date,
    });
  
    return event; 
  }


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
/* Your Code Here */
/* Your Code Here */
function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeData) {
  const employeeRecords = [];
  for (let i = 0; i < employeeData.length; i++) {
    const employee = createEmployeeRecord(employeeData[i]);
    employeeRecords.push(employee);
  }
  return employeeRecords;
}

function createTimeInEvent(time, event) {
  const date = time.substring(0, 10);
  const hour = parseInt(time.substring(11, 15)); 


  event.timeInEvents.push({
    type: "TimeIn",
    hour: hour,
    date: date,
  });

  return event;
}

function createTimeOutEvent(time, event) {
  const date = time.substring(0, 10);
  const hour = parseInt(time.substring(11, 15)); 


  event.timeOutEvents.push({
    type: "TimeOut",
    hour: hour,
    date: date,
  });

  return event;
}

function hoursWorkedOnDate(date) {
  let timeIn = this.timeInEvents.find((event) => event.date === date);
  let timeOut = this.timeOutEvents.find((event) => event.date === date);

  if (timeIn && timeOut) {
    let inHour = timeIn.hour;
    let outHour = timeOut.hour;
    return (outHour - inHour) / 100;
  }
  return 0;
}

function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  );

  return payable;
};

function findEmployeeByFirstName(collection, firstNameString) {
  return collection.find((employee) => employee.firstName === firstNameString);
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, employee) => {
    return total + allWagesFor.call(employee);
  }, 0);
}// ... (Your existing test code)  // ... (Your existing test code)

//const allWagesFor = function () {
 //   const eligibleDates = this.timeInEvents.map(function (e) {
   //     return e.date
    //})

 //   const payable = eligibleDates.reduce(function (memo, d) {
 //       return memo + wagesEarnedOnDate.call(this, d)
 //   }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

 //   return payable
//}

