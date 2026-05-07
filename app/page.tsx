'use client'

export default function Home() {
  return (
    <main className="page">
      <header className="header">
        <div className="menu">≡</div>
        <span>Esther Bayer</span>
      </header>

      <section className="center">
        
        <h1>My portfolio is temporarily offline while I’m making updates.</h1>
        <p className="note">
          To request selected work samples or get in touch, please email me.
        </p>
        <a
          className="hello"
          href="mailto:hello@estherbayer.com?subject=Portfolio%20Request"
        >
          ✉ say hello
        </a>
      </section>

      <footer className="footer">
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Domine:wght@400;600;700&display=swap');

        body {
          margin: 0;
          background: #aaa4f6;
          color: #080808;
          font-family: Arial, sans-serif;
        }

        .page {
          min-height: 100vh;
          position: relative;
          padding: 36px 42px 28px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }

        .header {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 18px;
        }

        .menu {
          width: 26px;
          height: 26px;
          border-radius: 999px;
          background: #ff9adf;
          display: grid;
          place-items: center;
          font-weight: 700;
          line-height: 1;
        }

        .center {
          flex: 1;
          display: grid;
          place-items: center;
          text-align: center;
          margin-top: -40px;
        }

        .lock {
          font-size: 112px;
          line-height: 1;
          margin-bottom: 28px;
        }

        h1 {
          font-family: 'Domine', serif;
          font-size: clamp(34px, 5vw, 44px);
          line-height: 1.1;
          margin: 0;
          font-weight: 600;
        }

        .dashes {
          font-family: 'Domine', serif;
          font-size: 34px;
          letter-spacing: 4px;
          color: #2b0f46;
          margin: 20px 0 0;
        }

        .note {
          font-family: 'Domine', serif;
          font-size: 16px;
          margin-top: 28px;
          max-width: 460px;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dots {
          display: flex;
          gap: 14px;
        }

        .dots span {
          width: 26px;
          height: 26px;
          border-radius: 999px;
          display: block;
        }

        .pink { background: #ff007a; }
        .purple { background: #8c54f3; }
        .blue { background: #4538f4; }
        .cyan { background: #23d5d8; }
        .cream { background: #fff0a9; }

        .hello {
          background: #00e6aa;
          color: #050505;
          border-radius: 999px;
          padding: 7px 18px;
          text-decoration: none;
          font-size: 18px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        @media (max-width: 640px) {
          .page {
            padding: 24px;
          }

          .footer {
            gap: 24px;
            align-items: flex-start;
            flex-direction: column;
          }

          .lock {
            font-size: 88px;
          }
        }
      `}</style>
    </main>
  )
}
