// �ֲ�ͼ
export type Banner = {
  targetID: number;
  url: string;
  imageUrl: string;
};
// ���ű�ǩ
export type HotTag = {
  id: number;
  name: string;
  position: number;
};
// ����
export type Singer = {
  id: number;
  name: string;
  img1v1Url: string;
  albumSize: number;
};
// ����
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
// ���ŵ�ַ
export type SongUrl = {
  id: number;
  url: string;
};
// �赥
export type SongSheet = {
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
  tracks: Song[];
};
