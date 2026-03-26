import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Stethoscope } from 'lucide-react';
import { useToast } from '@/hooks/use-toast.js';
import pb from '@/lib/pocketbaseClient.js';

const AppointmentForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const services = [
    'Fisioterapia',
    'Eletroterapia',
    'Massagem Terapêutica',
    'Drenagem Linfática',
    'Pilates',
    'Acupuntura',
    'Osteopatia',
    'Reabilitação Pós-Cirúrgica'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName || !formData.phone || !formData.email || !formData.service || !formData.preferredDate) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      await pb.collection('appointments').create(formData, { $autoCancel: false });

      toast({
        title: 'Consulta solicitada com sucesso!',
        description: 'Entraremos em contato em breve para confirmar sua consulta.',
      });

      // Reset form
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        service: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível enviar a solicitação. Por favor, tente novamente.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a7a7a] focus:border-transparent text-gray-900 bg-white transition-colors duration-200";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2";
  const iconClasses = "w-4 h-4 text-[#1a7a7a]";

  return (
    <section id="appointments" className="py-20 bg-gradient-to-b from-white to-blue-50/50">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Agende sua Consulta
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Preencha o formulário abaixo e nossa equipe entrará em contato para confirmar o melhor horário para você.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className={labelClasses}>
                  <User className={iconClasses} />
                  Nome Completo *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  required
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="phone" className={labelClasses}>
                  <Phone className={iconClasses} />
                  Telefone / WhatsApp *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  required
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={labelClasses}>
                <Mail className={iconClasses} />
                E-mail *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="service" className={labelClasses}>
                <Stethoscope className={iconClasses} />
                Serviço Desejado *
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className={`${inputClasses} appearance-none cursor-pointer`}
              >
                <option value="" disabled>Selecione um serviço</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="preferredDate" className={labelClasses}>
                  <Calendar className={iconClasses} />
                  Data de Preferência *
                </label>
                <input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="preferredTime" className={labelClasses}>
                  <Clock className={iconClasses} />
                  Horário de Preferência
                </label>
                <input
                  id="preferredTime"
                  name="preferredTime"
                  type="time"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className={labelClasses}>
                <MessageSquare className={iconClasses} />
                Mensagem Adicional
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Conte-nos um pouco mais sobre o motivo da sua consulta ou necessidades específicas..."
                rows={4}
                className={`${inputClasses} resize-y`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a7a7a] hover:bg-[#135c5c] text-white font-semibold py-4 px-6 rounded-lg text-lg transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? 'Enviando solicitação...' : 'Solicitar Agendamento'}
            </button>

            <p className="text-sm text-gray-500 text-center mt-4">
              * Campos obrigatórios
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AppointmentForm;