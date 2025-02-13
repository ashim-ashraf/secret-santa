import { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import { generateSecretSantaAssignments } from "../services/api";
import AssignmentsTable from "../components/AssingmentsTable";

interface Assignment {
  Employee_Name: string;
  Employee_EmailID: string;
  Secret_Child_Name: string;
  Secret_Child_EmailID: string;
}

export const Homepage = () => {
  const [error, setError] = useState<string | null>(null);
  const [employeeList, setEmployeeList] = useState<File | null>(null);
  const [previousList, setPreviousList] = useState<File | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const handleSubmit = async () => {
    if (!employeeList) {
      setError("Please upload the employee list CSV.");
      return;
    }

    try {
      const data = await generateSecretSantaAssignments(
        employeeList,
        previousList
      );
      setAssignments(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  // to clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 2500);
      return () => clearTimeout(timer); // Cleanup timer on unmount or re-render
    }
  }, [error]);

  const downloadCSV = () => {
    const csvContent =
      "Employee Name, Employee Email, Secret Child Name, Secret Child Email\n" +
      assignments
        .map(
          (a) =>
            `${a.Employee_Name},${a.Employee_EmailID},${a.Secret_Child_Name},${a.Secret_Child_EmailID}`
        )
        .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SecretSantaAssignments.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="">
      <h1 className="bg-red-400 text-2xl text-center py-2 font-bold fixed w-full top-0 left-0">
        Acme - Secret Santa Generator
      </h1>
      <div className="flex">
        <div className="flex flex-col gap-4 justify-center items-center h-screen px-10 bg-slate-300">
          <FileUpload
            label="Employee List"
            onFileChange={(e) => setEmployeeList(e.target.files?.[0] || null)}
          />
          <FileUpload
            label="Previous Year Assignments"
            onFileChange={(e) => setPreviousList(e.target.files?.[0] || null)}
          />
          <span className="text-red-500">{error}</span>

          <button
            className="border h-10 w-full mt-2 bg-blue-500 text-white rounded cursor-pointer"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        <AssignmentsTable assignments={assignments} downloadCSV={downloadCSV} />
      </div>
    </div>
  );
};
