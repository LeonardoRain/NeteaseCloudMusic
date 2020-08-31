import { PlayMode } from '../../shared/ne-ui/ne-player/player-type';
import { Song } from '../../services/data-types/common.types';
import { createReducer, on, Action } from '@ngrx/store';
import {
  SetPlaying,
  SetPlayList,
  SetSongList,
  SetPlayMode,
  SetCurrentIndex,
} from '../actions/player.actions';

export type PlayState = {
  playing: boolean;
  playMode: PlayMode;
  songList: Song[];
  playList: Song[];
  currentIndex: number;
};

export const initialState: PlayState = {
  playing: false,
  songList: [],
  playList: [],
  playMode: { type: 'loop', label: '循环' },
  currentIndex: -1,
};

const reducer = createReducer(
  initialState,
  on(SetPlaying, (state, { playing }) => ({ ...state, playing })),
  on(SetPlayList, (state, { playList }) => ({ ...state, playList })),
  on(SetSongList, (state, { songList }) => ({ ...state, songList })),
  on(SetPlayMode, (state, { playMode }) => ({ ...state, playMode })),
  on(SetCurrentIndex, (state, { currentIndex }) => ({ ...state, currentIndex }))
);

export function playerReducer(state: PlayState, action: Action) {
  return reducer(state, action);
}
