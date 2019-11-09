exports.genCode = function () {
  return Math.random().toString(16).slice(2, 6).toUpperCase()
}

exports.genExpire = function () {
  return Date.now() + 60 * 60 * 1000
}
