const isCale = function (arr,height) {
  var n = 0;
  for (var i in arr) {
    n++
  }
  if (n % 2 == 0) {
    var odd = ((n / 2) * height)
    return odd;
  } else {
    var edd = ((n / 2 + 1) * height)-60
    return edd;
  }
}
let isCales = function (arr, height) {
  var n = 0;
  for (var i in arr) {
    n++
  }
   return n*height
}

module.exports = {
  isCale: isCale,
  isCales: isCales,

}