// 强力修复语言切换下拉菜单的用户体验
import { useEffect } from 'react';

export function useNavbarDropdownFix() {
  useEffect(() => {
    let timeouts = new Map(); // 使用Map来管理多个timeout
    
    const handleDropdownInteraction = () => {
      // 获取所有的导航栏下拉菜单
      const dropdowns = document.querySelectorAll('.navbar__item.dropdown');
      
      dropdowns.forEach((dropdown, index) => {
        const dropdownElement = dropdown;
        const menu = dropdown.querySelector('.dropdown__menu');
        const triggerLink = dropdown.querySelector('.navbar__link');
        
        if (!menu || !triggerLink) return;
        
        const dropdownId = `dropdown-${index}`;
        
        // 清理旧的事件监听器
        const oldHandlers = dropdownElement._dropdownHandlers;
        if (oldHandlers) {
          dropdownElement.removeEventListener('mouseenter', oldHandlers.enter);
          dropdownElement.removeEventListener('mouseleave', oldHandlers.leave);
          menu.removeEventListener('mouseenter', oldHandlers.menuEnter);
          menu.removeEventListener('mouseleave', oldHandlers.menuLeave);
        }
        
        // 强制显示菜单
        const forceShow = () => {
          if (timeouts.has(dropdownId)) {
            clearTimeout(timeouts.get(dropdownId));
            timeouts.delete(dropdownId);
          }
          
          dropdownElement.classList.add('dropdown-force-show');
          dropdownElement.classList.add('navbar-dropdown-enhanced');
          dropdownElement.classList.add('force-visible');
          dropdownElement.classList.add('dropdown-enhanced-visible');
          
          menu.style.display = 'block';
          menu.style.opacity = '1';
          menu.style.visibility = 'visible';
          menu.style.transform = 'translateY(0)';
          menu.style.pointerEvents = 'auto';
          
          console.log('Dropdown forced visible:', dropdownId);
        };
        
        // 延迟隐藏菜单
        const delayedHide = (delay = 500) => {
          const timeoutId = setTimeout(() => {
            if (!dropdownElement.matches(':hover') && !menu.matches(':hover')) {
              dropdownElement.classList.remove('dropdown-force-show');
              dropdownElement.classList.remove('navbar-dropdown-enhanced');
              dropdownElement.classList.remove('force-visible');
              dropdownElement.classList.remove('dropdown-enhanced-visible');
              
              menu.style.opacity = '0';
              menu.style.visibility = 'hidden';
              menu.style.transform = 'translateY(-10px)';
              
              setTimeout(() => {
                if (!dropdownElement.classList.contains('dropdown-force-show')) {
                  menu.style.display = 'none';
                  menu.style.pointerEvents = 'none';
                }
              }, 200);
              
              console.log('Dropdown hidden:', dropdownId);
            }
            timeouts.delete(dropdownId);
          }, delay);
          
          timeouts.set(dropdownId, timeoutId);
        };
        
        // 鼠标进入下拉菜单触发器
        const handleMouseEnter = (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Mouse enter dropdown:', dropdownId);
          forceShow();
        };
        
        // 鼠标离开下拉菜单触发器
        const handleMouseLeave = (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Mouse leave dropdown:', dropdownId);
          delayedHide(300);
        };
        
        // 鼠标进入菜单本身
        const handleMenuEnter = (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Mouse enter menu:', dropdownId);
          forceShow();
        };
        
        // 鼠标离开菜单
        const handleMenuLeave = (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Mouse leave menu:', dropdownId);
          delayedHide(300);
        };
        
        // 点击触发器时的处理
        const handleTriggerClick = (e) => {
          if (window.innerWidth <= 996) {
            // 移动端使用默认行为
            return;
          }
          
          e.preventDefault();
          e.stopPropagation();
          
          if (dropdownElement.classList.contains('dropdown-force-show')) {
            // 如果已经显示，则隐藏
            dropdownElement.classList.remove('dropdown-force-show');
            delayedHide(0);
          } else {
            // 如果隐藏，则显示
            forceShow();
          }
        };
        
        // 绑定事件
        dropdownElement.addEventListener('mouseenter', handleMouseEnter, { passive: false });
        dropdownElement.addEventListener('mouseleave', handleMouseLeave, { passive: false });
        triggerLink.addEventListener('click', handleTriggerClick, { passive: false });
        
        if (menu) {
          menu.addEventListener('mouseenter', handleMenuEnter, { passive: false });
          menu.addEventListener('mouseleave', handleMenuLeave, { passive: false });
        }
        
        // 存储处理器引用以便清理
        dropdownElement._dropdownHandlers = {
          enter: handleMouseEnter,
          leave: handleMouseLeave,
          menuEnter: handleMenuEnter,
          menuLeave: handleMenuLeave,
          click: handleTriggerClick
        };
        
        // 初始状态
        menu.style.display = 'none';
        menu.style.pointerEvents = 'none';
      });
    };
    
    // 全局点击处理 - 点击外部时关闭所有下拉菜单
    const handleGlobalClick = (e) => {
      const dropdowns = document.querySelectorAll('.navbar__item.dropdown.dropdown-force-show');
      dropdowns.forEach((dropdown) => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('dropdown-force-show');
          dropdown.classList.remove('navbar-dropdown-enhanced');
          dropdown.classList.remove('force-visible');
          dropdown.classList.remove('dropdown-enhanced-visible');
          
          const menu = dropdown.querySelector('.dropdown__menu');
          if (menu) {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateY(-10px)';
            setTimeout(() => {
              menu.style.display = 'none';
              menu.style.pointerEvents = 'none';
            }, 200);
          }
        }
      });
    };
    
    // 初始化函数
    const initialize = () => {
      console.log('Initializing navbar dropdown fix...');
      
      // 等待DOM完全加载
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleDropdownInteraction);
      } else {
        handleDropdownInteraction();
      }
      
      // 绑定全局事件
      document.addEventListener('click', handleGlobalClick, true);
      
      // 监听路由变化
      const handleRouteChange = () => {
        setTimeout(() => {
          console.log('Route changed, reinitializing...');
          handleDropdownInteraction();
        }, 100);
      };
      
      window.addEventListener('popstate', handleRouteChange);
      window.addEventListener('pushstate', handleRouteChange);
      window.addEventListener('replacestate', handleRouteChange);
      
      // 监听历史API
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;
      
      history.pushState = function(...args) {
        originalPushState.apply(history, args);
        handleRouteChange();
      };
      
      history.replaceState = function(...args) {
        originalReplaceState.apply(history, args);
        handleRouteChange();
      };
      
      // 清理函数
      return () => {
        document.removeEventListener('DOMContentLoaded', handleDropdownInteraction);
        document.removeEventListener('click', handleGlobalClick, true);
        window.removeEventListener('popstate', handleRouteChange);
        window.removeEventListener('pushstate', handleRouteChange);
        window.removeEventListener('replacestate', handleRouteChange);
        
        // 恢复原始方法
        history.pushState = originalPushState;
        history.replaceState = originalReplaceState;
        
        // 清理所有timeout
        timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
        timeouts.clear();
        
        // 清理所有事件监听器
        const dropdowns = document.querySelectorAll('.navbar__item.dropdown');
        dropdowns.forEach((dropdown) => {
          const handlers = dropdown._dropdownHandlers;
          if (handlers) {
            dropdown.removeEventListener('mouseenter', handlers.enter);
            dropdown.removeEventListener('mouseleave', handlers.leave);
            const menu = dropdown.querySelector('.dropdown__menu');
            const triggerLink = dropdown.querySelector('.navbar__link');
            if (menu) {
              menu.removeEventListener('mouseenter', handlers.menuEnter);
              menu.removeEventListener('mouseleave', handlers.menuLeave);
            }
            if (triggerLink) {
              triggerLink.removeEventListener('click', handlers.click);
            }
            delete dropdown._dropdownHandlers;
          }
        });
      };
    };
    
    const cleanup = initialize();
    
    return cleanup;
  }, []);
}

export default useNavbarDropdownFix;
