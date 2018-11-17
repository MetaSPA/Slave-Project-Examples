const MetaSPAPlugin = require("@metaspa/meta-spa-webpack-plugin").default;
const ManifestPlugin = require("webpack-manifest-plugin");
module.exports = {
    baseUrl: "/vue/public",
    css: {
        extract: false,
    },
    chainWebpack: config => {
        config.plugin("manifest").use(
            new ManifestPlugin({
                filter: option =>
                    option.name === "app.js" || option.name === "chunk-vendors.js"
            })
        );
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
