export type Tpost = {
  title: string;
  weather: string;
  location: string;
  writer: string;
  like: number | null;
  createdAt: number;
  body: string;
  img: string;
  boardType: string;
};

export type TboardDummy = {
  post: Tpost[];
};

export const boardDummy: TboardDummy = {
  post: [
    {
      title: '서울 비올때 룩',
      weather: '비',
      location: '서울',
      writer: 'kim',
      like: 100,
      createdAt: 20220311,
      body: '바디',
      img: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile1.uf.tistory.com%2Fimage%2F1348073F4E08A69A17D604',
      boardType: 'r',
    },
    {
      title: '대전 화창한 날씨 룩',
      weather: '화창',
      location: '대전',
      writer: 'joe',
      like: 0,
      createdAt: 20220312,
      body: '바디',
      img: 'https://mblogthumb-phinf.pstatic.net/20160506_24/yujoki76_14625160575783K2DW_JPEG/street_style_rainy_days_%2822%29.png?type=w2',
      boardType: 'r',
    },
    {
      title: '제주 비올때 룩',
      weather: '비',
      location: '제주',
      writer: 'lee',
      like: 50,
      createdAt: 20220312,
      body: '바디',
      img: 'https://media.vlpt.us/images/edie_ko/post/4631c9fc-fa76-47e9-9d77-bc160476c60a/1_mv73TpGPVFXzJqu920m5Og.png',
      boardType: 'r',
    },
    {
      title: '제주 화창한 날씨 룩',
      weather: '화창',
      location: '제주',
      writer: 'lee',
      like: 100,
      createdAt: 20220315,
      body: '바디',
      img: 'https://media.vlpt.us/images/dongha1992/post/2efd8b1b-d186-40bc-a574-026f180750ba/react.jpeg',
      boardType: 'r',
    },
    {
      title: '일산 흐린 날씨 룩',
      weather: '흐림',
      location: '일산',
      writer: 'kim',
      like: 70,
      createdAt: 20220316,
      body: '바디',
      img: 'https://media.vlpt.us/images/kimhodol/post/9c9e0ba3-20b1-4ba9-9a66-9af9ab5cf2e6/hodol-typescript.jpg',
      boardType: 'r',
    },{
      title: '일산 흐린 날씨 추천좀',
      weather: '흐림',
      location: '일산',
      writer: 'kim',
      like: null,
      createdAt: 20220317,
      body: '바디',
      img: 'https://media.vlpt.us/images/kimhodol/post/9c9e0ba3-20b1-4ba9-9a66-9af9ab5cf2e6/hodol-typescript.jpg',
      boardType: 'q',
    },
  ]
}