import AWS from 'aws-sdk';
import imageCompression from 'browser-image-compression';

export async function imageCompress(file: File) {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 360,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.log(error);
  }
}
