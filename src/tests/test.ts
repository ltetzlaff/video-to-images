import videoToImages from ".."
import { ls, changeFileExtension, clearFolder } from "improved/dist/fs"
import { difference } from "improved/dist/collections"
import {
  pickAnImageFileType,
  isVideoFile,
  isNoImageFile,
  whitelist
} from "./file-types"

const inputFolder = "test-files/mediaelement-files/"
const testFPS = 0.5

async function convertToImages(videoFilePath: string) {
  const imageFileType = pickAnImageFileType(videoFilePath)
  const pattern = changeFileExtension(videoFilePath, `_%04d${imageFileType}`)
  return videoToImages(videoFilePath, pattern, testFPS)
}

async function run() {
  await clearFolder(inputFolder, whitelist)
  const oldFilePaths = await ls(inputFolder, true)
  const jobs = oldFilePaths.filter(isVideoFile).map(convertToImages)
  await Promise.all(jobs)
  const newFilePaths = await ls(inputFolder, true)

  const generatedFiles = Array.from(difference(newFilePaths, oldFilePaths))
  if (generatedFiles.length === 0) throw new Error("Didnt generate any files")
  if (generatedFiles.some(isNoImageFile))
    throw new Error("Generated some non-image files")

  await clearFolder(inputFolder, whitelist)
  console.log("Everything good!")
}

run()
