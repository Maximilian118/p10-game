import React, { useState } from "react"
import './_rulesAndRegsEdit.scss'
import { editStateType, initEditState } from "../RulesAndRegsPicker"
import { Button, IconButton, TextField } from "@mui/material"
import { ruleOrRegType, rulesAndRegsType } from "../../../../shared/types"
import moment from "moment"
import { userType } from "../../../../shared/localStorage"
import { Remove } from "@mui/icons-material"

interface regsAndRulesEditType<T> {
  user: userType
  edit: editStateType
  setEdit: React.Dispatch<React.SetStateAction<editStateType>>
  setForm: React.Dispatch<React.SetStateAction<T>>
  style?: React.CSSProperties
}

const initruleReg = (user: userType, ruleReg?: ruleOrRegType | null) => {
  return {
    text: ruleReg ? ruleReg.text : "",
    created_by: user,
    created_at: ruleReg ? ruleReg.created_at : moment().format(),
    histroy: [],
    subsections: ruleReg ? ruleReg.subsections : [],
  }
}

type errorType = {
  msg: string,
  index: number | null
}

const initError = {
  msg: "",
  index: null
}

const RulesAndRegsEdit = <T extends { rulesAndRegs: rulesAndRegsType }>({ 
  user, 
  edit, 
  setEdit, 
  setForm,
  style,
}: regsAndRulesEditType<T>) => {
  const [ delConfirm, SetDelConfirm ] = useState<boolean>(false)
  const [ ruleReg, setRuleReg ] = useState<ruleOrRegType>(initruleReg(user, edit.ruleReg))
  const [ error, setError ] = useState<errorType>(initError)

  // Delete the entire ruleReg.
  const deleteRRHandler = (setForm: React.Dispatch<React.SetStateAction<T>>): void => {
    setForm((prevForm: T) => {
      return {
        ...prevForm,
        rulesAndRegs: {
          ...prevForm.rulesAndRegs,
          list: prevForm.rulesAndRegs.list.filter((item: ruleOrRegType, i: number) => i + 1 !== edit.index)
        }
      }
    })

    setEdit(initEditState)
  }

  // Delete a single subsection
  const deleteSubsection = (setRuleReg: React.Dispatch<React.SetStateAction<ruleOrRegType>>, index: number) => {
    setRuleReg(prevRuleReg => {
      if (prevRuleReg.subsections) {
        return {
          ...prevRuleReg,
          subsections: prevRuleReg.subsections.filter((item: ruleOrRegType, i: number) => i !== index)
        }
      } else {
        return prevRuleReg
      }
    })
  }

  // new subsection
  const newSubsection = (user: userType, setRuleReg: React.Dispatch<React.SetStateAction<ruleOrRegType>>) => {
    setRuleReg(prevRuleReg => {
      if (prevRuleReg.subsections) {
        const withNew = prevRuleReg.subsections
        withNew.push(initruleReg(user))

        return {
          ...prevRuleReg,
          subsections: withNew
        }
      } else {
        return prevRuleReg
      }
    })

    // fix for wierd issue where when we setRuleReg above with a new empty subsection, form gets updated as well.
    setForm(prevForm => {
      return {
        ...prevForm,
        rulesAndRegs: {
          ...prevForm.rulesAndRegs,
          list: prevForm.rulesAndRegs.list.map((item: ruleOrRegType, i: number) => {
            if (item.subsections && edit.index && edit.index - 1 === i) {
              return {
                ...item,
                subsections: item.subsections.filter((r: ruleOrRegType) => r.text.trim() !== "")
              }
            } else {
              return item
            }
          })
        }
      }
    })
  }

  // Update form with the ruleReg.
  const updateRRHandler = (
    setForm: React.Dispatch<React.SetStateAction<T>>, 
    setEdit: React.Dispatch<React.SetStateAction<editStateType>>
  ): void => {
    if (ruleReg.subsections) {
      let hasErr: boolean = false

      if (ruleReg.text.trim() === "") {
        setError({
          msg: "Please enter text.",
          index: null
        })

        return
      }

      ruleReg.subsections.forEach((r: ruleOrRegType, i: number) => {
        if (r.text.trim() === "") {
          setError({
            msg: "Please enter text.",
            index: i
          })
          hasErr = true
        }
      })

      if (hasErr) {
        return
      }
    }

    if (edit.index) {
      setForm(prevForm => {
        return {
          ...prevForm,
          rulesAndRegs: {
            ...prevForm.rulesAndRegs,
            list: prevForm.rulesAndRegs.list.map((item: ruleOrRegType, i: number) => {
              if (edit.index === i + 1) {
                return ruleReg
              } else {
                return item
              }
            })
          }
        }
      })
    } else {
      setForm(prevForm => {
        const withNew = prevForm.rulesAndRegs.list
        withNew.push(ruleReg)

        return {
          ...prevForm,
          rulesAndRegs: {
            ...prevForm.rulesAndRegs,
            list: withNew
          }
        }
      })
    }

    setEdit(initEditState)
  }

  // JSX for the delete confirm button.
  const deleteConfirmButton = (): JSX.Element => (
    <div className="delete-confirm">
        <p>Are you sure?</p>
        <div className="delete-confirm-buttons">
          <Button
            className="mui-button-back"
            style={{ margin: "0 10px" }}
            variant="contained" 
            color="inherit"
            onClick={e => SetDelConfirm(false)}
          >Back</Button>
          <Button
            variant="contained" 
            color="error"
            onClick={e => deleteRRHandler(setForm)}
          >Delete</Button>
        </div>
    </div>
  )

  // JSX for a section.
  const section = (ruleReg: ruleOrRegType, index?: number): JSX.Element => {
    const isSub = typeof index === "number"
    const hasErr = (): boolean => {
      if (!isSub && error.msg && !error.index && ruleReg.text.trim() === "") {
        return true
      }

      if (index === error.index) {
        return true
      }

      return false
    }

    const label = (isSub: boolean, error: errorType, i?: number): string => {
      let ident = ""

      if (isSub) {
        ident = `Subsection ${i! + 1}`
      } else {
        ident = "Section"
      }

      return `${ident}${hasErr() ? `: ${error.msg}` : ""}`
    }

    return (
      <div key={index} className="rule-or-reg-edit">
        <TextField
          className="mui-multiline"
          label={label(isSub, error, index)}
          multiline
          rows={3}
          onChange={e => setRuleReg((prevRuleReg: ruleOrRegType) => {
            if (isSub && prevRuleReg.subsections) {
              return {
                ...prevRuleReg,
                subsections: prevRuleReg.subsections.map((sub, i) => {
                  if (index === i) {
                    if (error.index === index) {
                      setError(initError)
                    }

                    return {
                      ...sub,
                      text: e.target.value,
                    }
                  } else {
                    return sub
                  }
                })
              }
            }

            return {
              ...prevRuleReg,
              text: e.target.value,
            }
          })}
          value={isSub ? ruleReg.subsections![index].text : ruleReg.text}
          variant="filled"
          error={hasErr() ? true : false}
        />
        {isSub && 
        <IconButton 
          className="subsection-delete"
          onClick={e => deleteSubsection(setRuleReg, index)}
        >
          <Remove/>
        </IconButton>}
      </div>
    )
  }

  return (
    <div className="rules-and-regs-edit" style={style}>
      <h4>{`${edit.newRuleReg ? `New` : `Edit`} Rule or Regulation`}</h4>
      {section(ruleReg)}
      {ruleReg.subsections?.map((rr: ruleOrRegType, i: number) => section(ruleReg, i))}
      <div className="button-bar sub-btns">
        <Button
          className="sub-add-button"
          variant="contained"
          onClick={e => newSubsection(user, setRuleReg)}
        >New Subsection</Button>
      </div>
      <div className="button-bar">
        {delConfirm ? deleteConfirmButton() : 
        <>
          <Button
            className="mui-button-back"
            variant="contained" 
            color="inherit"
            onClick={e => setEdit(initEditState)}
          >Back</Button>
          {!edit.newRuleReg && <Button
            variant="contained" 
            color="error"
            onClick={e => SetDelConfirm(true)}
          >Delete</Button>}
          <Button
            variant="contained"
            onClick={e => updateRRHandler(setForm, setEdit)}
          >Submit</Button>
        </>}
      </div>
    </div>
  )
}

export default RulesAndRegsEdit
