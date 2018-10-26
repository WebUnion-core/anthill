from urllib import request
import re


class Spider():
    url = "https://news.sina.com.cn/"
    nav_1 = '<div class="nav-mod-1">[\s\S]*?</div>'
    nav_2 = '<div class="nav-mod-1 nav-w">[\s\S]*?</div>'
    nav_3 = '<div class="nav-mod-1 nav-mod-s">[\s\S]*?</div>'
    nav_child = '<li[\s\S]*?</li>'

    def __fetch_content(self):
        r = request.urlopen(Spider.url)
        htmls = r.read()
        htmls = htmls.decode('utf-8')
        return htmls

    def init(self):
        # r = self.__analysis(self.__fetch_content())
        a = self.__fetch_content()
        r = self.__analysis(a)
        ul = self.__reg_nav(r)
        return ul

    def __analysis(self, htmls):
        r_html = re.findall(Spider.nav_1, htmls)
        r_html2 = re.findall(Spider.nav_2, htmls)
        r_html2 = re.findall(Spider.nav_3, htmls)

        return [r_html,r_html2,r_html2]

    def __reg_nav(self, htmlrlist):
        result = []
        
        for v in htmlrlist:
            for vc in v:
                print("开始扒取",vc)
                reg = re.findall(Spider.nav_child, vc)
                for ar in reg:
                  rega = re.findall("<a[\s\S]*?>[\s\S]*?</a>", ar)
                  print("扒取第二层",rega)
                  result.append(rega)
        return result

spider = Spider()
result = spider.init()
