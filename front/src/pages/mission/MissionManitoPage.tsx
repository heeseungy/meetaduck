import { useEffect, useState } from 'react';

import pairChat from '@/assets/images/pairChat.png';
import Button from '@/components/commons/Button';
import Card from '@/components/commons/Card';
import { MISSION_STATUS_LIST } from '@/recoil/dummy';
import styles from '@/styles/mission/Mission.module.css';
import { MissionContent } from '@/types/mission';
import { ArrowsClockwise, PlusCircle } from '@phosphor-icons/react';
import AWS from 'aws-sdk';
import imageCompression from 'browser-image-compression';

type MissionManitoProps = {
  nickname: string;
};

function MissionManitoPage(props: MissionManitoProps) {
  // useEffect로 값 바꾸기 전에 임의의 값을 dummy의 값으로 지정하자 -> dummy.ts를 추후에 수정
  const [missionList, setMissionList] = useState<MissionContent[]>(MISSION_STATUS_LIST);
  const [nextMissionList, setNextMissionList] = useState<MissionContent[]>(
    missionList.filter((it) => it.confirmTime === null),
  );
  const [todayMission, setTodayMission] = useState<MissionContent>(
    missionList
      .filter((it) => it.confirmTime != null)
      .sort(
        (a: MissionContent, b: MissionContent) =>
          new Date(b.confirmTime!).getTime() - new Date(a.confirmTime!).getTime(),
      )[0],
  );

  useEffect(() => {
    // axios 미션 조회
    // const response =
    // setMissionList(response.data)
  }, []);

  useEffect(() => {
    setTodayMission(
      missionList
        .filter((it) => it.confirmTime != null)
        .sort(
          (a: MissionContent, b: MissionContent) =>
            new Date(b.confirmTime!).getTime() - new Date(a.confirmTime!).getTime(),
        )[0],
    );
    setNextMissionList(missionList.filter((it) => it.confirmTime === null));
  }, [missionList]);

  // 사진 업로드

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

  const [isSubmitCompleted, setIsSubmitCompleted] = useState(todayMission.missionImageUrl != null);
  const submitHandler = () => {
    if (imgUrl === '') {
      window.alert('사진을 올려주세요!');
      return;
    }
    // 제출 axios
    setIsSubmitCompleted(true);
    console.log('제출 완료!');
  };

  function newMission() {
    if (nextMissionList.length) {
      // axios 데일리미션 넘기기-> nextMissionList[0].missionStatusId 전송 confirmTime이 찍힘
      // axios 미션 조회
      // setMissionList(response.data)
    } else {
      //안됩니다
    }
  }

  const emojiList = ['🥰', '😚', '🤩', '🤗', '🥳', '🐤', '🎅', '👍', '💪', '🎁', '🎉', '✨', '💖', '🔥', '🌈', '🌟'];
  const children = (
    <div className={`${styles.FlexVertical} ${styles.AlignBaseLine} ${styles.Gap45Rem}`}>
      <div className={`${styles.FlexVertical}`}>
        <div className={`${styles.Title} ${styles.FlexHorizontal} ${styles.Gap1Rem}`}>
          <div className={`FontL`}>오늘의 미션</div>
          {isSubmitCompleted ? (
            <div></div>
          ) : (
            <div className={`${styles.FlexHorizontal} ${styles.Gap05Rem}`}>
              <div className={`FontXS FontBasic`}>{2 - nextMissionList.length}/2</div>
              <div className={`${styles.IconSpin1}`} onClick={newMission}>
                <ArrowsClockwise size={20} />
              </div>
            </div>
          )}
        </div>
        <div>
          <div className={`FontS FontBasic ${styles.MissionStatus}`}>{props.nickname}님에게</div>
          <div className={`FontS FontBasic ${styles.MissionStatus}`}>{todayMission.missionContent}</div>
        </div>
      </div>
      <div className={`${styles.FlexVertical} ${styles.AlignBaseLine} ${styles.Gap1Rem}`}>
        <div>
          <div className={`FontL ${styles.Title}`}>미션 업로드</div>
          <div className={`FontS FontComment ${styles.MissionStatus}`}>미션을 수행한 사진을 업로드해주세요.</div>
        </div>
        <div className={`${styles.FlexVertical} ${styles.AlignCenter} ${styles.Gap1Rem} ${styles.ImageBoxContainer}`}>
          {isSubmitCompleted ? (
            <div className={`${styles.imageBox}`}>
              <img className={`${styles.PreviewImage}`} src={imgUrl !== '' ? pairChat : ''} alt="" />
              {/* <img className={`${styles.PreviewImage}`} src={imgUrl !== '' ? imgUrl : ''} alt="" /> */}
            </div>
          ) : (
            <label htmlFor="MissionFile">
              {imgUrl !== '' ? (
                <div className={`${styles.imageBox}`}>
                  <img className={`${styles.PreviewImage}`} src={imgUrl !== '' ? pairChat : ''} alt="" />
                  {/* <img className={`${styles.PreviewImage}`} src={imgUrl !== '' ? imgUrl : ''} alt="" /> */}
                </div>
              ) : (
                <div className={`${styles.imageBox}`}>
                  <PlusCircle color="#EEA23E" size={60} />
                </div>
              )}
            </label>
          )}
          <div>
            {isSubmitCompleted ? (
              <div className="FontBasic FontSTitle">
                미션 성공! {emojiList[Math.floor(Math.random() * emojiList.length)]}{' '}
              </div>
            ) : (
              <Button onClickHandler={submitHandler} bgc="filled">
                제출
              </Button>
            )}
          </div>
          <input className={styles.ImageInput} type="file" id="MissionFile" onChange={handleFileInput} />
        </div>
      </div>
    </div>
  );
  return <Card {...{ tag: 2, children: children }}></Card>;
}

export default MissionManitoPage;
