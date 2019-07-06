<template>
  <div id="app">
    <button @click="showDialog">点击打开弹窗</button>
    <!-- 遮罩层 -->
    <div id="mask-layer"></div>
    <!-- 弹窗 -->
    <div id="dialog"></div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  data() {
    return {
      realtimeMousePositon: {
        x: 0,
        y: 0
      },
      pianchazhi: {
        x: 0,
        y: 0
      },
      timer: null,
      mousedown_in_designatedArea: false
    };
  },
  methods: {
    showDialog() {
      // 显示遮罩层
      let pageWidth = document.documentElement.clientWidth;
      let pageHeight = document.documentElement.clientHeight;
      let maskLayer = document.getElementById("mask-layer");
      maskLayer.style.display = "block";
      maskLayer.style.width = `${pageWidth}px`;
      maskLayer.style.height = `${pageHeight}px`;
      // 显示弹窗
      let dialogElement = document.getElementById("dialog");
      dialogElement.style.display = "block";
      dialogElement.style.left =
        (pageWidth - dialogElement.clientWidth) / 2 + "px";
      dialogElement.style.top =
        (pageHeight - dialogElement.clientHeight) / 2 + "px";

      // 注册监听器
      this.registerMouseEventListener();
    },

    registerMouseEventListener() {
      // 按下鼠标
      document.getElementById("dialog").addEventListener("mousedown", e => {
        // 鼠标坐标
        let mouseX = e.clientX;
        let mouseY = e.clientY;

        // 弹窗坐标
        let dialogX = document.getElementById("dialog").offsetLeft;
        let dialogY = document.getElementById("dialog").offsetTop;

        // 偏差值
        this.pianchazhi.x = mouseX - dialogX;
        this.pianchazhi.y = mouseY - dialogY;

        this.mousedown_in_designatedArea = true;
        this.timer = setInterval(this.computedDialogPosition, 10);
      });

      // 松开鼠标
      document.documentElement.addEventListener("mouseup", () => {
        clearInterval(this.timer);
        this.mousedown_in_designatedArea = false;
      });

      // 移动鼠标
      document.documentElement.addEventListener("mousemove", e => {
        if (this.mousedown_in_designatedArea) {
          this.realtimeMousePositon.x = e.clientX;
          this.realtimeMousePositon.y = e.clientY;
        }
      });
    },

    // 计算弹窗位置
    computedDialogPosition() {
      let finalX = this.realtimeMousePositon.x - this.pianchazhi.x;
      let finalY = this.realtimeMousePositon.y - this.pianchazhi.y;

      let maxX =
        document.documentElement.clientWidth -
        document.getElementById("dialog").clientWidth;

      let maxY =
        document.documentElement.clientHeight -
        document.getElementById("dialog").clientHeight;

      document.getElementById("dialog").style.left =
        Math.min(Math.max(0, finalX), maxX) + "px";
      document.getElementById("dialog").style.top =
        Math.min(Math.max(0, finalY), maxY) + "px";
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

#dialog {
  position: absolute;

  width: 300px;
  height: 400px;

  background-color: white;

  z-index: 9;
  display: none;

  cursor: move;
}

#mask-layer {
  position: absolute;
  top: 0;
  left: 0;

  background-color: black;
  opacity: 0.3;

  display: none;
}
</style>


