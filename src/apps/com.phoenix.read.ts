import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.phoenix.read',
  name: '红果免费短剧',
  groups: [
    {
      key: 0,
      name: '开屏广告',
      enable: true,
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          matches: '[text*="跳过"][text.length<10][visibleToUser=true]',
        },
      ],
    },
    {
      key: 1,
      name: '全屏广告-短剧播放中-等待倒计时后上滑继续',
      desc: '广告倒计时结束后自动上滑切换至下一集',
      enable: true,
      fastQuery: true,
      activityIds: [
        'com.dragon.read.component.shortvideo.impl.ShortSeriesActivity',
        'com.dragon.read.component.shortvideo.impl.fullscreen.ShortSeriesLandActivity',
        'com.dragon.read.component.shortvideo.',
      ],
      rules: [
        {
          key: 0,
          name: '竖屏短剧播放中广告',
          actionCd: 2000,
          activityIds: [
            'com.dragon.read.component.shortvideo.impl.ShortSeriesActivity',
            'com.dragon.read.component.shortvideo.',
          ],
          matches:
            '[vid="apl" || text*="继续观看短剧" || text*="上滑观看"][text*="上滑"][text!*="秒"][visibleToUser=true]',
          swipeArg: {
            start: {
              x: 'screenWidth / 2',
              y: 'screenHeight * 0.7',
            },
            end: {
              x: 'screenWidth / 2',
              y: 'screenHeight * 0.2',
            },
            duration: 300,
          },
          snapshotUrls: ['https://i.gkd.li/i/1794815491540'],
        },
        {
          key: 1,
          name: '横屏短剧播放中广告',
          actionCd: 2000,
          activityIds: [
            'com.dragon.read.component.shortvideo.impl.fullscreen.ShortSeriesLandActivity',
            'com.dragon.read.component.shortvideo.',
          ],
          matches: [
            '@ViewGroup[childCount=0] - ViewGroup > [desc="广告"][visibleToUser=true]',
            '[text*="继续观看" || text*="上滑观看" || text*="上滑继续"][text!*="秒"][visibleToUser=true]',
          ],
          swipeArg: {
            start: {
              x: 'screenWidth / 2',
              y: 'screenHeight * 0.55',
            },
            end: {
              x: 'screenWidth / 2',
              y: 'screenHeight * 0.15',
            },
            duration: 300,
          },
          snapshotUrls: ['https://i.gkd.li/i/1794828027052'],
        },
      ],
    },
    {
      key: 2,
      name: '全屏广告-短剧播放中-关闭弹窗广告',
      desc: '短剧播放过程中出现的悬浮插屏/弹窗广告，自动点击右上角关闭按钮',
      enable: true,
      fastQuery: true,
      activityIds: [
        'com.dragon.read.component.shortvideo.impl.fullscreen.ShortSeriesLandActivity',
        'com.dragon.read.component.shortvideo.impl.ShortSeriesActivity',
        'com.dragon.read.component.shortvideo.',
      ],
      rules: [
        {
          key: 0,
          name: '横屏短剧悬浮插屏广告',
          action: 'clickCenter',
          matches:
            '[vid="ax2" || vid="g7l"] >n @ViewGroup[childCount=2][width<100][height<100]',
          snapshotUrls: ['https://i.gkd.li/i/1794828096863'],
        },
      ],
    },
  ],
});
