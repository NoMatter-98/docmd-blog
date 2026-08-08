module.exports = {
  siteTitle: '商子羽的博客',
  srcDir: 'docs',
  outputDir: 'site',
  base: '/docmd-blog/',
  search: true,
  sidebar: {
    collapsible: true,
    defaultCollapsed: false,
  },
  theme: {
    name: 'default',
    defaultMode: 'light',
    enableModeToggle: true,
    positionMode: 'top',
    customCss: [
      '/assets/css/custom-styles.css',
    ],
  },
  autoTitleFromH1: true,
  copyCode: true,
  plugins: {
    seo: {
      defaultDescription: '商子羽的个人博客 - 技术探索、读书笔记、影视评论和生活感悟。每个人都有权决定科技将怎样改变生活。',
      openGraph: {
        defaultImage: '/assets/images/og-default.png',
      },
    },
    sitemap: {
      defaultChangefreq: 'weekly',
      defaultPriority: 0.8,
    },
  },
  navigation: [
    { title: '首页', path: '/', icon: 'home' },
    { title: '奇技非淫巧', path: '/奇技非淫巧', icon: 'code' },
    { title: '爆米花时间', path: '/爆米花时间', icon: 'film' },
    { title: '非黄金屋', path: '/非黄金屋', icon: 'book' },
    { title: '游戏时光', path: '/游戏时光', icon: 'gamepad' },
    { title: '一年几篇', path: '/一年几篇', icon: 'pen-square' },
    { title: '乃我族人', path: '/乃我族人', icon: 'sitemap' },
    { title: '时光足迹', path: '/时光足迹', icon: 'clock' },
    { title: '诗歌', path: '/诗歌', icon: 'feather' },
    { title: '列传', path: '/列传', icon: 'users' },
    { title: '少作', path: '/少作', icon: 'archive' },
    {
      title: '归档',
      icon: 'archive',
      collapsible: true,
      children: [
        { title: '废话连篇', path: '/archive/废话连篇', icon: 'comment' },
        { title: '考研刷题', path: '/archive/考研刷题', icon: 'pencil-alt' },
        { title: '学习资料', path: '/archive/学习资料', icon: 'graduation-cap' },
      ],
    },
  ],
  footer: '© ' + new Date().getFullYear() + ' 商子羽 · 每个人都有权决定科技将怎样改变生活 · 由 [docmd](https://github.com/docmd-io/docmd) 强力驱动',
  sponsor: {
    enabled: false,
  },
};