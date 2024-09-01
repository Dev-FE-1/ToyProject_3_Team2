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
  videos: Array[];
}

export interface PlaylistModel extends PlaylistFormDataModel {
  playlistId: string;
  userId: string;
  doc?: string;
}
