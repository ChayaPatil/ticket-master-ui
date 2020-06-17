export const findEmployee = (employee, id) => {
  return (
    employee.find(employee => employee._id === id)
  )
}