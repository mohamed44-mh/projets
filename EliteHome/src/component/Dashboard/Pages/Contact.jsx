import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import './Contact.css';
import messageService from '../../../services/messageService';

const Contact = () => {
    const [feedback, setFeedback] = useState(null); // 'like' or 'dislike'
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
    const [statusMessage, setStatusMessage] = useState('');

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        
        if (!feedback) {
            setSubmitStatus('error');
            setStatusMessage('Veuillez sélectionner si vous aimez ou non.');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);
        setStatusMessage('');

        try {
            await messageService.sendMessage({
                message: feedbackMessage,
                feedback_type: feedback === 'like' ? "J'aime" : "Je n'aime pas",
                isFeedback: true
            });
            setSubmitStatus('success');
            setStatusMessage('Message envoyé avec succès ! Merci pour votre retour.');
            setFeedback(null);
            setFeedbackMessage('');
            
            // Auto-hide success message after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            const serverMsg = error.response?.data?.message || 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.';
            setSubmitStatus('error');
            setStatusMessage(serverMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-container">
            <div className="feedback-section">
                <div className="feedback-header">
                    <h2 className="feedback-title">Votre avis compte</h2>
                    <p className="feedback-subtitle">Aidez-nous à améliorer votre expérience. Aimez-vous notre nouveau site ?</p>
                </div>

                {submitStatus && (
                    <div className={`status-message ${submitStatus}`}>
                        {statusMessage}
                    </div>
                )}

                <div className="feedback-buttons">
                    <button
                        type="button"
                        className={`feedback-btn like ${feedback === 'like' ? 'active' : ''}`}
                        onClick={() => setFeedback('like')}
                    >
                        <ThumbsUp size={26} />
                        <span>J'aime</span>
                    </button>
                    <button
                        type="button"
                        className={`feedback-btn dislike ${feedback === 'dislike' ? 'active' : ''}`}
                        onClick={() => setFeedback('dislike')}
                    >
                        <ThumbsDown size={26} />
                        <span>Je n'aime pas</span>
                    </button>
                </div>

                {feedback && (
                    <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
                        <div className="form-group">
                            <label className="form-label">
                                {feedback === 'like' ? 'Qu\'est-ce que vous aimez le plus ?' : 'Qu\'est-ce que nous pouvons améliorer ?'}
                            </label>
                            <textarea
                                className="feedback-textarea"
                                placeholder="Dites-nous en plus..."
                                value={feedbackMessage}
                                onChange={(e) => setFeedbackMessage(e.target.value)}
                                required
                                rows="4"
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="submit-btn feedback-submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Envoi en cours...' : 'Envoyer mon avis'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Contact;
