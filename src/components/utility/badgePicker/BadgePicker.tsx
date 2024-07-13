import React, { useEffect, useState } from "react"
import './_badgePicker.scss'
import BadgePickerToolbar from "./badgePickerToolbar/BadgePickerToolbar"
import { badgeType } from "../../../shared/types"
import Badge from "../badge/Badge"
import BadgePickerEdit from "./badgePickerEdit/BadgePickerEdit"
import { getBadgesByChamp } from "../../../shared/requests/badgeRequests"
import { userType } from "../../../shared/localStorage"
import { graphQLErrorType } from "../../../shared/requests/requestsUtility"
import { CircularProgress } from "@mui/material"

interface badgePickerType<T> {
  form: T
  setForm: React.Dispatch<React.SetStateAction<T>>
  user: userType
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>
}

const BadgePicker = <T extends { champBadges: badgeType[] }>({ form, setForm, user, setBackendErr }: badgePickerType<T>) => {
  const [ isEdit, setIsEdit ] = useState<boolean | badgeType>(false)
  const [ loading, setLoading ] = useState<boolean>(false)

  useEffect(() => {
    if (form.champBadges.length === 0) {
      getBadgesByChamp(null, user, setLoading, setBackendErr, setForm)
    }
  }, [form, user, setBackendErr, setForm])

  return isEdit ? 
    <BadgePickerEdit 
      isEdit={isEdit} 
      setIsEdit={setIsEdit}
      setForm={setForm}
    /> : (
    <div className="badge-picker">
      {loading ? <CircularProgress/> :
        <>
          <div className="badge-list">
            {form.champBadges.map((badge: badgeType, i: number) => (
              <div key={i} className="list-item">
                <Badge badge={badge} zoom={badge.zoom} onClick={() => setIsEdit(badge)}/>
              </div>
            ))}
          </div>
          <BadgePickerToolbar
            setIsEdit={setIsEdit}
          />
        </>
      }
    </div>
  )
}

export default BadgePicker
