import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Layout from '../../components/layout/Layout';
import Container from '../../components/ui/Container';
import Card, { CardContent } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { CONTACT_INFO } from '../../config/constants';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler l'envoi du formulaire
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Réinitialiser le statut après 5 secondes
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: MapPinIcon,
      title: 'Adresse',
      content: CONTACT_INFO.address,
      link: null
    },
    {
      icon: PhoneIcon,
      title: 'Téléphone',
      content: CONTACT_INFO.phone,
      link: `tel:${CONTACT_INFO.phone}`
    },
    {
      icon: EnvelopeIcon,
      title: 'Email',
      content: CONTACT_INFO.email,
      link: `mailto:${CONTACT_INFO.email}`
    },
    {
      icon: ClockIcon,
      title: 'Horaires',
      content: 'Lun - Ven: 8h - 18h\nSam: 8h - 13h',
      link: null
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 md:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Contactez-Nous
            </h1>
            <p className="text-lg md:text-xl text-primary-100">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding gradient-bg">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <info.icon className="h-7 w-7 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {info.title}
                    </h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-gray-600 hover:text-primary-600 transition-colors whitespace-pre-line"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-gray-600 whitespace-pre-line">
                        {info.content}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Envoyez-nous un message
                  </h2>

                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 text-sm">
                        ✓ Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      label="Nom complet"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Votre nom"
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="votre@email.com"
                      />

                      <Input
                        label="Téléphone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+228 XX XX XX XX"
                      />
                    </div>

                    <Input
                      label="Sujet"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Objet de votre message"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200"
                        placeholder="Décrivez votre demande..."
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      loading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map / Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Pourquoi nous contacter ?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">✓</span>
                      <span className="text-gray-600">Obtenir des informations sur nos terrains</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">✓</span>
                      <span className="text-gray-600">Planifier une visite de terrain</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">✓</span>
                      <span className="text-gray-600">Déclarer un terrain à vendre</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">✓</span>
                      <span className="text-gray-600">Obtenir une assistance juridique</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">✓</span>
                      <span className="text-gray-600">Poser des questions générales</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="overflow-hidden">
                <div className="h-80 bg-gray-200 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.0979654678897!2d1.2189437!3d6.1371229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023e1eaa3e9c7d1%3A0x2a2e8e3f67e8a7d1!2sLom%C3%A9%2C%20Togo!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Notre localisation"
                  ></iframe>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions <span className="text-gradient">Fréquentes</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trouvez rapidement des réponses à vos questions
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'Comment puis-je acheter un terrain ?',
                a: 'Parcourez notre catalogue, sélectionnez un terrain, contactez-nous pour une visite et nous vous accompagnerons dans toutes les démarches administratives.'
              },
              {
                q: 'Les terrains sont-ils vérifiés ?',
                a: 'Oui, tous nos terrains sont vérifiés juridiquement. Nous nous assurons que tous les documents sont conformes et authentiques.'
              },
              {
                q: 'Proposez-vous des facilités de paiement ?',
                a: 'Oui, nous proposons des plans de financement flexibles adaptés à votre budget. Contactez-nous pour en savoir plus.'
              },
              {
                q: 'Comment déclarer un terrain à vendre ?',
                a: 'Créez un compte, accédez à votre profil et utilisez le formulaire de déclaration. Notre équipe vérifiera les informations avant publication.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600">
                      {faq.a}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default Contact;
