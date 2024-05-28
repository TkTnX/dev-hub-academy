export const saveCompletedTestLS = (
  completedTests: Record<number, boolean>
) => {
  localStorage.setItem("completedTests", JSON.stringify(completedTests));
};

export const getCompletedTestLS = (): Record<number, boolean> => {
  const data = localStorage.getItem("completedTests");
  return data ? JSON.parse(data) : {};
};
