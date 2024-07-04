let paymentRequestData = null;

function setPaymentRequestData(data) {
  paymentRequestData = data;
}

function getPaymentRequestData() {
  return paymentRequestData;
}

module.exports = {
  setPaymentRequestData,
  getPaymentRequestData
};
