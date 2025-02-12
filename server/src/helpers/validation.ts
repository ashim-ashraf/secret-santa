/**
 * Validates employee list format
 * @param data - Parsed CSV data
 * @returns boolean
 */
export const validateEmployeeList = (data: any[]): boolean => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Invalid employee list: Data is empty or not an array.");
  }

  for (let row of data) {
    if (!row.Employee_Name || !row.Employee_EmailID) {
      throw new Error("Invalid employee entry");
    }
  }

  return true;
};

/**
 * Validates previous assignments format
 * @param data - Parsed CSV data
 * @returns boolean
 */
export const validatePreviousAssignments = (data: any[]): boolean => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error(
      "Invalid previous assignments: Data is empty or not an array."
    );
  }

  for (let row of data) {
    if (
      !row.Employee_Name ||
      !row.Employee_EmailID ||
      !row.Secret_Child_Name ||
      !row.Secret_Child_EmailID
    ) {
      throw new Error("Invalid previous assignment entry");
    }
  }

  return true;
};
