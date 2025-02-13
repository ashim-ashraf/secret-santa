import { BadRequestError } from "../middlewares/error-handler";

/**
 * Validates employee list format
 * @param data - Parsed CSV data (array of objects)
 */
export const validateEmployeeList = (data: any[]): boolean => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new BadRequestError(
      "Invalid employee list: Data is empty or not an array."
    );
  }

  // Expected headers
  const requiredHeaders = ["Employee_Name", "Employee_EmailID"];

  // Get actual headers from the first row
  const actualHeaders = Object.keys(data[0]);

  // Check if there are extra headers
  const extraHeaders = actualHeaders.filter(
    (header) => !requiredHeaders.includes(header)
  );
  if (extraHeaders.length > 0) {
    throw new BadRequestError("Invalid headers found.");
  }

  // Check if required headers are present
  for (const header of requiredHeaders) {
    if (!actualHeaders.includes(header)) {
      throw new BadRequestError("Missing required header.");
    }
  }

  // Validate each row
  for (const row of data) {
    if (
      !row.Employee_Name ||
      !row.Employee_EmailID ||
      Object.keys(row).length !== 2 // Ensure no extra columns
    ) {
      throw new BadRequestError(
        "Invalid row: Each row must have only Employee_Name and Employee_EmailID."
      );
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
    throw new BadRequestError(
      "Invalid previous assignments: Data is empty or not an array."
    );
  }

  // Expected headers
  const requiredHeaders = [
    "Employee_Name",
    "Employee_EmailID",
    "Secret_Child_Name",
    "Secret_Child_EmailID",
  ];

  // Get actual headers from the first row
  const actualHeaders = Object.keys(data[0]);

  // Check if there are extra headers
  const extraHeaders = actualHeaders.filter(
    (header) => !requiredHeaders.includes(header)
  );
  if (extraHeaders.length > 0) {
    throw new BadRequestError(
      "Invalid headers found."
    );
  }

  // Check if required headers are present
  for (const header of requiredHeaders) {
    if (!actualHeaders.includes(header)) {
      throw new BadRequestError("Missing required header.");
    }
  }

  // Validate each row
  for (const row of data) {
    if (
      !row.Employee_Name ||
      !row.Employee_EmailID ||
      !row.Secret_Child_Name ||
      !row.Secret_Child_EmailID ||
      Object.keys(row).length !== 4 // this is to ensure no extra columns
    ) {
      throw new BadRequestError(
        "Invalid row: Each row must have only Employee_Name, Employee_EmailID, Secret_Child_Name, and Secret_Child_EmailID."
      );
    }
  }

  return true;
};
