特性

1. 支持文字和图片
2. 禁止开发模式水印元素删除和修改。不可删除水印。
3. 水印可配置

使用

```js
<script src="./dist/watermarking-js.min.js"></script>
<script>
    new Watermark(OPTIONS);
</script>
```

npm

```tex
npm install watermarking-js
```

```js
import Watermark from "watermarking-js";
new Watermark(OPTIONS);
```

options

| name       | type    | default         | 描述                                                 |
| ---------- | ------- | --------------- | ---------------------------------------------------- |
| type       | String  | text            | 可选：image\|text                                    |
| input      | String  | watermarking-js | 文字或者图片路径                                     |
| opacity    | Number  | 0.5             | 透明度                                               |
| rotate     | Number  | -45             | 旋转角度                                             |
| cellSize   | Number  | 200             | 单个水印大小。水印内容居中，此参数可以调整水印间距。 |
| zIndex     | Number  | 10000000000     | 层级                                                 |
| debug      | Boolean | false           | 是否开启调试模式                                     |
| imgHeight  | Number  | 50              | type=image, 图片高度                                 |
| imgWidth   | Number  | 50              | type=image, 图片宽度                                 |
| color      | String  | black           | type=text, 字体颜色                                  |
| fontSize   | Number  | 16              | type=text, 字体大小                                  |
| fontFamily | String  | Verdana         | type=text, 字体                                      |

例子

文字水印

```js
new Watermark({
  type: "text",
  input: "watermarking-js",
  rotate: -45,
  cellSize: 200,
  opacity: 0.25,
  color: "red",
  fontSize: "14",
});
```

![1.png](https://i.loli.net/2021/08/24/917a3AkyR5DNQep.png)

图片水印

```js
new Watermark({
  type: "image",
  input: "/e1.png",
  rotate: -45,
  cellSize: 200,
  imgHeight: 50,
  imgWidth: 50,
});
```

![2.png](https://i.loli.net/2021/08/24/kxhE7DOdwtrIUGo.png)