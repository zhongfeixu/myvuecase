// 增加数据到localStorage
//商品列表
const key = "goodsList"
//新闻列表
export function addStorageData(datas) {
    const oldDatas = JSON.parse(localStorage.getItem(key)) || [];
    const newDatas = JSON.parse(datas);
    oldDatas.push(newDatas)
    localStorage.setItem(key, JSON.stringify(oldDatas))
}
// 获取本地的全部数据
export function getLocalStorage() {
    const datasArr = JSON.parse(localStorage.getItem(key)) || []
    return datasArr
}
//获取本地数据的对应的商品数量
export function getLocalStorageCount() {
    const datasArr = JSON.parse(localStorage.getItem(key))|| []
    var myCountExtent = 0;
    datasArr.forEach(function (element) {
        myCountExtent += element.count
    });
    return myCountExtent
}
//删除本地数据中对应的商品
export function deleteLocalStorageData(goodsId) {
    console.log(goodsId)
    const datasArr = JSON.parse(localStorage.getItem(key))||[];
    for (var i = datasArr.length - 1; i >= 0; i--) {
        if (datasArr[i].goodsId == goodsId) {
            datasArr.splice(i, 1);
        }
    }
    localStorage.setItem(key, JSON.stringify(datasArr))
}


//新闻列表的数据缓存
export function newsListDataCache(cacheName,datas) {
    console.log("newsListDataCache")
    localStorage.setItem(cacheName, JSON.stringify(datas))
}