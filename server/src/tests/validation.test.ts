import {
  validateEmployeeList,
  validatePreviousAssignments,
} from "../helpers/validation";

describe("Validation Functions", () => {
  describe("validateEmployeeList", () => {
    it("should return true for valid employee list", () => {
      const validData = [
        { Employee_Name: "John Doe", Employee_EmailID: "john@example.com" },
        { Employee_Name: "Jane Smith", Employee_EmailID: "jane@example.com" },
      ];
      expect(validateEmployeeList(validData)).toBe(true);
    });

    it("should throw an error if data is empty", () => {
      expect(() => validateEmployeeList([])).toThrow(
        "Invalid employee list: Data is empty or not an array."
      );
    });

    it("should throw an error if data is not an array", () => {
      expect(() => validateEmployeeList("invalid" as any)).toThrow(
        "Invalid employee list: Data is empty or not an array."
      );
    });

    it("should throw an error if an entry is missing required fields", () => {
      const invalidData = [
        { Employee_Name: "John Doe" }, // Missing Employee_EmailID
      ];
      expect(() => validateEmployeeList(invalidData)).toThrow(
        "Missing required header."
      );
    });
  });

  describe("validatePreviousAssignments", () => {
    it("should return true for valid previous assignments", () => {
      const validData = [
        {
          Employee_Name: "John Doe",
          Employee_EmailID: "john@example.com",
          Secret_Child_Name: "Jane Smith",
          Secret_Child_EmailID: "jane@example.com",
        },
      ];
      expect(validatePreviousAssignments(validData)).toBe(true);
    });

    it("should throw an error if data is empty", () => {
      expect(() => validatePreviousAssignments([])).toThrow(
        "Invalid previous assignments: Data is empty or not an array."
      );
    });

    it("should throw an error if data is not an array", () => {
      expect(() => validatePreviousAssignments("invalid" as any)).toThrow(
        "Invalid previous assignments: Data is empty or not an array."
      );
    });

    it("should throw an error if an entry is missing required fields", () => {
      const invalidData = [
        {
          Employee_Name: "John Doe",
          Employee_EmailID: "john@example.com",
          Secret_Child_Name: "Jane Smith",
          // Missing Secret_Child_EmailID
        },
      ];
      expect(() => validatePreviousAssignments(invalidData)).toThrow(
        "Missing required header."
      );
    });
  });
});
