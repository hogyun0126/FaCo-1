import { S3Client, PutObjectCommand, ListObjectsCommand, DeleteObjectCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

import { useState } from "react";

const s3Config = {
  bucketName: "facoimg",
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
  
function Test() {
  const [imgs, setImgs] = useState<File[]>([]);
  const [imgUrls, setImgUrls] = useState([]);

  const [url, setUrl] = useState('');

  function handler(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file !== undefined) {
      setImgs([...imgs, file]);
    }
  }

  const submitHandler = async () => {
    console.log(imgs)
      const file = imgs[0]
      const params = {
        Body: file,
        Bucket: s3Config.bucketName,
        Key: "images/" + file.name
      }

      try {
        const data = await s3.send(new PutObjectCommand(params));
        console.log(data)
      } catch (err) {
        return console.error(err)
      }

    
    listAlbums()
  }


const listAlbums = async () => {
  try {
    const data2 = await s3.send(
      new ListObjectsCommand({
        Prefix: "images/",
        Bucket: s3Config.bucketName,
      })
    )

    console.log(data2, 'img')


    const href = `https://${s3Config.bucketName}.s3.amazonaws.com/`;
    const url = href + data2.Contents?.[1].Key;

    setUrl(url)

  } catch(err) {
    console.error(err);
  }
}

async function createAlbum() {
  const param = {
    Bucket: s3Config.bucketName,
    Key: "userId/"
  }

  try {
    const data = await s3.send(new PutObjectCommand(param));
    console.log(data)
  } catch (err) {
    console.error(err)
  }
}


  return (
    <div>
      <input accept="image/*" onChange={(e)=>handler(e)} type='file' />
      <button onClick={submitHandler}>submit</button>
      <button onClick={createAlbum}>create album</button>
      <img src={url}/>
    </div>
  )
}

export default Test;
