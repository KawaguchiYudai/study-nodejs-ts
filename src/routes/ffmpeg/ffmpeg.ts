import { NextFunction, Request, Response } from "express";
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs'

const PATH = './material';

export const test = async (req: Request, res: Response, next: NextFunction) => {
  sample1(PATH + '/base/movie/Waves.mp4', PATH + '/result/movie/sample1.mp4');
  res.send("ok");
};

//ファイル名を変更し、生成
const sample1 = async (input_file: string, output_file: string) => {
  let readstream = fs.createReadStream(input_file)
  let writestream = fs.createWriteStream(output_file);
  ffmpeg(readstream)
    .addOutputOptions('-movflags +frag_keyframe+separate_moof+omit_tfhd_offset+empty_moov')
    .format('mp4')
    .on('start', () => { console.log(`変換開始`); })
    .on('end', () => { console.log(`変換完了`); })
    .on('error', function (err) { console.log('an error happened: ' + err.message); })
    .pipe(writestream)
}

/*公式サイト　https://github.com/fluent-ffmpeg/node-fluent-ffmpeg
参考サイト*/
const ffmpegDefult = () => {
  let filepath = "";
  //・FFmpegコマンドの作成
  //let command = new ffmpeg.FfmpegCommand();
  //let command = ffmpeg();
  //let command = ffmpeg(filepath);
  //let command = ffmpeg(fs.createReadStream(filepath));
  ////options
  //source
  //timeout
  //preset or presets
  //niceness or priority
  //logger
  //stdoutLines

  //・inputs
  ffmpeg(filepath)
    .input(filepath)
    .input(fs.createReadStream(filepath))
    .addInput(filepath)
    .mergeAdd(filepath)
    ////inputsoption
    .inputFormat('mov')
  //.fromFormat()
  //.withInputFormat()

}