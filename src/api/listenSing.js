import request from "../utils/request";
// 货品列表,获取所有下拉框可选数据的api接口
export function nowListenMusic(uid) {
    const id = {
        id: uid
    };
    return request({
        url: "/song/url",
        method: "get",
        params: id
    });
}

// simi/playlist?id=167876
// 获取相似歌曲曲目的歌单
export function getSimPlayList(id) {
    return request({
        url: "api/simi/playlist",
        method: "get",
        params: id
    });
}

// simi/song?id=167876
export function getSimPlaysings(id) {
    return request({
        url: "api/simi/song",
        method: "get",
        params: id
    });
}
// 评论歌曲
// /comment
export function submitComment(info) {
    var obj = {
        t: 1,
        type: 0,
        id: 0,
        content: ""
    };
    obj = Object.assign(obj, info);
    return request({
        url: "api/comment",
        method: "get",
        params: obj
    });
}