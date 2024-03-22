import React, { useEffect, useState } from 'react';

import AWS from 'aws-sdk';

const SamplePage = () => {
  useEffect(() => {
    // console.log('초기');
    console.log('accesskey', import.meta.env.VITE_AWS_ACCESS_KEY_ID);
    console.log('secretAccessKey : ' , import.meta.env.VITE_AWS_SECRET_ACCESS_KEY);
  }, []);

  // AWS 설정 초기화
  // 환경 변수를 이용하여 S3 인스턴스 초기화
  const s3 = new AWS.S3({
    signatureVersion: "v4",
    region: import.meta.env.VITE_AWS_REGION,
    credentials: new AWS.Credentials({
      // 값이 undefined일 경우, default 값 설정
      // accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID || 'default-access-key-id',
      // secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || 'default-secret-access-key'

      //   // 항상 정의되어 있다고 통보
      //   accessKeyId: import.meta.env.VITE_REACT_APP_AWS_ACCESS_KEY_ID as string,
      //   secretAccessKey: import.meta.env.VITE_REACT_APP_AWS_SECRET_ACCESS_KEY as string,

    
      accessKeyId : import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    }),
  });



  // 파일 상태를 관리하기 위한 State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 파일 업로드 핸들러
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  // 파일 업로드 함수
  const uploadFile = (file: File) => {
    const uploadParams = {
      Bucket: 's10p22c108', // 버킷 이름
      Key: file.name, // 저장될 파일 이름
      Body: file, // 파일 객체
    //   ACL: 'public-read', // 파일 접근 권한 (필요에 따라 설정)
    };

    console.log('uploadParams', uploadParams);

    // try {
    //     const data = await S3Client.send(uploadCommand);
    //     console.log("Upload Success", data);
    // } catch (err) {
    //     console.error("Error", err);
    // }

    s3.upload(uploadParams, (err: any, data: any) => {
      if (err) {
        console.error('Error', err);
      } else if (data) {
        console.log('Upload Success', data.Location);
      }
    });
  };

  return (
    <>
      <p>sample page</p>
      <input type="file" onChange={handleFileInput} />
      <button onClick={() => selectedFile && uploadFile(selectedFile)}> Upload to S3</button>
    </>
  );
};

export default SamplePage;
