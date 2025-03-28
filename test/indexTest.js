require ( './helpers.js' );

const helpers = require('./helpers')

describe("The payroll system", function () {
  describe("populates a record from an Array", function () {
    it("has a function called createEmployeeRecord", function () {
      expect(createEmployeeRecord).to.exist;
    });

    describe("createEmployeeRecord", function () {
      it("populates a firstName field from the 0th element", function () {
        let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1]);
        expect(testEmployee.firstName).to.eq("Gray");
      });

      it("populates a familyName field from the 1th element", function () {
        let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1]);
        expect(testEmployee.familyName).to.eq("Worm");
      });

      it("populates a title field from the 2th element", function () {
        let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1]);
        expect(testEmployee.title).to.eq("Security");
      });

      it("populates a payPerHour field from the 3th element", function () {
        let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1]);
        expect(testEmployee.payPerHour).to.eq(1);
      });

      it("initializes a field, timeInEvents, to hold an empty Array", function () {
        let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1]);
        expect(testEmployee.timeInEvents).to.eql([]);
      });

      it("initializes a field, timeOutEvents, to hold an empty Array", function () {
        let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1]);
        expect(testEmployee.timeOutEvents).to.eql([]);
      });
    });
  });

  describe("process an Array of Arrays into an Array of employee records", function () {
    it("has a function called createEmployeeRecords", function () {
      expect(createEmployeeRecords).to.exist;
    });

    describe("createEmployeeRecords", function () {
      let employeeRecords;

      let twoRows = [
        ["moe", "sizlak", "barkeep", 2],
        ["bartholomew", "simpson", "scamp", 3],
      ];

      it("its implementation makes use of of the createEmployeeRecord function", function () {
        let mySpy = chai.spy.on(window, "createEmployeeRecord");
        createEmployeeRecords([["Mister", "Matt", "Chief Awesomeness Offiser", 1000]]);
        expect(mySpy).to.have.been.called();
      });

      it("creates two records", function () {
        let employeeRecords = createEmployeeRecords(twoRows);
        expect(employeeRecords.length).to.equal(2);
      });

      it("correctly assigns the first names", function () {
        let employeeRecords = createEmployeeRecords(twoRows);
        let nameExtractor = function (e) {
          return e.firstName;
        };
        expect(employeeRecords.map(nameExtractor)).to.eql(["moe", "bartholomew"]);
      });
    });
  });

  describe("it adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String and returns the updated record", function () {
    it("has a function called createTimeInEvent", function () {
      expect(createTimeInEvent).to.exist;
    });

    describe("createTimeInEvent", function () {
      let bpRecord, updatedBpRecord, newEvent;

      it("creates the correct type", function () {
        let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]);
        let updatedBpRecord = createTimeInEvent.call(bpRecord, "2014-02-28 1400", bpRecord);
        let newEvent = updatedBpRecord.timeInEvents[0];
        expect(newEvent.type).to.equal("TimeIn");
      });

      it("extracts the correct date", function () {
        let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]);
        let updatedBpRecord = createTimeInEvent.call(bpRecord, "2014-02-28 1400", bpRecord);
        let newEvent = updatedBpRecord.timeInEvents[0];
        expect(newEvent.date).to.eq("2014-02-28");
      });

      it("extracts the correct hour", function () {
        let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]);
        let updatedBpRecord = createTimeInEvent.call(bpRecord, "2014-02-28 1400", bpRecord);
        let newEvent = updatedBpRecord.timeInEvents[0];
        expect(newEvent.hour).to.eq(1400);
      });
    });
  });

  describe("it adds a timeOut event Object to an employee's record of timeOutEvents when provided an employee record and Date/Time String and returns the updated record", function () {
    it("has a function called createTimeOutEvent", function () {
      expect(createTimeOutEvent).to.exist;
    });

    describe("createTimeOutEvent", function () {
      let bpRecord, updatedBpRecord, newEvent;

      it("creates the correct type", function () {
        let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]);
        let updatedBpRecord = createTimeOutEvent.call(bpRecord, "2015-02-28 1700", bpRecord);
        let newEvent = updatedBpRecord.timeOutEvents[0];
        expect(newEvent.type).to.equal("TimeOut");
      });

      it("extracts the correct date", function () {
        let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]);
        createTimeOutEvent.call(bpRecord, "2015-02-28 1700", bpRecord);
        let newEvent = bpRecord.timeOutEvents[0];
        expect(newEvent.date).to.eq("2015-02-28");
      });

      it("extracts the correct hour", function () {
        let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]);
        createTimeOutEvent.call(bpRecord, "2015-02-28 1700", bpRecord);
        let newEvent = bpRecord.timeOutEvents[0];
        expect(newEvent.hour).to.eq(1700);
      });
    });
  });

  describe("Given an employee record with a date-matched timeInEvent and timeOutEvent", function () {
    it("hoursWorkedOnDate calculates the hours worked when given an employee record and a date", function () {
      expect(hoursWorkedOnDate).to.exist;
    });

    describe("hoursWorkedOnDate", function () {
      it("calculates that the employee worked 2 hours", function () {
        cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000]);
        createTimeInEvent.call(cRecord, "2044-03-15 0900", cRecord);
        createTimeOutEvent.call(cRecord, "2044-03-15 1100", cRecord);
        expect(hoursWorkedOnDate.call(cRecord, "2044-03-15")).to.equal(2);
      });
    });
  });

  describe("Given an employee record with a date-matched timeInEvent and timeOutEvent", function () {
    it("wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour", function () {
      expect(wagesEarnedOnDate).to.exist;
    });
  });
});