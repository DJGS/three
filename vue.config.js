/*
 * 构建配置
 * https://cli.vuejs.org/zh/
 */

const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const moment = require('moment');

const currentTime = moment().format('YYYYMMDD-HHmmss');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    // 解决运行时报错
    runtimeCompiler: true,
    chainWebpack: (config) => {
        // 创建别名
        config.resolve.alias
            .set('@scss', resolve('src/resources/scss'))
            .set('@images', resolve('src/resources/images'))
            .set('@services', resolve('src/services'))
            .set('@utils', resolve('src/utils'))
            .set('@pages', resolve('src/pages'))
            .set('@routers', resolve('src/routers'))
            .set('@static', resolve('public/static'))
            .set('@components', resolve('src/components'));

        // 打包构建
        if (process.env.NODE_ENV === 'production') {
            config.plugin('compress').use(FileManagerPlugin, [
                {
                    onEnd: {
                        delete: ['./release/*.zip'],
                        archive: [
                            {
                                source: './dist',
                                destination: `./release/${currentTime}.zip`,
                            },
                        ],
                    },
                },
            ]);
        }
    },
    baseUrl: '/',
    devServer: {
        proxy: {
            '/cyberange': {
                target: 'http://10.11.24.70:9003',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/cyberange': '/cyberange',
                },
            },
        },
    },
};
