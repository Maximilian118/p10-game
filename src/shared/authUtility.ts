import { userType, logout } from "./localStorage"

// If request result has tokens, use them. If not, return current token.
// If setUser is passed, setUser with new token as well.
export const useTokens = (
  tokens: string,
  user: userType,
  setUser: Function,
): string => {
  if (tokens) {
    const parsedTokens = JSON.parse(tokens)

    if (setUser) {
      setUser((prevUser: object) => {
        return {
          ...prevUser,
          token: parsedTokens.access_token,
        }
      })
    }

    localStorage.setItem("token", parsedTokens.access_token)
    localStorage.setItem("refresh_token", parsedTokens.refresh_token)
    return parsedTokens.access_token
  } else {
    return user.token
  }
}

// Add headers to a request
export const headers = (token: string): object => {
  const refreshToken = localStorage.getItem("refresh_token")

  return {
    "Content-Type": "application/json",
    accessToken: `Bearer ${token}`,
    refreshToken: `Bearer ${refreshToken}`,
  }
}

// If no authentication, logout.
export const checkAuth = (
  errors: [],
  setUser: Function,
  history: Function,
): void => {
  errors.forEach((err: { message: string }) => {
    if (err.message === "Not Authenticated!") {
      setUser(logout(history))
    }
  })
}
