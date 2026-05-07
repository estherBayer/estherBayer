'use client'

export default function Home() {
  return (
    <main className="page">
      <section className="center">
        <div className="content">
          <p className="eyebrow">Esther Bayer</p>

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
        </div>
      </section>

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
          display: grid;
          place-items: center;
          padding: 32px;
          box-sizing: border-box;
        }

        .center {
          width: 100%;
          display: grid;
          place-items: center;
          text-align: center;
        }

        .content {
          max-width: 760px;
        }

        .eyebrow {
          margin: 0 0 32px;
          font-size: 16px;
          letter-spacing: 0.02em;
        }

        h1 {
          font-family: 'Domine', serif;
          font-size: clamp(38px, 6vw, 72px);
          line-height: 1.04;
          margin: 0;
          font-weight: 600;
          letter-spacing: -0.035em;
        }

        .note {
          font-family: 'Domine', serif;
          font-size: clamp(17px, 2vw, 21px);
          line-height: 1.55;
          margin: 28px auto 34px;
          max-width: 520px;
        }

        .hello {
          background: #00e6aa;
          color: #050505;
          border-radius: 999px;
          padding: 8px 22px;
          text-decoration: none;
          font-size: 18px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.18s ease, opacity 0.18s ease;
        }

        .hello:hover {
          transform: translateY(-1px);
          opacity: 0.82;
        }

        @media (max-width: 640px) {
          .page {
            padding: 24px;
          }

          .eyebrow {
            margin-bottom: 24px;
          }

          h1 {
            font-size: clamp(34px, 11vw, 48px);
          }
        }
      `}</style>
    </main>
  )
}
