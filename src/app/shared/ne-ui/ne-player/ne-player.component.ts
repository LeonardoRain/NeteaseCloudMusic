import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStoreModule } from 'src/app/store';
import {
  getSongList,
  getPlayList,
  getCurrentIndex,
  getPlayMode,
  getCurrentSong,
  getPlayer,
} from '../../../store/selectors/player.selector';
import { Song } from 'src/app/services/data-types/common.types';
import { PlayMode } from './player-type';
import {
  SetCurrentIndex,
  SetPlayMode,
  SetPlayList,
} from 'src/app/store/actions/player.actions';
import { Subscription, fromEvent } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { shuffle } from 'src/app/utils/array';
import { setContentInstanceParams } from 'ng-zorro-antd';

const modeTypes: PlayMode[] = [
  {
    type: 'loop',
    label: '循环',
  },
  {
    type: 'random',
    label: '随机',
  },
  {
    type: 'singleLoop',
    label: '单曲循环',
  },
];

@Component({
  selector: 'app-ne-player',
  templateUrl: './ne-player.component.html',
  styleUrls: ['./ne-player.component.less'],
})
export class NePlayerComponent implements OnInit {
  percent = 0;
  bufferPercent = 0;

  songList: Song[] = [];
  playList: Song[] = [];
  currentIndex: number;
  currentSong: Song;

  // 歌曲总时长
  duration: any;
  // 当前播放时长
  currentTime: any;

  // 播放状态
  playing = false;

  // 是否可以播放
  songReady = false;

  // 音量
  volume = 60;

  // 是否显示音量面板
  showVolumePanel = false;

  // 是否点击的是音量面板本身
  selfClick = false;

  private winClick: Subscription;

  // 当前模式
  currentMode: PlayMode;
  modeCount = 0;

  @ViewChild('audio', { static: true }) private audio: ElementRef;
  private audioEl: HTMLAudioElement;

  constructor(
    private store$: Store<AppStoreModule>,
    @Inject(DOCUMENT) private doc: Document
  ) {
    const appStore$ = this.store$.pipe(select(getPlayer));

    appStore$.pipe(select(getSongList)).subscribe((songList) => {
      this.songList = songList;
      console.log('this.songList :>> ', this.songList);
      this.watchList(songList, getSongList);
    });
    appStore$.pipe(select(getPlayList)).subscribe((playList) => {
      this.playList = playList;
      console.log('this.playList :>> ', this.playList);
      this.watchList(playList, getPlayList);
    });
    appStore$.pipe(select(getCurrentIndex)).subscribe((currentIndex) => {
      this.currentIndex = currentIndex;
      this.watchCurrentIndex(currentIndex);
    });
    appStore$.pipe(select(getPlayMode)).subscribe((playMode) => {
      this.watchPlayMode(playMode);
    });
    appStore$.pipe(select(getCurrentSong)).subscribe((currentSong) => {
      this.currentSong = currentSong;
      this.watchCurrentSong(currentSong);
    });
  }

  ngOnInit(): void {
    this.audioEl = this.audio.nativeElement;
  }

  private watchList(list: Song[], type: any) {
    this[type] = list;
  }

  private watchCurrentIndex(index: number) {
    console.log('currentIndex :>> ', index);
    this.currentIndex = index;
  }

  private watchPlayMode(playMode: PlayMode) {
    console.log('playMode :>> ', playMode);
    this.currentMode = playMode;
    if (this.songList) {
      let list = this.songList.slice();
      if (playMode.type === 'random') {
        list = shuffle(this.songList);
        this.updateCurrentIndex(list, this.currentSong);
        this.store$.dispatch(SetPlayList({ playList: list }));
      }
    }
  }

  private watchCurrentSong(song: Song) {
    if (song) {
      this.currentSong = song;
      this.duration = Number((song.dt / 1000).toFixed(0));
    }
  }

  // 播放/暂停
  onToggle() {
    console.log('this.playList :>> ', this.playList);
    if (!this.currentSong) {
      if (this.playList.length) {
        this.updateIndex(0);
      }
    } else {
      if (this.songReady) {
        this.playing = !this.playing;
        if (this.playing) {
          this.audioEl.play();
        } else {
          this.audioEl.pause();
        }
      }
    }
  }

  // 上一首
  onPrev(index: number) {
    if (!this.songReady) return;
    if (this.playList.length === 1) {
      this.loop();
    } else {
      const newIndex = index < 0 ? this.playList.length - 1 : index;
      this.updateIndex(newIndex);
    }
  }

  // 下一首
  onNext(index: number) {
    if (!this.songReady) return;
    if (this.playList.length === 1) {
      this.loop();
    } else {
      const newIndex = index >= this.playList.length ? 0 : index;
      this.updateIndex(newIndex);
    }
  }

  // 播放结束
  onEnded() {
    this.playing = false;
    if (this.currentMode.type === 'singleLoop') {
      this.loop();
    } else {
      this.onNext(this.currentIndex + 1);
    }
  }

  // 单曲循环
  private loop() {
    this.audioEl.currentTime = 0;
    this.play();
  }

  private updateIndex(index: number) {
    this.store$.dispatch(SetCurrentIndex({ currentIndex: index }));
    this.songReady = false;
  }

  onCanPlay() {
    this.songReady = true;
    this.play();
    this.playing = true;
  }

  onTimeUpdate(e: Event) {
    this.currentTime = Number(
      (<HTMLAudioElement>e.target).currentTime.toFixed(0)
    );
    this.percent = (this.currentTime / this.duration) * 100;
    const buffered = this.audioEl.buffered;
    if (buffered.length && this.bufferPercent < 100) {
      this.bufferPercent = (buffered.end(0) / this.duration) * 100;
    }
  }

  // 将毫秒值转换为 00:00 的形式
  formatTime(time: number) {
    let min: any = Math.floor(time / 60);
    let sec: any = time % 60;
    if (min < 10) {
      min = '0' + min;
    }
    if (sec < 10) {
      sec = '0' + sec;
    }
    return `${min}:${sec}`;
  }

  private play() {
    this.audioEl.play();
  }

  get picUrl(): string {
    return this.currentSong
      ? this.currentSong.al.picUrl
      : 'http://s4.music.126.net/style/web2/img/default/default_album.jpg';
  }

  // 改变模式
  changeMode() {
    this.store$.dispatch(
      SetPlayMode({ playMode: modeTypes[++this.modeCount % 3] })
    );
  }

  private updateCurrentIndex(list: Song[], song: Song) {
    const newIndex = list.findIndex((item) => item.id === song.id);
    this.store$.dispatch(SetCurrentIndex({ currentIndex: newIndex }));
  }

  onPercentChanges(per: number) {
    if (this.currentSong) {
      this.audioEl.currentTime = this.duration * (per / 100);
    }
  }

  // 控制音量
  onVolumeChange(per: number) {
    this.audioEl.volume = per / 100;
  }

  // 控制音量面板显隐
  toggleVolPanel(evt: MouseEvent) {
    // evt.stopPropagation();
    this.togglePanel();
  }
  // 控制音量面板显隐
  togglePanel() {
    this.showVolumePanel = !this.showVolumePanel;
    if (this.showVolumePanel) {
      this.bindDocumentClickListener();
    } else {
      this.unbindDocumentClickListener();
    }
  }

  private bindDocumentClickListener() {
    if (!this.winClick) {
      this.winClick = fromEvent(this.doc, 'click').subscribe(() => {
        if (!this.selfClick) {
          // 说明点击了播放器以外的部分
          this.showVolumePanel = false;
          this.unbindDocumentClickListener();
        }
        this.selfClick = false;
      });
    }
  }

  private unbindDocumentClickListener() {
    if (this.winClick) {
      this.winClick.unsubscribe();
      this.winClick = null;
    }
  }
}
