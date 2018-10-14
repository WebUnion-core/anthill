
# Android第一行代码读记——数据存储(一) #

## 目录 ##

1. [持久化技术简介](#href1)
2. [文件存储](#href2)
    1. [在文件中存储数据](#href2-1)
    2. [从文件中读取数据](#href2-2)
3. [SharedPreferences存储](#href3)
    1. [在SharedPreferences中存储数据](#href3-3)
    2. [从SharedPreferences中读取数据](#href3-4)

## <a name="href1">持久化技术简介</a> ##

数据持久化就是指那些内存中的瞬时数据保存到存储设备中，保证即使在手机或电脑关机的情况下，这些数据仍然不会丢失。保存在内存中的数据处于瞬时状态，而保存在存储设备中的数据是处于持久状态的，持久化技术则提供了一种机制可以让数据在瞬时状态和持久化状态之间进行转换。

Android 中的数据持久化技术方案主要有三种: 文件存储、SharedPreferences 存储及数据库存储。

## <a name="href2">文件存储</a> ##

文件存储是 Android 中最基本的一种数据存储方式，它不会对存储的内容进行任何的格式化处理，所有数据都是原封不动地保存到文件当中的，因而它比较适合用于存储一些简单的文本数据或二进制数据。

### <a name="href2-1">在文件中存储数据</a> ###

Context 类提供了一个 openFileOutput() 方法，用于将数据存储到指定的文件中，其语法规则为:

```java
openFileOutput(FILE_NAME[, MODE])
```

1. FILE_NAME: 文件创建时的文件名，文件名中不能包含路径，Android 生成的所有文件默认存储到`/data/data/<PACKAGE_NAME>/files/`目录(实践时发现并不能找到此目录)下;

2. MODE: 文件的操作模式，其可选值有两种: MODE_PRIVATE(默认) 和 MODE_APPEND，MODE_PRIVATE 表示当指定同样文件名的时候，所写入的内容将会覆盖原文件中的内容，MODE_APPEND 则是往已存在的文件中追加内容，如果文件不存在则会创建新文件。

以下是一个将数据写入 JSON 格式文件的实例:

```java
...
public class MainActivity extends BaseActivity {
    // 将数据写入文件的方法
    public void save (String datetime) {
        String data = "{\"name\":\"WJT20\",\"datetime\":\"" + datetime + "\"}";
        FileOutputStream out = null;
        BufferedWriter writer = null;

        try {
            // out是获取到的文件流，最终传给BufferedWriter对象写入文件
            out = openFileOutput("data", Context.MODE_PRIVATE);
            writer = new BufferedWriter(new OutputStreamWriter(out));
            writer.write(data);

            Log.i("OPEN_FILE", datetime); // 保存成功就打印日志
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (writer != null) {
                    writer.close(); // 结束写入文件操作
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        save((new Date()).toString());
    }
}
```

以上代码封装了一个 save() 方法，用于将当前日期的时间戳字符串保存到名为"data"的文件中，save() 内部的具体实现分为以下几个步骤:

1. 初始化 data 变量(写入文件的数据)，调用 openFileOutput() 方法得到一个 FileOutputStream 对象，用 out 变量保存下来;
2. 实例化一个 OutputStreamWriter 对象，将 out 变量传入;
3. 实例化一个 BufferedWriter 对象，用于写文件，并将步骤2生成的 OutputStreamWriter 对象直接传入，然后将这个 BufferedWriter 保存到 writer 变量中;
4. `writer.write(data)`将 data 的内容写入文件;
5. `writer.close()`写入文件操作到此结束。

### <a name="href2-2">从文件中读取数据</a> ###

Context 类中还提供了一个 openFileInput() 方法，用于从文件中读取数据，其语法规则如下:

```java
openFileInput(FILE_NAME)
```

它只要接收要读取数据的目标文件名即可，接下来对上一节的代码做一些补充，实现读取文件数据的功能:

```java
...
public class MainActivity extends BaseActivity {
    // 将数据写入文件的方法
    public void save (String datetime) {
        ...
    }

    // 从文件读取数据的方法
    public String load () {
        FileInputStream in = null;
        BufferedReader reader = null;
        StringBuilder content = new StringBuilder();

        try {
            String line = "";

            // in同样是获取到的文件流，最终传给BufferedReader对象解析
            in = openFileInput("data");
            reader = new BufferedReader(new InputStreamReader(in));

            // readLine()读取每一行的数据
            while ((line = reader.readLine()) != null) {
                content.append(line);
            }
            Log.i("OPEN_FILE", content.toString()); // 读取成功就打印日志
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close(); // 结束读取文件操作
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return content.toString();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        save((new Date()).toString());
        load();
    }
}
```

同样的，这里将读取文件数据的操作封装成一个 load() 方法，其内部实现分为以下几个步骤:

1. 调用 openFileInput() 方法，生成一个 FileInputStream 对象，用 in 变量保存起来;
2. 实例化一个 InputStreamReader 对象，传入 in 变量;
3. 实例化一个 BufferedReader 对象，用于读文件，将步骤2生成的 InputStreamReader 对象传入，然后用 reader 变量保存这个 BufferedReader 对象;
4. `reader.readLine()`可以获取到文件中的每一行数据，用 line 变量保存起来，然后将有效的 line 值拼接到 content 上，StringBuilder 是一个用于拼接字符串的工具类;
5. 获取到完整的 content 值后，要用 toString() 方法转换为字符串返回，最后调用`reader.close()`结束读文件操作。

运行程序，Logcat 的打印日志如下图，这证明文件数据读写操作成功(第一条打印信息是 save() 打印的，第二句则是 load() 打印的):

![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w96.PNG)

## <a name="href3">SharedPreferences存储</a> ##

SharedPreferences 与文件存储不一样，它使用键值对的方式来存储数据，此外，SharedPreferences 还支持多种不同的数据类型存储，存取数据的数据类型都是一致的，即取即用可以省去一些类型转换的操作，所以 SharedPreferences 存储比文件存储要更方便。

### <a name="href3-3">在SharedPreferences中存储数据</a> ###

要在 SharedPreferences 中存储数据，首先要获取到 SharedPreferences 对象，方法主要有以下三种:

1. Context 类中的 `getSharedPreferences(FILE_NAME, MODE)` 方法: FILE_NAME 参数用于指定 SharedPreferences 文件的名称，若文件不存在则自动创建，MODE 参数用于指定操作模式，只有 MODE_PRIVATE(默认) 这种可选值，表示只有当前应用程序才可以对此 SharedPreferences 文件进行读写;

2. Acticity 类中的 `getPreferences(MODE)` 方法: 接受一个 MODE 操作模式参数，可选值同第一种方法，这个方法会自动将当前 Activity 名作为 SharedPreferences 的文件名;

3. PreferenceManager 类中的 `getDefaultSharedPreferences(CONTEXT)` 方法: 这是一个静态方法，CONTEXT 参数是一个 Context 对象，这个方法会自动使用当前应用程序的包名作为前缀来命名 SharedPreferences 文件。

得到 SharedPreferences 对象之后即可向 SharedPreferences 文件中存储数据了，主要分为以下三步:

1. 调用 SharedPreferences 对象的 edit() 方法获取一个 SharedPreferences.Editor 对象;
2. 向 SharedPreferences.Editor 对象中添加数据，添加数据的方法与数据类型有关，比如添加 String 类型的数据要用 putString() 方法，以此类推;
3. 调用 apply() 方法提交数据。

以下是往 SharedPreferences 中存储数据的实例:

```java
...
public class MainActivity extends BaseActivity {
    public void save (String datetime) {
        String data = "{\"name\":\"WJT20\",\"datetime\":\"" + datetime + "\"}";
        SharedPreferences.Editor editor = getSharedPreferences("main", MODE_PRIVATE).edit();
        editor.putString("data", data);
        editor.apply();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        save((new Date()).toString());
    }
}
```

### <a name="href3-4">从SharedPreferences中读取数据</a> ###

从 SharedPreferences 中读取数据的第一步也是获取 SharedPreferences 对象，方法与上一节一样，第二步是使用 SharedPreferences 对象的 `getXXX(KEY, DEFAULT_VALUE)` 方法获取指定 KEY(键) 的数据，DEFAULT_VALUE 参数为数据的默认值，这里的"XXX"与数据类型有关，如获取 String 类型数据使用 getString() 方法，以此类推。

在上一小节中加入读取 SharedPreferences 数据的操作:

```java
...
public class MainActivity extends BaseActivity {
    public void save (String datetime) {
        ...
    }

    public void load () {
        SharedPreferences pref = getSharedPreferences("main", MODE_PRIVATE);
        String data = pref.getString("data", "");
        Log.i("OPEN_SHAREDPREFERENCES", data);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        save((new Date()).toString());
        load();
    }
}
```

打印日志可以看到如下图信息，证明读取操作成功:

![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w97.PNG)

---

```
ARTICLE_ID : 111
POST_DATE : 2018/10/13
AUTHER : WJT20
```
