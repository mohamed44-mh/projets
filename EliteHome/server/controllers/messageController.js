const MessageLoading = require('../models/MessageLoading');
const MessageAuthContact = require('../models/MessageAuthContact');

// ─── POST /api/messages (send a message) ─────────────────────────────────────
const sendMessage = async (req, res) => {
  try {
    const { senderName, name, senderEmail, email, subject, body, message, feedback_type, isFeedback } = req.body;

    const finalName = senderName || name || (req.user ? req.user.name : '');
    const finalEmail = (senderEmail || email || (req.user ? req.user.email : '')).toLowerCase();
    const finalBody = body || message || '';
    const finalSubject = subject || feedback_type || 'Demande de contact';

    // Distinguish feedback/avis form (after auth in dashboard) from public landing contact form
    const isFeedbackForm = Boolean(
      !req.body.isPublicContact && (
        isFeedback || 
        feedback_type || 
        finalSubject === "J'aime" || 
        finalSubject === "Je n'aime pas"
      )
    );

    if (isFeedbackForm) {
      // 1. Dashboard Feedback / Avis (Auth Contact) -> Collection `messagesAuthContact`
      if (!finalBody) {
        return res.status(422).json({ message: 'Veuillez remplir votre message.' });
      }

      const COOLDOWN_HOURS = 48;
      const COOLDOWN_MS = COOLDOWN_HOURS * 60 * 60 * 1000;

      const userOrEmailFilter = [];
      if (req.user && req.user._id) {
        userOrEmailFilter.push({ sender: req.user._id });
      }
      if (finalEmail) {
        userOrEmailFilter.push({ senderEmail: finalEmail });
      }

      if (userOrEmailFilter.length > 0) {
        const lastFeedback = await MessageAuthContact.findOne({ $or: userOrEmailFilter }).sort({ createdAt: -1 });

        if (lastFeedback) {
          const now = new Date();
          const diffMs = now - new Date(lastFeedback.createdAt);

          if (diffMs < COOLDOWN_MS) {
            const remainingMs = COOLDOWN_MS - diffMs;
            const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
            const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));

            const timeMsg = remainingHours > 0 
              ? `${remainingHours} heure(s) et ${remainingMinutes} minute(s)` 
              : `${remainingMinutes} minute(s)`;

            return res.status(429).json({
              message: `Vous avez déjà envoyé un message. Vous devez attendre encore ${timeMsg} avant de pouvoir envoyer un autre message (limite de 48 heures).`,
              remainingHours,
              remainingMinutes,
            });
          }
        }
      }

      const newAuthMessage = await MessageAuthContact.create({
        sender: req.user ? req.user._id : null,
        senderName: finalName,
        senderEmail: finalEmail,
        feedback_type: feedback_type || finalSubject,
        body: finalBody,
      });

      return res.status(201).json({
        message: 'Votre message a été envoyé avec succès.',
        data: newAuthMessage,
      });

    } else {
      // 2. Landing Page Contact -> Collection `messagesLoding` (Unlimited)
      if (!finalName || !finalEmail || !finalBody) {
        return res.status(422).json({ message: 'Veuillez remplir tous les champs requis (nom, email, message).' });
      }

      const newLoadingMessage = await MessageLoading.create({
        senderName: finalName,
        senderEmail: finalEmail,
        subject: finalSubject,
        body: finalBody,
      });

      return res.status(201).json({
        message: 'Votre message a été envoyé avec succès.',
        data: newLoadingMessage,
      });
    }
  } catch (error) {
    console.error('sendMessage error:', error);
    res.status(500).json({ message: 'Échec de l\'envoi du message.' });
  }
};

// ─── GET /api/messages (get all messages) ──────────────────────────────────
const getMessages = async (req, res) => {
  try {
    const loadingMessages = await MessageLoading.find().sort({ createdAt: -1 });
    const authMessages = await MessageAuthContact.find().populate('sender', 'name email').sort({ createdAt: -1 });
    res.json({
      data: {
        messagesLoading: loadingMessages,
        messagesAuthContact: authMessages,
      }
    });
  } catch (error) {
    console.error('getMessages error:', error);
    res.status(500).json({ message: 'Failed to fetch messages.' });
  }
};

// ─── PATCH /api/messages/:id/read (mark as read) ────────────────────────────
const markAsRead = async (req, res) => {
  try {
    let message = await MessageLoading.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!message) {
      message = await MessageAuthContact.findByIdAndUpdate(
        req.params.id,
        { read: true },
        { new: true }
      );
    }
    if (!message) return res.status(404).json({ message: 'Message not found.' });
    res.json({ data: message });
  } catch (error) {
    console.error('markAsRead error:', error);
    res.status(500).json({ message: 'Failed to update message.' });
  }
};

// ─── DELETE /api/messages/:id ─────────────────────────────────────────────────
const deleteMessage = async (req, res) => {
  try {
    let message = await MessageLoading.findByIdAndDelete(req.params.id);
    if (!message) {
      message = await MessageAuthContact.findByIdAndDelete(req.params.id);
    }
    if (!message) return res.status(404).json({ message: 'Message not found.' });
    res.json({ message: 'Message deleted.' });
  } catch (error) {
    console.error('deleteMessage error:', error);
    res.status(500).json({ message: 'Failed to delete message.' });
  }
};

module.exports = { sendMessage, getMessages, markAsRead, deleteMessage };
