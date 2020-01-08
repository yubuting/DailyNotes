关于Mac环境下Failed to load resource:net::ERR_CONTENT_LENGTH_MSMATCH错误的解决
1.错误详情
使用nginx做了反向代理，之前是可以访问的，没有任何问题，后来刷新几次就不行了，使用的Chrome浏览器，查看错误：



换了一个浏览器Safari，访问时可以成功的，好奇怪！

2.原因分析
在网上查了一些资料，找到了原因：

​ nginx会缓存大文件到proxy_temp目录中，然而对这个目录没有读写权限，nginx 的工作进程对大文件做了缓存，这个缓存在 %nginx%/proxy_temp 目录下，主进程在读取缓存的时候由于权限问题而无法访问。

我猜测的直接原因：

​ 应该是清理了一次浏览器缓存造成的，在未清理浏览器缓存的时候，nginx只是提供部分内容，所以未产生大文件缓存，当你清除浏览器缓存的时候，nginx就会提供所有的内容，因此将产生缓存。

3.解决方法
​ 知道原因就比较好解决了，因为proxy_temp目录没有权限，那就给他权限呗。

sudo nginx -s stop      #停止nginx服务
sudo chmod -R 777 /usr/local/var/run/nginx/*            #给权限
sudo nginx            #启动nginx