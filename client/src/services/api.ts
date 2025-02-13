export const generateSecretSantaAssignments = async (
    employeeList: File,
    previousList: File | null
  ) => {
    const formData = new FormData();
    formData.append("employeeList", employeeList);
    if (previousList) {
      formData.append("previousYearList", previousList);
    }
  
    const response = await fetch(
      "http://localhost:5000/api/v1/generate-secret-child",
      {
        method: "POST",
        body: formData,
      }
    );
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  
    const text = await response.text();
    const csvRows = text.trim().split("\n");
    return csvRows.slice(1).map((row) => {
      const values = row.split(",");
      return {
        Employee_Name: values[0],
        Employee_EmailID: values[1],
        Secret_Child_Name: values[2],
        Secret_Child_EmailID: values[3],
      };
    });
  };
  