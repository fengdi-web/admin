#   关于git
##  创建远程仓库
    在github 中创建一个远程仓库，
    然后在本地创建一个本地仓库
    git init
    git add
    git commit -m ""
    以上三个命令就初始化好了本地仓库并提交到本地仓库
    接下来就要将本地仓库与远程仓库进行关联
    git ~
    git push origin master
    此时就将本地仓库推送到远程了，在远程仓库中可以看到有一个master分支
    我们实际开发中一般在dev分支上开发，就要在创建一个dev分支到远程
    git checkout -b dev  创建并切换分支
    git push origin dev
    此时远程仓库就有两个分支 master 和 dev
    工作中：
    首先克隆公司正在开发的项目到本地
    1、新建一个文件夹
    2、git init 使用git来进行管理
    3、git clone ~
    4、cd 仓库  切换到当前仓库
    5、git branch 查看分支
    6、git checkout -b dev origin/dev  根据远程dev生成本地dev 
    7、git branch 查看当前分支(此时应该在本地的dev分支上)
    8、git pull origin dev  拉取最新版本开始工作

    如果在进行远程推送时有冲突，可以先将自己本地的进行存储,再将最新的pull下来，再恢复存储的分支，再去提交，然后推送到远程
    git stash 
    git pull 
    git stash pop
    git add 
    git commit -m ""
    git push

    注意：在修改bug时，先将dev分支git add git commit -m "" 提交到本地仓库，再进行切换，否则切换不成功，强行切换会导致当前分支被覆盖
#   引入antd   4.04 版本(修改成了3.17)
    安装 npm install antd --save     
##  按需打包: 只打包import引入组件的js/css
    安装npm install react-app-rewired customize-cra -S
        npm install babel-plugin-import -S
    新建   config-overrides.js  并添加配置
    修改   package.json   修改scripts
#   配置路由
    npm install react-router-dom -S
#   登录功能
##  rules   校验规则 声明式实时验证
    validator  自定义校验
    应用到了高阶组件技术  Form.create()()
##  异步请求axios
    处理跨域问题 代理(工作中常用)
    jsonp 只能处理get请求
#   总结
##  公司开发中使用postman来测试接口，同时可以进行保存，或者导出
##  接口测试通过以后，就可以发送ajax请求
    实际开发中将ajax进行封装，(此项目中进行了两层封装)，先是封装了一个ajax函数，专门用来发ajax请求，任何一个接口的ajax请求都要调用此函数，这个函数接收三个参数(url,body,type),但是我每次调用这个函数时都要传入请求的地址以及方式，由于我每一个请求的地址和请求方式都是固定的，所以我们在这一层上再做一层封装，叫接口请求函数，然后针对某个接口写一个接口请求函数，把请求地址以及请求方式给确定下来，唯一缺少的就是传入参数数据
    优化1：同时我们最后又在ajax封装函数外面又包了一层promise，目的是统一处理请求异常
    优化2：另外在得到response时直接得到data数据(response.data)
    注意：new promise之前一定要return,否则白new了
##  跨域问题
    端口不同跨域问题 (一个3000一个5000)
    解决办法：开发中常用(使用代理服务器)，由代理服务器帮助我们转发请求
    配置方法；(脚手架创建的环境中已经有代理服务器了)    "proxy": "http://localhost:5000"  只需告诉代理服务器目标地址
    代理服务器：
    是什么？ 是具有特定功能的程序
    运行在哪？ 前台应用端  只能在开发时使用
    作用？ 解决开发时ajax请求的跨域问题   监视并拦截请求(3000) => 然后转发请求

    关于webpack-dev-server (webpack开发服务器)
    开发环境运行实际上用的就是这个包(npm start)
    作用：1、在内存中对我们的项目进行编译打包，生成内存中的打包文件
          2、启动服务器运行打包文件
##  登录功能(免登录问题)
    使用localStorage
    具体：首先调用登录接口发送请求，如果失败，将错误信息反馈给用户，如果登录成功，跳转并将用户信息保存到localStorage中(永久保存)，分别写了两个工具模块(一个往内存中存数据一个往local中存数据)。在入口中通过local读到user保存到内存中，在admin中去判断内存中是否有user,如果有登录了，如果没有，自动跳转到登录界面，但是此时我已经登录了，但是我依然可以访问登录界面，实际应该是我退出登录才能访问登录界面，所以在登录中也要做出判断，如果登陆了就跳到admin界面
#   天气预报
##  jsonp解决ajax跨域的原理
    1). jsonp只能解决GET类型的ajax请求跨域问题
    2). jsonp请求不是ajax请求, 而是一般的get请求
    3). 基本原理
        浏览器端:
            动态生成<script>来请求后台接口(src就是接口的url)
            定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
        服务器端:
            接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
        浏览器端:
            收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据
#   分类列表功能
##  使用antd组件构建分类列表界面
    Card
    Table
    Button
    Icon
##  写相应的接口请求函数(获取(一级或二级)，添加，更新)
    通过 parentId 去判断要去显示一级分类或者二级分类
    将当前选中的分类对象保存到组件对象上，再通过this去拿数据
    category._id 就是请求二级列表的parentId 
    再通过三目运算去动态显示一级分类或二级分类

    显示二级分类涉及到setState去修改数据，由于这里setState请求是异步的，可将重新渲染执行函数写到setState的第二个参数，callback中
##  点击一级分类列表退回到一级分类列表
    点击时将parentId 初始为0
    title和查看子分类使用三目运算符来动态显示
##  loading的展示
    通过控制boolean值来控制它的显示时机，在通过异步请求async函数，在执行前将值改为true，执行后将值改为false，来控制它的显示时机
##  修改分类功能
    静态界面使用Modal form Input antd组件
    控制Modal显示隐藏,首先可以自定义一个状态"0" ,点击取消时就控制其隐藏，另外通过setState去修改值控制对应的对话框的显示隐藏

    父组件通过点击时获取的当前对象(render中的参数)，作为参数，保存在当前函数中(this存在当前实例中)，在子组件的节点中通过属性传参将数据传递到子组件中，子组件通过proptypes来判断传递的类型，子组件再通过this.props来取值
##  当点击修改分类时
    首先要发送ajax请求，但是此时要得到ajax的请求参数
    第一个参数直接通过保存在this中的对象去读取其_id值(因为要知道我要修改的是哪一个)
    另外一个参数可以通过子向父传值(回调函数方法)，将一个函数作为参数传递到子组件中，子组件中去调用这个函数，并将参数传给父组件，父组件将值保存到this中，取值时再去通过this读取
##  缓存问题
    每次修改完值以后，这个值会被缓存起来，导致我去修改其他分类时，输入框中不是当前值
    解决办法 使用form中的一个属性  this.form.resetFields() 来重置一组输入控件的值(点击取消或确认都要重置)
##  注意
    如何向事件回调函数传递参数: 先定义一个匿名函数(箭头函数), 在函数调用处理的函数并传入数据
    如果还没有值时先指定一个空对象   const category = this.category || {} 