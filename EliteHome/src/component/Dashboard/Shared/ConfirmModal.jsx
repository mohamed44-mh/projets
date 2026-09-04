import React from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, X, LogOut } from 'lucide-react';
import './ConfirmModal.css';

const ConfirmModal = ({ show, title, message, onConfirm, onCancel, confirmText, cancelText, type = 'danger', isLoading = false, loadingText }) => {
    if (!show) return null;

    const Icon = type === 'logout' ? LogOut : AlertTriangle;
    const iconClass = type === 'logout' ? 'info-icon' : 'warning-icon';

    return createPortal(
        <div className="modal-overlay" onClick={isLoading ? null : onCancel}>
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                {!isLoading && (
                    <button type="button" className="modal-close" onClick={onCancel} aria-label="Fermer">
                        <X size={20} />
                    </button>
                )}
                <div className="modal-content">
                    <div className="modal-header-main">
                        <div className={`${iconClass}-container`}>
                            <Icon size={24} className={iconClass} />
                        </div>
                        <h2>{title || 'Confirmation'}</h2>
                    </div>
                    <p className="modal-message">{message || 'Êtes-vous sûr de vouloir effectuer cette action ?'}</p>
                </div>
                <div className="modal-footer">
                    {isLoading ? (
                        <div className="modal-loading">
                            {type === 'logout' ? (
                                <div className="modal-loader-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            ) : (
                                <div className="modal-spinner"></div>
                            )}
                            <span className="loading-text">{loadingText || 'Chargement...'}</span>
                        </div>
                    ) : (
                        <>
                            <button className="btn-modal btn-cancel" onClick={onCancel}>
                                {cancelText || 'Annuler'}
                            </button>
                            <button className={`btn-modal btn-confirm btn-${type}`} onClick={onConfirm}>
                                {confirmText || (type === 'danger' ? 'Supprimer' : 'Confirmer')}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ConfirmModal;
