/**
 * 构造函数——可移动弹窗
 * @param {*} drapTarget 鼠标拖动的元素，传入DOM元素
 * @param {*} draggedTarget 跟着被拖动的元素，传入DOM元素
 */
function CanMoveDialog(drapTarget, draggedTarget) {

  // 点击时偏差值（点击时鼠标坐标-弹窗坐标）
  let deviationValue = {
    x: 0,
    y: 0
  }
  //定时器
  let MoveTimer = null
  // 实时鼠标坐标
  let mouseRealTimeCoordinate = {
    x: 0,
    y: 0
  }

  // 方法
  // 计算并调整弹窗位置
  this.computedDialogPosition = function () {
    // 判断是否在指定区域按下了鼠标
    if (mousedown_in_designateArea) {
      // 距左侧最大距离（页面宽度-弹窗宽度）
      let maxX = document.documentElement.clientWidth - draggedTarget.clientWidth;
      let maxY = document.documentElement.clientHeight - draggedTarget.clientHeight;

      // 最终距离左侧的距离（0<距离<最大距离）
      let finalPositionX = Math.min(Math.max(0, mouseRealTimeCoordinate.x - deviationValue.x), maxX) + 'px'
      let finalPositionY = Math.min(Math.max(0, mouseRealTimeCoordinate.y - deviationValue.y), maxY) + 'px'

      // 调整距离
      draggedTarget.style.left = finalPositionX
      draggedTarget.style.top = finalPositionY
    }
  }

  // 监听器
  // 一、按下鼠标
  drapTarget.addEventListener('mousedown', (e) => {
    // 鼠标坐标
    let mouseX = e.clientX
    let mouseY = e.clientY

    // 弹窗坐标
    let dialogX = draggedTarget.offsetLeft
    let dialogY = draggedTarget.offsetTop

    // 移动差值（鼠标坐标-弹窗坐标）
    deviationValue.x = mouseX - dialogX
    deviationValue.y = mouseY - dialogY

    // 鼠标是否在指定区域下按下
    mousedown_in_designateArea = true

    // 每隔1毫秒轮询计算
    MoveTimer = setInterval(this.computedDialogPosition, 1)

  })

  // 二、移动鼠标
  document.documentElement.addEventListener('mousemove', (e) => {
    mouseRealTimeCoordinate.x = e.clientX
    mouseRealTimeCoordinate.y = e.clientY
  })

  // 三、松开鼠标
  document.documentElement.addEventListener('mouseup', (e) => {
    mousedown_in_designateArea = false
    globalData = null
    clearInterval(MoveTimer)
  })

}

let dragTarget = document.getElementById('dialog')
let draggedTarget = document.getElementById('dialog')

let dialogCase = new CanMoveDialog(dragTarget, draggedTarget)