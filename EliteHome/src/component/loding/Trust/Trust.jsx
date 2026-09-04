import React from 'react';
import { ShieldCheck, Zap, Headset } from 'lucide-react';
import './Trust.css';

const Trust = () => {
    return (
        <section className="trust-section">
            <div className="container">
                <div className="trust-wrapper">

                    <div className="trust-item">
                        <div className="trust-icon-box">
                            <ShieldCheck size={28} />
                        </div>
                        <div>
                            <h4 className="trust-title">Sécurité Garantie</h4>
                            <p className="trust-desc">Transactions vérifiées à 100%</p>
                        </div>
                    </div>

                    <div className="trust-separator" />

                    <div className="trust-item">
                        <div className="trust-icon-box">
                            <Zap size={28} />
                        </div>
                        <div>
                            <h4 className="trust-title">Rapidité</h4>
                            <p className="trust-desc">Visites organisées en 24h</p>
                        </div>
                    </div>

                    <div className="trust-separator" />

                    <div className="trust-item">
                        <div className="trust-icon-box">
                            <Headset size={28} />
                        </div>
                        <div>
                            <h4 className="trust-title">Support 24/7</h4>
                            <p className="trust-desc">Une équipe dédiée pour vous</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Trust;
