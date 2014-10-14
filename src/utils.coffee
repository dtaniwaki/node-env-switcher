module.exports =
  encodeBase64: (s) ->
    try
      new Buffer(s).toString('base64').replace(/[=]*$/, '').replace(/\+/, '-').replace(/\//, '_')
    catch err
      ''

  decodeBase64: (s) ->
    try
      while (s.length % 4) != 0
        s += '='
      new Buffer(s, 'base64').toString()
    catch
      ''
