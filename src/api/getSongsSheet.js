// http://3362u865n6.zicp.vip/user/playlist?uid=48693483

import request from "../utils/request";
// 货品列表,获取所有下拉框可选数据的api接口
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