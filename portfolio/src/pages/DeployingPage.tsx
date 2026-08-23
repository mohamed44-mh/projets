import { useSearchParams } from 'react-router-dom';

const DeployingPage = () => {
  const [searchParams] = useSearchParams();
  const lang = (searchParams.get('lang') || 'FR') as 'FR' | 'EN';
  const isFR = lang === 'FR';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>

      {/* Text */}
      <p style={{ animation: 'shimmer 2.6s ease-in-out infinite', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.1em', color: '#374151', textTransform: 'uppercase', margin: 0 }}>
        {isFR ? 'En cours de déploiement' : 'Deployment in progress'}
      </p>

      {/* 3 dots */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#6b7280',
              display: 'inline-block',
              animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.5; letter-spacing: 0.08em; }
          50%       { opacity: 1;   letter-spacing: 0.2em; }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%           { transform: translateY(-7px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default DeployingPage;
