// 图片按需加载是个老生常谈的话题，传统做法自然是通过监听页面滚动位置，符合条件了再去进行资源加载，我们看看如今还有什么方法可以做到按需加载。

// 使用强大的IntersectionObserver

// IntersectionObserver提供给我们一项能力：可以用来监听元素是否进入了设备的可视区域之内，这意味着：我们等待图片元素进入可视区域后，再决定是否加载它，毕竟用户没看到图片前，根本不关心它是否已经加载了。
// 这是Chrome51率先提出和支持的API，而在2019年的今天，各大浏览器对它的支持度已经有所改善(除了IE，全线崩~)：


// 废话不多说，上代码：
// 首先，假设我们有一个图片列表，它们的src属性我们暂不设置，而用data-src来替代：

<li>
  <img class="list-item-img" alt="loading" data-src='a.jpg'/>
</li>
<li>
  <img class="list-item-img" alt="loading" data-src='b.jpg'/>
</li>
<li>
  <img class="list-item-img" alt="loading" data-src='c.jpg'/>
</li>
<li>
  <img class="list-item-img" alt="loading" data-src='d.jpg'/>
</li>
// 这样会导致图片无法加载，这当然不是我们的目的，我们想做的是，当IntersectionObserver监听到图片元素进入可视区域时，将data-src”还给”src属性，这样我们就可以实现图片加载了:

const observer = new IntersectionObserver(function(changes) {
  changes.forEach(function(element, index) {
   // 当这个值大于0，说明满足我们的加载条件了，这个值可通过rootMargin手动设置
    if (element.intersectionRatio > 0) {
      // 放弃监听，防止性能浪费，并加载图片。
      observer.unobserve(element.target);
      element.target.src = element.target.dataset.src;
    }
  });
});
function initObserver() {
  const listItems = document.querySelectorAll('.list-item-img');
  listItems.forEach(function(item) {
   // 对每个list元素进行监听
    observer.observe(item);
  });
}
initObserver();