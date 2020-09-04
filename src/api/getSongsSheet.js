// http://3362u865n6.zicp.vip/user/playlist?uid=48693483

import request from "../utils/request";
export function getSonsSheet(uid) {
    const id = {
        id: uid
    };
    return request({
        url: "api/playlist/detail",
        method: "get",
        params: id
    });
}

// 获取歌单详情
// /playlist/detail?id=24381616

export function getPlayListDetail(uid) {
    const id = {
        id: uid
    };
    return request({
        url: "api/playlist/detail",
        method: "get",
        params: id
    });
}