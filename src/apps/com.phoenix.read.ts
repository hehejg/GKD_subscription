import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.phoenix.read',
  name: '红果免费短剧',
  groups: [
    {
      key: 1,
      name: '全屏广告-短剧播放中-等待倒计时后上滑继续',
      desc: '广告倒计时结束后自动上滑切换至下一集',
      enable: true,
      fastQuery: true,
      activityIds: [
        'com.dragon.read.component.shortvideo.impl.ShortSeriesActivity',
        'com.dragon.read.component.shortvideo.',
      ],
      rules: [
        {
          key: 0,
          actionCd: 2000,
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
      ],
    },
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
  ],
});
