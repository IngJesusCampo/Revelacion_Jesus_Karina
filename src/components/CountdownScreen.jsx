import { useEffect, useRef, useState } from "react";

function CountdownScreen({ onComplete }) {
  const [countdown, setCountdown] = useState(10);
  const [showReveal, setShowReveal] = useState(false);
  const [progress, setProgress] = useState(0);

  const getTargetTime = () => {
    const now = new Date();
    const targetTime = new Date(now);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const isEurope = ["Europe/Madrid", "Europe/Rome", "Europe/Paris", "Europe/Berlin", "Europe/Andorra", "Europe/Valencia"].includes(timeZone);
    const isGuatemala = ["America/Guatemala"].includes(timeZone);

    // Colombia time: 16:00. In Europe (Italy/Spain) that's 23:00 local.
    // Guatemala is UTC-6 (one hour behind Colombia), so equivalent local hour is 15:00.
    const targetHour = isEurope ? 23 : isGuatemala ? 15 : 16;
    targetTime.setHours(targetHour, 0, 0, 0);
    return targetTime;
  };

  const getNoticeText = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const isEurope = ["Europe/Madrid", "Europe/Rome", "Europe/Paris", "Europe/Berlin", "Europe/Andorra", "Europe/Valencia"].includes(timeZone);
    const isGuatemala = ["America/Guatemala"].includes(timeZone);

    if (isEurope) {
      return "La revelación estará disponible el 16 de julio de 2026 a las 4:00 p. m. hora Colombia, que equivale a las 11:00 p. m. en Italia/España.";
    }

    if (isGuatemala) {
      return "La revelación estará disponible el 16 de julio de 2026 a las 4:00 p. m. hora Colombia, que equivale a las 3:00 p. m. en Guatemala.";
    }

    return "La revelación estará disponible el 16 de julio de 2026 a las 4:00 p. m. hora Colombia.";
  };

  const [isWaiting, setIsWaiting] = useState(() => {
    const now = new Date();
    const targetTime = getTargetTime();
    return now < targetTime;
  });
  const targetTimeRef = useRef(null);

  useEffect(() => {
    targetTimeRef.current = getTargetTime();

    const now = new Date();
    if (now >= targetTimeRef.current) {
      setIsWaiting(false);
      setCountdown(10);
      setShowReveal(false);
      setProgress(0);
    }
  }, []);

  useEffect(() => {
    if (!isWaiting) {
      return undefined;
    }

    const waitingTimer = window.setInterval(() => {
      const now = new Date();
      if (targetTimeRef.current && now >= targetTimeRef.current) {
        setIsWaiting(false);
        setCountdown(10);
        setShowReveal(false);
        setProgress(0);
      }
    }, 1000);

    return () => window.clearInterval(waitingTimer);
  }, [isWaiting]);

  useEffect(() => {
    if (isWaiting) {
      return undefined;
    }

    if (countdown <= 0) {
      setShowReveal(true);
      const progressTimer = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            window.clearInterval(progressTimer);
            window.setTimeout(() => onComplete(), 1200);
            return 100;
          }
          return prev + 1;
        });
      }, 80);

      return () => window.clearInterval(progressTimer);
    }

    const timer = window.setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [countdown, isWaiting, onComplete]);

  const babyType = countdown % 2 === 0 ? "girl" : "boy";
  const babyLabel = babyType === "girl" ? "Una niña" : "Un niño";

  return (
    <section className="countdown-screen">
      <div className="countdown-card">
        <p className="eyebrow">✨ El momento está llegando ✨</p>
        <h1>{isWaiting ? "Aún no es el momento" : "¡Vamos a descubrirlo!"}</h1>

        {isWaiting ? (
          <>
            <div className="celebration">⏳🌙✨</div>
            <div className="reveal-box reveal-box-large">
              <span>{getNoticeText()}</span>
              <strong>Por favor, visítanos en esa hora</strong>
            </div>
            <div className="baby-stage" aria-live="polite">
              <div className="baby-crawl-track">
                <div className="baby-crawl girl">👧</div>
                <div className="baby-crawl boy">👦</div>
              </div>
            </div>
          </>
        ) : showReveal ? (
          <>
            <div className="celebration">🎉🎈✨</div>
            <div className="reveal-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <p>{progress}%</p>
            </div>
            <div className="reveal-box reveal-box-large">
              <span>Preparando la sorpresa</span>
              <strong>✨</strong>
            </div>
          </>
        ) : (
          <>
            <div className="countdown-number">{countdown}</div>

            <div className="baby-stage" aria-live="polite">
              <div className={`baby-crawl ${babyType}`}>
                {babyType === "girl" ? "👧" : "👦"}
              </div>
              <p className="baby-caption">{babyLabel} está a punto de aparecer</p>
            </div>

            <div className="baby-track" role="presentation">
              {Array.from({ length: 10 }, (_, index) => {
                const icon = index % 2 === 0 ? "👧" : "👦";
                const active = index + 1 >= countdown;
                return (
                  <span key={index} className={`track-icon ${active ? "active" : ""}`}>
                    {icon}
                  </span>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default CountdownScreen;
