const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 150;
const MAX_MESSAGE_LENGTH = 2000;

// Minimum time a human plausibly needs between the form rendering and hitting
// send. Measured on the client with a monotonic clock and sent as a duration —
// never as an absolute timestamp, because comparing a visitor's wall clock
// against the server's would silently reject anyone whose clock runs fast.
//
// Deliberately low. A spam verdict is answered with 200 so bots learn nothing,
// which means a false positive shows the visitor "message sent" and drops the
// mail on the floor — the worst failure this form has. At 2000 ms a real
// person using password-manager autofill tripped it. Bots that submit
// instantly still do not clear 800 ms, and the honeypot catches the rest.
const MIN_FILL_MS = 800;

function validateContactBody(body) {
  const { name, email, message, company = '', elapsedMs } = body || {};

  if (company) return { spam: true };
  // A missing duration means an older cached client, not a bot — the honeypot
  // and the rate limiter still apply. Only a present, implausibly short one is
  // treated as a signal.
  if (typeof elapsedMs === 'number' && Number.isFinite(elapsedMs) && elapsedMs < MIN_FILL_MS) {
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

module.exports = { MIN_FILL_MS, validateContactBody, sendContactEmail };
