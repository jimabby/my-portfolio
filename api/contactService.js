const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 150;
const MAX_MESSAGE_LENGTH = 2000;

function validateContactBody(body) {
  const { name, email, message, company = '', renderedAt } = body || {};

  if (company) return { spam: true };
  if (
    typeof renderedAt !== 'number' ||
    !Number.isFinite(renderedAt) ||
    Date.now() - renderedAt < 2000
  ) {
    return { spam: true };
  }
  if (!name || typeof name !== 'string' || !name.trim() || name.length > MAX_NAME_LENGTH) {
    return { error: 'Invalid name', status: 400 };
  }
  if (
    !email ||
    typeof email !== 'string' ||
    email.length > MAX_EMAIL_LENGTH ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return { error: 'Invalid email', status: 400 };
  }
  if (
    !message ||
    typeof message !== 'string' ||
    !message.trim() ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return { error: 'Invalid message', status: 400 };
  }

  return {
    ok: true,
    fields: {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    },
  };
}

async function sendContactEmail(fields, config = process.env) {
  const serviceId = config.EMAILJS_SERVICE_ID;
  const templateId = config.EMAILJS_TEMPLATE_ID;
  const publicKey = config.EMAILJS_PUBLIC_KEY;
  const privateKey = config.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('Email service not configured');
  }

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey || undefined,
      template_params: fields,
    }),
  });

  if (!response.ok) {
    throw new Error(`Email service returned ${response.status}`);
  }
}

module.exports = { validateContactBody, sendContactEmail };
