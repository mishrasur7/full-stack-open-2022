/* eslint-disable no-unused-vars */
const dummy = (array) => {
  return 1
}

const totalLikes = (list) => {
  const reducer = (sum, item) => {
    return sum.likes + item.likes
  }
  return list.length === 0
    ? 0
    : list.reduce(reducer)
}

export default {
  dummy,
  totalLikes
}