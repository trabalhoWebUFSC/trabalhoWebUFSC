const Payment = require('../models/Payment');

/**
 * Processa um pagamento (atualmente mockado).
 * @param {string} userId - ID do usuário que está pagando
 * @param {number} amount - Valor a ser cobrado (ex: 1250.50)
 * @param {string} paymentMethod - (Ex: 'credit_card', 'pix')
 */
const processPayment = async (userId, amount, paymentMethod) => {
  console.log(`[PaymentService] Processando pagamento de ${amount} para ${userId}...`);

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
    
    // Retorna o registro do pagamento para o bookingService
    return paymentRecord;

  } catch (err) {
    console.error("Erro ao salvar registro de pagamento:", err);
    throw new Error("Falha ao registrar o pagamento no banco de dados.");
  }
};

module.exports = {
  processPayment,
};