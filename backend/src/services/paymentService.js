const Payment = require('../models/Payment');

const processPayment = async (userId, amount, paymentMethod) => {
  // mock de processamento de pagamento
  await new Promise(resolve => setTimeout(resolve, 1000));
  const paymentResult = {
    status: 'succeeded',
    gatewayTransactionId: `mock_txn_${Date.now()}`,
    };
    // Salva o registro desse pagamento no nosso banco
  try {
    const paymentRecord = new Payment({
      user: userId,
      amount: amount,
      method: paymentMethod,
      status: paymentResult.status,
      gatewayTransactionId: paymentResult.gatewayTransactionId,
    });
    await paymentRecord.save();
    
    return paymentRecord;
  } catch (err) {
    console.error("Erro ao salvar registro de pagamento:", err);
    throw new Error("Falha ao registrar o pagamento no banco de dados.");
  }
};

module.exports = {
  processPayment,
};