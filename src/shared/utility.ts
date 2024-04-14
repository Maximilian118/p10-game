// Get the initials of the user.
// If just one word return one initial, if two return two.
export const getInitials = (userName: string) => {
  if (!userName) {
    return "?"
  }

  let names = userName.split(" ")
  let initials = names[0].substring(0, 1).toUpperCase()

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase()
  }

  return initials
}

// Check if a string has proper JSON interchange format.
export const isJSON = (str: string) => {
  if (typeof str !== "string") return false
  try {
    const result = JSON.parse(str)
    const type = Object.prototype.toString.call(result)
    return type === "[object Object]" || type === "[object Array]"
  } catch (err) {
    return false
  }
}
