// 全局常量配置
const PROXY_URL = '/proxy/';    // 适用于 Cloudflare 等平台的代理设置
const SEARCH_HISTORY_KEY = 'videoSearchHistory';
const MAX_HISTORY_ITEMS = 5;

// 密码保护配置
const PASSWORD_CONFIG = {
    localStorageKey: 'passwordVerified',
    verificationTTL: 90 * 24 * 60 * 60 * 1000  // 90天有效期
};

// 网站信息配置
const SITE_CONFIG = {
    name: 'LibreTV',
    url: 'https://libretv.is-an.org',
    description: '免费在线视频搜索与观看平台',
    logo: 'image/logo.png',
    version: '1.0.6'
};

// API站点配置 - 整合所有可用数据源
const API_SITES = {
    // 之前确认可用的数据源
    '360zy': {
        api: 'https://360zy.com/api.php/provide/vod/',
        name: '360资源',
        group: '已验证可用',
        isActive: true,
        adult: false,
        priority: 1  // 优先级1-10，1最高
    },
    
    // 最新提供的API源
    lkvod: {
        api: 'https://api.lkvod.org/api.php/provide/vod/',
        name: 'LK影视资源',
        group: '主流影视',
        isActive: true,
        adult: false,
        priority: 2
    },
    oulevod: {
        api: 'https://api.oulevod.com/api.php/provide/vod/',
        name: '欧乐影视',
        group: '主流影视',
        isActive: true,
        adult: false,
        priority: 2
    },
    shanyihu: {
        api: 'https://api.shanyi.hu/api.php/provide/vod/',
        name: '善艺影视',
        group: '综合资源',
        isActive: true,
        adult: false,
        priority: 3
    },
    wolongzyw: {
        api: 'https://collect.wolongzyw.com/api.php/provide/vod/',
        name: '卧龙资源',
        group: '备用资源',
        isActive: true,
        adult: false,
        priority: 4
    },
    bfzy: {
        api: 'https://bfzy.zbqm.top/api.php/provide/vod/',
        name: '暴风影视',
        group: '高清专线',
        isActive: true,
        adult: false,
        priority: 2
    },
    '4kjiexi': {
        api: 'https://4kjiexi.com/api.php/provide/vod/',
        name: '4K解析',
        group: '高清专线',
        isActive: true,
        adult: false,
        priority: 2
    },
    alizy: {
        api: 'https://alizy.com/api.php/provide/vod/',
        name: '阿里影视',
        group: '云存储资源',
        isActive: true,
        adult: false,
        priority: 3
    },
    aliyunzy: {
        api: 'https://aliyunzy.com/api.php/provide/vod/',
        name: '阿里云影视',
        group: '云存储资源',
        isActive: true,
        adult: false,
        priority: 3
    },
    panzyapi: {
        api: 'https://panzyapi.com/api.php/provide/vod/',
        name: '云盘资源',
        group: '云存储资源',
        isActive: true,
        adult: false,
        priority: 3
    },
    quarkzy: {
        api: 'https://quarkzy.com/api.php/provide/vod/',
        name: '夸克影视',
        group: '极速专线',
        isActive: true,
        adult: false,
        priority: 3
    },
    
    // 其他历史可用源（保留作为备用）
    btysw: {
        api: 'https://api.btysw.com/api.php/provide/vod/',
        name: '北斗影视',
        group: '备用资源',
        isActive: true,
        adult: false,
        priority: 5
    },
    m1905: {
        api: 'https://api.m1905zy.com/api.php/provide/vod/',
        name: '1905影视',
        group: '备用资源',
        isActive: true,
        adult: false,
        priority: 5
    }
};

// 定义合并方法
function extendAPISites(newSites) {
    Object.assign(API_SITES, newSites);
}

// 暴露到全局
window.API_SITES = API_SITES;
window.extendAPISites = extendAPISites;

// 聚合搜索配置（基于优先级优化）
const AGGREGATED_SEARCH_CONFIG = {
    enabled: true,
    timeout: 12000,
    maxResults: 8000,
    parallelRequests: false,
    showSourceBadges: true,
    retryFailedSources: true,
    retryCount: 1,
    prioritizeByPriority: true,  // 按优先级排序结果
    maxConcurrent: 2  // 同时请求的源数量
};

// API请求配置
const API_CONFIG = {
    search: {
        path: '?ac=videolist&wd=',
        pagePath: '?ac=videolist&wd={query}&pg={page}',
        maxPages: 20,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Referer': 'https://www.baidu.com/',
            'X-Requested-With': 'XMLHttpRequest'
        }
    },
    detail: {
        path: '?ac=videolist&ids=',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Referer': 'https://www.baidu.com/'
        }
    }
};

// 其他配置保持优化状态
const M3U8_PATTERN = /\$https?:\/\/[^"'\s]+?\.m3u8/g;
const CUSTOM_PLAYER_URL = 'player.html';

const PLAYER_CONFIG = {
    autoplay: false,
    allowFullscreen: true,
    width: '100%',
    height: '650',
    timeout: 20000,
    filterAds: true,
    autoPlayNext: true,
    adFilteringEnabled: true,
    adFilteringStorage: 'adFilteringEnabled',
    fallbackPlayers: ['hls.js', 'native']
};

const ERROR_MESSAGES = {
    NETWORK_ERROR: '网络连接错误，请检查网络设置',
    TIMEOUT_ERROR: '请求超时，尝试更换其他数据源',
    API_ERROR: 'API接口返回错误，已自动切换备用源',
    PLAYER_ERROR: '播放器加载失败，尝试切换播放线路',
    UNKNOWN_ERROR: '发生未知错误，请刷新页面重试'
};

const SECURITY_CONFIG = {
    enableXSSProtection: true,
    sanitizeUrls: true,
    maxQueryLength: 100
};

const CUSTOM_API_CONFIG = {
    separator: ',',
    maxSources: 8,
    testTimeout: 10000,
    namePrefix: 'Custom-',
    validateUrl: true,
    cacheResults: true,
    cacheExpiry: 5184000000,
    adultPropName: 'isAdult'
};

const HIDE_BUILTIN_ADULT_APIS = false;
    
