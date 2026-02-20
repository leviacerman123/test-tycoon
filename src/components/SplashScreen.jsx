import React from 'react';

export function SplashScreen({ status, error }) {
    return (
        <div style={{
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)',
            color: '#fff',
            fontFamily: 'system-ui, sans-serif',
            gap: '24px',
            padding: '24px',
            textAlign: 'center',
        }}>
            {/* Logo / Icon */}
            <div style={{
                fontSize: '64px',
                lineHeight: 1,
                filter: 'drop-shadow(0 0 20px rgba(99,179,237,0.5))',
            }}>
                💼
            </div>

            <div>
                <h1 style={{
                    fontSize: '28px',
                    fontWeight: '800',
                    margin: '0 0 8px',
                    background: 'linear-gradient(90deg, #63b3ed, #9f7aea)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    Telegram Tycoon
                </h1>
                <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>
                    {status === 'loading' ? 'Подключение к аккаунту...' : status === 'error' ? 'Ошибка подключения' : 'Добро пожаловать!'}
                </p>
            </div>

            {status === 'loading' && (
                <div style={{ display: 'flex', gap: '8px' }}>
                    {[0, 1, 2].map(i => (
                        <div key={i} style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: '#63b3ed',
                            animation: `bounce 1.2s ${i * 0.2}s infinite ease-in-out`,
                        }} />
                    ))}
                </div>
            )}

            {status === 'error' && (
                <div style={{
                    background: 'rgba(245,101,101,0.1)',
                    border: '1px solid rgba(245,101,101,0.3)',
                    borderRadius: '12px',
                    padding: '16px 24px',
                    maxWidth: '300px',
                }}>
                    <p style={{ margin: '0 0 4px', color: '#fc8181', fontWeight: '600' }}>⚠️ Ошибка</p>
                    <p style={{ margin: 0, color: '#fc8181', fontSize: '13px' }}>{error}</p>
                    {error?.includes('Telegram') && (
                        <p style={{ margin: '8px 0 0', color: '#718096', fontSize: '12px' }}>
                            Открой приложение через Telegram Mini App
                        </p>
                    )}
                </div>
            )}

            <style>{`
                @keyframes bounce {
                    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
                    40% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
