const request = require('request');

request.get({
  url: 'https://timeline-merger-ms.juejin.im/v1/get_entry_by_timeline?src=web&uid=5a16ce4f5188254dd9361351&device_id=1548144769622&token=eyJhY2Nlc3NfdG9rZW4iOiJxa2RNMHd1VW1VdXdJU3FsIiwicmVmcmVzaF90b2tlbiI6ImFnMEJRTm9RMDVGbHpDM2siLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ%3D%3D&limit=20&category=all&recomment=1',
  encoding: null
}, (err, res, body) => {
  console.log(123123);
})