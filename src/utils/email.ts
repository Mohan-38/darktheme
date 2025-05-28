import emailjs from '@emailjs/browser';

export const sendEmail = async (templateId: string, templateParams: any) => {
  try {
    const response = await emailjs.send(
      'service_qj44izj',
      'template_k92zaj2',
      {
        ...templateParams,
        to_email: 'mohanselemophile@gmail.com'
      },
      'aImlP6dotqO-E3y6h'
    );
    return response;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};