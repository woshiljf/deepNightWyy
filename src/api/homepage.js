import request from "../utils/request";
// 货品列表,获取所有下拉框可选数据的api接口
export function getHomePage() {
    return request({
        url: "api/homepage/block/page",
        method: "get"
    });
}