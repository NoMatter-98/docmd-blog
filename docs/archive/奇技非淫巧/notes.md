1、发现rplB被误写成rlpB

2、去NCBI填写建树需要的基因序列号

3、download的时候结合之前写的python脚本，发现少下载了一个

![image-20231106180730126](./assets/image-20231106180730126.png)

![image-20231106180822227](./assets/image-20231106180822227.png)

这里实际需要15个，但是只download了14个，于是去NCBI上再下载少的那个来

![image-20231106180842141](./assets/image-20231106180842141.png)



4、拼接16s 测序结果(最终师姐拼接了一下发给了我)

- (无用，只能打开.ab1文件)安装bioedit，在C:\bioedit



> - 安装DNAMan 9，来源：https://www.jingege.wang/2020/12/16/dnaman-9/
> - 拼接方法参考：https://www.jianshu.com/p/6a142c9a5ae7   ./Microbiology-5 用DNAman软件对16S rRNA gene 的测序结果27F和1492r进行拼接 2021-09-14 - 简书.pdf

BTW，测出的序列中有YW，是正常的。



5、比对

第一次比对，保守切（少切）

比对不上时，多翻转（有一个翻转了两次才对上）被测基因



重命名这里又是错了很多，要手动去看是否重命名完



筛选模型的过程计时：

20：42





可以改进的python：

一次性统计完文件夹下所有文件的行数

想办法爬取序列号

优化树的美化笔记





20231107

画的图第二次还不如第一次

第二组基因的匹配可以考虑3个基因或者4个基因，都做做



不过做对齐时，没有测，打不开这个fasta文件

![image-20231107201122385](./assets/image-20231107201122385.png)

把空的序列部分用---代替

在对齐这一步确实导出的fasta中会有把_变成 空格的情况

![image-20231107201453791](./assets/image-20231107201453791.png)



4个基因，2个外部菌群： [IQ_partition.nex.contree](D:\graduate\shashixiong\PhyloSuite_v1.2.2_Win\PhyloSuite\myWorkPlace\GenBank_File\files\IQtree_results\2023_11_07-20_45_29\IQ_partition.nex.contree) 

4个基因，yz27外部菌群： [IQ_partition.nex.contree](D:\graduate\shashixiong\PhyloSuite_v1.2.2_Win\PhyloSuite\myWorkPlace\GenBank_File\files\IQtree_results\2023_11_07-20_50_05\IQ_partition.nex.contree) 

适度裁切后，4个基因，2个外部菌群： [IQ_partition.nex.contree](D:\graduate\shashixiong\PhyloSuite_v1.2.2_Win\PhyloSuite\myWorkPlace\GenBank_File\files\IQtree_results\2023_11_07-21_24_36\IQ_partition.nex.contree) 

2+2个基因，2个外部菌群： [IQ_partition.nex.contree](D:\graduate\shashixiong\PhyloSuite_v1.2.2_Win\PhyloSuite\myWorkPlace\GenBank_File\files\IQtree_results\2023_11_07-21_53_30\IQ_partition.nex.contree) 

