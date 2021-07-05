import { NextFunction, Request, Response } from "express";
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs'

const MOVIE_PATH = './material/base/movie/';
const PICTURE_PATH = './material/base/picture/';
const RESULT_MOVIE_PATH = './material/result/movie/';
const RESULT_PICTURE_PATH = './material/result/picture/';

export const test = async (req: Request, res: Response, next: NextFunction) => {
  switch (parseInt(req.params.num)) {
    case 1:
      sample1(`${MOVIE_PATH}waves.mp4`, `${RESULT_MOVIE_PATH}sample1.mp4`);
      break;
    case 2:
      sample2(`${PICTURE_PATH}umi.jpg`, `${RESULT_MOVIE_PATH}sample2.mp4`);
      break;
    case 3:
      sample3(`${MOVIE_PATH}sora.mp4`, `${MOVIE_PATH}waves.mp4`, `${RESULT_MOVIE_PATH}sample3.mp4`);
      break;
    case 4:
      sample4(`${MOVIE_PATH}waves.mp4`, RESULT_PICTURE_PATH, 'sample4.jpg');
      break;
    case 5:
      sample5(`${MOVIE_PATH}waves.mp4`, `${RESULT_MOVIE_PATH}sample5.mp4`);
      break;
    case 6:
      sample6(`${MOVIE_PATH}waves.mp4`, `${RESULT_MOVIE_PATH}sample6.mp4`);
      break;
    case 7:
      sample7(`${MOVIE_PATH}waves.mp4`, `${RESULT_PICTURE_PATH}sample7/`);
      break;
    case 8:
      sample8(`${PICTURE_PATH}data/`, `${RESULT_MOVIE_PATH}sample8.mp4`);
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
      output_folder)
  /*.screenshots({
    count: 2,
    timemarks: [0.0, 0.1],
    filename: output_file,
    folder: output_folder,
    size: '150x100'
  })*/
}
//サイズの変更、アスペクト比等によりあまり部分を黒くする
const sample5 = async (input_file: string, output_file: string) => {
  ffmpeg(input_file)
    .videoBitrate(1024)
    .fps(30)
    .size('1920x1440')
    .autopad()
    .videoCodec('libx264')
    .audioCodec('libmp3lame')
    .format('mp4')
    .on('start', () => { console.log(`変換開始`); })
    .on('end', () => { console.log(`変換完了`); })
    .on('error', function (err) { console.log('an error happened: ' + err.message); })
    .save(output_file)
}
//動画の描画サイズ変更
const sample6 = async (input_file: string, output_file: string) => {
  ffmpeg(input_file)
    .videoBitrate(5120)
    .fps(30)
    .size('1920x1440')
    .autopad()
    .seekInput(5.0)
    .duration(20.0)
    .videoFilter([
      {
        filter: "crop",
        options: {
          w: 100,
          h: 100,
          x: 0,
          y: 0
        },
      }
    ])
    .videoCodec('libx264')
    .audioCodec('libmp3lame')
    .format('mp4')
    .on('start', () => { console.log(`変換開始`); })
    .on('end', () => { console.log(`変換完了`); })
    .on('error', function (err) { console.log('an error happened: ' + err.message); })
    .save(output_file)
}
//動画から連番画像作成
const sample7 = async (input_file: string, output_file: string) => {
  if (!fs.existsSync(output_file)) {
    fs.mkdir(output_file, (err) => {
      if (err) { throw err; }
      console.log(`${output_file}が作成されました`);
    });
  }
  ffmpeg(input_file)
    .videoCodec('png')
    .outputFps(30)
    .on('start', () => { console.log(`変換開始`); })
    .on('end', () => { console.log(`変換完了`); })
    .on('error', function (err) { console.log('an error happened: ' + err.message); })
    .save(output_file + 'image_%03d.png')
}
//連番画像から動画作成
const sample8 = async (input_file: string, output_file: string) => {
  ffmpeg(input_file + 'image_%03d.png')
    .inputFps(30)
    .videoCodec('libx264')
    .audioCodec('libmp3lame')
    .outputFps(30)
    .outputFormat('mp4')
    .addOption('-pix_fmt yuv420p')
    .on('start', () => { console.log(`変換開始`); })
    .on('end', () => { console.log(`変換完了`); })
    .on('error', function (err) { console.log('an error happened: ' + err.message); })
    .save(output_file)
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