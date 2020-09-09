const state =[10]
const value = [10,20]

  // es6
  // list
  console.log([].concat(value))

  // add
  console.log(state.concat(value))


  // es6


  const empIds = [1,2,3]
  let emp = {}
  console.log(empIds.map(ele => {return {emp: ele}}))