import { UploadedFile } from "express-fileupload";
import { parseCSV } from "../helpers/parse-csv";

describe("CSV Parsing", () => {
  test("Should correctly parse a valid CSV file", () => {
    const mockCSV = Buffer.from(
      `Employee_Name,Employee_EmailID\nJohn Doe,john@example.com\nJane Smith,jane@example.com`
    );

    const mockFile: UploadedFile = {
      name: "mock.csv",
      data: mockCSV,
      encoding: "utf-8",
      mimetype: "text/csv",
      mv: jest.fn(),
      truncated: false,
      size: mockCSV.length,
      md5: "mockMD5",
      tempFilePath: "",
    };

    const expectedOutput = [
      { Employee_Name: "John Doe", Employee_EmailID: "john@example.com" },
      { Employee_Name: "Jane Smith", Employee_EmailID: "jane@example.com" },
    ];

    expect(parseCSV(mockFile)).toEqual(expectedOutput);
  });

  test("Should throw an error for an empty file", () => {
    const emptyFile: UploadedFile = {
      name: "empty.csv",
      data: Buffer.from(""),
      encoding: "utf-8",
      mimetype: "text/csv",
      mv: jest.fn(),
      truncated: false,
      size: 0,
      md5: "mockMD5",
      tempFilePath: "",
    };

    expect(() => parseCSV(emptyFile)).toThrow("Uploaded file is empty.");
  });

  test("Should throw an error for missing required headers", () => {
    const invalidCSV = Buffer.from(
      `Name,Email\nJohn Doe,john@example.com\nJane Smith,jane@example.com`
    );

    const invalidFile: UploadedFile = {
      name: "invalid.csv",
      data: invalidCSV,
      encoding: "utf-8",
      mimetype: "text/csv",
      mv: jest.fn(),
      truncated: false,
      size: invalidCSV.length,
      md5: "mockMD5",
      tempFilePath: "",
    };

    expect(() => parseCSV(invalidFile)).toThrow(
      "CSV file is missing required headers."
    );
  });

  test("Should handle extra spaces and unexpected line breaks", () => {
    const messyCSV = Buffer.from(
      ` Employee_Name , Employee_EmailID  \n John Doe  , john@example.com \n   Jane Smith , jane@example.com  \n `
    );

    const messyFile: UploadedFile = {
      name: "messy.csv",
      data: messyCSV,
      encoding: "utf-8",
      mimetype: "text/csv",
      mv: jest.fn(),
      truncated: false,
      size: messyCSV.length,
      md5: "mockMD5",
      tempFilePath: "",
    };

    const expectedOutput = [
      { Employee_Name: "John Doe", Employee_EmailID: "john@example.com" },
      { Employee_Name: "Jane Smith", Employee_EmailID: "jane@example.com" },
    ];

    expect(parseCSV(messyFile)).toEqual(expectedOutput);
  });
});
