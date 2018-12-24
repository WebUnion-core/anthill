
# JavaScript-D系列——Canvas #

## 目录 ##

1. [创建画布](#href1)
2. [导出图像](#href2)
3. [填充和描边](#href3)
4. [绘制矩形](#href4)
5. [绘制路径](#href5)
6. [绘制文本](#href6)
7. [阴影](#href7)
8. [渐变](#href8)

Canvas 是 HTML5 添加的最受欢迎的功能，这个元素负责在页面中设定一个区域，然后可以通过 JavaScript 动态地在这个区域中绘制图形。

## <a name="href1">创建画布</a> ##

在HTML页面中创建 canvas 标签，即可创建一个 canvas 画布:

```html
<canvas id="drawing" style="border:1px solid black;"></canvas>
```

canvas 节点可以设置一些样式属性，但宽度和高度的设置比较特殊。

在 JavaScript 脚本中获取画布对象，并使用画布对象的`getContext()`方法创建绘图上下文:

```js
var drawing = document.getElementById("drawing");

if (drawing.getContext) {
    // 确定浏览器支持<canvas>标签
    var context = drawing.getContext("2d"); // 2d上下文
}
```

## <a name="href2">导出图像</a> ##

Canvas 画布上绘制的图像可以导出为 png 格式的图像，只需要使用画布对象的`toDataURL(type)`方法，type 参数是一个导出类型字符串，导出为 png 格式则取值"image/png":

HTML:

```html
<canvas id="drawing" style="border:1px solid black;"></canvas>
<img id="pngImg" style="border:1px solid black;" />
```

JavaScript:

```js
var drawing = document.getElementById("drawing");
var pngImg = document.getElementById("pngImg");

if (drawing.getContext) {
    // 确定浏览器支持<canvas>标签
    var context = drawing.getContext("2d");

    // 绘图
    ...

    pngImg.src = drawing.toDataURL("image/png"); // 将画布绘制的图像导出为png
}
```

## <a name="href3">填充和描边</a> ##

填充就是用指定的样式(颜色、渐变或图像)填充图像; 描边则是只在图像边缘画线。设置填充样式需要设置上下文对象的 fillStyle 属性，设置描边样式则是设置 strokeStyle 属性，设置这两个属性值会覆盖原来的值。

设置描边线条宽度可以设置 lineWidth 属性，取值是任意整数。

## <a name="href4">绘制矩形</a> ##

绘制矩形有两种形式，分别是填充矩形和描边矩形。

填充矩形先要设置填充属性 fillStyle，然后使用`fillRect()`方法绘制矩形。`fillRect(x, y, w, h)`接收的4个参数都是数值，参数x为相对画布左上点水平距离，参数y为竖直距离，参数w为宽度，参数h为高度。

描边矩形先设置描边属性 strokeStyle，然后使用`strokeRect()`方法绘制矩形。`strokeRect(x, y, w, h)`接收的4个参数同`fillRect(x, y, w, h)`。

除了以上两个绘制矩形的方法，还可以使用清除矩形块方法`clearRect(x, y, w, h)`，其接收参数与绘制矩形方法的参数相同。

```js
...
// 填充矩形
context.fillStyle = "red";
context.fillRect(10, 10, 50, 50); // 填充红色矩形
context.fillStyle = "blue";
context.fillRect(60, 10, 50, 50); // 填充蓝色矩形

// 描边矩形
context.lineWidth = 1; // 线条宽度设为1
context.strokeStyle = "green";
context.strokeRect(111, 11, 48, 48); // 描边绿色矩形
context.strokeStyle = "yellow";
context.strokeRect(161, 11, 48, 48); // 描边黄色矩形

// 清除矩形
context.clearRect(20, 20, 30, 30);
...
```

## <a name="href5">绘制路径</a> ##

2D上下文支持很多种在画布上绘制路径的方法，通过路径可以创造出复杂的形状和线条。

开始路径使用语句: `context.beginPath();`

绘制路径的方法有以下这些:

1. `arc(x, y, radius, startAngle, endAngle, counterclockwise)`
    绘制弧线，前两个参数(数值)用于设置中心点位置; 第三个参数(数值)为弧线半径; startAngle 参数和 endAngle 参数分别设置起始和结束位置(用弧度表示); 最后一个参数(布尔值)设置绘制方向是顺时钟还是逆时针，false 为顺时针(默认)，true 为逆时针。

    ```js
    ...
    context.beginPath();
    context.arc(100, 80, 50, 0, Math.PI / 2, true); // 以(100,80)为中心，半径为50，逆时针从0开始-90°结束画弧
    context.stroke();
    ...
    ```

    `arc()`方法更常用于画圆:

    ```js
    ...
    context.arc(100, 80, 50, 0, 2 * Math.PI); // 以(100,80)为圆心，半径为50画圆
    context.stroke();
    ```

2. `moveTo(x, y)`

    将绘图游标移动到(x,y)。

3. `lineTo(x, y)`

    从绘图游标位置为起点，(x,y)为终点画直线。

    ```js
    ...
    context.moveTo(100, 80);
    context.lineTo(150, 80); // 以(100,80)为起点，(150,80)为终点画直线
    context.stroke();
    ...
    ```

绘制完路径后，可以执行以下操作:

1. 描边路径: `context.stroke()`;
2. 填充路径: `context.fill()`;
3. 闭合路径: `context.closePath()`;

## <a name="href6">绘制文本</a> ##

绘制文本有同样两种方式: 填充和描边。填充文本用`fillText(str, x, y)`，描边文本用`strokeText(str, x, y)`，str 参数为文本内容，x和y参数为文本显示位置。这两个方法又基于3个属性:

1. font: 表示文本样式、大小、字体类型等，其取值与 CSS 的 font 属性取值相同;
2. textAlign: 文本对齐方式，取值有"start"、"end"和"center"等;
3. textBaseline: 文本基线，取值有"top"、"middle"、"bottom"等。

```js
...
context.font = "bold 50px Georgia"; // 50px字体大小，加粗，字体类型为Georgia
context.textAlign = "center"; // 水平居中对齐
context.textBaseline = "middle"; // 竖直居中对齐
context.strokeText("20", 120, 70);
context.fillText("17", 180, 70);
...
```

## <a name="href7">阴影</a> ##

2D上下文会根据以下几个属性的值，自动为形状或路径绘制出阴影:

1. shadowColor: 阴影颜色，取值与 CSS 颜色取值相同;
2. shadowOffsetX: 阴影水平偏移量，默认值为0;
3. shadowOffsetY: 阴影竖直偏移量，默认值为0;
4. shadowBlur: 模糊像素数，默认为0，即不模糊。

```js
...
context.shadowColor = "#3456c1";
context.shadowOffsetX = 5;
context.shadowOffsetY = 5;
context.shadowBlur = 5;
context.strokeRect(20, 20, 50, 50); // 绘制一个带浅蓝色阴影的正方形
...
```

## <a name="href8">渐变</a> ##

渐变有两种: 线性渐变和径向渐变，径向渐变难以控制，故只说明线性渐变的使用。

创建一个线性渐变，使用的是`createLinearGradient(startX, startY, endX, endY)`方法，它接收四个参数: startX 和 startY 参数用于获取渐变起点位置，endX 和 endY 参数用于获取渐变终点位置。使用这个方法后将返回一个渐变实例对象。

创建了渐变实例对象后，下一步就是使用`addColorStop(num, color)`方法指定色标，它接收两个参数: num 参数是一个数值，取值0或1，0表示起点，1表示终点; color 参数为颜色值，设置起点或终点色标。

将渐变应用到图像上只要将 fillStyle 或 strokeStyle 设置为渐变实例对象即可。

```js
...
var gradient = context.createLinearGradient(20, 20, 70, 70);
gradient.addColorStop(0, "#00a4e9");
gradient.addColorStop(1, "#3456c1");
context.fillStyle = gradient;
context.fillRect(20, 20, 50, 50); // 完全将由浅蓝到深蓝的渐变应用到矩形上
...
```

注意，如果想让渐变完全覆盖图像，应将`createLinearGradient()`前两个参数设为图像左上点坐标，后两个参数设为图像右下点坐标。

---

```
ID         : 24
DATE       : 2017/08/27
AUTHER     : WJT20
TAG        : 
```
