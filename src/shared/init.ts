import { driverGroupType, driverType, teamType } from "./types"

export const initDriverGroup: driverGroupType = {
  url: "",
  name: "",
  championships: [],
  drivers: [],
}

export const initDriver: driverType = {
  url: "",
  name: "",
  driverID: "",
  team: null,
  driverGroups: [],
  stats: {
    heightCM: null,
    weightKG: null,
    birthday: null,
    moustache: false,
    mullet: false,
  },
}

export const initTeam: teamType = {
  url: "",
  name: "",
  driverGroups: [],
  drivers: [],
  stats: {
    inceptionDate: "",
    nationality: "",
  },
}
