// 封装G6自定义事件

import G6 from '@antv/g6';
import serverImg from '@images/icon-server.svg';
import i18n from '../languages/lang';

// 点击添加设备方法
G6.registerBehavior('click-add-node', {
    getEvents() {
        return {
            'canvas:click': 'onClick',
        };
    },

    onClick(ev) {
        const graph = this.graph;

        // 服务器模版
        let serverNode = {
            id: G6.Util.uniqueId(),
            x: ev.x,
            y: ev.y,
            type: 'server',
            shape: 'image',
            img: serverImg,
            label: i18n.t('sceneManage.server'),
        };

        graph.addItem('node', serverNode);
    },
});

// 点击添加边的交互
G6.registerBehavior('click-add-edge', {
    getEvents() {
        return {
            'node:click': 'onClick',
            mousemove: 'onMousemove',
            'edge:click': 'onEdgeClick',
        };
    },
    onClick(ev) {
        const node = ev.item;
        const graph = this.graph;
        const point = { x: ev.x, y: ev.y };
        const model = node.getModel();

        // 添加边
        if (this.addingEdge && this.edge) {
            // 如果source类型和target类型相同 不能连线
            let sourceModel = this.edge.getSource().getModel();
            if (sourceModel.type == model.type) {
                return;
            }

            graph.updateItem(this.edge, {
                target: model.id,
            });

            this.edge = null;
            this.addingEdge = false;
        }
        // 如果还没有边
        else {
            this.edge = graph.addItem('edge', {
                source: model.id,
                target: point,
            });
            this.addingEdge = true;
        }
    },
    onMousemove(ev) {
        const point = { x: ev.x, y: ev.y };
        if (this.addingEdge && this.edge) {
            this.graph.updateItem(this.edge, {
                target: point,
            });
        }
    },
    onEdgeClick(ev) {
        const currentEdge = ev.item;
        const graph = this.graph;

        // 拖拽过程中，点击会点击到新增的边上
        if (this.addingEdge && this.edge == currentEdge) {
            graph.removeItem(this.edge);
            this.edge = null;
            this.addingEdge = false;
        }
    },
});

export default G6;
