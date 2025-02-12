import { UploadedFile } from "express-fileupload";
import { BadRequestError } from "../middlewares/error-handler";

export const parseCSV = (file: UploadedFile): Record<string, string>[] => {
    if (!file) throw new BadRequestError("No file provided.");
    
    // Validate file type
    if (file.mimetype !== "text/csv") {
        throw new BadRequestError("Invalid file type. Please upload a CSV file.");
    }

    const fileData = file.data.toString("utf-8").trim();
    
    // Ensure file isn't empty
    if (!fileData) {
        throw new BadRequestError("Uploaded file is empty.");
    }

    const rows = fileData.split(/\r?\n/).filter(row => row.trim() !== "");
    
    // Ensure the file has at least headers and one row
    if (rows.length < 2) {
        throw new BadRequestError("CSV file must contain headers and at least one data row.");
    }

    const headers = rows[0].split(",").map(header => header.trim());
    
    return rows.slice(1).map(row => {
        const values = row.split(",").map(value => value.trim());
        let obj: Record<string, string> = {};

        headers.forEach((header, index) => {
            obj[header] = values[index] || "";
        });

        return obj;
    });
};
