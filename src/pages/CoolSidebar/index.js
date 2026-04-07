// src/components/CoolSidebar/index.jsx
import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { useLocation, useHistory } from '@docusaurus/router';
import { versions, getCurrentVersion } from '@site/src/config/versions.config';
import './CoolSidebar.css';

const CoolSidebar = ({ 
  logo = { icon: '✨', text: 'DocsHub' },
  bottomContent = null,
  onToggleCollapse = null 
}) => {
  const location = useLocation();
  const history = useHistory();
  const currentPath = location.pathname;
  
  // 根据当前路径确定当前版本
  const [currentVersion, setCurrentVersion] = useState(() => getCurrentVersion(currentPath));
  
  // 当路径变化时，更新当前版本
  useEffect(() => {
    const newVersion = getCurrentVersion(currentPath);
    if (newVersion.name !== currentVersion.name) {
      setCurrentVersion(newVersion);
    }
  }, [currentPath]);
  
  // 当前版本的侧边栏配置
  const sidebarItems = currentVersion?.sidebar || [];
  
  // 折叠状态（同之前）
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cool-sidebar-collapsed');
      return saved === 'true';
    }
    return false;
  });
  
  // 移动端侧边栏可见性
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // 分类展开状态
  const [openCategories, setOpenCategories] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('cool-sidebar-categories') : null;
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch(e) { return {}; }
    }
    const init = {};
    const traverse = (list) => {
      list.forEach(item => {
        if (item.type === 'category') {
          init[item.label] = true;
          if (item.items) traverse(item.items);
        }
      });
    };
    traverse(sidebarItems);
    return init;
  });

  // 当 sidebarItems 变化时（版本切换），重新初始化展开状态
  useEffect(() => {
    const init = {};
    const traverse = (list) => {
      list.forEach(item => {
        if (item.type === 'category') {
          init[item.label] = true;
          if (item.items) traverse(item.items);
        }
      });
    };
    traverse(sidebarItems);
    setOpenCategories(prev => ({ ...prev, ...init }));
  }, [sidebarItems]);

  // 保存分类状态
  useEffect(() => {
    localStorage.setItem('cool-sidebar-categories', JSON.stringify(openCategories));
  }, [openCategories]);

  // 保存折叠状态
  useEffect(() => {
    localStorage.setItem('cool-sidebar-collapsed', isCollapsed);
    if (onToggleCollapse) onToggleCollapse(isCollapsed);
  }, [isCollapsed, onToggleCollapse]);

  // 切换分类
  const toggleCategory = (label, e) => {
    e.stopPropagation();
    if (isCollapsed) {
      setIsCollapsed(false);
      return;
    }
    setOpenCategories(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  // 版本切换处理
  const handleVersionChange = (e) => {
    const selectedVersionName = e.target.value;
    const targetVersion = versions.find(v => v.name === selectedVersionName);
    if (!targetVersion || targetVersion.name === currentVersion.name) return;
    
    // 智能跳转：尝试将当前路径中的版本前缀替换为新版本前缀
    const newPath = currentPath.replace(currentVersion.path, targetVersion.path);
    // 如果替换后路径相同（比如在根路径），则跳转到新版本首页
    const finalPath = newPath === currentPath ? targetVersion.path : newPath;
    history.push(finalPath);
  };

  // 关闭移动端菜单
  const closeMobile = () => setMobileOpen(false);
  
  // 判断当前链接是否激活
  const isActiveLink = (href) => {
    if (!href) return false;
    return currentPath === href || (href !== '/' && currentPath.startsWith(href));
  };

  // 渲染单个导航项（递归）
  const renderNavItem = (item, depth = 0) => {
    if (item.type === 'category') {
      const isOpen = openCategories[item.label];
      const Icon = item.icon || '📁';
      return (
        <div key={item.label} className="nav-category-wrapper" style={{ '--depth': depth }}>
          <div 
            className={`category-header ${isCollapsed ? 'collapsed-mode' : ''}`}
            onClick={(e) => toggleCategory(item.label, e)}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            data-tooltip={isCollapsed ? item.label : ''}
          >
            <span className="category-icon">{Icon}</span>
            {!isCollapsed && <span className="category-label">{item.label}</span>}
            {!isCollapsed && (
              <span className="category-chevron">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points={isOpen ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
                </svg>
              </span>
            )}
          </div>
          {!isCollapsed && isOpen && item.items && (
            <div className="sub-items">
              {item.items.map(sub => renderNavItem(sub, depth + 1))}
            </div>
          )}
        </div>
      );
    }
    
    // 普通文档链接
    const Icon = item.icon || '📄';
    const href = item.href;
    const isActive = isActiveLink(href);
    
    return (
      <Link
        key={item.label}
        to={href}
        className={`nav-item ${isActive ? 'active' : ''} ${isCollapsed ? 'collapsed-mode' : ''}`}
        onClick={() => {
          if (window.innerWidth <= 768) closeMobile();
        }}
        style={{ '--depth': depth }}
        data-tooltip={isCollapsed ? item.label : ''}
      >
        <span className="nav-icon">{Icon}</span>
        {!isCollapsed && <span className="nav-label">{item.label}</span>}
        {isActive && !isCollapsed && <span className="active-dot" />}
      </Link>
    );
  };

  // 侧边栏类名
  const sidebarClass = `cool-sidebar ${isCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`;
  
  return (
    <>
      {/* 移动端遮罩层 */}
      {mobileOpen && <div className="sidebar-mask" onClick={closeMobile} />}
      
      {/* 移动端汉堡菜单按钮 */}
      <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)} aria-label="打开菜单">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      
      <aside className={sidebarClass}>
        {/* 侧边栏头部 */}
        <div className="sidebar-header">
          <div className="logo-area">
            <span className="logo-icon">{logo.icon}</span>
            {!isCollapsed && <span className="logo-text">{logo.text}</span>}
          </div>
          {/* 版本下拉菜单 */}
          {!isCollapsed && versions.length > 0 && (
            <select 
              className="version-selector" 
              value={currentVersion.name} 
              onChange={handleVersionChange}
              aria-label="切换版本"
            >
              {versions.map(v => (
                <option key={v.name} value={v.name}>
                  {v.label}
                </option>
              ))}
            </select>
          )}
          {/* 折叠/展开按钮 */}
          <button 
            className="collapse-btn" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? '展开侧边栏' : '收起侧边栏'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isCollapsed ? (
                <polyline points="13 17 18 12 13 7" />
              ) : (
                <polyline points="11 17 6 12 11 7" />
              )}
            </svg>
          </button>
        </div>
        
        {/* 导航菜单列表 */}
        <nav className="nav-menu">
          {sidebarItems.map(item => renderNavItem(item))}
        </nav>
        
        {/* 底部自定义区域 */}
        {bottomContent && !isCollapsed && (
          <div className="sidebar-footer">
            {bottomContent}
          </div>
        )}
      </aside>
    </>
  );
};

export default CoolSidebar;