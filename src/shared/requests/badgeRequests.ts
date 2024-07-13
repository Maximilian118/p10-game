import axios from "axios"
import { userType } from "../localStorage"
import { badgeType } from "../types"
import { graphQLError, graphQLErrorType, graphQLResponse, headers } from "./requestsUtility"

export const newBadge = async (
  badge: badgeType,
  user: userType,
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
          graphQLError("newBadge", res.data.errors[0].message, setBackendErr, true)
        } else {
          graphQLResponse("newBadge", res)
        }
      })
      .catch((err: any) => {
        graphQLError("newBadge", err.response.data.errors[0], setBackendErr, true)
      })
  } catch (err: any) {
    graphQLError("newBadge", err, setBackendErr, true)
  }

  setLoading(false)
}

export const getBadgesByChamp = async <T extends { champBadges: badgeType[] }>(
  championship: string | null,
  user: userType,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>,
  setForm?: React.Dispatch<React.SetStateAction<T>>,
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
          graphQLError("getBadgesByChamp", res.data.errors[0].message, setBackendErr, true)
        } else {
          const badges = graphQLResponse("getBadgesByChamp", res) as {
            array: badgeType[]
            token: string
            code: number
          }

          if (setForm && badges.array.length > 0) {
            setForm((prevForm) => {
              return {
                ...prevForm,
                champBadges: badges.array,
              }
            })
          }
        }
      })
      .catch((err: any) => {
        graphQLError("getBadgesByChamp", err.response.data.errors[0], setBackendErr, true)
      })
  } catch (err: any) {
    graphQLError("getBadgesByChamp", err, setBackendErr, true)
  }

  setLoading(false)
}
