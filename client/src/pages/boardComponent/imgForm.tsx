import React, { useEffect, useState } from "react";
import { Img } from "../../modules/posts";
import { BsFillPlusSquareFill } from "react-icons/bs"

import { S3Client, PutObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

type ImgForm = Img & {
  checked: boolean;
}

type ImgFormProps = {
  images: Img[];
  handleImages: (images: Img[]) => void;
}

const s3Config = {
  bucketName: String(process.env.REACT_APP_AWS_BUCKET),
  region: String(process.env.REACT_APP_AWS_DEFAULT_REGION),
  accessKeyId: String(process.env.REACT_APP_AWS_ACCESS_KEY_ID),
  secretAccessKey: String(process.env.REACT_APP_AWS_SECRET_ACCESS_KEY),
  poolId: String(process.env.REACT_APP_AWS_IDENTITY_POOL_ID)
};

const s3 = new S3Client({
  region: s3Config.region,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: s3Config.region }),
    identityPoolId: s3Config.poolId, // IDENTITY_POOL_ID
  }),
});

function ImgForm({ images, handleImages }: ImgFormProps) {
  const [imgFiles, setImageFile] = useState<ImgForm[]>([]);
  const [isUserHasAlbum, setIsUserHasAlbum] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isImgLimit, setIstImgLimit] = useState(false);

  const user = '2test@test.com'; // 로그인한 유저 이메일

  useEffect(() => {
    // console.log(s3Config)
    const memo = images.map(el => {
      return {
        ...el,
        checked: true,
      }
    })
    setImageFile(memo);
  }, [images]);

  useEffect(() => {
    listAlbums(user)
  }, [])

  async function listAlbums(user: string) {
    try {
      setIsLoading(true);
      const album = await s3.send(
        new ListObjectsCommand({
          Prefix: user + '/',
          Bucket: s3Config.bucketName,
        })
      )
      setIsLoading(false);

      if (album.Contents !== undefined) {
        setIsUserHasAlbum(true);
      } 
    } catch(err) {
      console.error(err);
    }
  }

  function imgHandler() {
    if (images.length === 5) {
      return;
    }

    const input = document.createElement('input');
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async (e: any) => {
      const file = e.target.files[0];

      // files[0] 파일 올리면 s3에 보내서 주소 받아옴
      if (!isUserHasAlbum) {
        // 앨범 없으면 만들고
        setIsLoading(true);
        const album = await s3.send(new PutObjectCommand({
          Bucket: s3Config.bucketName,
          Key: user + '/'
        }));
        setIsLoading(false);
        setIsUserHasAlbum(true);
      }

      setIsLoading(true);
      // 이미지 넣음 (중복은 aws상에서 걸러짐)
      const path = user + '/' + file.name;
      const data = await s3.send(new PutObjectCommand({
        Body: file,
        Bucket: s3Config.bucketName,
        Key: path
      }));
      setIsLoading(false);

      const href = `https://${s3Config.bucketName}.s3.amazonaws.com/`;
      const url =  href + path;

       const update = [
        ...imgFiles, {
          name: file.name,
          url: url,
          checked: true,
        }
      ];

      updateImg(update);
    }
  }

  function checkBoxHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const update = imgFiles.map(el => {
      if (el.name === e.target.value) {
        el.checked = e.target.checked;
      }
      return el;
    });

    updateImg(update);
  }

  function updateImg(update: ImgForm[]) {
    setImageFile(update);
    const checked = update
      .filter(el => el.checked)
      .map(el => {
        return {
          name: el.name,
          url: el.url
        }
      });
    
    handleImages(checked);
    if (checked.length < 5) {
      setIstImgLimit(false);
    } else {
      setIstImgLimit(true);
    }
  }

  return (
    <div className="img-form-container">
      <div>
        <div className="img-form-upload-form">
          <div onClick={imgHandler}><BsFillPlusSquareFill size={30} /></div>
          {isImgLimit ? (
              <div className="img-form-img-limit-alert">이미지는 5개까지 추가할 수 있습니다</div>
            ) : (
              <div>Add image</div>
            )
          }
        </div>
        <ul className="img-form-file-list">
          {imgFiles.map((el, idx) => (
            <li key={idx}>
              <input  type='checkbox' value={el.name} onChange={(e)=>checkBoxHandler(e)} checked />
              {el.name}
            </li>
            ))}
        </ul>
      </div>
      {isLoading && <div className='img-form-loading'>Loading...</div>}
    </div>
  )
}

export default ImgForm;
