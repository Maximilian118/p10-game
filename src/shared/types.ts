export interface formType {
  icon: File | null
  profile_picture: File | null
}

export interface formErrType {
  dropzone: string
  [key: string]: string
}
