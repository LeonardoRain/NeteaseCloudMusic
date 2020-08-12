// 轮播图
export type Banner = {
  targetID: number;
  url: string;
  imageUrl: string;
};
// 热门标签
export type HotTag = {
  id: number;
  name: string;
  position: number;
};
// 歌手
export type Singer = {
  id: number;
  name: string;
  img1v1Url: string;
  albumSize: number;
};
// 歌曲
export type Song = {
  id: number;
  name: string;
  url: string;
  ar: Singer[];
  al: {
    id: number;
    name: string;
    picUrl: string;
  };
  dt: number;
};
// 播放地址
export type SongUrl = {
  id: number;
  url: string;
};
// 歌单
export type SongSheet = {
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
  tracks: Song[];
};
