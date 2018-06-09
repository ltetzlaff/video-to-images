import { exec } from "improved/dist/process"
import { path as ffmpegPath } from "ffmpeg-static"
import { createIfDoesntExist, getFolderName } from "improved/dist/fs"

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
  const fpsArgs = fps === undefined ? [] : ["-r", fps]
  const args = [...inputArgs, ...fpsArgs, ...customArgs, outputPathPattern]
  return exec(`${ffmpegPath} ${args.join(" ")}`)
}
