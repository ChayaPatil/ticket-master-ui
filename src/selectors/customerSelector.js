export const findCustomer = (customer, id) => {
  return ( 
    customer.find(customer => customer._id === id)
  )
}