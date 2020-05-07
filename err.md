<!-- 问题总结 -->
# 路由组件
  1、非路由组件没有location属性
  Uncaught TypeError: Cannot read property 'pathname' of undefined
  问题：不能在undefind上访问pathname
  解决办法：在该组件中使用withRouter高阶组件来包装非路由组件，返回一个新的路由组件，新的路由组件向非路由组件传递3个属性 history、location、match
# 修改商品信息
  错误：TypeError: Cannot read property 'name' of undefined
  解决办法： const category = this.category || {}   (如果没有值先指定一个空对象)
  因为在点击修改时才存值，这是render执行时就找不到这个值