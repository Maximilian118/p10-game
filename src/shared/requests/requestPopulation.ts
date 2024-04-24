// User population template literal.
export const populateUser = `
  _id
  tokens
  name
  email
  icon
  profile_picture
  championships
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
