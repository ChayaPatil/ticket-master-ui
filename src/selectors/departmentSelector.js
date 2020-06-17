export const findDepartment = (department, id) => {
  return (
    department.find(department => department._id === id)
  )
}