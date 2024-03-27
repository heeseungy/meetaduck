import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import pairChat from '@/assets/images/pairChat.png';
import { chatSendImageService } from '@/services/chatSendImageService';
import { chatSendMessageService } from '@/services/chatSendMessageService';
import styles from '@/styles/chatting/ChattingInputArea.module.css';
import { PaperPlaneTilt, Plus, XCircle } from '@phosphor-icons/react';
import AWS from 'aws-sdk';
import imageCompression from 'browser-image-compression';

function ChattingInputArea({ senderId }: { senderId: number }) {
  const chatId = useParams().chatId!;
  // 메시지 입력
  const [newMessage, setNewMessage] = useState<string>(''); // 새 메시지 입력 상태 관리
  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      chatSendMessageService(senderId, +chatId, newMessage, setNewMessage);
      if (imgUrl !== '') {
        chatSendImageService(senderId, +chatId, imgUrl, setImgUrl);
      }
    } else if (imgUrl !== '') {
      chatSendImageService(senderId, +chatId, imgUrl, setImgUrl);
    }
  };

  // 이미지 입력
  const s3 = new AWS.S3({
    signatureVersion: 'v4',
    region: import.meta.env.VITE_AWS_REGION,
    credentials: new AWS.Credentials({
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    }),
  });

  // 파일 상태를 관리하기 위한 State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string>('');

  // 파일 업로드 핸들러
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      var options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 360,
        useWebWorker: true,
      };
      imageCompression(e.target.files[0], options)
        .then(function (compressedFile) {
          console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

          return setSelectedFile(compressedFile);
          // return uploadToServer(compressedFile); // write your own logic
        })
        .catch(function (error) {
          window.alert('이미지 파일을 업로드해주세요.');
          console.log(error.message);
        });
    }
  };

  // s3파일 업로드 함수
  const uploadFile = (file: File) => {
    const uploadParams = {
      Bucket: 's10p22c108', // 버킷 이름
      Key: file.name, // 저장될 파일 이름
      Body: file, // 파일 객체
    };

    console.log('uploadParams', uploadParams);

    s3.upload(uploadParams, (err: any, data: any) => {
      if (err) {
        console.error('Error', err);
      } else if (data) {
        console.log('Upload Success', data.Location);
        setImgUrl(data.Location);
        console.log(imgUrl);
      }
    });
  };

  useEffect(() => {
    selectedFile && uploadFile(selectedFile);
  }, [selectedFile]);

  const handlerDelete = () => {
    setImgUrl('');
  };

  const pressEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage;
    }
  };

  return (
    <>
      <div className={`${styles.inputArea}`}>
        <div className={`${imgUrl != '' ? styles.PreviewBackground : styles.PreviewHidden}`}>
          <input className={styles.ImageInput} type="file" id="file" onChange={handleFileInput} />
          <div className={styles.ImageBox}>
            <div className={styles.DeleteButton} onClick={handlerDelete}>
              <XCircle size={20} color="#4d4637" weight="fill" />
            </div>
            <img className={`${imgUrl != '' ? styles.PreviewImage : ''}`} src={imgUrl ? imgUrl : ''} alt="" />
          </div>
        </div>
        <div className={`${styles.FlexHorizontal} `}>
          <div className={`${styles.FlexHorizontal} ${styles.InputBox}`}>
            <label htmlFor="file">
              <div className={styles.plusBtn}>
                <Plus color="#4d4637" size={25} />
              </div>
            </label>
            <div className={styles.MessageContainer}>
              <button className={` ${styles.SendButton}`} onClick={sendMessage}>
                <PaperPlaneTilt color="#ffd656" size={25} />
              </button>
              <textarea
                placeholder="메시지를 입력하세요"
                value={newMessage}
                onKeyDown={(e) => pressEnter(e)}
                onChange={(e) => setNewMessage(e.target.value)}
                className={`FontS ${styles.TextBox}`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChattingInputArea;
