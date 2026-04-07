// src/config/versions.js

/**
 * 版本配置列表
 * 每个版本包含：
 * - name: 版本唯一标识 (用于路由)
 * - label: 下拉菜单显示的文字
 * - path: 该版本的根路径 (例如 './v1_1_0')
 * - sidebar: 侧边栏菜单项数组
 */
export const versions = [
  {
    name: 'v1',
    label: 'v1.1.0',
    path: '/version/v1_1_0',
    sidebar: [
      {
        type: 'category',
        label: '开始',
        icon: '🚀',
        items: [
          { type: 'doc', label: '介绍', icon: '📖', href: '/version/v1_1_0/intro' },
          { type: 'doc', label: '快速上手', icon: '⚡', href: '/version/common/test0' },
        ]
      },
      {
        type: 'category',
        label: '指南',
        icon: '📘',
        items: [
          { type: 'doc', label: '基础概念', icon: '🧠', href:'/version/common/test1' },
          { type: 'doc', label: '高级用法', icon: '🔥', href: '/version/common/test2' },
        ]
      },
      { type: 'doc', label: '常见问题', icon: '💡', href: '/version/common/test3' },
    ]
  },
  {
    name: 'v2',
    label: 'v2.0.0 (beta)',
    path: '/version/v1_1_1',
    sidebar: [
      {
        type: 'category',
        label: '新特性',
        icon: '✨',
        items: [
          { type: 'doc', label: '版本 2 新功能', icon: '🎉', href: '/version/v1_1_1/intro' },
          { type: 'doc', label: '迁移指南', icon: '🔄', href: '/version/common/test0' },
        ]
      },
      {
        type: 'category',
        label: '核心概念',
        icon: '⚛️',
        items: [
          { type: 'doc', label: '架构', icon: '🏗️', href: '/version/common/test1' },
          { type: 'doc', label: 'API 参考', icon: '🔌', href: '/version/common/test2' },
        ]
      },
      { type: 'doc', label: '常见问题', icon: '💡', href: '/version/common/test3' },
    ]
  }
];

// 获取当前版本（根据路径匹配）
export function getCurrentVersion(pathname) {
  return versions.find(v => pathname.startsWith(v.path)) || versions[0];
}