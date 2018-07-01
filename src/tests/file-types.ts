import { getFileExtension } from "improved/dist/fs"

const imageFileTypes = new Set([".png", ".jpg"])
const videoFileTypes = new Set([".mp4", ".mov", ".webm"])

const getNumber = (s: string, max: number) =>
  (s.length ? s.charCodeAt(s.length - 1) : 0) % max

export const pickAnImageFileType = (s: string) =>
  Array.from(imageFileTypes)[getNumber(s, imageFileTypes.size)]

export const isNoImageFile = (file: string) => {
  const ext = getFileExtension(file)
  return !ext || !imageFileTypes.has(ext)
}

export const isVideoFile = (file: string) => {
  const ext = getFileExtension(file)
  return ext && videoFileTypes.has(ext)
}

const fileTypesToKeep = [
  ".md",
  ".mp3",
  ".ogv",
  ".flv",
  ".srt",
  ...videoFileTypes
]
export const whitelist = new RegExp(`(\\${fileTypesToKeep.join("|\\")})$`)
