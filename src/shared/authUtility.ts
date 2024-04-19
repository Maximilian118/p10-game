import { logout } from "./localStorage"

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
export const checkAuth = (errors: [], setUser: Function, history: Function): void => {
  errors.forEach((err: { message: string }) => {
    if (err.message === "Not Authenticated!") {
      setUser(logout(history))
    }
  })
}
