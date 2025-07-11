# 全局图片功能说明

## 概述

本项目已实现全局图片点击放大和水印功能，无需在每个 markdown 文件中单独引入 `ZoomableImage` 组件。

## 功能特性

### 1. 自动水印
- 所有图片自动添加水印
- 支持明暗主题适配
- 水印包含版权信息和品牌标识

### 2. 点击放大
- 点击任意图片可放大查看
- 支持 ESC 键关闭
- 点击背景区域关闭
- 响应式设计，适配移动端

### 3. 全局生效
- 自动处理所有 markdown 文件中的图片
- 支持动态加载的图片
- 无需手动引入组件

## 实现位置

功能实现在 `src/theme/Root/index.js` 文件中：

```javascript
// 全局图片点击放大功能
useEffect(() => {
  // 为所有图片添加点击事件和水印
  const addImageClickHandlers = () => {
    const images = document.querySelectorAll('img:not(.global-image-modal-content img)');
    
    images.forEach(img => {
      // 直接为图片添加水印类名，避免DOM操作
      if (!img.classList.contains('watermarked-image')) {
        img.classList.add('watermarked-image');
      }
      
      // 添加点击事件
      img.addEventListener('click', (e) => {
        // 创建模态框显示放大图片
      });
    });
  };
}, []);
```

## 使用方法

### 在 Markdown 文件中

直接使用普通的 `img` 标签即可：

```markdown
import myImage from '/img/example.png';

<img src={myImage} alt="示例图片" />
```

或者使用静态路径：

```markdown
<img src="/img/example.png" alt="示例图片" />
```

### 样式自定义

如需自定义图片样式，可以添加 `style` 属性：

```markdown
<img src={myImage} alt="示例图片" style={{ width: '300px' }} />
```

## 样式文件

水印样式定义在 `src/css/watermark.css` 中：

```css
.watermarked-image {
  position: relative;
  display: inline-block;
  max-width: 100%;
  margin: 1rem 0;
  transition: opacity 0.3s;
}

.watermarked-image:hover {
  opacity: 0.9;
  cursor: zoom-in;
}

.watermarked-image::after {
  content: "© www.weiyuai.cn";
  /* 版权信息样式 */
}

.watermarked-image::before {
  content: "微语智能客服";
  /* 品牌水印样式 */
}
```

## 优势

1. **简化开发**：无需在每个文件中引入组件
2. **统一体验**：所有图片具有一致的水印和放大功能
3. **自动处理**：新添加的图片自动获得功能
4. **性能优化**：减少重复的组件引入
5. **维护便利**：功能集中管理，便于维护和更新
6. **安全可靠**：避免直接DOM操作，减少与React的冲突

## 注意事项

1. 图片会自动添加水印，无法单独禁用
2. 所有图片都支持点击放大
3. 水印样式会根据主题自动适配
4. 功能对性能影响很小，已优化处理

## 迁移说明

如果之前使用了 `ZoomableImage` 组件，可以：

1. 移除 `import ZoomableImage` 语句
2. 移除 `import '@site/src/css/watermark.css'` 语句
3. 将 `<ZoomableImage>` 替换为 `<img>`
4. 保持其他属性不变

功能会自动生效，无需其他配置。 