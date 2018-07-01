import { exec } from "improved/dist/process"
import { path as ffmpegPath } from "ffmpeg-static"

/**
 * @param pattern e.g. $img_%04d.png
 */
export default async function(
  videoFilePath: string,
  pattern: string,
  fps?: number,
  customArgs: ReadonlyArray<string> = []
) {
  const inputArgs = ["-i", videoFilePath]
  const fpsArgs = fps === undefined ? [] : ["-r", fps]
  const args = [...inputArgs, ...fpsArgs, ...customArgs, pattern]
  return exec(`${ffmpegPath} ${args.join(" ")}`)
}
