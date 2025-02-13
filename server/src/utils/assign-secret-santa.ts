import { BadRequestError } from "../middlewares/error-handler";
import { Employee, EmployeeAssignment, PreviousAssignment } from "../types/employee";

export const assignSecretSanta = (
  employees: Employee[],
  previousData: PreviousAssignment[] | null
): EmployeeAssignment[] => {
  if (employees.length < 2) {
    throw new BadRequestError("At least two employees are required for Secret Santa.");
  }

  let assignments: EmployeeAssignment[] = [];
  let employeePool = [...employees];

  // Shuffle employees randomly to introduce randomness
  for (let i = employeePool.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [employeePool[i], employeePool[j]] = [employeePool[j], employeePool[i]];
  }

  // Create a set for fast lookup of previous assignments
  const previousMap = new Set<string>();
  if (previousData) {
    previousData.forEach((prev) => {
      previousMap.add(`${prev.Employee_Name}-${prev.Secret_Child_Name}`);
    });
  }

  // Assign each employee a secret child in cyclic order
  for (let i = 0; i < employeePool.length; i++) {
    let giver = employeePool[i];
    let receiver = employeePool[(i + 1) % employeePool.length]; // Cyclic permutation

    // Ensure they were not assigned in the previous year
    if (previousMap.has(`${giver.Employee_Name}-${receiver.Employee_Name}`)) {
      // If conflict exists, swap with a different index
      let swapIndex = (i + 2) % employeePool.length;
      [receiver, employeePool[swapIndex]] = [employeePool[swapIndex], receiver];
    }

    // Save the assignment
    assignments.push({
      Employee_Name: giver.Employee_Name,
      Employee_EmailID: giver.Employee_EmailID,
      Secret_Child_Name: receiver.Employee_Name,
      Secret_Child_EmailID: receiver.Employee_EmailID,
    });
  }

  return assignments;
};
