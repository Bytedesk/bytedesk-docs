// 超强力下拉菜单修复 - 完全接管控制
import { useEffect } from 'react';

export function useUltimateDropdownFix() {
  useEffect(() => {
    let isInitialized = false;
    let observers = [];
    let timeouts = new Map();
    
    const forceShowDropdown = (dropdown) => {
      const menu = dropdown.querySelector('.dropdown__menu');
      if (!menu) return;
      
      dropdown.classList.add('force-show');
      dropdown.classList.add('dropdown-enhanced');
      
      // 强制设置样式
      menu.style.cssText = `
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
        transform: translateY(0) !important;
        position: absolute !important;
        top: 100% !important;
        z-index: 999999 !important;
        background: var(--ifm-navbar-background-color) !important;
        border: 1px solid var(--ifm-color-emphasis-300) !important;
        border-radius: 6px !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
        min-width: 150px !important;
        padding: 8px 0 !important;
        margin-top: 4px !important;
        pointer-events: auto !important;
      `;
      
      // 如果是右侧导航，调整位置
      if (dropdown.closest('.navbar__items--right')) {
        menu.style.left = 'auto !important';
        menu.style.right = '0 !important';
      }
      
      console.log('Dropdown force shown');
    };
    
    const hideDropdown = (dropdown, immediate = false) => {
      const menu = dropdown.querySelector('.dropdown__menu');
      if (!menu) return;
      
      const doHide = () => {
        dropdown.classList.remove('force-show');
        dropdown.classList.remove('dropdown-enhanced');
        
        menu.style.cssText = `
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          transform: translateY(-10px) !important;
          pointer-events: none !important;
        `;
        
        console.log('Dropdown hidden');
      };
      
      if (immediate) {
        doHide();
      } else {
        setTimeout(doHide, 150);
      }
    };
    
    const setupDropdown = (dropdown) => {
      const menu = dropdown.querySelector('.dropdown__menu');
      const trigger = dropdown.querySelector('.navbar__link');
      
      if (!menu || !trigger) return;
      
      const dropdownId = `dropdown-${Math.random().toString(36).substr(2, 9)}`;
      
      // 初始隐藏
      hideDropdown(dropdown, true);
      
      let isHovering = false;
      let isMenuHovering = false;
      
      const scheduleHide = () => {
        if (timeouts.has(dropdownId)) {
          clearTimeout(timeouts.get(dropdownId));
        }
        
        const timeoutId = setTimeout(() => {
          if (!isHovering && !isMenuHovering) {
            hideDropdown(dropdown);
          }
          timeouts.delete(dropdownId);
        }, 300);
        
        timeouts.set(dropdownId, timeoutId);
      };
      
      const cancelHide = () => {
        if (timeouts.has(dropdownId)) {
          clearTimeout(timeouts.get(dropdownId));
          timeouts.delete(dropdownId);
        }
      };
      
      // 触发器事件
      const handleTriggerEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        isHovering = true;
        cancelHide();
        forceShowDropdown(dropdown);
        console.log('Trigger enter');
      };
      
      const handleTriggerLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        isHovering = false;
        scheduleHide();
        console.log('Trigger leave');
      };
      
      const handleTriggerClick = (e) => {
        if (window.innerWidth <= 996) return; // 移动端使用默认行为
        
        e.preventDefault();
        e.stopPropagation();
        
        if (dropdown.classList.contains('force-show')) {
          isHovering = false;
          hideDropdown(dropdown, true);
        } else {
          isHovering = true;
          forceShowDropdown(dropdown);
        }
        console.log('Trigger clicked');
      };
      
      // 菜单事件
      const handleMenuEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        isMenuHovering = true;
        cancelHide();
        console.log('Menu enter');
      };
      
      const handleMenuLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        isMenuHovering = false;
        scheduleHide();
        console.log('Menu leave');
      };
      
      // 绑定事件
      trigger.addEventListener('mouseenter', handleTriggerEnter, { passive: false });
      trigger.addEventListener('mouseleave', handleTriggerLeave, { passive: false });
      trigger.addEventListener('click', handleTriggerClick, { passive: false });
      
      menu.addEventListener('mouseenter', handleMenuEnter, { passive: false });
      menu.addEventListener('mouseleave', handleMenuLeave, { passive: false });
      
      // 为下拉菜单项添加点击事件
      const menuLinks = menu.querySelectorAll('.dropdown__link');
      menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          isHovering = false;
          isMenuHovering = false;
          hideDropdown(dropdown, true);
        });
      });
      
      // 存储清理函数
      dropdown._ultimateCleanup = () => {
        trigger.removeEventListener('mouseenter', handleTriggerEnter);
        trigger.removeEventListener('mouseleave', handleTriggerLeave);
        trigger.removeEventListener('click', handleTriggerClick);
        menu.removeEventListener('mouseenter', handleMenuEnter);
        menu.removeEventListener('mouseleave', handleMenuLeave);
        
        menuLinks.forEach(link => {
          link.removeEventListener('click', hideDropdown);
        });
        
        if (timeouts.has(dropdownId)) {
          clearTimeout(timeouts.get(dropdownId));
          timeouts.delete(dropdownId);
        }
      };
    };
    
    const initializeAllDropdowns = () => {
      if (isInitialized) return;
      
      console.log('Initializing ultimate dropdown fix...');
      
      const dropdowns = document.querySelectorAll('.navbar__item.dropdown');
      dropdowns.forEach(setupDropdown);
      
      // 全局点击关闭
      const handleGlobalClick = (e) => {
        const dropdowns = document.querySelectorAll('.navbar__item.dropdown.force-show');
        dropdowns.forEach(dropdown => {
          if (!dropdown.contains(e.target)) {
            hideDropdown(dropdown, true);
          }
        });
      };
      
      document.addEventListener('click', handleGlobalClick, { capture: true, passive: false });
      
      // 监听DOM变化
      const observer = new MutationObserver((mutations) => {
        let needsReinit = false;
        mutations.forEach(mutation => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
              if (node.nodeType === 1 && (
                node.classList?.contains('navbar__item') ||
                node.querySelector?.('.navbar__item.dropdown')
              )) {
                needsReinit = true;
              }
            });
          }
        });
        
        if (needsReinit) {
          setTimeout(() => {
            const newDropdowns = document.querySelectorAll('.navbar__item.dropdown:not([data-ultimate-enhanced])');
            newDropdowns.forEach(dropdown => {
              dropdown.setAttribute('data-ultimate-enhanced', 'true');
              setupDropdown(dropdown);
            });
          }, 100);
        }
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      observers.push(observer);
      
      // 标记已初始化
      isInitialized = true;
      
      // 返回清理函数
      return () => {
        document.removeEventListener('click', handleGlobalClick, { capture: true });
        
        observers.forEach(obs => obs.disconnect());
        observers = [];
        
        const dropdowns = document.querySelectorAll('.navbar__item.dropdown');
        dropdowns.forEach(dropdown => {
          if (dropdown._ultimateCleanup) {
            dropdown._ultimateCleanup();
            delete dropdown._ultimateCleanup;
          }
        });
        
        timeouts.forEach(timeoutId => clearTimeout(timeoutId));
        timeouts.clear();
        
        isInitialized = false;
      };
    };
    
    // 等待DOM准备
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeAllDropdowns);
    } else {
      setTimeout(initializeAllDropdowns, 50);
    }
    
    // 路由变化监听
    const handleRouteChange = () => {
      setTimeout(() => {
        if (!isInitialized) {
          initializeAllDropdowns();
        }
      }, 100);
    };
    
    window.addEventListener('popstate', handleRouteChange);
    
    // 清理函数
    return () => {
      document.removeEventListener('DOMContentLoaded', initializeAllDropdowns);
      window.removeEventListener('popstate', handleRouteChange);
      
      if (isInitialized) {
        observers.forEach(obs => obs.disconnect());
        
        const dropdowns = document.querySelectorAll('.navbar__item.dropdown');
        dropdowns.forEach(dropdown => {
          if (dropdown._ultimateCleanup) {
            dropdown._ultimateCleanup();
            delete dropdown._ultimateCleanup;
          }
        });
        
        timeouts.forEach(timeoutId => clearTimeout(timeoutId));
        timeouts.clear();
      }
    };
  }, []);
}

export default useUltimateDropdownFix;
