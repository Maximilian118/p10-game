// User population template literal.
export const populateUser = `
  _id
  tokens
  name
  email
  icon
  profile_picture
  championships
  created_at
  badges {
    _id
    url
    name
    rarity
    created_at
  }
  permissions {
    admin
    adjudicator
    guest
  }
`
// Team population template literal.
export const populateTeam = `
  _id
  url
  name
  driverGroups
  drivers
  stats {
    inceptionDate
    nationality
  }
  created_by
  created_at
  updated_at
`
// Driver population template literal.
export const populateDriver = `
  _id
  url
  name
  driverGroups
  stats {
    nationality
    heightCM
    weightKG
    birthday
    moustache
    mullet
  }
  created_by
  created_at
  updated_at
`
