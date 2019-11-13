this.landingPay(
  { 
    params, 
    callback : (res) => {
      // res 为一个promise
      res.then((data) => {
        // 此处的data 为 requestData
      })
    }
  }
)

function landingPay (payload) {
  let requestData = 1111
  // 此处会返回一个promise对象
  payload.callback(requestData)
}