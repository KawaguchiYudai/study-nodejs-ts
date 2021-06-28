import { NextFunction, Request, Response } from "express";
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs'

const PATH = "";

export const test = async (req: Request, res: Response, next: NextFunction) => {
  //let command = ffmpeg();
  let stream = fs.createWriteStream(PATH);
  let readstream = fs.createReadStream(PATH)
  let command = await ffmpeg().input(readstream)
  console.log(readstream)
  /*.frames(30)
  .size('640x480')
  .autopad(true, 'white')
  .output('file.wmv')
  .output(stream);*/
  res.send("ok");
};

const fixMedia = async (
  input_file: string,
  output_file: string
) => {
  // input_fileを読み込んでoutput_fileを生成する
  const converted = await ffmpeg(input_file)
    .fps(30.0)
    .audioBitrate(192)
    .on('end', () => {
      console.log(`変換完了`);
    }).save(output_file);
}