<style>
    html, body {
        width: 100%;
        height: 100%;
    },
    #map-root {
        width: 100%;
        height: 50%;
    }
</style>

<template >
    <div>
        <router-link :to="{name: 'foo'}">Go to Foo</router-link>
        <router-link :to="{name: 'bar'}">Go to Bar</router-link>
        <div id="map-root"></div>
        <router-view></router-view>
    </div>
</template>

<script>
    import { esriRequire, LAYER } from './esri'
    import config from "./config"
    import _ from "lodash"

    export default {
        data() {
            return {
                map: undefined
            };
        },
        mounted() {
            const esri = _.merge({
                    require: ["esri/map"],
                    map: {
                        node: "map-root",
                        options: {
                            logo: false,
                            sliderPosition: "top-right",
                            center: config.ENV.gridOne.center,
                            zoom: config.ENV.gridOne.initZoom,
                            fadeOnZoom: true
                            // basemap: 'dark-gray'
                        },
                        layer: undefined
                    }
                },
                this.$options.esri
            );
            esriRequire(esri.require) // 加载esri依赖
                .then(registry => {
                    // 核实map或$map实例已存在
                    return new Promise(resolve => {
                        if (esri.map) {
                            let map = new registry.Map(esri.map.node, esri.map.options);
                            //加载底图
                            if (esri.map.layer) {
                                map.addLayer(LAYER[esri.map.layer]);
                            } else {
                                map.addLayer(LAYER.base);
                                map.getLayer("base").show();
                            }
                            if (map.loaded) {
                                resolve(map);
                            } else {
                                map.on("load", () => resolve(map));
                            }
                        } else if (this.$map) {
                            resolve(this.$map);
                        }
                    });
                })
                .then(map => {
                    this.map = map;
                    // IMPROVE: 隐藏世界地图
                    // map.getLayer('layer0').hide()
                    this.$options.mapReady.call(this, map, $esri);
                    const events = this.$options.mapEvents;
                    _.keys(events).forEach(event => {
                        map.on(_.kebabCase(event), e =>
                            events[event].call(this, e, map, $esri)
                        );
                    });
                });
        },
        mapReady() {
            /* this.map is available now */
        }
    };
</script>
