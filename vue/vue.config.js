const MetaSPAPlugin = require("@metaspa/meta-spa-webpack-plugin");
module.exports = {
    baseUrl: '/vue2public',
    chainWebpack: config => {
        config.plugin("metaspa").use(
            new MetaSPAPlugin({
                namespace: "TestVue",
                provide: [
                    {
                        module: "vue",
                        symbol: "Vue"
                    }
                ]
            })
        );
    }
};
