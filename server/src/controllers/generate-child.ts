import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import { BadRequestError } from "../middlewares/error-handler";
import { assignSecretSanta } from "../utils/assign-secret-santa";
import { Employee, PreviousAssignment } from "../types/employee";
import { parseCSV } from "../helpers/parse-CSV";

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

    // Step 5: Convert JSON to CSV format manually
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

    // Step 6: Set headers for file download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=SecretSantaAssignments.csv"
    );

    // Step 7: Send CSV content
    res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};
