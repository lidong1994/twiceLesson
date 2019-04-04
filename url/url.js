// debug  false 正式服务器   true  测试服务器
const DeBug = true;

let connect = {
  baseURL: '', //接口地址
  selfShareUrl: '', //分享接口
  shareUrl: '',//分享二维码
};

if (DeBug) {
  // 本地联调
  connect.baseURL = 'https://twice.kaicanketang.com/api/v2';
} else {
  // 正式服务器
  connect.baseURL = 'http://39.98.34.19:9000/api/';
}

module.exports = {
  connect: connect
};
