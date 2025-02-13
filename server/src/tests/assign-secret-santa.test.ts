import { assignSecretSanta } from "../utils/assign-secret-santa";

describe("Secret Santa Assignment", () => {
  test("Should assign secret children correctly", () => {
    const employees = [
      { Employee_Name: "Alice", Employee_EmailID: "alice@example.com" },
      { Employee_Name: "Bob", Employee_EmailID: "bob@example.com" },
      { Employee_Name: "Charlie", Employee_EmailID: "charlie@example.com" },
    ];

    const assignments = assignSecretSanta(employees, null);
    expect(assignments.length).toBe(3);
    expect(assignments.every(a => a.Secret_Child_Name !== a.Employee_Name)).toBe(true);
  });

  test("Should not assign the same secret child as last year", () => {
    const employees = [
      { Employee_Name: "Alice", Employee_EmailID: "alice@example.com" },
      { Employee_Name: "Bob", Employee_EmailID: "bob@example.com" },
      { Employee_Name: "Charlie", Employee_EmailID: "charlie@example.com" },
    ];

    const previousAssignments = [
      { Employee_Name: "Alice", Employee_EmailID: "alice@example.com", Secret_Child_Name: "Bob", Secret_Child_EmailID: "bob@example.com" },
      { Employee_Name: "Bob", Employee_EmailID: "bob@example.com", Secret_Child_Name: "Charlie", Secret_Child_EmailID: "charlie@example.com" },
      { Employee_Name: "Charlie", Employee_EmailID: "charlie@example.com", Secret_Child_Name: "Alice", Secret_Child_EmailID: "alice@example.com" },
    ];

    const assignments = assignSecretSanta(employees, previousAssignments);
    expect(assignments.every(a => !previousAssignments.some(p => p.Employee_Name === a.Employee_Name && p.Secret_Child_Name === a.Secret_Child_Name))).toBe(true);
  });

  test("Should throw an error when there are fewer than 2 employees", () => {
    const employees = [{ Employee_Name: "Alice", Employee_EmailID: "alice@example.com" }];
    expect(() => assignSecretSanta(employees, null)).toThrow("At least two employees are required for Secret Santa.");
  });
});
