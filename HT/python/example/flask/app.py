from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return '你确定？are you shasdasdasdasdasdas<a href="/hello">点击这里黑进百度内网</a>'

@app.route('/hello')
def hello_world2():
    return '你将受到法律的制裁<a href="/">asdasd</a>'

@app.route('/projects')
def projects():
    return 'The project page'