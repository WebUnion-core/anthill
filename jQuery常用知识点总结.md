
## jQuery常用知识点总结 ##

### 目录 ###

1. 选择器
2. 事件
3. 事件对象
4. 隐藏和显示
5. 动画效果
6. DOM操作
7. CSS关联
8. 尺寸
9. 遍历
10. Ajax

---

### 选择器 ###

1. $("\*")：所有元素

2. $("#lastname")：id="lastname" 的元素

3. $(".intro")：class="intro" 的所有元素

4. $(".intro,.demo")：class 为 "intro" 或 "demo" 的所有元素

5. $("p")：所有 `<p>` 元素

6. $("h1,div,p")：所有 `<h1>`、`<div>` 和 `<p>` 元素

7. $("p:first")：第一个 `<p>` 元素

8. $("p:last")： 最后一个 `<p>` 元素

9. $("tr:even")：所有偶数 `<tr>` 元素

10. $("tr:odd")：所有奇数 `<tr>` 元素

11. $("p:first-child") ：属于其父元素的第一个子元素的所有 `<p>` 元素

12. $("p:first-of-type")：属于其父元素的第一个 `<p>` 元素的所有 `<p>` 元素

13. $("p:last-child")：属于其父元素的最后一个子元素的所有 `<p>` 元素

14. $("p:last-of-type")：属于其父元素的最后一个 `<p>` 元素的所有 `<p>` 元素

15. $("p:nth-child(2)")：属于其父元素的第二个子元素的所有 `<p>` 元素

16. $("p:nth-last-child(2)")：属于其父元素的第二个子元素的所有 `<p>` 元素，从最后一个子元素开始计数

17. $("p:nth-of-type(2)")：属于其父元素的第二个 `<p>` 元素的所有 `<p>` 元素

18. $("p:nth-last-of-type(2)") ：属于其父元素的第二个 `<p>` 元素的所有 `<p>` 元素，从最后一个子元素开始计数

19. $("p:only-child")：属于其父元素的唯一子元素的所有 `<p>` 元素

20. $("p:only-of-type")：属于其父元素的特定类型的唯一子元素的所有 `<p>` 元素

21. $("div > p")：`<div>` 元素的直接子元素的所有 `<p>` 元素

22. $("div p")：`<div>` 元素的后代的所有 `<p>` 元素

23. $("div + p")：每个 `<div>` 元素相邻的下一个 `<p>` 元素

24. $("div ~ p")：`<div>` 元素同级的所有 `<p>` 元素

25. $("ul li:eq(3)") ：列表中的第四个元素（index 值从 0 开始）

26. $("ul li:gt(3)")：列举 index 大于 3 的元素

27. $("ul li:lt(3)")：列举 index 小于 3 的元素

28. $("input:not(:empty)")：所有不为空的输入元素

29. $(":header")：所有标题元素 `<h1>`, `<h2>` ...

30. $(":animated") ：所有动画元素

31. $(":focus") ：当前具有焦点的元素

32. $(":contains('Hello')")：所有包含文本 "Hello" 的元素

33. $("div:has(p)") ：所有包含有 `<p>` 元素在其内的 `<div>` 元素

34. $(":empty") ：所有空元素

35. $(":parent") ：所有是另一个元素的父元素的元素

36. $("p:hidden")：所有隐藏的 `<p>` 元素

37. $("table:visible") ：所有可见的表格

38. $(":root")：文档的根元素

39. $("p:lang(de)") ：所有带有以 "de" 开头的 lang 属性值的 `<p>` 元素

40. $("[href]")： 所有带有 href 属性的元素

41. $("[href='default.htm']")： 所有带有 href 属性且值等于 "default.htm" 的元素

42. $("[href!='default.htm']")：所有带有 href 属性且值不等于 "default.htm" 的元素

43. $("[href$='.jpg']") ：所有带有 href 属性且值以 ".jpg" 结尾的元素

44. $("[title|='Tomorrow']")：所有带有 title 属性且值等于 'Tomorrow' 或者以 'Tomorrow' 后跟连接符作为开头的字符串

45. $("[title^='Tom']")：所有带有 title 属性且值以 "Tom" 开头的元素

46. $("[title~='hello']")：所有带有 title 属性且值包含单词 "hello" 的元素

47. $("[title*='hello']")：所有带有 title 属性且值包含字符串 "hello" 的元素

48. $(":input")：所有 input 元素

49. $(":text") ：所有带有 type="text" 的 input 元素

50. $(":password")：所有带有 type="password" 的 input 元素

51. $(":radio") ：所有带有 type="radio" 的 input 元素

52. $(":checkbox") ：所有带有 type="checkbox" 的 input 元素

53. $(":submit")：所有带有 type="submit" 的 input 元素

54. $(":reset")：所有带有 type="reset" 的 input 元素

55. $(":button")：所有带有 type="button" 的 input 元素

56. $(":image")：所有带有 type="image" 的 input 元素

57. $(":file") ：所有带有 type="file" 的 input 元素

58. $(":enabled")：所有启用的元素

59. $(":disabled")：所有禁用的元素

60. $(":selected")：所有选定的下拉列表元素

61. $(":checked")：所有选中的复选框选项

---

### 事件 ###

1. $(document).ready(callback)：文档完全加载完后执行函数，简写形式为$(callback)

2. $elem.click(callback)：点击元素后执行函数，callback函数内有一个event参数(对象)

3. $elem.dblclick(callback)：双击元素后执行函数

4. $elem.mouseenter(callback)：鼠标穿过元素后执行函数

5. $elem.mouseleave(callback)：鼠标离开元素后执行函数

6. $elem.mousedown(callback)：鼠标移动到元素上并按下鼠标按键时执行函数

7. $elem.mousemove(callback)：鼠标在元素上移动时执行函数

8. $elem.hover(callback1, callback2)：鼠标移入元素(mouseenter事件)时执行第一个参数的函数，移出元素(mouseleave事件)时执行第二个参数的函数

9. $elem.focus(callback)：表单控件获得焦点时执行函数

10. $elem.blur(callback)：表单控件失去焦点时执行函数

11. $elem.change(callback)：当元素的值发生改变时执行函数。仅适用于文本域（text field），以及textarea和select元素。当用于select元素时，change事件会在选择某个选项时发生。当用于text field或text area时，该事件会在元素失去焦点时发生

12. $elem.keydown(callback)：按下按键时执行函数

13. $elem.keypress(callback)：按下按键时执行函数，与keydown事件不同，每插入一个字符，就会发生keypress事件

14. $elem.keyup(callback)：松开按键时执行函数

15. $elem.resize(callback)：调整窗口大小时执行函数

16. $elem.scroll(callback)：滚动元素时执行函数

17. $elem.trigger(event)：触发元素绑定的指定事件的执行函数

18. $elem.select(callback)：当textarea或文本类型的input元素中的文本被选择时执行函数

19. $elem.submit(callback)：当提交表单时执行函数。该事件只适用于表单元素(form)

20. $elem.unbind([event, callback])：移除指定事件的事件处理程序，如果不指定参数则移除该元素的所有事件处理程序

21. $elem.bind(event, callback)：为被选元素添加一个或多个事件处理程序

22. $elem.delegate(childSelector, event, cacllback)：为被选元素的指定子元素添加一个或多个事件处理程序，适用于当前或未来的元素（比如由脚本创建的新元素）

23. $elem.one(event, callback)：绑定一次性的事件处理程序

---

### 事件对象 ###

1. event.isDefaultPrevented()：返回event对象上是否调用了event.preventDefault()

2. event.pageX：相对于文档左边缘的鼠标位置

3. event.pageY：相对于文档上边缘的鼠标位置

4. event.preventDefault()：阻止事件的默认动作

5. event.result：包含由被指定事件触发的事件处理器返回的最后一个值

6. event.target：触发该事件的 DOM 元素

7. event.timeStamp：该属性返回从 1970 年 1 月 1 日到事件发生时的毫秒数

8. event.type：描述事件的类型

9. event.which：指示按了哪个键或按钮

---

### 隐藏和显示 ###

1. $elem.hide()：隐藏元素

2. $elem.show()：显示元素

3. $elem.toggle([speed, callback])：切换使用hide()和show()，speed参数表示隐藏/显示的速度，可取值“slow”、“fast”或毫秒数，callback参数为toggle效果实现后执行的函数

4. $elem.fadeIn([speed, callback])：淡入显示

5. $elem.fadeOut([speed, callback])：淡出隐藏

6. $elem.fadeToggle([speed, callback])：切换使用fadeIn()和fadeOut()

7. $elem.fadeTo(speed, opacity)：渐变为指定透明度，opacity参数表示一个透明度值，为浮点数

8. $elem.slideDown([speed, callback])：向下滑动显示

9. $elem.slideUp([speed, callback])：向上滑动隐藏

10. $elem.slideToggle([speed, callback])：切换使用slideDown()和slideUp()

---

### 动画效果 ###

1. $elem.animate({params}, [speed, callback])：根据params参数定义动画，params不能包括颜色参数，params值可以使用相对值，只需要在取值之前加上“+=”或“-=”即可，动画可以使用预定义值“show”、“hide”或“toggle”

2. $elem.stop(stopAll, goToEnd)：停止动画，stopAll参数(布尔值，默认false)规定是否应该清除动画队列，goToEnd参数(布尔值，默认false)规定是否立即完成当前动画

---

### DOM操作 ###

1. $elem.text([content|callback])：设置或返回所选元素的文本内容，接受的参数可以是新内容，也可以是一个回调函数，其包括两个参数：被选元素对应的索引以及原始值

2. $elem.html([content|callback])：设置或返回所选元素的内容(包括HTML标记)

3. $elem.val([content|callback])：设置或返回表单字段的值

4. $elem.attr(attribute|callback, [content])：设置或获取属性值

5. $elem.append(content, ...)：在元素的结尾插入内容

6. $elem.prepend(content, ...)：在元素开头插入内容

7. $elem.after(content, ...)：在元素之后插入内容

8. $elem.before(content, ...)：在元素之前插入内容

9. $elem.remove([selector])：删除元素及子元素，接收一个可选的选择器参数作为过滤条件

10. $elem.empty()：删除元素的子元素

---

### CSS关联 ###

1. $elem.addClass(class)：添加一个或多个类

2. $elem.removeClass(class)：删除一个或多个类

3. $elem.toggleClass(class)：切换使用addClass()和removeClass()

4. $elem.css([{params}])：设置或返回样式属性

---

### 尺寸 ###

1. $elem.width([val])：设置或返回元素的宽度(不包括内边距、边框或外边距)，val参数为数值

2. $elem.height([val])：设置或返回元素的高度

3. $elem.innerWidth()：返回元素的包括内边距在内的宽度

4. $elem.innerHeight()：返回元素的包括内边距在内的高度

5. $elem.outerWidth()：返回元素的包括内边距和边框的宽度

6. $elem.outerHeight()：返回元素的包括内边距和边框在内的高度

---

### 遍历 ###

1. $elem.parent()：返回元素的直接父元素

2. $elem.parents([selector])：返回元素的所有祖先元素，接收一个可选的选择器参数作为筛选依据

3. $elem.children([selector])：返回元素的所有直接子元素，可筛选

4. $elem.find([selector])：返回元素的所有后代元素，可筛选

5. $elem.siblings([selector])：返回元素的所有同胞元素，可筛选

6. $elem.next()：返回元素的下一个同胞元素

7. $elem.nextAll([selector])：返回元素之后的所有同胞元素，可筛选

8. $elem.prev()：返回元素的前一个同胞元素

9. $elem.prevAll([selector])：返回元素之前的所有同胞元素，可筛选

10. $elem.first()：返回第一个被选元素

11. $elem.last()：返回最后一个被选元素

12. $elem.eq(index)：返回指定索引位置(由0开始)的元素

13. $elem.filter(selector)：返回被选元素中符合筛选依据的元素

14. $elem.not(selector)：返回被选元素中不符合筛选依据的元素，与filter()正好相反

---

### Ajax ###

1. $elem.load(URL, [data, callback])：加载指定页面内容到元素中。URL为操作文件位置(html文件可以额外指定选择器筛选内容)；data为POST到指定页面的数据(是一个对象)；callback为load()调用后执行的函数，可以在函数内使用三个参数：resTxt(响应信息)、statusTxt(响应结果，”success”表示成功，”error”表示出错)、xhr(XMLHttpRequest对象)。

2. $.get(URL, [callback])：通过HTTP GET请求获取服务器上的数据，callback函数内可以使用两个参数：data(返回数据)、status(响应状态)。

3. $.post(URL, [data, callback])：通过HTTP POST请求发送数据到服务器，data为要发送的数据(是一个对象)，callback函数同get()的callback。

4. $.ajax({params})：通过HTTP请求加载远程数据。该方法是jQuery底层AJAX实现。简单易用的高层实现见$.get(), $.post()等。$.ajax()返回其创建的XMLHttpRequest对象。大多数情况下你无需直接操作该函数，除非你需要操作不常用的选项，以获得更多的灵活性。最简单的情况下，$.ajax() 可以不带任何参数直接使用。params参数包括：
	1. Options  

		类型：Object  
		可选。AJAX 请求设置。所有选项都是可选的。

	2. Async  

		类型：Boolean  
		默认值：true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。  
		注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。

	3. beforeSend(XHR)  

		类型：Function  
		发送请求前可修改XMLHttpRequest对象的函数，如添加自定义 HTTP 头。  
		XMLHttpRequest对象是唯一的参数。  
		这是一个Ajax事件。如果返回false可以取消本次ajax请求。

	4. cache  

		类型：Boolean  
		默认值：true，dataType为script和jsonp时默认为 false。设置为false将不缓存此页面。

	5. complete(XHR, TS)  

		类型：Function  
		请求完成后回调函数 (请求成功或失败之后均调用)。  
		参数：XMLHttpRequest对象和一个描述请求类型的字符串。  
		这是一个Ajax事件。

	6. contentType  

		类型：String  
		默认值："application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型。  
		默认值适合大多数情况。如果你明确地传递了一个content-type给$.ajax()那么它必定会发送给服务器（即使没有数据要发送）。

	7. context  

		类型：Object  
		这个对象用于设置Ajax相关回调函数的上下文。也就是说，让回调函数内this指向这个对象（如果不设定这个参数，那么this就指向调用本次AJAX请求时传递的options参数）。

	8. data  

		类型：String  
		发送到服务器的数据。将自动转换为请求字符串格式。GET请求中将附加在 URL 后。查看processData选项说明以禁止此自动转换。必须为Key/Value格式。如果为数组，jQuery将自动为不同值对应同一个名称。如{foo:["bar1", "bar2"]}转换为'&foo=bar1&foo=bar2'。

	9. dataFilter  

		类型：Function  
		给Ajax返回的原始数据的进行预处理的函数。提供data和type两个参数：data是Ajax返回的原始数据，type是调用jQuery.ajax时提供的dataType参数。函数返回的值将由 jQuery 进一步处理。

	10. dataType  

		类型：String  
		预期服务器返回的数据类型。如果不指定，jQuery将自动根据HTTP包MIME信息来智能判断，比如XML MIME类型就被识别为XML。JSON 会生成一个JavaScript对象，而script则会执行这个脚本。随后服务器端返回的数据会根据这个值解析后，传递给回调函数。  

		可用值:

		- "xml": 返回XML文档，可用jQuery处理。
		- "html": 返回纯文本HTML信息；包含的script标签会在插入dom时执行。
		- "script": 返回纯文本JavaScript代码。不会自动缓存结果。除非设置了"cache"参数。注意：在远程请求时(不在同一个域下)，所有POST请求都将转为GET请求。（因为将使用DOM的script标签来加载）
		- "json": 返回JSON数据 。
		- "jsonp": JSONP格式。使用JSONP形式调用函数时，如"myurl?callback=?" jQuery将自动替换?为正确的函数名，以执行回调函数。
		- "text": 返回纯文本字符串

	11. error  

		类型：Function  
		默认值: 自动判断 (xml 或 html)。请求失败时调用此函数。  
		有以下三个参数：XMLHttpRequest对象、错误信息、（可选）捕获的异常对象。  
		如果发生了错误，错误信息（第二个参数）除了得到null之外，还可能是"timeout"，"error"，"notmodified"和"parsererror"。  
		这是一个Ajax事件。

	12. global  

		类型：Boolean  
		是否触发全局AJAX事件。  
		默认值：true。设置为false将不会触发全局AJAX事件，如ajaxStart或ajaxStop可用于控制不同的Ajax事件。

	13. ifModified  

		类型：Boolean  
		仅在服务器数据改变时获取新数据。  
		默认值：false。使用HTTP包Last-Modified头信息判断。它也会检查服务器指定的'etag'来确定数据没有被修改过。

	14. jsonp  

		类型：String  
		在一个jsonp请求中重写回调函数的名字。这个值用来替代在"callback=?"这种GET或POST请求中URL参数里的"callback"部分，比如{jsonp:'onJsonPLoad'}会导致将"onJsonPLoad=?"传给服务器。

	15. jsonpCallback  

		类型：String  
		为jsonp请求指定一个回调函数名。这个值将用来取代jQuery自动生成的随机函数名。这主要用来让jQuery生成度独特的函数名，这样管理请求更容易，也能方便地提供回调函数和错误处理。你也可以在想让浏览器缓存GET请求的时候，指定这个回调函数名。

	16. password  

		类型：String  
		用于响应HTTP访问认证请求的密码

	17. processData  

		类型：Boolean  
		默认值：true。默认情况下，通过data选项传递进来的数据，如果是一个对象(技术上讲只要不是字符串)，都会处理转化成一个查询字符串，以配合默认内容类型 "application/x-www-form-urlencoded"。如果要发送 DOM 树信息或其它不希望转换的信息，请设置为false。

	18. scriptCharset  

		类型：String  
		只有当请求时dataType为"jsonp"或"script"，并且type是"GET"才会用于强制修改charset。通常只在本地和远程的内容编码不同时使用。

	19. success  

		类型：Function  
		请求成功后的回调函数。  
		参数：由服务器返回，并根据dataType参数进行处理后的数据；描述状态的字符串。  
		这是一个Ajax事件。

	20. traditional  

		类型：Boolean  
		如果你想要用传统的方式来序列化数据，那么就设置为true。

	21. timeout  

		类型：Number  
		设置请求超时时间（毫秒）。此设置将覆盖全局设置。

	22. type  

		类型：String  
		默认值："GET"。请求方式("POST"或"GET")， 默认为"GET"。注意：其它HTTP请求方法，如PUT和DELETE也可以使用，但仅部分浏览器支持。

	23. url  

		类型：String  
		默认值: 当前页地址。发送请求的地址。

	24. username  

		类型：String  
		用于响应HTTP访问认证请求的用户名。

	25. xhr  

		类型：Function  
		需要返回一个XMLHttpRequest对象。默认在IE下是ActiveXObject而其他情况下是XMLHttpRequest。用于重写或者提供一个增强的XMLHttpRequest对象。

---

```
ARTICLE_ID      : 14
POST_DATE       : 2017/08/19
RECENTLY_MODIFY : 2017/08/19
TIME_COUNTER    : 0D
AUTHER          : WJT20
```
