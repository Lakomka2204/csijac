import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { resolutions } from "./supportedresolutions.json";
import ffmpeg from "fluent-ffmpeg";
import { existsSync } from "fs";
import { Readable } from "stream";
const OUTPUTFOLDER = process.env.OUTPUT_FOLDER || "video_output";
if (!process.env.OUTPUT_FOLDER)
	console.log("OUTPUT_FOLDER is not set, %s will be used", OUTPUTFOLDER);
type returnFunction = (status: string, percentage: number) => void;
export async function processVideo(
	id: string,
	data: Buffer,
	cb?: returnFunction
): Promise<number> {
	return new Promise(async (resolve, reject) => {
		const videoFolder = join(OUTPUTFOLDER, id);
		cb?.("Creating folder", NaN);
		if (!existsSync(videoFolder)) await mkdir(videoFolder);
		cb?.("Reading video", NaN);
		const readable = Readable.from(data);
		const normalMp4 = join(videoFolder, id + ".mp4");
		await normalizeMp4(readable, normalMp4, cb);
		const videoStream = await getProp(normalMp4);
		cb?.("Determining best video options", NaN);
		const maxHeight = videoStream?.height;
		if (!maxHeight) return reject("maxHeight is undefined");
		const maxFps = +(
			videoStream?.r_frame_rate?.split("/")[0] ||
			videoStream?.avg_frame_rate?.split("/")[0] ||
			24
		);
		if (!maxFps) return reject("maxFps is undefined");
		const availableResolutions = resolutions.filter((x) => x <= maxHeight);
		for (const index in availableResolutions) {
			await processVideoStreams(
				videoFolder,
				id,
				normalMp4,
				availableResolutions[index],
				+maxFps,
				cb
			);
		}
		const audioFile = join(videoFolder, id + ".mp3");
		await processAudio(normalMp4, audioFile, cb);
		resolve(+videoStream.duration!);
	});
}

async function processVideoStreams(
	videoFolder: string,
	id: string,
	normalMp4: string,
	resolution: number,
	maxFps: number,
	cb?: returnFunction
): Promise<void> {
	return new Promise((resolve, reject) => {
		const outputFilename = join(videoFolder, `${id}-${resolution}.webm`);
		ffmpeg()
			.input(normalMp4)
			.noAudio()
			.outputFormat("webm")
			.videoFilter(
				`scale=-1:${resolution}:force_original_aspect_ratio=decrease`
			)
			.fpsOutput(maxFps > 60 ? 60 : maxFps)
			.output(outputFilename)
			.on("progress", ({ percent }) =>
				cb?.(`Processing video ${resolution}`, percent)
			)
			.on("error", (err) => reject(err))
			.on("end", () => resolve())
			.run();
	});
}
async function getProp(
	normalMp4: string
): Promise<ffmpeg.FfprobeStream | undefined> {
	return new Promise((resolve, reject) => {
		ffmpeg.ffprobe(normalMp4, (err, data) => {
			if (err) return reject(err);
			resolve(data.streams.find((x) => x.codec_type == "video"));
		});
	});
}
async function normalizeMp4(
	readable: Readable,
	normalMp4: string,
	cb?: returnFunction
): Promise<void> {
	return new Promise((resolve, reject) => {
		ffmpeg()
			.input(readable)
			.outputFormat("mp4")
			.output(normalMp4)
			.on("progress", ({ percent }) => {
				cb?.("Normalizing video", percent);
			})
			.on("error", (err) => {
				console.error(err);
				return reject(err);
			})
			.on("end", () => resolve())
			.run();
	});
}
async function processAudio(
	normalMp4: string,
	audioFile: string,
	cb?: returnFunction
): Promise<void> {
	return new Promise((resolve, reject) => {
		ffmpeg()
			.input(normalMp4)
			.noVideo()
			.outputFormat("mp3")
			.output(audioFile)
			.on("progress", ({ percent }) => {
				cb?.("Creating audio", percent);
			})
			.on("error", (err) => reject(err))
			.on("end", () => resolve())
			.run();
	});
}
