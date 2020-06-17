export const findTicketEmp = (emp, ticket) => {
console.log(ticket)
const emp1 = ticket.find(ticket => ticket.employees._id)
console.log(emp1)
}