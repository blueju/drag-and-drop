var dialogInstace,
  onMoveStartId,
  mousePos = {
    x: 0,
    y: 0
  } //	用于记录当前可拖拽的对象

// var zIndex = 9000;

//	获取元素对象
function g(id) {
  return document.getElementById(id)
}

/**
 * 自动居中
 * @param {将要居中的元素} el
 */
function autoCenter(el) {
  //   文档可视区域宽度
  var bodyWidth = document.documentElement.clientWidth
  //   文档可视区域高度
  var bodyHeight = document.documentElement.clientHeight

  //   元素的宽度
  var elWidth = el.offsetWidth
  //   元素的高度
  var elHeight = el.offsetHeight

  //   重新定位
  el.style.left = (bodyWidth - elWidth) / 2 + 'px'
  el.style.top = (bodyHeight - elHeight) / 2 + 'px'
}

/**
 * 扩展元素到全部显示区域
 * @param {遮罩层} el
 */
function fillToBody(el) {
  // 将元素的宽度设置为文档的宽度
  el.style.width = document.documentElement.clientWidth + 'px'
  // 将元素的高度设置为文档的高度
  el.style.height = document.documentElement.clientHeight + 'px'
}

/**
 * Dialog实例化的方法
 * @param {拖拽元素id} dragId
 * @param {移动元素id} moveId
 */
function Dialog(dragId, moveId) {
  // 存储
  var instace = {}

  // 拖动对象：被拖拽的对象
  instace.dragElement = document.getElementById(dragId)
  // 移动对象：拖拽操作时，移动对象
  instace.moveElement = document.getElementById(moveId)

  //	拖拽操作时，移动元素的起始 X 点
  instace.mouseOffsetLeft = 0
  //	拖拽操作时，移动元素的起始 Y 点
  instace.mouseOffsetTop = 0

  // 监听拖拽对象的"鼠标按下"事件
  instace.dragElement.addEventListener('mousedown', function(e) {
    var e = e || window.event

    dialogInstace = instace
    instace.mouseOffsetLeft = e.pageX - instace.moveElement.offsetLeft
    instace.mouseOffsetTop = e.pageY - instace.moveElement.offsetTop

    onMoveStartId = setInterval(onMoveStart, 10)
    return false
    // instace.moveElement.style.zIndex = zIndex ++;
  })

  return instace
}

/**
 * 时刻监听页面中的 “鼠标松开” 事件
 */
document.onmouseup = function(e) {
  dialogInstace = false
  clearInterval(onMoveStartId)
}

/**
 * 时刻监听页面中的 “鼠标移动” 事件
 */
document.onmousemove = function(e) {
  console.log(e);
  // 兼容IE
  var e = window.event || e
  
  mousePos.x = e.clientX
  mousePos.y = e.clientY

  e.stopPropagation && e.stopPropagation()
  e.cancelBubble = true
  e = this.originalEvent
  e && (e.preventDefault ? e.preventDefault() : (e.returnValue = false))

  document.body.style.MozUserSelect = 'none'
}

// 位置计算
function onMoveStart() {
  var instace = dialogInstace
  if (instace) {
    var maxX =
      document.documentElement.clientWidth - instace.moveElement.offsetWidth
    var maxY =
      document.documentElement.clientHeight - instace.moveElement.offsetHeight

    instace.moveElement.style.left =
      Math.min(Math.max(mousePos.x - instace.mouseOffsetLeft, 0), maxX) + 'px'
    instace.moveElement.style.top =
      Math.min(Math.max(mousePos.y - instace.mouseOffsetTop, 0), maxY) + 'px'
  }
}

//	重新调整对话框的位置和遮罩，并且展现
function showDialog() {
  // 显示弹窗
  document.getElementById('dialogMove').style.display = 'block'
  // 显示遮罩层
  document.getElementById('mask').style.display = 'block'
  autoCenter(g('dialogMove'))
  fillToBody(g('mask'))
}

//	关闭对话框
function hideDialog() {
  // 隐藏弹窗
  document.getElementById('dialogMove').style.display = 'none'
  // 隐藏遮罩层
  document.getElementById('mask').style.display = 'none'
}

//	侦听浏览器窗口大小变化
window.onresize = showDialog

Dialog('dialogDrag', 'dialogMove')
showDialog()
