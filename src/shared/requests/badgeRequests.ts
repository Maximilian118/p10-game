import axios from "axios"
import { userType } from "../localStorage"
import { badgeType } from "../types"
import { graphQLErrors, graphQLErrorType, graphQLResponse, headers } from "./requestsUtility"
import { NavigateFunction } from "react-router-dom"
import { capitalise } from "../utility"

export const newBadge = async (
  badge: badgeType,
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>,
  navigate: NavigateFunction,
): Promise<void> => {
  setLoading(true)

  try {
    await axios
      .post(
        "",
        {
          variables: {
            ...badge,
            name: capitalise(badge.name),
          },
          query: `
            mutation NewBadge($championship: String, $url: String!, $name: String!, $rarity: Int!, $awardedHow: String!, $awardedDesc: String!, $zoom: Int) {
              newBadge(badgeInput: { championship: $championship, url: $url,  name: $name, rarity: $rarity, awardedHow: $awardedHow, awardedDesc: $awardedDesc, zoom: $zoom }) {
                _id
              }
            }
          `,
        },
        { headers: headers(user.token) },
      )
      .then((res: any) => {
        if (res.data.errors) {
          graphQLErrors("newBadge", res, setUser, navigate, setBackendErr, true)
        } else {
          graphQLResponse("newBadge", res, user, setUser)
        }
      })
      .catch((err: any) => {
        graphQLErrors("newBadge", err, setUser, navigate, setBackendErr, true)
      })
  } catch (err: any) {
    graphQLErrors("newBadge", err, setUser, navigate, setBackendErr, true)
  }

  setLoading(false)
}

export const getBadgesByChamp = async <T extends { champBadges: badgeType[] }>(
  championship: string | null,
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  navigate: NavigateFunction,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>,
  setForm?: React.Dispatch<React.SetStateAction<T>>,
  setDefaults?: React.Dispatch<React.SetStateAction<badgeType[]>>, // For component local state
  setDefaultBadges?: React.Dispatch<React.SetStateAction<badgeType[]>>, // For component remote state
): Promise<void> => {
  setLoading(true)

  try {
    await axios
      .post(
        "",
        {
          variables: {
            championship,
          },
          query: `
            query GetBadgesByChamp ( $championship: String ) {
              getBadgesByChamp ( championship: $championship ) {
                array {
                  _id
                  championship
                  url
                  name
                  rarity
                  awardedTo
                  awardedHow
                  awardedDesc
                  zoom
                  created_at
                  updated_at
                }
                tokens
              }
            }
          `,
        },
        { headers: headers(user.token) },
      )
      .then((res: any) => {
        if (res.data.errors) {
          graphQLErrors("getBadgesByChamp", res, setUser, navigate, setBackendErr, true)
        } else {
          const badges = graphQLResponse("getBadgesByChamp", res, user, setUser) as {
            array: badgeType[]
            token: string
            code: number
          }

          if (!championship) {
            badges.array = badges.array.map((badge: badgeType) => {
              return {
                ...badge,
                default: true,
              }
            })
          }

          if (setForm && badges.array.length > 0) {
            setForm((prevForm) => {
              return {
                ...prevForm,
                champBadges: badges.array,
              }
            })
          }

          if (setDefaults) {
            setDefaults(badges.array)
          }

          if (setDefaultBadges) {
            setDefaultBadges(badges.array)
          }
        }
      })
      .catch((err: any) => {
        graphQLErrors("getBadgesByChamp", err, setUser, navigate, setBackendErr, true)
      })
  } catch (err: any) {
    graphQLErrors("getBadgesByChamp", err, setUser, navigate, setBackendErr, true)
  }

  setLoading(false)
}

export const updateBadge = async (
  badge: badgeType,
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  navigate: NavigateFunction,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>,
): Promise<void> => {
  setLoading(true)

  try {
    await axios
      .post(
        "",
        {
          variables: badge,
          query: `
            mutation UpdateBadge($_id: ID!, $url: String, $name: String, $rarity: Int, $awardedHow: String, $awardedDesc: String, $zoom: Int) {
              updateBadge(updateBadgeInput: { _id: $_id, url: $url, name: $name, rarity: $rarity, awardedHow: $awardedHow, awardedDesc: $awardedDesc, zoom: $zoom }) {
                _id
              }
            }
          `,
        },
        { headers: headers(user.token) },
      )
      .then((res: any) => {
        if (res.data.errors) {
          graphQLErrors("updateBadge", res, setUser, navigate, setBackendErr, true)
        } else {
          graphQLResponse("updateBadge", res, user, setUser)
        }
      })
      .catch((err: any) => {
        graphQLErrors("updateBadge", err, setUser, navigate, setBackendErr, true)
      })
  } catch (err: any) {
    graphQLErrors("updateBadge", err, setUser, navigate, setBackendErr, true)
  }

  setLoading(false)
}
