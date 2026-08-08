module.exports = {
  siteTitle: '冰麒麟的博客',
  srcDir: 'docs',
  outputDir: 'site',
  base: '/',
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
      defaultDescription: '冰麒麟的个人博客 - 技术探索、读书笔记、影视评论和生活感悟。',
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
    { title: '年度文章', path: '/年度文章', icon: 'pen-square' },
    { title: '乃我族人', path: '/乃我族人', icon: 'sitemap' },
    {
      title: '归档',
      icon: 'archive',
      collapsible: true,
      children: [
        { title: '奇技非淫巧', path: '/archive/奇技非淫巧', icon: 'code' },
        { title: '爆米花时间', path: '/archive/爆米花时间', icon: 'film' },
        { title: '非黄金屋', path: '/archive/非黄金屋', icon: 'book' },
        { title: '游戏时光', path: '/archive/游戏时光', icon: 'gamepad' },
        { title: '时光足迹', path: '/archive/时光足迹', icon: 'clock' },
        { title: '诗歌', path: '/archive/诗歌', icon: 'feather' },
        { title: '列传', path: '/archive/列传', icon: 'users' },
        { title: '少作', path: '/archive/少作', icon: 'archive' },
        { title: '废话连篇', path: '/archive/废话连篇', icon: 'comment' },
        { title: '考研刷题', path: '/archive/考研刷题', icon: 'pencil-alt' },
        { title: '学习资料', path: '/archive/学习资料', icon: 'graduation-cap' },
      ],
    },
  ],
  footer: '© ' + new Date().getFullYear() + ' 冰麒麟 · 苟日新，日日新，又日新 · 由 [docmd](https://github.com/docmd-io/docmd) 强力驱动',
  sponsor: {
    enabled: false,
  },
};