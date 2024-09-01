// 파이어스토어 초기 셋업 데이터

export interface User {
  userName: string;
  email: string;
  profileImg: string;
  playlistCount: number;
  totalLikes: number;
  totalForks: number;
}

export interface Playlist {
  playlistId: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  forkCount: number;
  commentCount: number;
  videoCount: number;
  thumbnailUrl: string;
  isPublic: boolean;
  videos: Video[];
}

export interface Video {
  videoId: string;
  videoUrl: string;
  title: string;
  thumbnailUrl: string;
  duration: number;
}

export interface UserPlaylists {
  created: string[];
  forked: string[];
  liked: string[];
}

export interface Comment {
  commentId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Data {
  users: { [key: string]: User };
  playlists: { [key: string]: Playlist };
  userPlaylists: { [key: string]: UserPlaylists };
  comments: { [key: string]: { [key: string]: Comment } };
}

export const data: Data = {
  users: {
    user101: {
      userName: '엄마튜버',
      email: 'momtuber@example.com',
      profileImg:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      playlistCount: 5,
      totalLikes: 1200,
      totalForks: 80,
    },
    user102: {
      userName: '여행왕',
      email: 'travelking@example.com',
      profileImg:
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      playlistCount: 5,
      totalLikes: 1500,
      totalForks: 100,
    },
  },
  playlists: {
    playlist101: {
      playlistId: 'playlist101',
      userId: 'user101',
      userName: '엄마튜버',
      title: '우리 아이 교육용 영상 모음',
      description: '핑크퐁과 뽀로로로 배우는 즐거운 학습!',
      category: '키즈',
      createdAt: '2023-08-15T10:00:00Z',
      updatedAt: '2023-08-20T15:30:00Z',
      likeCount: 300,
      forkCount: 20,
      commentCount: 50,
      videoCount: 3,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1485546784815-e380f3297414?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=1000&q=80',
      isPublic: true,
      videos: [
        {
          videoId: 'XqZsoesa55w',
          videoUrl: 'https://www.youtube.com/watch?v=XqZsoesa55w',
          title:
            'Baby Shark Dance | Sing and Dance! | @Baby Shark Official | PINKFONG Songs for Children',
          thumbnailUrl: 'https://img.youtube.com/vi/XqZsoesa55w/0.jpg',
          duration: 140,
        },
        {
          videoId: 'hB8S6oKjiw8',
          videoUrl: 'https://www.youtube.com/watch?v=hB8S6oKjiw8',
          title: 'Wheels on the Bus | CoComelon Nursery Rhymes & Kids Songs',
          thumbnailUrl: 'https://img.youtube.com/vi/hB8S6oKjiw8/0.jpg',
          duration: 178,
        },
        {
          videoId: 'pWepfJ-8XU0',
          videoUrl: 'https://www.youtube.com/watch?v=pWepfJ-8XU0',
          title: 'ABC Song + More Nursery Rhymes & Kids Songs - CoComelon',
          thumbnailUrl: 'https://img.youtube.com/vi/pWepfJ-8XU0/0.jpg',
          duration: 376,
        },
      ],
    },
    playlist102: {
      playlistId: 'playlist102',
      userId: 'user101',
      userName: '엄마튜버',
      title: '잔잔한 클래식 음악',
      description: '마음을 편안하게 해주는 클래식 음악 모음',
      category: '음악',
      createdAt: '2023-09-01T14:00:00Z',
      updatedAt: '2023-09-10T09:45:00Z',
      likeCount: 250,
      forkCount: 15,
      commentCount: 30,
      videoCount: 3,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=1000&q=80',
      isPublic: true,
      videos: [
        {
          videoId: 'nbXL0CfZqa0',
          videoUrl: 'https://www.youtube.com/watch?v=nbXL0CfZqa0',
          title: 'Mozart - Piano Concerto No. 21 - Andante',
          thumbnailUrl: 'https://img.youtube.com/vi/nbXL0CfZqa0/0.jpg',
          duration: 374,
        },
        {
          videoId: '4Tr0otuiQuU',
          videoUrl: 'https://www.youtube.com/watch?v=4Tr0otuiQuU',
          title: 'Beethoven - Moonlight Sonata (FULL)',
          thumbnailUrl: 'https://img.youtube.com/vi/4Tr0otuiQuU/0.jpg',
          duration: 900,
        },
        {
          videoId: 'YGRO05WcNDk',
          videoUrl: 'https://www.youtube.com/watch?v=YGRO05WcNDk',
          title: 'Chopin - Nocturne op.9 No.2',
          thumbnailUrl: 'https://img.youtube.com/vi/YGRO05WcNDk/0.jpg',
          duration: 271,
        },
      ],
    },
    playlist103: {
      playlistId: 'playlist103',
      userId: 'user101',
      userName: '엄마튜버',
      title: '일상 브이로그',
      description: '평범한 일상의 소소한 행복',
      category: '라이프',
      createdAt: '2023-09-15T11:30:00Z',
      updatedAt: '2023-09-25T16:20:00Z',
      likeCount: 180,
      forkCount: 10,
      commentCount: 40,
      videoCount: 3,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1523841589119-b55aee0f66e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=1000&q=80',
      isPublic: true,
      videos: [
        {
          videoId: 'GurNiNV5XUM',
          videoUrl: 'https://www.youtube.com/watch?v=GurNiNV5XUM',
          title: 'My Morning Routine - 2023 Edition',
          thumbnailUrl: 'https://img.youtube.com/vi/GurNiNV5XUM/0.jpg',
          duration: 600,
        },
        {
          videoId: '8JnfIa84TnU',
          videoUrl: 'https://www.youtube.com/watch?v=8JnfIa84TnU',
          title: 'Weekend In My Life | Cozy Spring Vlog',
          thumbnailUrl: 'https://img.youtube.com/vi/8JnfIa84TnU/0.jpg',
          duration: 720,
        },
        {
          videoId: 'pWYtWH9qCmw',
          videoUrl: 'https://www.youtube.com/watch?v=pWYtWH9qCmw',
          title: 'Home Cafe Vlog | Making Dalgona Coffee',
          thumbnailUrl: 'https://img.youtube.com/vi/pWYtWH9qCmw/0.jpg',
          duration: 540,
        },
      ],
    },
    playlist104: {
      playlistId: 'playlist104',
      userId: 'user101',
      userName: '엄마튜버',
      title: '강아지 영상 모음',
      description: '귀여운 강아지들의 일상',
      category: '동물',
      createdAt: '2023-10-01T09:00:00Z',
      updatedAt: '2023-10-10T13:15:00Z',
      likeCount: 400,
      forkCount: 25,
      commentCount: 70,
      videoCount: 3,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=1000&q=80',
      isPublic: true,
      videos: [
        {
          videoId: 'DhOtP0qzxzU',
          videoUrl: 'https://www.youtube.com/watch?v=DhOtP0qzxzU',
          title: 'Golden Retriever Puppies First Day Home',
          thumbnailUrl: 'https://img.youtube.com/vi/DhOtP0qzxzU/0.jpg',
          duration: 360,
        },
        {
          videoId: 'tHvEfW9PCvA',
          videoUrl: 'https://www.youtube.com/watch?v=tHvEfW9PCvA',
          title: 'Shiba Inu Goes for a Walk',
          thumbnailUrl: 'https://img.youtube.com/vi/tHvEfW9PCvA/0.jpg',
          duration: 480,
        },
        {
          videoId: 'ByH9LuSILxU',
          videoUrl: 'https://www.youtube.com/watch?v=ByH9LuSILxU',
          title: 'Cutest Dogs Video Compilation',
          thumbnailUrl: 'https://img.youtube.com/vi/ByH9LuSILxU/0.jpg',
          duration: 300,
        },
      ],
    },
    playlist105: {
      playlistId: 'playlist105',
      userId: 'user101',
      userName: '엄마튜버',
      title: '영어 회화 강의',
      description: '초보자를 위한 영어 회화 강의 시리즈',
      category: '강의',
      createdAt: '2023-10-15T08:00:00Z',
      updatedAt: '2023-10-25T14:30:00Z',
      likeCount: 220,
      forkCount: 18,
      commentCount: 45,
      videoCount: 3,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=1000&q=80',
      isPublic: true,
      videos: [
        {
          videoId: 'juKd26qkNAw',
          videoUrl: 'https://www.youtube.com/watch?v=juKd26qkNAw',
          title: 'Basic English Conversation Lessons',
          thumbnailUrl: 'https://img.youtube.com/vi/juKd26qkNAw/0.jpg',
          duration: 1200,
        },
        {
          videoId: 'ZTgYjGXFAkw',
          videoUrl: 'https://www.youtube.com/watch?v=ZTgYjGXFAkw',
          title: 'Learn English Conversation for Beginners',
          thumbnailUrl: 'https://img.youtube.com/vi/ZTgYjGXFAkw/0.jpg',
          duration: 900,
        },
        {
          videoId: 'pCAbfJCsNVI',
          videoUrl: 'https://www.youtube.com/watch?v=pCAbfJCsNVI',
          title: 'How to Introduce Yourself in English',
          thumbnailUrl: 'https://img.youtube.com/vi/pCAbfJCsNVI/0.jpg',
          duration: 1080,
        },
      ],
    },
    playlist201: {
      playlistId: 'playlist201',
      userId: 'user102',
      userName: '여행왕',
      title: '뉴질랜드 여행 브이로그',
      description: '2주간의 뉴질랜드 여행 기록',
      category: '여행',
      createdAt: '2023-11-01T12:00:00Z',
      updatedAt: '2023-11-15T18:45:00Z',
      likeCount: 350,
      forkCount: 30,
      commentCount: 80,
      videoCount: 3,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=1000&q=80',
      isPublic: true,
      videos: [
        {
          videoId: 'LT_jAU5cmMM',
          videoUrl: 'https://www.youtube.com/watch?v=LT_jAU5cmMM',
          title: 'New Zealand Road Trip: North Island',
          thumbnailUrl: 'https://img.youtube.com/vi/LT_jAU5cmMM/0.jpg',
          duration: 900,
        },
        {
          videoId: 'HjPgqhyV-7M',
          videoUrl: 'https://www.youtube.com/watch?v=HjPgqhyV-7M',
          title: 'Queenstown Bungy Jump Experience',
          thumbnailUrl: 'https://img.youtube.com/vi/HjPgqhyV-7M/0.jpg',
          duration: 720,
        },
        {
          videoId: 'jMWvqBWqCG0',
          videoUrl: 'https://www.youtube.com/watch?v=jMWvqBWqCG0',
          title: 'Milford Sound Cruise, New Zealand',
          thumbnailUrl: 'https://img.youtube.com/vi/jMWvqBWqCG0/0.jpg',
          duration: 1080,
        },
      ],
    },
    playlist202: {
      playlistId: 'playlist202',
      userId: 'user102',
      userName: '여행왕',
      title: '인기 영화 리뷰',
      description: '최신 개봉 영화 리뷰 모음',
      category: '영화',
      createdAt: '2023-11-20T10:30:00Z',
      updatedAt: '2023-11-30T16:15:00Z',
      likeCount: 280,
      forkCount: 20,
      commentCount: 60,
      videoCount: 3,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=1000&q=80',
      isPublic: true,
      videos: [
        {
          videoId: 'TcMBFSGVi1c',
          videoUrl: 'https://www.youtube.com/watch?v=TcMBFSGVi1c',
          title: 'Marvel Studios Avengers: Endgame - Official Trailer',
          thumbnailUrl: 'https://img.youtube.com/vi/TcMBFSGVi1c/0.jpg',
          duration: 720,
        },
        {
          videoId: '5xH0HfJHsaY',
          videoUrl: 'https://www.youtube.com/watch?v=5xH0HfJHsaY',
          title: 'Parasite - Official Trailer (2019)',
          thumbnailUrl: 'https://img.youtube.com/vi/5xH0HfJHsaY/0.jpg',
          duration: 900,
        },
        {
          videoId: 'YoHD9XEInc0',
          videoUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
          title: 'INCEPTION - Official Trailer',
          thumbnailUrl: 'https://img.youtube.com/vi/YoHD9XEInc0/0.jpg',
          duration: 1080,
        },
      ],
    },
    playlist203: {
      playlistId: 'playlist203',
      userId: 'user102',
      userName: '여행왕',
      title: '무한도전 명장면 모음',
      description: '레전드 무한도전 에피소드 모음집',
      category: '엔터',
      createdAt: '2023-12-05T09:00:00Z',
      updatedAt: '2023-12-15T14:30:00Z',
      likeCount: 500,
      forkCount: 40,
      commentCount: 120,
      videoCount: 3,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1588328355754-b2a85c1965c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=1000&q=80',
      isPublic: true,
      videos: [
        {
          videoId: 'wllqGsJTSOs',
          videoUrl: 'https://www.youtube.com/watch?v=wllqGsJTSOs',
          title: '무한도전 - Infinite Challenge, Briefcase Race',
          thumbnailUrl: 'https://img.youtube.com/vi/wllqGsJTSOs/0.jpg',
          duration: 1800,
        },
        {
          videoId: 'xmhqHLczXhk',
          videoUrl: 'https://www.youtube.com/watch?v=xmhqHLczXhk',
          title: '무한도전 - Infinite Challenge, 1970s',
          thumbnailUrl: 'https://img.youtube.com/vi/xmhqHLczXhk/0.jpg',
          duration: 2100,
        },
        {
          videoId: 'nA6ACKF69Qg',
          videoUrl: 'https://www.youtube.com/watch?v=nA6ACKF69Qg',
          title: '무한도전 - Infinite Challenge, The Ugly Festival',
          thumbnailUrl: 'https://img.youtube.com/vi/nA6ACKF69Qg/0.jpg',
          duration: 3600,
        },
      ],
    },
    playlist204: {
      playlistId: 'playlist204',
      userId: 'user102',
      userName: '여행왕',
      title: '고양이 영상 모음',
      description: '귀여운 고양이들의 일상',
      category: '동물',
      createdAt: '2023-12-20T11:00:00Z',
      updatedAt: '2023-12-30T17:45:00Z',
      likeCount: 450,
      forkCount: 35,
      commentCount: 90,
      videoCount: 3,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=1000&q=80',
      isPublic: true,
      videos: [
        {
          videoId: 'umvFBoLOOgo',
          videoUrl: 'https://www.youtube.com/watch?v=umvFBoLOOgo',
          title: 'Kittens First Time Outside',
          thumbnailUrl: 'https://img.youtube.com/vi/umvFBoLOOgo/0.jpg',
          duration: 300,
        },
        {
          videoId: 'ByH9LuSILxU',
          videoUrl: 'https://www.youtube.com/watch?v=ByH9LuSILxU',
          title: 'Cat and Dog Friendship',
          thumbnailUrl: 'https://img.youtube.com/vi/ByH9LuSILxU/0.jpg',
          duration: 420,
        },
        {
          videoId: 'SQJrYw1QvSQ',
          videoUrl: 'https://www.youtube.com/watch?v=SQJrYw1QvSQ',
          title: 'Cats Playing with Toys Compilation',
          thumbnailUrl: 'https://img.youtube.com/vi/SQJrYw1QvSQ/0.jpg',
          duration: 360,
        },
      ],
    },
    playlist205: {
      playlistId: 'playlist205',
      userId: 'user102',
      userName: '여행왕',
      title: 'K-POP 인기 뮤직비디오',
      description: '최신 K-POP 히트곡 모음',
      category: '음악',
      createdAt: '2024-01-05T13:00:00Z',
      updatedAt: '2024-01-15T19:30:00Z',
      likeCount: 600,
      forkCount: 50,
      commentCount: 150,
      videoCount: 3,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=1000&q=80',
      isPublic: true,
      videos: [
        {
          videoId: '9bZkp7q19f0',
          videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
          title: 'PSY - GANGNAM STYLE(강남스타일) M/V',
          thumbnailUrl: 'https://img.youtube.com/vi/9bZkp7q19f0/0.jpg',
          duration: 252,
        },
        {
          videoId: 'IHNzOHi8sJs',
          videoUrl: 'https://www.youtube.com/watch?v=IHNzOHi8sJs',
          title: 'BLACKPINK - DDU-DU DDU-DU (뚜두뚜두) M/V',
          thumbnailUrl: 'https://img.youtube.com/vi/IHNzOHi8sJs/0.jpg',
          duration: 209,
        },
        {
          videoId: 'gdZLi9oWNZg',
          videoUrl: 'https://www.youtube.com/watch?v=gdZLi9oWNZg',
          title: "BTS (방탄소년단) 'Dynamite' Official MV",
          thumbnailUrl: 'https://img.youtube.com/vi/gdZLi9oWNZg/0.jpg',
          duration: 223,
        },
      ],
    },
  },
  userPlaylists: {
    user101: {
      created: ['playlist101', 'playlist102', 'playlist103', 'playlist104', 'playlist105'],
      forked: ['playlist203', 'playlist205'],
      liked: ['playlist201', 'playlist203'],
    },
    user102: {
      created: ['playlist201', 'playlist202', 'playlist203', 'playlist204', 'playlist205'],
      forked: ['playlist101', 'playlist104'],
      liked: ['playlist102', 'playlist104', 'playlist105'],
    },
  },
  comments: {
    playlist101: {
      comment1: {
        commentId: 'comment701',
        userId: 'user102',
        userName: '여행왕',
        content: '아이들이 정말 좋아하네요! 감사합니다.',
        createdAt: '2023-08-21T09:30:00Z',
        updatedAt: '2023-08-21T09:30:00Z',
      },
      comment2: {
        commentId: 'comment702',
        userId: 'user103',
        userName: '육아맘',
        content: '핑크퐁 노래가 제일 좋아요!',
        createdAt: '2023-08-22T14:15:00Z',
        updatedAt: '2023-08-22T14:15:00Z',
      },
    },
    playlist201: {
      comment1: {
        commentId: 'comment703',
        userId: 'user101',
        userName: '엄마튜버',
        content: '뉴질랜드 너무 가보고 싶어요. 좋은 정보 감사합니다!',
        createdAt: '2023-11-16T10:00:00Z',
        updatedAt: '2023-11-16T10:00:00Z',
      },
      comment2: {
        commentId: 'comment704',
        userId: 'user104',
        userName: '백패커',
        content: '퀸스타운 번지점프 꼭 해보고 싶네요.',
        createdAt: '2023-11-17T18:30:00Z',
        updatedAt: '2023-11-17T18:30:00Z',
      },
      comment3: {
        commentId: 'comment705',
        userId: 'user105',
        userName: '여행초보',
        content: '2주 일정 너무 알차 보여요. 참고하겠습니다!',
        createdAt: '2023-11-18T09:45:00Z',
        updatedAt: '2023-11-18T09:45:00Z',
      },
    },
    playlist203: {
      comment1: {
        commentId: 'comment706',
        userId: 'user106',
        userName: '예능매니아',
        content: '무한도전 레전드 에피소드만 모아놓으셨네요. 굿!',
        createdAt: '2023-12-16T20:00:00Z',
        updatedAt: '2023-12-16T20:00:00Z',
      },
    },
  },
};
