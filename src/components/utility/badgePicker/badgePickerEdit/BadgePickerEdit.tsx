import React, { useState } from "react"
import './_badgePickerEdit.scss'
import DropZone from "../../dropZone/DropZone"
import { graphQLErrorType, initGraphQLError } from "../../../../shared/requests/requestsUtility"
import MUISlider from "../../muiSlider/MUISlider"
import { Diamond, Groups, ZoomInMap, ZoomOutMap } from "@mui/icons-material"
import BadgeOverlay, { getBadgeColour } from "../../badge/badgeOverlay/BadgeOverlay"
import { Button, TextField } from "@mui/material"
import { inputLabel, updateForm } from "../../../../shared/formValidation"
import MUIAutocomplete from "../../muiAutocomplete/muiAutocomplete"
import { badgeRewardOutcomes } from "../../../../shared/badges"
import { badgeType } from "../../../../shared/types"

interface badgePickerEditType<T> {
  isEdit: boolean | badgeType
  setIsEdit: React.Dispatch<React.SetStateAction<boolean | badgeType>>
  setForm: React.Dispatch<React.SetStateAction<T>>
}

interface editFormType {
  badgeName: string
  icon: File | null
  profile_picture: File | null
}

interface editFormErrType {
  dropzone: string
  [key: string]: string
}

// If badge has a populated file key, init editForm.icon with that file.
const initIcon = (isEdit: boolean | badgeType): File | null => {
  if (typeof isEdit !== "boolean") {
    return isEdit.file ? isEdit.file : null
  } else {
    return null
  }
}

const BadgePickerEdit = <T extends { champBadges: badgeType[] }>({ isEdit, setIsEdit, setForm }: badgePickerEditType<T>) => {
  const isNewBadge = typeof isEdit === "boolean"
  const [ backendErr, setBackendErr ] = useState<graphQLErrorType>(initGraphQLError)
  const [ editForm, setEditForm ] = useState<editFormType>({
    badgeName: isNewBadge ? "" : isEdit.name,
    icon: initIcon(isEdit),
    profile_picture: null,
  })
  const [ editFormErr, setEditFormErr ] = useState<editFormErrType>({
    badgeName: "",
    dropzone: "",
  })
  const [ zoom, setZoom ] = useState<number>(isNewBadge ? 100 : isEdit.zoom)
  const [ rarity, setRarity ] = useState<number>(isNewBadge ? 0 : isEdit.rarity)
  const [ how, setHow ] = useState<string | null>(isNewBadge ? null : isEdit.awardedHow)

  const displayOverlay = !isNewBadge || editForm.icon

  const findDesc = (badgeRewardOutcomes: { awardedHow: string; awardedDesc: string }[], how: string | null): string => {
    return badgeRewardOutcomes.filter((outcome: { awardedHow: string; awardedDesc: string }) => outcome.awardedHow === how)[0].awardedDesc
  }

  const onSubmitHandler = () => {
    if (!isNewBadge) {
      setForm(prevForm => {
        return {
          ...prevForm,
          champBadges: prevForm.champBadges.map((badge: badgeType): badgeType => {
            if (badge._id === isEdit._id) {
              return {
                ...badge,
                url: editForm.icon ? URL.createObjectURL(editForm.icon) : isEdit.url,
                name: editForm.badgeName,
                zoom,
                rarity,
                awardedHow: how ? how : badge.awardedHow,
                awardedDesc: findDesc(badgeRewardOutcomes, how),
                file: editForm.icon,
              }
            } else {
              return badge
            }
          })
        }
      })
    } else {
      setForm(prevForm => {
        return {
          ...prevForm,
          champBadges: [
            {
              _id: `TEMP: ${Math.random()}`,
              url: editForm.icon ? URL.createObjectURL(editForm.icon) : null,
              name: editForm.badgeName,
              zoom,
              rarity,
              awardedHow: how,
              awardedDesc: findDesc(badgeRewardOutcomes, how),
              file: editForm.icon,
            },
            ...prevForm.champBadges,
          ]
        }
      })
    }

    setIsEdit(false)
  }

  const deleteBadgeHandler = () => {
    if (!isNewBadge) {
      setForm(prevForm => {
        return {
          ...prevForm,
          champBadges: prevForm.champBadges.filter((badge: badgeType) => badge._id !== isEdit._id)
        }
      })
    }

    setIsEdit(false)
  }

  return (
    <div className="badge-picker-edit">
      <h4>{`${isNewBadge ? `New` : `Edit`} Badge`}</h4>
      <div className="badge-wrapper" style={{ width:"50%" }}>
        <BadgeOverlay rarity={rarity} thickness={10} style={{ opacity: displayOverlay ? "" : 0 }}/>
        <DropZone<editFormType, editFormErrType>
          form={editForm}
          setForm={setEditForm}
          setFormErr={setEditFormErr}
          backendErr={backendErr}
          setBackendErr={setBackendErr}
          purposeText="Badge Image"
          zoom={zoom}
          thumbImg={isNewBadge ? false : isEdit.url}
          style={{ marginBottom: 0, width: "100%" }}
        />
      </div>
      <MUISlider
        ariaLabel="Zoom Level"
        value={zoom}
        setValue={setZoom}
        label="Zoom"
        iconLeft={<ZoomInMap/>}
        iconRight={<ZoomOutMap/>}
        min={25}
        max={175}
        style={{ padding: "0 20px" }}
      />
      <MUISlider
        ariaLabel="Rarity Level"
        value={rarity}
        setValue={setRarity}
        label="Rarity"
        iconLeft={<Groups/>}
        iconRight={<Diamond/>}
        steps={1}
        min={0}
        max={5}
        style={{ padding: "0 20px", marginBottom: 30 }}
        colour={getBadgeColour(rarity)}
      />
      <TextField
        required={!editForm.badgeName && backendErr.type !== "badgeName"}
        name="badgeName"
        className="mui-el"
        label={inputLabel("badgeName", editFormErr, backendErr)}
        variant="filled" 
        onChange={e => updateForm<editFormType, editFormErrType>(e, editForm, setEditForm, setEditFormErr, backendErr, setBackendErr)}
        value={editForm.badgeName}
        error={editFormErr.badgeName || backendErr.type === "badgeName" ? true : false}
      />
      <MUIAutocomplete
        label="awarded for"
        options={badgeRewardOutcomes.map((outcome: { awardedHow: string }) => outcome.awardedHow)}
        className="mui-el"
        value={how}
        setValue={setHow}
      />
      <div className="button-bar">
        <Button
          className="mui-button-back"
          variant="contained" 
          color="inherit"
          onClick={e => setIsEdit(false)}
        >Back</Button>
        {!isNewBadge && <Button
          variant="contained" 
          color="error"
          onClick={e => deleteBadgeHandler()}
        >Delete</Button>}
        <Button
          variant="contained"
          onClick={e => onSubmitHandler()}
        >Submit</Button>
      </div>
    </div>
  )
}

export default BadgePickerEdit
