class Vertex {
    constructor(label) {
        this.label = label;
    }
}

class Graph {
    constructor(v) {
        this.vertices = v; // 顶点
        this.edges = 0; // 边
        this.adj = [];
        this.marked = [];
        for (var i = 0; i < this.vertices; ++i) {
            this.marked[i] = false;
        }
        for (var i = 0; i < this.vertices; ++i) {
            this.adj[i] = [];
        }
    }

    addEdge(v, w) {
        this.adj[v].push(w);
        this.adj[w].push(v);
        this.edges++;
    }
    showGraph() {
        for (var i = 0; i < this.vertices; ++i) {
            for (var j = 0; j < this.vertices; ++j) {
                if (this.adj[i][j] != undefined)
                    console.log(i + "->" + this.adj[i][j] + ' ');
            }
        }
    }

    dfs(v) {
        this.marked[v] = true;
        if (this.adj[v] != undefined) {
            console.log("正在预览这个顶点", v);
        }
        for (let val of this.adj[v]) {
            if (!this.marked[val]) {
                this.dfs(val)
            }
        }
    }

    bfs(v) {
        let queue = [];
        this.marked[v] = true;
        queue.push(v); // 添加到队尾
        while (queue.length > 0) {
            var v = queue.shift(); // 从队首移除
            if (v != undefined) {
                console.log("Visisted vertex: " + v);
            }

            let test = this.adj[v];

            for (let w of this.adj[v]) {
                let test2 = this.marked[w];
                if (!this.marked[w]) {
                    this.marked[w] = true;
                    queue.push(w);
                }
            }
        }
    }
}

g = new Graph(5);


g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 4);
g.showGraph()

g.bfs(0);