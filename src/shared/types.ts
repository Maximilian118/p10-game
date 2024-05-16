export interface formType {
  icon: File | null
  profile_picture: File | null
  email: string
}

export interface formErrType {
  email: string
  dropzone: string
  [key: string]: string
}
