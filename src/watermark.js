class Watermark {
  constructor(options) {
    this.options = options || {};
    this.el = null;
    this.#init(options);
  }
  #init() {
    const { options } = this;
    options.parent = options.parent || document.body;
    this.#initCell((image) => {
      this.#create(image);
      this.#initEvents();
    });
  }
  #create(image) {
    if (!image) return;
    const { options } = this;
    let { cellSize = 200, zIndex } = options;
    let el = document.createElement("div");
    let style = {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      "background-position": "center",
      "background-repeat": "repeat",
      "background-size": `${cellSize}px ${cellSize}px`,
      "background-image": `url(${image})`,
      opacity: options.opacity || 0.5,
      "z-index": zIndex || 10000000000,
    };

    Object.keys(style).forEach((key) => {
      el.style[key] = style[key];
    });
    options.parent.appendChild(el);
    this.el = el;
  }
  #initCell(callback) {
    let { type, input } = this.options || {};

    if (!type) {
      throw new Error("type is required");
    }
    if (!input) {
      throw new Error("input is required");
    }

    switch (type) {
      case "text":
        this.#createTextCell(callback);
        break;
      case "image":
        this.#createImageCell(callback);
        break;
      default:
        break;
    }
  }
  #createTextCell(callback) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    let {
      cellSize = 100,
      rotate = 0,
      input: text,
      color = "black",
      fontSize = 16,
      fontFamily = "Verdana",
      debug = false,
    } = this.options || {};

    canvas.setAttribute("width", cellSize);
    canvas.setAttribute("height", cellSize);

    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;

    this.options.cellSize = cellSize;

    const rect = {};
    //获取文字宽度
    rect.width = ctx.measureText(text).width;
    //获取文字高度 单个文字的宽度代替
    rect.height = ctx.measureText("M").width;
    rect.x = cellSize / 2 - rect.width / 2;
    rect.y = cellSize / 2 - rect.height / 2;

    //围绕中心点旋转
    ctx.translate(rect.x + rect.width / 2, rect.y + rect.height / 2);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.translate(-rect.x - rect.width / 2, -rect.y - rect.height / 2);

    ctx.fillText(text, rect.x, rect.y);
    this.cellImage = canvas.toDataURL("image/png", 1.0);
    callback(this.cellImage);

    if (debug) {
      canvas.style.border = "1px solid red";
      canvas.style.position = "fixed";
      canvas.style.top = 0;
      canvas.style.left = 0;
      this.options.parent.appendChild(canvas);
    }
  }
  #createImageCell(callback) {
    const { options } = this;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.setAttribute("crossorigin", "anonymous"); // works for me
    img.src = options.input;
    img.onload = () => {
      let {
        imgWidth = img.width,
        imgHeight = img.height,
        cellSize = 100,
        rotate = 0,
        debug = false,
      } = options;

      this.options.imgHeight = imgHeight;
      this.options.imgHeight = imgHeight;
      this.options.cellSize = cellSize;

      canvas.setAttribute("width", cellSize);
      canvas.setAttribute("height", cellSize);

      let x = cellSize / 2 - imgWidth / 2;
      let y = cellSize / 2 - imgHeight / 2;
      const rect = { x, y, width: imgWidth, height: imgHeight };

      //围绕中心点旋转
      ctx.translate(rect.x + rect.width / 2, rect.y + rect.height / 2);
      ctx.rotate((rotate * Math.PI) / 180);
      ctx.translate(-rect.x - rect.width / 2, -rect.y - rect.height / 2);

      ctx.drawImage(img, rect.x, rect.y, rect.width, rect.height);

      this.cellImage = canvas.toDataURL("image/png", 1.0);
      callback(this.cellImage);

      if (debug) {
        canvas.style.border = "1px solid red";
        canvas.style.position = "fixed";
        canvas.style.top = 0;
        canvas.style.left = 0;
        this.options.parent.appendChild(canvas);
      }
    };
  }
  #initEvents() {
    var MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver;

    let targetNode = this.el;
    const parentNode = this.el.parentNode;

    // 观察器的配置（需要观察什么变动）
    const config = { attributes: true, childList: true, subtree: true };

    // 当观察到变动时执行的回调函数 移除自己 触发DOMNodeRemoved
    const callback = () => {
      targetNode.remove();
    };

    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(callback);

    // 以上述配置开始观察目标节点
    observer.observe(targetNode, config);

    parentNode.addEventListener("DOMNodeRemoved", (e) => {
      if (e.target == targetNode) {
        targetNode = null;
        this.#initCell((cell) => {
          this.#create(cell);
          this.#initEvents();
        });
      }
    });
  }
}
export default Watermark;
