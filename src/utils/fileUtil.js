//封装文件操作的方法
const fileUtil = {

    //根据get方法和url下载文件
    downloadFileByGet(axios, url) {
        axios.get(url, {responseType: 'blob'})
            .then((response) => {
                //下载文件流
                let blob = new Blob([response.data], {type: 'application/ms-excel;charset=utf-8'})
                let downloadElement = document.createElement('a')
                let href = window.URL.createObjectURL(blob);  //创建下载的链接
                downloadElement.href = href
                downloadElement.download = response.headers['filename'];  //下载后文件名
                document.body.appendChild(downloadElement);
                downloadElement.click();    //点击下载
                document.body.removeChild(downloadElement);//下载完成移除元素
                window.URL.revokeObjectURL(href);   //释放blob对象
                return response.data
            })
    },
    downloadFileByPost(axios, url, data) {
        axios.post(url, data, {responseType: 'blob'})
            .then((response) => {
                //下载文件流
                let blob = new Blob([response.data], {type: 'application/ms-excel;charset=utf-8'})
                let downloadElement = document.createElement('a')
                let href = window.URL.createObjectURL(blob);  //创建下载的链接
                downloadElement.href = href
                downloadElement.download = response.headers['filename'];  //下载后文件名
                document.body.appendChild(downloadElement);
                downloadElement.click();    //点击下载
                document.body.removeChild(downloadElement);//下载完成移除元素
                window.URL.revokeObjectURL(href);   //释放blob对象
                return response.data
            })
    },


}
module.exports = fileUtil;