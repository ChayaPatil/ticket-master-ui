const players = ['sachin', 'virat', 'dhoni', 'yuvi']
const indices = [1,3]

function arrayExcept(players, indices){
  const names = players.filter((ele, i) => {
    return !indices.includes(i)
  })
  return names
}
console.log(arrayExcept(players, indices))//['sachin', 'dhoni']