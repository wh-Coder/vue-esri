import config from './config'
import _ from "lodash"

const initJS = document.querySelector('script[data-esri-registry]')

let dojoResolve = undefined

const dojoReady = new Promise(resolve => dojoResolve = resolve)

if (window.require) {
    dojoResolve(window.require)
} else if (initJS) {
    initJS.addEventListener('load', () => dojoResolve(window.require), false)
}

const __cache__ = {}
const registry = window[initJS.dataset.esriRegistry] = {}

const singleRequire = path => new Promise(resolve => {
    let [module, alias] = path.split('|')
    alias = alias || module.split('/').pop().replace(/^\w/, _.upperCase)

    const lastAlias = __cache__[module]
    if (!lastAlias) {
        __cache__[module] = alias
    } else if (alias !== lastAlias) {
        console.warn(`[命名不一致] 注册 ${module} => ${alias} 失败，请直接使用${lastAlias}`)
        alias = lastAlias
    }
    dojoReady.then(dojoRequire => {
        dojoRequire([module], mod => {
            registry[alias] = mod
            resolve(mod)
        })
    })
})

export const esriRequire = modules => {
    return Promise.all(modules.map(singleRequire)).then(() => registry)
}

export const SYMBOL = {}

export const LAYER = {}

// 默认加载一些常用模块
esriRequire([
    'esri/map',
    'esri/symbols/PictureMarkerSymbol',
    'esri/layers/FeatureLayer',
    'esri/layers/ArcGISTiledMapServiceLayer|TiledLayer',
    'esri/layers/ArcGISDynamicMapServiceLayer|DynamicLayer'
]).then(registry => {
    SYMBOL.marker = new registry.PictureMarkerSymbol('images/map_point.png', 15, 20)
    SYMBOL.marker.setOffset(0, 10)
    const Constructor = { tiled: registry.TiledLayer, dynamic: registry.DynamicLayer, feature: registry.FeatureLayer }
    _.each(config.layers, ({ key, url, type }) => {
        let option = {}
        if(type === 'feature') {
            option = { visible: false }
        }
        const layer = new Constructor[type](url, option)
        layer.id = key
        LAYER[key] = layer
    })
})