// Get the initials of the user.
import { userType } from "./localStorage"

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

// Return a string reflecting the current permissions level of a user.
export const getPermLevel = (user: userType): string => {
  const perms = user.permissions
  const keys = Object.keys(perms)
  const res = keys.filter((key) => perms[key] === true)

  if (res.length > 0) {
    return res[0]
  }

  return "Competitor"
}

// Make the window size inclusive of mobile browser ui.
export const resizeOps = () => {
  document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px")
}
