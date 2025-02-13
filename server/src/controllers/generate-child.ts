import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import { BadRequestError } from "../middlewares/error-handler";
import { assignSecretSanta } from "../utils/assign-secret-santa";
import { Employee, PreviousAssignment } from "../types/employee";
import { parseCSV } from "../helpers/parse-csv";
import {
  validateEmployeeList,
  validatePreviousAssignments,
} from "../helpers/validation";

export const computeChild = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Check if employeeList is present
    if (!req.files || !req.files.employeeList) {
      throw new BadRequestError("Employee list file is required.");
    }

    const employeeFile = req.files.employeeList as UploadedFile;
    const previousFile = req.files.previousYearList as UploadedFile | undefined;

    // Parse CSV files
    const employeeDataRaw = parseCSV(employeeFile);
    const previousDataRaw = previousFile ? parseCSV(previousFile) : null;

    // validation
    validateEmployeeList(employeeDataRaw);
    if (previousDataRaw) {
      validatePreviousAssignments(previousDataRaw);
    }

    // Convert parsed CSV data to Employee[] type
    const employeeData: Employee[] = employeeDataRaw.map((row) => ({
      Employee_Name: row.Employee_Name,
      Employee_EmailID: row.Employee_EmailID,
    }));

    const previousData: PreviousAssignment[] | null = previousDataRaw
      ? previousDataRaw.map((row) => ({
          Employee_Name: row.Employee_Name,
          Employee_EmailID: row.Employee_EmailID,
          Secret_Child_Name: row.Secret_Child_Name,
          Secret_Child_EmailID: row.Secret_Child_EmailID,
        }))
      : null;

    // Compute child based on employee data
    const computedChildData = assignSecretSanta(employeeData, previousData);

    // Convert JSON to CSV format manually
    let csvContent =
      "Employee_Name,Employee_EmailID,Secret_Child_Name,Secret_Child_EmailID\n";
    computedChildData.forEach(
      ({
        Employee_Name,
        Employee_EmailID,
        Secret_Child_Name,
        Secret_Child_EmailID,
      }) => {
        csvContent += `${Employee_Name},${Employee_EmailID},${Secret_Child_Name},${Secret_Child_EmailID}\n`;
      }
    );

    // Set headers for file download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=SecretSantaAssignments.csv"
    );

    // Send CSV content
    res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};
