import React from "react";

interface Assignment {
  Employee_Name: string;
  Employee_EmailID: string;
  Secret_Child_Name: string;
  Secret_Child_EmailID: string;
}

interface AssignmentsTableProps {
  assignments: Assignment[];
  downloadCSV: () => void;
}

const AssignmentsTable: React.FC<AssignmentsTableProps> = ({
  assignments,
  downloadCSV,
}) => {
  return (
    <div className="flex flex-col flex-1 items-center gap-2 px-10 pt-20">
      {assignments.length > 0 ? (
        <>
          <div className="overflow-y-scroll h-[70vh] w-full">
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
          No assignments generated yet. <br /> Attach employee list to compute.
        </p>
      )}
    </div>
  );
};

export default AssignmentsTable;
