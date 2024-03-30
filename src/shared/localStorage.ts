export interface userType {
  token: string
  _id: string
  name: string
  email: string
  icon: string
  profile_picture: string
  championships: object[]
  permissions: {
    admin: boolean
    adjudicator: boolean
    guest: boolean
  }
  localStorage: boolean
}

// A user object template with falsy values.
const blankUser = {
  token: "",
  _id: "",
  name: "",
  email: "",
  icon: "",
  profile_picture: "",
  championships: [],
  permissions: {
    admin: false,
    adjudicator: false,
    guest: false,
  },
  localStorage: false,
}

// If there are tokens in local storage, retrieve user object.
// Otherwise, call logout.
export const checkUserLS = (): userType => {
  const token = localStorage.getItem("token") || ""
  const refreshToken = localStorage.getItem("refresh_token") || ""

  if (!token && !refreshToken) {
    return logout()
  } else {
    return {
      token,
      _id: localStorage.getItem("_id") || "",
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
      icon: localStorage.getItem("icon") || "",
      profile_picture: localStorage.getItem("profile_picture") || "",
      championships: JSON.parse(
        localStorage.getItem("championships") || `${blankUser.championships}`,
      ),
      permissions: JSON.parse(
        localStorage.getItem("permissions") || `${blankUser.permissions}`,
      ),
      localStorage: true,
    }
  }
}

// Log the user out removing all local storage and return a blank user object.
// If the navigate function is passed, navigate to /login.
export const logout = (navigate?: Function): userType => {
  localStorage.removeItem("_id")
  localStorage.removeItem("token")
  localStorage.removeItem("refresh_token")
  localStorage.removeItem("name")
  localStorage.removeItem("email")
  localStorage.removeItem("icon")
  localStorage.removeItem("profile_picture")
  localStorage.removeItem("championships")
  localStorage.removeItem("permissions")

  navigate && navigate("/login")

  return blankUser
}

// Populate local storage and return the populated user object.
export const logInSuccess = (user: userType): userType => {
  if (!user.localStorage) {
    localStorage.setItem("_id", user._id)
    localStorage.setItem("token", user.token)
    localStorage.setItem("name", user.name)
    localStorage.setItem("email", user.email)
    localStorage.setItem("icon", user.icon)
    localStorage.setItem("profile_picture", user.profile_picture)
    localStorage.setItem("championships", JSON.stringify(user.championships))
    localStorage.setItem("permissions", JSON.stringify(user.permissions))
  }

  // Ensure we remove the tokens object from the backend before we call logInSuccess.
  return user
}
