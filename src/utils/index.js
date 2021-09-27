export const getAsNumber = (val, defaultNumber = 0) =>
  isNaN(Number(val)) ? defaultNumber : Number(val)

export const range = (start, end) => {
  const result = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}
