export interface UserModel {
  id: string;
  userName: string;
  userBio: string;
  email: string;
  profileImg: string;
  playlistCount: number;
  totalLikes: number;
  totalForks: number;
}

export interface UserPlaylistsModel {
  created: string[];
  forked: string[];
  liked: string[];
}
