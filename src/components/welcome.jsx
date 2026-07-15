function Welcome({ onStart }) {
  return (
    <section className="welcome">
      <div className="stars"></div>
      <div className="moon"></div>
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="sparkles"></div>

      <div className="card reveal-card">
        <div className="badge">✨ El gran secreto ✨</div>
        <h3>Una historia mágica está por comenzar</h3>
        <h1>Jesús & Karina</h1>
        <p>
          El cielo ha preparado un momento tan especial que pronto cambiará nuestro mundo.
        </p>
        <p className="subtext">
          Un viaje lleno de amor, esperanza y una sorpresa tan dulce como un sueño.
        </p>

        <button className="magicButton" onClick={onStart} type="button">
          ✨ Descubrir el secreto ✨
        </button>
      </div>
    </section>
  );
}

export default Welcome;