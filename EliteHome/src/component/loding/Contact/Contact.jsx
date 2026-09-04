import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import messageService from '../../../services/messageService';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'Demande de contact',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusInfo, setStatusInfo] = useState({ type: null, message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatusInfo({ type: null, message: '' });

        try {
            const res = await messageService.sendMessage({
                name: formData.name,
                email: formData.email,
                subject: formData.subject || 'Demande de contact',
                message: formData.message,
                isPublicContact: true
            });

            setStatusInfo({ type: 'success', message: res?.message || 'Merci pour votre message ! Nous vous recontacterons bientôt.' });
            setFormData({
                name: '',
                email: '',
                subject: 'Demande de contact',
                message: ''
            });
        } catch (error) {
            console.error('Error sending message:', error);
            const errMsg = error.response?.data?.message || 'Une erreur est survenue lors de l\'envoi du message.';
            setStatusInfo({ type: 'error', message: errMsg });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="contact-section" id="contact">
            <div className="contact-section-container">
                <div className="contact-text">
                    <h2>Contact</h2>
                    <p>
                        Une question ou un problème ? N'hésitez pas à nous contacter, notre équipe se fera un plaisir de vous assister et de vous répondre rapidement.
                    </p>

                    <div className="contact-methods">
                        <div className="method-item">
                            <div className="method-icon">
                                <Phone size={22} />
                            </div>
                            <div className="method-info">
                                <h3>Téléphone</h3>
                                <a href="tel:+212772001108" className="method-link">+212 772001108</a>
                            </div>
                        </div>

                        <div className="method-item">
                            <div className="method-icon">
                                <Mail size={22} />
                            </div>
                            <div className="method-info">
                                <h3>Email</h3>
                                <a href="mailto:ElitHome@gmail.com" className="method-link">ElitHome@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-form-card">
                    {statusInfo.type && (
                        <div style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            marginBottom: '1rem',
                            fontSize: '0.9rem',
                            backgroundColor: statusInfo.type === 'success' ? '#dcfce7' : '#fee2e2',
                            color: statusInfo.type === 'success' ? '#15803d' : '#b91c1c',
                            border: `1px solid ${statusInfo.type === 'success' ? '#86efac' : '#fca5a5'}`
                        }}>
                            {statusInfo.message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nom complet</label>
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                placeholder="Votre nom"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                placeholder="votre@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                name="message"
                                className="form-textarea"
                                placeholder="Comment pouvons-nous vous aider ?"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="submit-btn">
                            <Send size={18} />
                            Envoyer le message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
