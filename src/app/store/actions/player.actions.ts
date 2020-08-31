import { createAction, props } from '@ngrx/store';
import { Song } from '../../services/data-types/common.types';
import { PlayMode } from '../../shared/ne-ui/ne-player/player-type';

export const SetPlaying = createAction(
  '[player] set playing',
  props<{ playing: boolean }>()
);

export const SetPlayList = createAction(
  '[player] set playList',
  props<{ playList: Song[] }>()
);

export const SetSongList = createAction(
  '[player] set songList',
  props<{ songList: Song[] }>()
);

export const SetPlayMode = createAction(
  '[player] set playMode',
  props<{ playMode: PlayMode }>()
);

export const SetCurrentIndex = createAction(
  '[player] set currentIndex',
  props<{ currentIndex: number }>()
);
