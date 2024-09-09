export interface Video {
  videoId: string | null; // videoId는 쿼리 파라미터에서 추출 (쿼리 파라미터는 존재하지 않으면 null)
  videoUrl: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
}
export interface PlaylistFormDataModel {
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

export interface PlaylistModel extends PlaylistFormDataModel {
  playlistId: string;
  userId: string;
  userName: string;
  doc?: string;
}

export interface Comment {
  commentId?: string;
  playlistId?: string;
  profileImg: string;
  userId?: string;
  userName: string;
  content: string;
  createdAt: string;
}
