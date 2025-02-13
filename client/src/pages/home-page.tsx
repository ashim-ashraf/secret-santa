import { useState } from "react";

interface Assignment {
  Employee_Name: string;
  Employee_EmailID: string;
  Secret_Child_Name: string;
  Secret_Child_EmailID: string;
}

export const Homepage = () => {
  const [error, setError] = useState<string | null>();
  const [employeeList, setEmployeeList] = useState<File | null>(null);
  const [previousList, setPreviousList] = useState<File | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (event.target.files) {
      setter(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!employeeList) {
      setError("Please upload the employee list CSV.");
      return;
    }
    const formData = new FormData();
    formData.append("employeeList", employeeList);
    if (previousList) {
      formData.append("previousYearList", previousList);
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/generate-secret-child",
        {
          method: "POST",
          body: formData,
        }
      );

      const text = await response.text();

      if (!response.ok) {
        const errorData = JSON.parse(text);
        console.log(errorData);
        throw new Error(errorData.error);
      }

      // Convert CSV response into JSON
      const csvRows = text.trim().split("\n");
      const data: Assignment[] = csvRows.slice(1).map((row) => {
        const values = row.split(",");
        return {
          Employee_Name: values[0],
          Employee_EmailID: values[1],
          Secret_Child_Name: values[2],
          Secret_Child_EmailID: values[3],
        };
      });

      console.log("Parsed Data:", data);
      setAssignments(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

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
          <div>
            <label className="block">Employee List</label>
            <div className="relative w-full mt-1">
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleFileUpload(e, setEmployeeList)}
                className="mb-2 p-2 border rounded w-full cursor-pointer file:cursor-pointer file:bg-blue-500 file:text-white file:px-4 file:py-2 file:border-none file:rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block">Previous Year Assignments</label>
            <div className="relative w-full mt-1">
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleFileUpload(e, setPreviousList)}
                className="mb-2 p-2 border rounded w-full cursor-pointer file:cursor-pointer file:bg-blue-500 file:text-white file:px-4 file:py-2 file:border-none file:rounded-lg"
              />
            </div>
          </div>
          <span className="text-red-500">{error ? error : ""}</span>

          <button
            className="border h-10 w-full mt-2 bg-blue-500 text-white rounded cursor-pointer"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        <div className="flex flex-col flex-1  items-center gap-2 px-10 pt-20">
          {assignments.length > 0 ? (
            <>
              <div className="overflow-y-scroll h-[70vh] w-full ">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">Employee Name</th>
                      <th className="border p-2">Employee Email</th>
                      <th className="border p-2">Secret Child Name</th>
                      <th className="border p-2">Secret Child Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignments.map((a, index) => (
                      <tr key={index} className="border">
                        <td className="border p-2">{a.Employee_Name}</td>
                        <td className="border p-2">{a.Employee_EmailID}</td>
                        <td className="border p-2">{a.Secret_Child_Name}</td>
                        <td className="border p-2">{a.Secret_Child_EmailID}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={downloadCSV}
                className="bg-green-500 text-white p-2 rounded w-1/4 mt-4"
              >
                Download CSV
              </button>
            </>
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No assignments generated yet. <br /> Attach employee list to
              compute
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
