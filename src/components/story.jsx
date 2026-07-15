function Story({ onBack }) {
  return (
    <section className="story-screen">
      <div className="story-card reveal-screen large-screen">
        <div className="baby-illustration" aria-hidden="true">
          <span className="icon">👶</span>
          <span className="icon">🧸</span>
          <span className="icon">🍼</span>
        </div>
        <p className="eyebrow">✨ Revelación mágica ✨</p>
        <h1>¡Ya llegó el momento!</h1>
        <p>
          El cielo ha preparado una sorpresa tan hermosa que no podía quedarse escondida por más tiempo.
          Un pequeño corazón está a punto de hacer que nuestras vidas brillen con una alegría nueva.
        </p>
        <div className="reveal-box reveal-box-large">
          <span>Será</span>
          <strong>Un príncipe</strong>
        </div>
        <p className="saludo-final">Saluden a Maximiliano Campo Moreno</p>
        <div className="story-actions">
          <button className="primary-button" onClick={onBack} type="button">
            Volver al inicio
          </button>
        </div>
      </div>
    </section>
  );
}

export default Story;