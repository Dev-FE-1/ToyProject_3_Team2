export interface UserModel {
  userId: string;
  userName: string;
  userBio: string;
  email: string;
  profileImg: string;
  playlistCount: number;
  totalLikes: number;
  totalForks: number;
}

export interface UserPlaylistsModel {
  userId: string;
  created: string[];
  forked: string[];
  liked: string[];
}
