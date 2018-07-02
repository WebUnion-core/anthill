
# Fiddler #

1.

  ```
  oSession.oRequest["Proxy-Authorization"] = "Basic end4NDU1MzcxOnp6dDEyMzQ1NiM="
  ```

2.

  AutoResponder -> "Enable..."和"Unmatched..."勾起 -> "Add rule"如下:  

  ```
  regex:http://[^:]*:\d{4}/CQMiddlerServer/core\?cmd=(.*)
  D:\wjt20\cq\CQ_Channel_Web\data\$1.json
  ```

# CQ #

1. 模块调查:  

  - classnames
  - crypto-js

2. React

  - createClass
  - getInitialState

3. 路由设置: `D:\wjt20\cq\CQ_Channel_Web\src\routes\index.js`
