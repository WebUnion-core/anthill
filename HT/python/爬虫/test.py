import urllib.request
import urllib.error

def download(url):  
    print('开始下载',url)
    try:
        html = urllib.request.urlopen(url)
    except:
        print('下载失败')
        html = None
    return html

print(download('http://httpstat.us/500'))