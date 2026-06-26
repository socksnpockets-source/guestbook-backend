:root {
  --lime: #b6ff00;
  --acid: #ccff00;
  --yellow: #ffd900;
  --purple: #9d24c7;
  --hot-pink: #ff007e;
  --green-text: #006900;
  --blue: #004d94;
}

* {
  box-sizing: border-box;
}

html {
  background: #000;
}

body {
  margin: 0;
  color: var(--green-text);
  background: #000;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  line-height: 1.15;
}

a {
  color: #0000ee;
  text-decoration: underline;
}

.top-strip {
  display: grid;
  grid-template-columns: 240px 1fr;
  align-items: start;
  min-height: 70px;
  background:
    linear-gradient(#111 0 4px, transparent 4px),
    linear-gradient(180deg, #8eff00 0, #caff00 26px, #fff 27px, #fff 62px, #17a100 63px, #f7ff00 66px, #005aa5 69px);
  border-bottom: 2px solid #111;
}

.brand-bubble {
  position: relative;
  width: 220px;
  min-height: 62px;
  margin: 7px 0 0 7px;
  color: #fff;
  text-align: center;
  transform: rotate(-4deg);
}

.brand-bubble::before {
  content: "";
  position: absolute;
  inset: 18px 10px 6px 2px;
  z-index: 0;
  background: var(--blue);
  border: 3px solid #001526;
  border-radius: 50%;
  box-shadow: inset 0 0 0 2px #fff;
}

.brand-bubble::after {
  content: "";
  position: absolute;
  left: 82px;
  bottom: -3px;
  border-style: solid;
  border-width: 18px 8px 0 34px;
  border-color: var(--blue) transparent transparent transparent;
  filter: drop-shadow(0 2px 0 #001526);
}

.brand-bubble span,
.brand-bubble strong,
.brand-bubble em {
  position: relative;
  z-index: 1;
  display: block;
}

.brand-kicker {
  color: #ffff48;
  font-size: 21px;
  font-weight: 900;
  text-shadow: -1px -1px #000, 1px -1px #000, -1px 1px #000, 1px 1px #000;
}

.brand-bubble strong {
  margin-top: -1px;
  font-size: 14px;
  font-style: italic;
  letter-spacing: .2px;
}

.brand-bubble em {
  color: #fff;
  font-size: 12px;
  font-weight: 800;
}

.top-nav {
  display: flex;
  justify-content: space-around;
  gap: 16px;
  padding-top: 12px;
}

.top-nav a {
  display: grid;
  justify-items: center;
  gap: 2px;
  min-width: 82px;
  color: #0048be;
  font-size: 11px;
  text-decoration: none;
}

.top-nav span {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 50%;
  font-size: 23px;
  font-weight: 900;
  box-shadow: 0 1px 0 #5b5b5b;
}

.top-nav a:nth-child(1) span { background: #9b5cff; }
.top-nav a:nth-child(2) span { background: #ff00a6; }
.top-nav a:nth-child(3) span { background: #ff9900; }
.top-nav a:nth-child(4) span { background: #df001c; }
.top-nav a:nth-child(5) span { background: #a200d6; }

.ticker {
  padding: 4px 8px 5px;
  color: #000;
  background: #d6ff00;
  border-top: 2px solid #005aa5;
  border-bottom: 2px solid #00a800;
  font-family: "Times New Roman", Times, serif;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
}

.page-shell {
  display: grid;
  grid-template-columns: 217px 54px minmax(640px, 1fr) 166px;
  align-items: stretch;
  max-width: 1500px;
  min-height: calc(100vh - 98px);
  margin: 0 auto;
  background: linear-gradient(90deg, var(--yellow) 0 217px, #000 217px 271px, #fff 271px calc(100% - 166px), var(--purple) calc(100% - 166px));
}

.left-rail {
  width: 140px;
  padding-bottom: 30px;
  color: #000;
  background: var(--yellow);
}

.date {
  margin: 4px 0 3px;
  text-align: center;
  font-size: 11px;
  font-weight: 900;
}

.parents-box {
  margin: 0 2px;
  padding: 5px 6px 7px;
  background: #ffd900;
}

.parents-box h2 {
  margin: 0 0 5px;
  padding: 8px 5px;
  color: #fff;
  background: #777;
  border: 2px solid #fff;
  border-radius: 8px;
  font-size: 12px;
  line-height: 1.28;
  letter-spacing: 4px;
}

.parents-box p {
  margin: 0 2px 5px;
  font-size: 10px;
}

.register-button {
  display: block;
  width: 80px;
  margin: 0 auto;
  padding: 2px 5px;
  color: #fff;
  background: #363636;
  border: 1px solid #fff;
  font-size: 12px;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
}

.rail-label {
  width: 72px;
  margin: 4px auto 2px;
  color: var(--hot-pink);
  background: #fff;
  font-size: 12px;
  text-align: center;
  text-decoration: underline;
}

.button-stack {
  display: grid;
  gap: 4px;
  padding: 0 13px;
}

.button-stack a {
  display: block;
  min-height: 14px;
  padding: 1px 8px;
  overflow: hidden;
  color: #000;
  background: linear-gradient(#efff35 0, #a8e000 55%, #dfff23 100%);
  border: 2px solid #1b1b1b;
  border-radius: 9px;
  box-shadow: inset 0 1px 0 #fff, 2px 2px 0 #9300a8;
  font-size: 10px;
  font-weight: 900;
  line-height: 1;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
}

.club-card {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 22px;
  padding: 8px 2px;
  color: #ff6a00;
  font-family: "Comic Sans MS", "Trebuchet MS", cursive;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
}

.club-card .key {
  color: #111;
  font-family: Arial, sans-serif;
  font-size: 31px;
  letter-spacing: -7px;
}

.talk-card {
  display: grid;
  gap: 1px;
  margin-top: 3px;
  padding: 8px 10px;
  background: #111;
  border-radius: 0 0 18px 0;
}

.talk-card a {
  display: block;
  padding: 5px 0 5px 28px;
  color: #fff;
  background:
    radial-gradient(circle at 7px 50%, #00f5ff 0 5px, transparent 6px);
  font-family: "Comic Sans MS", "Trebuchet MS", cursive;
  font-size: 13px;
  text-decoration: none;
}

.talk-card a:first-child {
  color: #b6ff00;
  background:
    radial-gradient(circle at 7px 50%, #505dff 0 5px, transparent 6px);
}

.cool-stuff {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 18px 0 0;
  padding: 4px 5px;
  color: #e60000;
  background: #fff;
  border: 1px solid #ddd;
  font-size: 11px;
  font-weight: 900;
  text-align: center;
  text-decoration: none;
}

.photo-dot {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background:
    linear-gradient(135deg, rgba(255,255,255,.45), transparent),
    repeating-linear-gradient(45deg, #eac7a4 0 5px, #72bcd5 5px 10px, #5d7b3b 10px 15px);
  border: 1px solid #5b8ca0;
}

.content {
  grid-column: 3;
  min-width: 0;
  padding: 0 54px 40px;
  background: #fff;
}

.hero-frag {
  padding-top: 2px;
  text-align: center;
}

.broken-grid {
  display: grid;
  grid-template-columns: repeat(6, 80px);
  justify-content: center;
  margin: 0 auto;
}

.broken-grid span {
  position: relative;
  height: 289px;
  border: 1px solid #c8c8c8;
  border-left: 0;
  background: #fff;
}

.broken-grid span:first-child {
  border-left: 1px solid #c8c8c8;
}

.broken-grid span::before {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  width: 13px;
  height: 13px;
  border: 1px solid #9ab6d2;
  background:
    linear-gradient(135deg, transparent 0 44%, #478848 45% 58%, transparent 59%),
    linear-gradient(45deg, #87b6ff 0 50%, #fff 51%);
}

.hero-frag h1 {
  max-width: 470px;
  margin: 0 auto 16px;
  color: #006800;
  font-size: 15px;
  line-height: 1.05;
}

.center-note {
  margin: 0 0 14px;
  font-size: 14px;
  text-align: left;
}

.news-list {
  display: grid;
  gap: 12px;
  max-width: 1000px;
}

.news-list article {
  position: relative;
  padding-left: 20px;
}

.news-list article::before {
  content: "";
  position: absolute;
  top: 1px;
  left: 0;
  width: 14px;
  height: 14px;
  border: 1px solid #9ab6d2;
  background:
    linear-gradient(135deg, transparent 0 44%, #478848 45% 58%, transparent 59%),
    linear-gradient(45deg, #87b6ff 0 50%, #fff 51%);
}

.news-list h2 {
  display: inline;
  margin: 0;
  color: var(--hot-pink);
  font-size: 15px;
}

.news-list p {
  display: inline;
  margin: 0;
  font-size: 13px;
}

.promo {
  display: flex;
  gap: 22px;
  align-items: center;
  max-width: 520px;
  margin: 34px 0 0 6px;
  color: var(--hot-pink);
}

.promo h2 {
  margin: 0;
  color: #ff8c00;
  font-family: "Comic Sans MS", "Trebuchet MS", cursive;
  font-size: 31px;
  font-weight: 400;
}

.promo p {
  margin: 4px 0 0;
  font-size: 12px;
  font-weight: 700;
}

.portrait-card {
  display: flex;
  gap: 3px;
  width: 98px;
  height: 78px;
  padding: 8px;
  border: 1px solid #ff428a;
  border-radius: 8px 8px 0 0;
}

.portrait-card span {
  flex: 1;
  border-radius: 12px 12px 4px 4px;
  background:
    radial-gradient(circle at 50% 20%, #ffd7ad 0 14px, transparent 15px),
    linear-gradient(#f8bd44 0 32px, #4fb2d5 33px);
}

.right-rail {
  grid-column: 4;
  min-width: 166px;
  padding: 105px 12px 36px;
  color: #000;
  background:
    radial-gradient(circle, var(--lime) 0 6px, transparent 7px) 0 0 / 37px 37px,
    radial-gradient(circle, transparent 0 7px, #d6ff00 8px 10px, transparent 11px) 12px 21px / 47px 47px,
    var(--purple);
  border-left: 4px solid #000;
}

.right-rail section {
  margin-bottom: 18px;
}

.channels-card,
.poll-card,
.scope-card {
  background: var(--lime);
  border: 3px solid #000;
  border-radius: 0 0 10px 10px;
  box-shadow: 2px 2px 0 #111;
}

.channels-card {
  padding: 35px 6px 6px;
}

.channels-card h2,
.poll-card h2,
.scope-card h2 {
  width: max-content;
  margin: -23px auto 7px;
  padding: 0 5px;
  color: #fff;
  background: var(--hot-pink);
  border: 2px solid #fff;
  font-size: 20px;
  line-height: .8;
  text-shadow: 1px 1px #000;
}

.channels-card a {
  display: grid;
  grid-template-columns: 42px 1fr;
  align-items: center;
  gap: 7px;
  min-height: 48px;
  color: #000;
  font-size: 11px;
  text-decoration: none;
}

.round {
  display: grid;
  place-items: center;
  width: 39px;
  height: 39px;
  color: #fff;
  border-radius: 50%;
  font-weight: 900;
}

.blue { background: #0054a6; }
.black { background: #000; }
.purple { background: #a560ff; }
.pink { background: #ff00a4; }
.white { color: var(--hot-pink); background: #fff; }

.poll-card,
.scope-card {
  padding: 8px 8px 10px;
  font-size: 11px;
}

.poll-card h2,
.scope-card h2 {
  margin-top: -13px;
  background: #111;
  font-size: 15px;
}

.poll-card p,
.scope-card p {
  margin: 3px 0 7px;
  text-align: center;
}

.poll-card label {
  display: block;
  margin: 2px 0;
  font-size: 9px;
}

.poll-card button {
  display: block;
  margin: 8px auto 6px;
  padding: 1px 10px;
  color: #fff;
  background: #e500a8;
  border: 1px solid #fff;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 900;
}

.poll-card a,
.scope-card a {
  display: block;
  text-align: center;
  font-size: 10px;
}

footer {
  max-width: 1500px;
  margin: 0 auto;
  padding: 7px;
  color: #fff;
  background: #000;
  font-size: 11px;
  text-align: center;
}

.guestbook-page {
  background:
    radial-gradient(circle, var(--lime) 0 5px, transparent 6px) 0 calc(100% - 100px) / 33px 33px,
    radial-gradient(circle, transparent 0 6px, #d6ff00 7px 9px, transparent 10px) 12px calc(100% - 86px) / 45px 45px,
    var(--purple);
}

.guestbook-shell {
  grid-template-columns: 217px 54px minmax(660px, 1fr) 31px;
  min-height: calc(100vh - 98px);
  background:
    linear-gradient(90deg, var(--yellow) 0 217px, #000 217px 271px, #fff 271px calc(100% - 31px), transparent calc(100% - 31px)),
    radial-gradient(circle, var(--lime) 0 5px, transparent 6px) 100% 0 / 33px 33px,
    radial-gradient(circle, transparent 0 6px, #d6ff00 7px 9px, transparent 10px) calc(100% - 10px) 16px / 45px 45px,
    var(--purple);
}

.guestbook-content {
  min-height: 925px;
  padding: 0 66px 42px;
  text-align: left;
}

.guestbook-purple {
  grid-column: 4;
  min-width: 31px;
  background:
    radial-gradient(circle, var(--lime) 0 5px, transparent 6px) 0 0 / 33px 33px,
    radial-gradient(circle, transparent 0 6px, #d6ff00 7px 9px, transparent 10px) 12px 16px / 45px 45px,
    var(--purple);
}

.guestbook-top-link {
  margin: 6px 0 4px;
  text-align: center;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
}

.guestbook-intro {
  max-width: 920px;
  margin: 0 auto;
}

.guestbook-intro h1 {
  position: relative;
  width: max-content;
  margin: 4px auto 12px;
  color: #48a84f;
  font-family: "Comic Sans MS", "Trebuchet MS", cursive;
  font-size: 37px;
  font-weight: 400;
  line-height: .8;
  text-align: center;
  letter-spacing: 1px;
}

.guestbook-intro h1::before {
  content: "";
  position: absolute;
  left: -22px;
  top: -4px;
  z-index: -1;
  width: 58px;
  height: 76px;
  background: #b9ff77;
  border-radius: 50%;
}

.guestbook-intro h1::after {
  content: "";
  position: absolute;
  left: 24px;
  top: -2px;
  width: 13px;
  height: 13px;
  background: #7fc028;
  border-radius: 50%;
}

.guestbook-intro h1 span {
  display: inline-block;
  transform: rotate(-5deg);
}

.guestbook-intro p {
  max-width: 910px;
  margin: 0 auto 12px;
  color: #445;
  font-family: "Courier New", Courier, monospace;
  font-size: 11px;
  line-height: 1.15;
}

.guestbook-form {
  display: grid;
  width: 328px;
  margin: 2px auto 18px;
  padding: 12px 19px 10px;
  color: #5b00bb;
  background: #c5c1ff;
  border-radius: 8px 8px 0 0;
  font-size: 11px;
}

.guestbook-form label {
  margin: 0 0 3px;
}

.guestbook-form input,
.guestbook-form textarea {
  width: 100%;
  margin: 0 0 8px;
  padding: 2px 3px;
  background: #fff;
  border: 1px solid #777;
  border-radius: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
}

.guestbook-form textarea {
  resize: vertical;
}

.guestbook-form button {
  justify-self: center;
  min-width: 47px;
  margin-top: -3px;
  padding: 1px 11px 2px;
  color: #fff;
  background: #87008d;
  border: 1px solid #d49aff;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 900;
  line-height: 1;
}

.guestbook-questions {
  position: relative;
  display: flex;
  align-items: center;
  width: 470px;
  min-height: 60px;
  margin: 0 auto 14px;
  background:
    radial-gradient(circle, #39e000 0 6px, transparent 7px) 0 0 / 18px 18px,
    #00e9eb;
  border: 1px solid #004f9e;
}

.guestbook-face {
  width: 80px;
  height: 60px;
  flex: 0 0 auto;
  border-right: 3px solid #db55ff;
  background:
    radial-gradient(circle at 50% 22px, #ffd0a8 0 17px, transparent 18px),
    radial-gradient(ellipse at 50% 18px, #dbb071 0 23px, transparent 24px),
    linear-gradient(#f3a6bd 0 100%);
}

.guestbook-questions h2 {
  margin: 0;
  color: #000;
  font-size: 26px;
  line-height: 1;
  text-shadow: 2px 2px #22ff00;
}

.guestbook-entries {
  width: 470px;
  margin: 0 auto 14px;
}

.guestbook-entries article {
  margin: 0 0 7px;
  padding: 6px 9px;
  color: #004c00;
  background: #f8fff8;
  border: 1px dotted #00a800;
}

.guestbook-entries h3 {
  display: inline;
  margin: 0;
  color: var(--hot-pink);
  font-size: 13px;
}

.guestbook-entries p {
  display: inline;
  margin: 0;
  font-size: 12px;
}

.guestbook-footer {
  max-width: 590px;
  margin: 12px auto 0;
  padding: 0;
  color: #000;
  background: transparent;
  font-size: 11px;
  line-height: 1.15;
}

.guestbook-footer p {
  margin: 4px 0;
}

@media (max-width: 980px) {
  .top-strip {
    grid-template-columns: 1fr;
  }

  .brand-bubble {
    margin: 7px auto 0;
  }

  .top-nav {
    flex-wrap: wrap;
    padding: 8px 8px 6px;
  }

  .page-shell {
    grid-template-columns: 140px 1fr;
    background: linear-gradient(90deg, var(--yellow) 0 140px, #fff 140px);
  }

  .left-rail {
    grid-column: 1;
  }

  .content {
    grid-column: 2;
    padding: 0 18px 30px;
  }

  .right-rail {
    grid-column: 1 / -1;
    padding: 32px 12px;
    border-left: 0;
    border-top: 4px solid #000;
  }

  .right-rail {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }

  .right-rail section {
    margin: 0;
  }

  .broken-grid {
    grid-template-columns: repeat(3, 80px);
  }

  .broken-grid span {
    height: 115px;
  }

  .guestbook-shell {
    grid-template-columns: 140px 1fr 31px;
    background:
      linear-gradient(90deg, var(--yellow) 0 140px, #fff 140px calc(100% - 31px), transparent calc(100% - 31px)),
      radial-gradient(circle, var(--lime) 0 5px, transparent 6px) 100% 0 / 33px 33px,
      var(--purple);
  }

  .guestbook-content {
    grid-column: 2;
    padding: 0 18px 36px;
  }

  .guestbook-purple {
    grid-column: 3;
  }

  .guestbook-intro h1 {
    font-size: 32px;
  }
}

@media (max-width: 640px) {
  body {
    font-size: 12px;
  }

  .page-shell {
    display: block;
    background: #fff;
  }

  .left-rail {
    width: 100%;
    padding: 4px 8px 14px;
  }

  .button-stack {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 0;
  }

  .content {
    padding: 0 10px 24px;
  }

  .broken-grid {
    grid-template-columns: repeat(2, 70px);
  }

  .broken-grid span {
    height: 76px;
  }

  .right-rail {
    display: block;
  }

  .right-rail section {
    margin-bottom: 16px;
  }

  .promo {
    align-items: flex-start;
  }

  .guestbook-shell {
    display: block;
    background: #fff;
  }

  .guestbook-content {
    padding: 0 10px 28px;
  }

  .guestbook-form,
  .guestbook-questions,
  .guestbook-entries {
    width: min(100%, 470px);
  }

  .guestbook-questions h2 {
    font-size: 22px;
  }

  .guestbook-purple {
    min-height: 100px;
  }
}
