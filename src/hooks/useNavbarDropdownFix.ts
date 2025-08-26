// 改善语言切换下拉菜单的用户体验
import { useEffect } from 'react';

export function useNavbarDropdownFix() {
  useEffect(() => {
    let timeoutId = null;
    
    const handleDropdownInteraction = () => {
      // 获取所有的导航栏下拉菜单
      const dropdowns = document.querySelectorAll('.navbar__item.dropdown');
      
      dropdowns.forEach((dropdown) => {
        const dropdownElement = dropdown;
        const menu = dropdown.querySelector('.dropdown__menu');
        
        if (!menu) return;
        
        // 鼠标进入下拉菜单触发器
        const handleMouseEnter = () => {
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          
          // 立即显示菜单
          dropdownElement.classList.add('dropdown--hovering');
          menu.style.display = 'block';
          
          // 添加一个小延迟来确保平滑的动画
          requestAnimationFrame(() => {
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateY(0)';
          });
        };
        
        // 鼠标离开下拉菜单区域
        const handleMouseLeave = () => {
          // 设置延迟隐藏，给用户时间移动鼠标到菜单
          timeoutId = setTimeout(() => {
            dropdownElement.classList.remove('dropdown--hovering');
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateY(-10px)';
            
            // 在动画完成后隐藏元素
            setTimeout(() => {
              if (!dropdownElement.classList.contains('dropdown--hovering')) {
                menu.style.display = 'none';
              }
            }, 200);
          }, 300); // 300ms 延迟，给用户足够时间
        };
        
        // 鼠标进入菜单本身时保持显示
        const handleMenuEnter = () => {
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          dropdownElement.classList.add('dropdown--hovering');
        };
        
        // 鼠标离开菜单时开始隐藏倒计时
        const handleMenuLeave = () => {
          handleMouseLeave();
        };
        
        // 绑定事件
        dropdownElement.addEventListener('mouseenter', handleMouseEnter);
        dropdownElement.addEventListener('mouseleave', handleMouseLeave);
        
        if (menu) {
          menu.addEventListener('mouseenter', handleMenuEnter);
          menu.addEventListener('mouseleave', handleMenuLeave);
        }
        
        // 清理函数
        return () => {
          dropdownElement.removeEventListener('mouseenter', handleMouseEnter);
          dropdownElement.removeEventListener('mouseleave', handleMouseLeave);
          if (menu) {
            menu.removeEventListener('mouseenter', handleMenuEnter);
            menu.removeEventListener('mouseleave', handleMenuLeave);
          }
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        };
      });
    };
    
    // 等待 DOM 加载完成后执行
    const initializeDropdowns = () => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleDropdownInteraction);
      } else {
        handleDropdownInteraction();
      }
      
      // 监听路由变化，重新初始化
      const handleRouteChange = () => {
        setTimeout(handleDropdownInteraction, 100);
      };
      
      // 监听 popstate 事件（浏览器前进后退）
      window.addEventListener('popstate', handleRouteChange);
      
      // 监听 Docusaurus 的路由变化
      window.addEventListener('single-spa:routing-event', handleRouteChange);
      
      return () => {
        document.removeEventListener('DOMContentLoaded', handleDropdownInteraction);
        window.removeEventListener('popstate', handleRouteChange);
        window.removeEventListener('single-spa:routing-event', handleRouteChange);
      };
    };
    
    const cleanup = initializeDropdowns();
    
    return cleanup;
  }, []);
}

export default useNavbarDropdownFix;
