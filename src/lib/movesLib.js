// arr argument should be an array of moves you want to sort, property is by which property you want to sort them by (name, level, type, etc.)
export const sortMoves = (arr, property) => {
  let moves = [...arr];
  moves.sort((a,b) => {
    // console.log(a);
    if(a[property] < b[property]){
      return -1;
    } else if (a[property] > b[property]) {
      return 1;
    } else return 0;
  })
  arr = moves;
}