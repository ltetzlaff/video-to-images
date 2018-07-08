import { createIfDoesntExist, getFolderName } from "improved/dist/fs"
import ffmpeg from "./ffmpeg"

/**
 * @param outputPathPattern e.g. $img_%04d.png
 */
export default async function(
  videoFilePath: string,
  outputPathPattern: string,
  fps?: number,
  customArgs: ReadonlyArray<string> = []
) {
  await createIfDoesntExist(getFolderName(outputPathPattern))

  const inputArgs = ["-i", videoFilePath]
  const fpsArgs = fps === undefined ? [] : ["-r", fps.toString()]
  const args = [...inputArgs, ...fpsArgs, ...customArgs, outputPathPattern]
  return ffmpeg(args)
}
