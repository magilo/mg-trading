//checks for positive whole numbers
export function hasOnlyDigits(value) {
  return /^\d+$/.test(value)
}

//console.log(isNumeric('123'));          // true
//console.log(isNumeric('-23'));          // false

export function roundThis(value) {
  value = value * 100
  let roundedValue = Math.round(value)
  roundedValue = roundedValue / 100
  return roundedValue
}
