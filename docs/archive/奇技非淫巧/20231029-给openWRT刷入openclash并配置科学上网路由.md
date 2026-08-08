再首先是要能够ssh连上路由，因为路由还是不能连接校网，软件包还是电脑下载好以后ssh给openWRT得好

1. 我用powershell没成功，可能是没有设置ssh登录。（尝试了，可以成功，但是ssh root@192.168.1.1命令要加上root@才行）：

![image-20231029201825526](./assets/image-20231029201825526.png)

2.不知道为什么interface要设置成Lan而不是Wlan（Wlan试了，不能成功，奇了怪了。）——哦应该是说要给通过局域网（LAN口）接入的设备（也就是我的电脑）来访问，所以是设置LAN口聆听ssh请求的意思。



基本思路是——要连接校网需要L2TP协议来拨号上网，要使用L2TP协议可能需要安装xlttpd软件包，要安装这个包需要先下载这个包，就得先让路由WAN口先连电脑，电脑先连接其他可以上网的路由（或者我猜可以使用ssh上传软件包，再或者路由本身不止WAN上网，或许它也可以连接热点上网）

这个折腾点的方案是很多人的选择：https://kb5000.github.io/2020/11/21/OpenWrt%E8%BF%9E%E6%8E%A5%E6%A0%A1%E5%9B%AD%E7%BD%91L2TP%E7%8E%AF%E5%A2%83%E7%BD%91%E7%BB%9C%E9%85%8D%E7%BD%AE%E8%AF%A6%E8%A7%A3/

但是看github上好像lede包里面已经有xl2tpd了：https://github.com/coolsnowwolf/lede/issues/4023——但是我找不到



```
opkg update 
//显示它下载的包来源是：https://downloads.openwrt.org/releases/22.03.5/targets/ramips/mt7621/packages/Packages.gz
```

于是我打算，先联网，去对应的地方下载好以后winSCP传给它然后再离线编译安装：Packages01.gz





但是又出麻烦，用不了winSCP

![image-20231029211419657](./assets/image-20231029211419657.png)

只能尝试ssh自带的scp指令：

```
P:\OnlyAMess\20231029-给openWRT刷入openclash并配置科学上网路由> scp ./Packages01.gz root@192.168.1.1:/root

tar -axvf 

```

但是这个openwrt不自带make编译器，看来它只能opkg安装命令，安装.ipk安装包啊。那看来我只能去直接下载xl2tpd.ipk（难怪要先opkg update再opkg install xl2tpd，原来是因为旧版的opkg intall xl2tpd时根本没有对应的网址出来，那么我直接下载xl2tpd.ipk可能就ok了）

根据https://blog.csdn.net/qq_41453285/article/details/102523263也就是`OPKG包管理系统详解！带你管理OpenWrt系统软件-CSDN博客.pdf`  opkg update 只是下载软件包列表文件 Packages.gz 并**存储在/var/opkg-lists/**所以我只要把刚刚download的Packages.gz复制到这个地址去替换掉就ok了——了解工作原理真是重要，人工有时候就是必要的啊！

然后我去github上找到了xl2tpd的源文件.tar.gz（来源https://github.com/xelerance/xl2tpd/releases/tag/v1.3.18），按理来说tar -axvf XXX.tar.gz解压完成后，进入到解压生成的bin目录，执行：sudo ./XX.sh就可以运行这个程序了。或者是有readme文件等等，总之解压后再说。

尝试先把Package放过去，但是好像没用~

出现一个问题是，放进去以后，opkg install或者update都会报错说/var/lock/opkg.lock访问不到，我把这个文件权限改成777后还是报错，重启以后发现命令正常了，但是/var/opkg_list文件夹又空了，看来是更新完以后这个最新的package.gz也就删掉了。而这时候update报的地址还是原来那个22.03.5的，但是不晓得为啥重启后/tmp全变成/var了，难绷



思考：

看来今天一天未必搞得定了，因为是两个问题——如何连上校网，用L2TP协议，这需要先安装一个软件，看来还是联网安装方便；第二是安装openclash，我先试一下这个吧，毕竟就是一个.ipk文件（但是好像这玩意儿也需要一把依赖，难绷）

结果：

果然，还是要安装这些依赖才行，那还是联网搞叭~

![image-20231029221143543](./assets/image-20231029221143543.png)

不过之前会出现一些报错，调试后并没有改变，而重启后果然就会好转



猜想：

不过看来有个办法，回公寓，电脑连接公共Wlan，再输出给路由，然后在上面先配置好openClash，ok的话再配置xl2tpd，再回学校配置。



结果：

可以。参考：https://kb5000.github.io/2020/11/21/OpenWrt%E8%BF%9E%E6%8E%A5%E6%A0%A1%E5%9B%AD%E7%BD%91L2TP%E7%8E%AF%E5%A2%83%E7%BD%91%E7%BB%9C%E9%85%8D%E7%BD%AE%E8%AF%A6%E8%A7%A3/即`OpenWrt连接校园网L2TP环境网络配置详解 _ KB5000.pdf`

其中，将WLAN 共享给以太网4（也就是输出的那条网接口）时，出现问题，原因是他共享时要把电脑上LAN口重新设定192.168.137.1但是原本的网卡里有一个已经占用了这个（ipconfig查一下就知道了），把他先改改ip解除占用就好了——`解决（由于IP占用）“win10无法启用internet连接共享，为lan连接配置的IP地址需要使用自动ip寻址”问题-CSDN博客.pdf`

![image-20231029233334943](./assets/image-20231029233334943.png)

![image-20231029233428266](./assets/image-20231029233428266.png)

还不行后我连续禁用了本地连接* 2和本地连接* 11，总算共享成功了！然后平板连接openWRT能正常上网了，用termux的ssh root@192.168.1.1登录。此时PC依然能正常上网。

[win10被禁用的网络连接图标不见了，该如何重新启用？ - Microsoft Community](https://answers.microsoft.com/zh-hans/windows/forum/all/win10被禁用的网/1f1c3ee0-184f-425c-943f-b2449b8cd252)

![image-20231030035327807](./assets/image-20231030035327807.png)

目前看没啥影响就先不管了。



opkg update这时候才看到原来是有好几次都叫Package.gz的文件是要下载和使用的

opkg install xl2tpd 也是

然后重启路由器，确实就能看到在添加接口上可以选L2TP协议了，明天可以去实验室试试了。



第二个，能否直接在此装openclash？

看视频发现1.原来winscp可以设置不用SFTP协议而是SCP，从而他们可以登录上去，难怪了 2.他的这个/tmp也是那些/var差不多的文件夹，据说/temp就是下次更新安装时已有的依赖已经在这儿了可以直接用来安装的作用，那看来是差不多备份的，难怪和/var文件夹结构差不多。3.下载的openclash app改变权限为770

实操中发现，安装openclash的依赖、app本身，这俩之间不要重启一次，

发现安装不了app，根据报错原因是没安装好dnsmasq-full,而根据报错原因没装好的原因是已经装了dnsmasq，所以要remove掉这个dnsmasq，然后就好了。这个issue答案虽然和我问题具体不同，但是解决思路是相同的。

1. 移除既有版本
   `opkg remove luci-app-openclash`
2. 更新依赖清单
   `opkg update`
3. 确认依赖是否安装
   `opkg  list-installed`
4. 确认与安装缺少的依赖





然后在内核这里卡了很久。首先选哪个版本？最终尝试以后是mipsls-softcore，而链接下载的clash_tun内核链接是404，官方给的内核下载跳转只到clash没有到clash_tun和clash_的，最终是在恩山论坛有个人发了tun的github下载链接，于是下载了个之前版本的tun

https://www.right.com.cn/forum/thread-8272767-1-1.html

![image-20231030033801441](./assets/image-20231030033801441.png)

`OPENCLASH 内核更新失败解决方法-软路由,x86系统,openwrt(x86),Router OS 等-恩山无线论坛.pdf`

不过我后来看到大概是在releases的tag里面有，另外是在分支brach里有个core，里面有最新的![image-20231030033909532](./assets/image-20231030033909532.png)

![image-20231030033938779](./assets/image-20231030033938779.png)

后面配置过程参考了glados的notion教程和视频。

然后提交了配置文件还得等他下载，两次下载都没完全成功，就接着重复到第三次左右run通了。感动

https://www.youtube.com/watch?v=KKOFKOyQLh8

2023#最新版#OpenWRT安装配置#OpenClash.mp4





凌晨三点半，终于配置好了！！！接下来就明天配置L2TP拨号上网就完事儿了！

这次真不容易，要整理一下资料：脑图、







首先是路由器连接网口后要能够上网

![image-20231029194646983](./assets/image-20231029194646983.png)



这是电脑连接ZJUwlan后的默认状态

DNS1是相同的，默认网关不同

![](./assets/image-20231029194812254.png)

根据98 说法

设置静态路由IP地址：

![image-20231029195741632](./assets/image-20231029195741632.png)

![image-20231029195753714](./assets/image-20231029195753714.png)







1、路由器联网，更新安装环境——update lists

![image-20231029192057579](./assets/image-20231029192057579.png)





其他信息：

- OpenWRT（曾用名 LEDE）
- OPKG介绍：https://blog.csdn.net/qq_41453285/article/details/102523263