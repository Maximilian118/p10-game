export interface formType {
  icon: File | null
  profile_picture: File | null
  name: string
  email: string
}

export interface formErrType {
  name: string
  email: string
  dropzone: string
  [key: string]: string
}
