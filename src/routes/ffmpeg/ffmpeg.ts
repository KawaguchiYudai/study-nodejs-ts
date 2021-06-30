import { NextFunction, Request, Response } from "express";
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs'

const PATH = './material';

export const test = async (req: Request, res: Response, next: NextFunction) => {
  switch (parseInt(req.params.num)) {
    case 1:
      sample1(PATH + '/base/movie/waves.mp4', PATH + '/result/movie/sample1.mp4');
      break;
    case 2:
      sample2(PATH + '/base/picture/umi.jpg', PATH + '/result/movie/sample2.mp4');
      break;
    case 3:
      sample3(PATH + '/base/movie/sora.mp4', PATH + '/base/movie/waves.mp4', PATH + '/result/movie/sample3.mp4');
      break;
    case 4:
      sample4(PATH + '/base/movie/waves.mp4', PATH + '/result/picture', 'sample4.jpg');
      break;
  }
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
//画像を動画にして生成
const sample2 = async (input_file: string, output_file: string) => {
  ffmpeg(input_file)
    .loop(20)
    .fps(30)
    .format('mp4')
    .on('start', () => { console.log(`変換開始`); })
    .on('end', () => { console.log(`変換完了`); })
    .on('error', function (err) { console.log('an error happened: ' + err.message); })
    .save(output_file)
}
//×
const sample3 = async (input_file1: string, input_file2: string, output_file: string) => {
  ffmpeg(input_file1)
    .input(input_file2)
    .fps(30)
    .format('mp4')
    .on('start', () => { console.log(`変換開始`); })
    .on('end', () => { console.log(`変換完了`); })
    .on('error', function (err) { console.log('an error happened: ' + err.message); })
    .mergeToFile(output_file)
}
//スクリーンショット作成
const sample4 = async (input_file: string, output_folder: string, output_file: string) => {
  ffmpeg(input_file)
    .on('start', () => { console.log(`変換開始`); })
    .on('end', () => { console.log(`変換完了`); })
    .on('error', function (err) { console.log('an error happened: ' + err.message); })
    .takeScreenshots({
      count: 2,
      timemarks: ['00:00:02.000', '6'],
      filename: output_file,
      size: '150x100'
    },
      output_folder);
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