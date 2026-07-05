const currentDate = document.querySelector("#currentDate");
const guestbookForm = document.querySelector("#guestbookForm");
const guestbookEntries = document.querySelector("#guestbookEntries");
const guestbookBackend = "https://guestbook-backend-co5f.onrender.com";
const guestbookApiBase = window.location.hostname.includes("onrender.com") ? "" : guestbookBackend;
const todayKey = new Date().toISOString().slice(0, 10);

if (currentDate) {
  currentDate.textContent = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function renderGuestbookEntry(entry) {
  const article = document.createElement("article");
  const heading = document.createElement("h3");
  const message = document.createElement("p");

  heading.textContent = entry.name || "Mystery Visitor";
  message.textContent = entry.message || "Signing the guestbook!";
  article.append(heading, " ", message);

  return article;
}

async function loadGuestbookEntries() {
  if (!guestbookEntries) {
    return;
  }

  try {
    const response = await fetch(`${guestbookApiBase}/entries`);

    if (!response.ok) {
      throw new Error("Could not load guestbook entries.");
    }

    const entries = await response.json();
    guestbookEntries.innerHTML = "";

    if (entries.length === 0) {
      guestbookEntries.append(renderGuestbookEntry({
        name: "Guestbook",
        message: "No entries yet. Be the first to sign."
      }));
      return;
    }

    entries.forEach((entry) => {
      guestbookEntries.append(renderGuestbookEntry(entry));
    });
  } catch (error) {
    console.error(error);
    guestbookEntries.innerHTML = "";
    guestbookEntries.append(renderGuestbookEntry({
      name: "Guestbook",
      message: "Could not load entries. The backend may still be waking up."
    }));
  }
}

if (guestbookEntries) {
  loadGuestbookEntries();
}

if (guestbookForm && guestbookEntries) {
  guestbookForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = guestbookForm.guestName.value.trim() || "Mystery Visitor";
    const website = guestbookForm.guestUrl.value.trim();
    const message = guestbookForm.guestMessage.value.trim() || "Signing the guestbook!";
    const button = guestbookForm.querySelector("button");

    button.textContent = "Sending...";
    button.disabled = true;

    try {
      const response = await fetch(`${guestbookApiBase}/entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, website, message })
      });

      if (!response.ok) {
        throw new Error("Could not save guestbook entry.");
      }

      const entry = await response.json();
      guestbookEntries.prepend(renderGuestbookEntry(entry));
      guestbookForm.reset();
      button.textContent = "Sent!";
    } catch (error) {
      console.error(error);
      button.textContent = "Try Again";
    } finally {
      button.disabled = false;
      window.setTimeout(() => {
        button.textContent = "Send";
      }, 1600);
    }
  });
}

const awayMessages = [
  "brb refreshing my page :P",
  "listening to track 01 on repeat",
  "go sign my guestbook!!! <3",
  "drawing pixels, dont @ me",
  "thinking about my next layout",
  "online but rearranging links",
  "webmaster currently over-caffeinated",
  "stargazing, brb in 2026"
];

const awayEl = document.querySelector("#aimAway");
const aimToggle = document.querySelector("#aimToggle");
const aimWindow = document.querySelector("#aimWindow");

if (awayEl) {
  awayEl.textContent = awayMessages[Math.floor(Math.random() * awayMessages.length)];
}

if (aimToggle && aimWindow) {
  aimToggle.addEventListener("click", () => {
    aimWindow.classList.toggle("aim-min");
  });
}

const pollQuestions = [
  {
    question: "Which section should get updated next?",
    options: ["Web Zine", "Pixel Gallery", "Button Wall", "Diary Zone"]
  },
  {
    question: "What should Bianca add to the homepage?",
    options: ["Outfit archive", "Sticker page", "Room tour", "Desktop tour"]
  },
  {
    question: "Pick today's site mood:",
    options: ["Sparkly", "Mysterious", "Mall-coded", "Sleepover"]
  },
  {
    question: "Which tiny web thing wins?",
    options: ["Blinkies", "Buttons", "Guestbooks", "Webrings"]
  },
  {
    question: "What color should get louder?",
    options: ["Hot pink", "Electric lime", "Pool blue", "Purple"]
  }
];

function seededIndex(seedText, length) {
  let seed = 0;

  for (let index = 0; index < seedText.length; index += 1) {
    seed = (seed * 33 + seedText.charCodeAt(index)) % 1000003;
  }

  return seed % length;
}

function getDailyPoll() {
  return pollQuestions[seededIndex(todayKey, pollQuestions.length)];
}

function pollStorageKey(date = todayKey) {
  return `socksandpocketsPoll-${date}`;
}

function getPollVotes(date = todayKey) {
  try {
    return JSON.parse(localStorage.getItem(pollStorageKey(date))) || {};
  } catch (error) {
    return {};
  }
}

function savePollVote(option) {
  const poll = getDailyPoll();
  const votes = getPollVotes();
  votes[option] = (votes[option] || 0) + 1;
  localStorage.setItem(pollStorageKey(), JSON.stringify(votes));
  localStorage.setItem(`socksandpocketsPollChoice-${todayKey}`, option);
  localStorage.setItem("socksandpocketsPollQuestion", poll.question);
}

function renderPollResults(container, poll, votes, selected) {
  const totalVotes = Object.values(votes).reduce((sum, value) => sum + value, 0) || 1;
  container.innerHTML = poll.options.map((option) => {
    const count = votes[option] || 0;
    const percent = Math.round((count / totalVotes) * 100);
    return `<div class="poll-result-row${option === selected ? " selected" : ""}">
      <span>${option}</span>
      <b>${percent}%</b>
      <i style="width:${percent}%"></i>
    </div>`;
  }).join("");
}

function initDailyPoll() {
  const pollCards = document.querySelectorAll(".poll-card");

  pollCards.forEach((card) => {
    const poll = getDailyPoll();
    const questionEl = card.querySelector("p strong");
    const labels = Array.from(card.querySelectorAll("label"));
    const button = card.querySelector("button");
    const archiveLink = card.querySelector("a");
    const savedChoice = localStorage.getItem(`socksandpocketsPollChoice-${todayKey}`);

    if (!questionEl || labels.length === 0 || !button) {
      return;
    }

    questionEl.textContent = poll.question;
    labels.forEach((label, index) => {
      const option = poll.options[index];
      label.innerHTML = `<input type="radio" name="poll" value="${option}"> ${option}`;
    });

    if (archiveLink) {
      archiveLink.href = "poll-results.html";
      archiveLink.textContent = "Poll Archive";
    }

    const results = document.createElement("div");
    results.className = "poll-results";
    card.insertBefore(results, archiveLink || null);

    function showResults() {
      renderPollResults(results, poll, getPollVotes(), savedChoice || localStorage.getItem(`socksandpocketsPollChoice-${todayKey}`));
      button.textContent = "VOTED";
    }

    if (savedChoice) {
      const input = card.querySelector(`input[value="${savedChoice}"]`);
      if (input) {
        input.checked = true;
      }
      showResults();
    }

    button.addEventListener("click", () => {
      const checked = card.querySelector("input[name='poll']:checked");
      if (!checked) {
        results.innerHTML = `<p class="poll-nudge">pick one first!</p>`;
        return;
      }

      savePollVote(checked.value);
      showResults();
    });
  });
}

function renderPollArchive() {
  const archive = document.querySelector("#pollArchive");
  if (!archive) {
    return;
  }

  const rows = [];
  const today = new Date();

  for (let offset = 0; offset < 7; offset += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    const key = date.toISOString().slice(0, 10);
    const poll = pollQuestions[seededIndex(key, pollQuestions.length)];
    const votes = getPollVotes(key);
    const total = Object.values(votes).reduce((sum, value) => sum + value, 0);
    const resultHtml = poll.options.map((option) => {
      const count = votes[option] || 0;
      const percent = total ? Math.round((count / total) * 100) : 0;
      return `<div class="poll-result-row"><span>${option}</span><b>${percent}%</b><i style="width:${percent}%"></i></div>`;
    }).join("");

    rows.push(`<article class="retro-panel poll-archive-day">
      <h2>${date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</h2>
      <p><strong>${poll.question}</strong></p>
      ${resultHtml}
    </article>`);
  }

  archive.innerHTML = rows.join("");
}

const horoscopeSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const horoscopeReadings = [
  "Your mood has been changing like the unpredictable weather lately. Get a grip and try to maintain some kind of balance.",
  "A tiny surprise is hiding in your usual routine. Look twice before you decide the day is boring.",
  "Someone notices the effort you put into the little details. Accept the compliment without explaining it away.",
  "Your lucky move is to clean one small corner, answer one message, and then do something purely decorative.",
  "The stars say your page needs one bold choice today: a brighter link, a louder button, or a new secret.",
  "Do not rush the redesign. Save the good version first, then follow the sparkle.",
  "A friend, link, or old bookmark brings exactly the kind of inspiration you needed.",
  "Your best idea today arrives sideways. Write it down before it turns into five other ideas.",
  "You are allowed to be dramatic about something tiny. That is how good personal websites are born.",
  "Your lucky color is electric lime. Your lucky action is clicking the link you nearly ignored.",
  "A message, guestbook note, or small sign from the universe reminds you that your work is seen.",
  "Keep your standards high and your HTML tidy enough. Perfect is less important than personal."
];

const horoscopeExtras = {
  colors: ["electric lime", "hot pink", "pool blue", "grape soda purple", "glitter silver", "sticker yellow"],
  links: ["https://guestbook-backend-co5f.onrender.com", "button-wall.html", "web-zine.html", "pixel-gallery.html", "diary-zone.html", "secret-passport.html"],
  pixels: ["tiny star", "broken image icon", "checker tile", "sparkle dot", "hot pink square", "mystery cursor"],
  omens: [
    "a link you forgot about becomes useful again",
    "a tiny graphic solves a whole layout problem",
    "someone signs your guestbook at the right time",
    "a suspicious pixel wants to be clicked",
    "your next idea is hiding in an old page",
    "the best update is smaller than you think"
  ]
};

function horoscopeIndex(sign, date, offset = 0) {
  const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const seedText = `${dateKey}-${sign}-${offset}`;
  let seed = 0;

  for (let index = 0; index < seedText.length; index += 1) {
    seed = (seed * 31 + seedText.charCodeAt(index)) % 100000;
  }

  return seed % horoscopeReadings.length;
}

function renderHoroscope(sign, offset = 0) {
  const scopeDate = document.querySelector("#scopeDate");
  const scopeSign = document.querySelector("#scopeSign");
  const scopeReading = document.querySelector("#scopeReading");
  const scopePicker = document.querySelector("#scopePicker");

  if (!scopeDate || !scopeSign || !scopeReading || !scopePicker) {
    return;
  }

  const today = new Date();
  scopeDate.textContent = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  if (!sign) {
    scopeSign.textContent = "YOU'RE THE STAR TODAY";
    scopeReading.textContent = "Choose your sign to reveal today's horoscope.";
    return;
  }

  scopePicker.value = sign;
  scopeSign.textContent = sign.toUpperCase();
  const baseIndex = horoscopeIndex(sign, today, offset);
  const luckyColor = horoscopeExtras.colors[horoscopeIndex(`${sign}-color`, today, offset) % horoscopeExtras.colors.length];
  const luckyLink = horoscopeExtras.links[horoscopeIndex(`${sign}-link`, today, offset) % horoscopeExtras.links.length];
  const luckyPixel = horoscopeExtras.pixels[horoscopeIndex(`${sign}-pixel`, today, offset) % horoscopeExtras.pixels.length];
  const webOmen = horoscopeExtras.omens[horoscopeIndex(`${sign}-omen`, today, offset) % horoscopeExtras.omens.length];
  scopeReading.innerHTML = `${horoscopeReadings[baseIndex]}<br><br>
    <b>Lucky color:</b> ${luckyColor}<br>
    <b>Lucky link:</b> <a href="${luckyLink}">${luckyLink.replace(".html", "")}</a><br>
    <b>Lucky pixel:</b> ${luckyPixel}<br>
    <b>Web omen:</b> ${webOmen}`;
}

const scopePicker = document.querySelector("#scopePicker");
const scopeNext = document.querySelector("#scopeNext");
let horoscopeOffset = 0;

if (scopePicker) {
  const savedSign = localStorage.getItem("socksandpocketsHoroscopeSign") || "";
  renderHoroscope(savedSign);

  scopePicker.addEventListener("change", () => {
    horoscopeOffset = 0;
    localStorage.setItem("socksandpocketsHoroscopeSign", scopePicker.value);
    renderHoroscope(scopePicker.value, horoscopeOffset);
  });
}

if (scopeNext) {
  scopeNext.addEventListener("click", (event) => {
    event.preventDefault();

    if (!scopePicker.value) {
      scopePicker.focus();
      return;
    }

    horoscopeOffset += 1;
    renderHoroscope(scopePicker.value, horoscopeOffset);
  });
}

const secretStamps = [
  { id: "broken-icon", name: "Broken Image Icon", clue: "A tiny missing picture near the homepage news." },
  { id: "sockpod-light", name: "Sockpod Light", clue: "The glowing dot on the music player knows a secret track." },
  { id: "new-label", name: "NEW! Label", clue: "A loud little label on the New Stuff page." },
  { id: "tiny-star", name: "Tiny Star", clue: "A star hiding near the About page." },
  { id: "suspicious-pixel", name: "Suspicious Pixel", clue: "A single pixel in the Pixel Gallery." },
  { id: "blinkie-spark", name: "Blinkie Spark", clue: "A flash hiding with the blinkies." },
  { id: "button-dot", name: "Button Dot", clue: "A dot tucked into the Button Wall." },
  { id: "zine-corner", name: "Zine Corner", clue: "A folded corner inside the Web Zine." }
];

function getFoundSecrets() {
  try {
    return JSON.parse(localStorage.getItem("socksandpocketsSecretsFound")) || [];
  } catch (error) {
    return [];
  }
}

function saveFoundSecrets(found) {
  localStorage.setItem("socksandpocketsSecretsFound", JSON.stringify([...new Set(found)]));
}

function findSecret(id) {
  const found = getFoundSecrets();

  if (!found.includes(id)) {
    found.push(id);
    saveFoundSecrets(found);
    alert(`Secret stamp found: ${secretStamps.find((stamp) => stamp.id === id)?.name || id}!`);
  }

  renderSecretPassport();
}

function initSecrets() {
  document.querySelectorAll("[data-secret]").forEach((secret) => {
    secret.setAttribute("role", "button");
    secret.setAttribute("tabindex", "0");
    secret.addEventListener("click", () => findSecret(secret.dataset.secret));
    secret.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        findSecret(secret.dataset.secret);
      }
    });
  });
}

function renderSecretPassport() {
  const passport = document.querySelector("#secretPassport");
  const vaultNotice = document.querySelector("#vaultNotice");
  const found = getFoundSecrets();

  if (passport) {
    passport.innerHTML = secretStamps.map((stamp) => {
      const isFound = found.includes(stamp.id);
      return `<article class="passport-stamp${isFound ? " found" : ""}">
        <h2>${isFound ? stamp.name : "Missing Stamp"}</h2>
        <p>${isFound ? "Stamped!" : stamp.clue}</p>
      </article>`;
    }).join("");
  }

  if (vaultNotice) {
    if (found.length >= secretStamps.length) {
      vaultNotice.innerHTML = `<a class="vault-link" href="members-vault.html">All stamps found. Enter the Members Vault!</a>`;
    } else {
      vaultNotice.textContent = `${found.length} of ${secretStamps.length} stamps found. Keep clicking suspicious little things.`;
    }
  }
}

function initVault() {
  const vault = document.querySelector("#membersVault");
  if (!vault) {
    return;
  }

  const found = getFoundSecrets();
  if (found.length >= secretStamps.length) {
    vault.classList.add("unlocked");
    vault.innerHTML = `<h1>members vault unlocked</h1>
      <p>You found every secret stamp. The secret track is now available in the Sockpod player.</p>
      <div class="vault-prize">SECRET TRACK: glitter modem midnight</div>
      <p><a href="index.html">Back to the homepage</a></p>`;
    localStorage.setItem("socksandpocketsSecretTrack", "unlocked");
  } else {
    vault.innerHTML = `<h1>members vault locked</h1>
      <p>You need every passport stamp before this page opens.</p>
      <p>${found.length} of ${secretStamps.length} stamps found.</p>
      <p><a href="secret-passport.html">Check your Secret Passport</a></p>`;
  }
}

const sockpodTracks = [
  { title: "track 01 - homepage for 2026", link: "index.html" },
  { title: "track 02 - about bianca", link: "about.html" },
  { title: "track 03 - web zine dream", link: "web-zine.html" },
  { title: "track 04 - pixel gallery radio", link: "pixel-gallery.html" },
  { title: "track 05 - button wall bounce", link: "button-wall.html" },
  { title: "track 06 - diary zone after dark", link: "diary-zone.html" }
];

function getSockpodTracks() {
  if (localStorage.getItem("socksandpocketsSecretTrack") === "unlocked" || getFoundSecrets().length >= secretStamps.length) {
    return [...sockpodTracks, { title: "secret track - glitter modem midnight", link: "members-vault.html", secret: true }];
  }

  return sockpodTracks;
}

function initSockpod() {
  const player = document.querySelector(".sockpod-player");
  if (!player) {
    return;
  }

  const title = player.querySelector(".sockpod-screen em");
  const bars = player.querySelector(".sockpod-bars");
  const buttons = Array.from(player.querySelectorAll(".sockpod-controls button"));
  const playlist = player.querySelector(".sockpod-playlist");
  let trackIndex = 0;
  let playing = false;

  function renderTrack() {
    const tracks = getSockpodTracks();
    const track = tracks[trackIndex % tracks.length];
    title.textContent = track.title;
    player.classList.toggle("is-playing", playing);
    if (bars) bars.setAttribute("aria-label", playing ? "playing" : "paused");
    if (buttons[1]) buttons[1].textContent = playing ? "PAUSE" : "PLAY";
    if (playlist) {
      playlist.innerHTML = tracks.map((item, index) => {
        const label = item.title.replace(/^track \d+ - /, "").replace(/^secret track - /, "secret: ");
        const classes = [
          index === trackIndex ? "active" : "",
          item.secret ? "secret-track" : ""
        ].filter(Boolean).join(" ");
        const classAttr = classes ? ` class="${classes}"` : "";
        const trackNumber = item.secret ? "??" : String(index + 1).padStart(2, "0");

        return `<a href="${item.link}"${classAttr}>${trackNumber} ${label}</a>`;
      }).join("");
    }
  }

  buttons[0]?.addEventListener("click", () => {
    const tracks = getSockpodTracks();
    trackIndex = (trackIndex - 1 + tracks.length) % tracks.length;
    renderTrack();
  });

  buttons[1]?.addEventListener("click", () => {
    playing = !playing;
    renderTrack();
  });

  buttons[2]?.addEventListener("click", () => {
    const tracks = getSockpodTracks();
    trackIndex = (trackIndex + 1) % tracks.length;
    renderTrack();
  });

  player.querySelector(".sockpod-light")?.setAttribute("data-secret", "sockpod-light");
  renderTrack();
}

function enhanceAimBuddy() {
  const body = document.querySelector(".aim-body");
  if (!body || document.querySelector("#aimQuestion")) {
    return;
  }

  body.insertAdjacentHTML("beforeend", `<div class="aim-chat">
    <select id="aimQuestion">
      <option value="">send IM...</option>
      <option value="tip">what should I click?</option>
      <option value="secret">any secret hints?</option>
      <option value="page">where should I go?</option>
      <option value="random">what is the site mood?</option>
    </select>
    <button type="button" id="aimSend">send</button>
    <div class="aim-reply" id="aimReply">sockpod_xo is online.</div>
  </div>`);

  const replies = {
    tip: ["Try the Button Wall maker.", "The poll changes every day.", "Register for a member card if you want something copyable."],
    secret: ["Suspicious pixels are usually not accidents.", "The Sockpod light is brighter than it needs to be.", "A NEW! label might be more than a label."],
    page: ["The Web Zine is underused and cute.", "Pixel Gallery is where the tiny stuff lives.", "The Secret Passport tracks what you find."],
    random: ["Today's mood: mall directory with a horoscope problem.", "Away message says: update one page, then save everything.", "The site aura is electric lime."]
  };

  document.querySelector("#aimSend")?.addEventListener("click", () => {
    const choice = document.querySelector("#aimQuestion").value;
    const reply = document.querySelector("#aimReply");
    if (!choice) {
      reply.textContent = "pick a message first!";
      return;
    }
    const list = replies[choice];
    reply.textContent = list[Math.floor(Math.random() * list.length)];
  });
}

// ===== upgraded club card =====
function initMemberCard() {
  const form = document.querySelector("#memberForm");
  const card = document.querySelector("#memberCard");
  const badge = document.querySelector("#memberBadgeCode");
  const badgePreview = document.querySelector("#memberBadgePreview");
  if (!form || !card || !badge) return;

  function memberNumber(screenName) {
    const cleanName = String(screenName || "visitor").toUpperCase();
    let seed = 0;
    for (let index = 0; index < cleanName.length; index += 1) {
      seed = (seed * 29 + cleanName.charCodeAt(index)) % 99999;
    }
    return `SP-${String(seed).padStart(5, "0")}`;
  }

  function accessLevel(data) {
    const levels = {
      "Secret Passport": "VAULT SEEKER",
      "Pixel Gallery": "PIXEL SCOUT",
      "Button Wall": "BUTTON TRADER",
      "Web Zine": "ZINE INSIDER",
      "Daily Horoscope": "STAR READER"
    };
    return levels[data.favoriteSection] || "CLUB MEMBER";
  }

  function renderMember(data) {
    const issueDate = new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });
    const theme = data.cardTheme || "lime";
    const number = memberNumber(data.screenName);
    const level = accessLevel(data);

    card.className = `member-card member-card-${theme}`;
    card.innerHTML = `<h2>OFFICIAL OUTTA SITE! CLUB</h2>
      <p class="member-number">socksandpockets.neocities.org member card / ${number}</p>
      <dl>
        <dt>screen name</dt><dd>${data.screenName || "sockpod_xo"}</dd>
        <dt>fav color</dt><dd>${data.favoriteColor || "electric lime"}</dd>
        <dt>birthday</dt><dd>${data.birthdayMonth || "July"}</dd>
        <dt>section</dt><dd>${data.favoriteSection || "Guestbook"}</dd>
        <dt>aura</dt><dd>${data.internetAura || "sparkly lurker"}</dd>
        <dt>issued</dt><dd>${issueDate}</dd>
        <dt>expires</dt><dd>NEVER</dd>
        <dt>access</dt><dd>${level}</dd>
      </dl>
      <div class="member-avatar" aria-hidden="true"></div>
      <div class="member-barcode" aria-label="fake barcode"></div>
      <p class="member-signature">signature: ${data.screenName || "sockpod_xo"} __________________</p>
      <p class="member-microtext">Best viewed in 800x600 / plastic fan-club laminate edition</p>`;

    if (badgePreview) {
      badgePreview.className = `member-badge-preview member-badge-${theme}`;
      badgePreview.innerHTML = `${data.screenName || "club"}<br>${level}`;
    }

    badge.value = `<a href="https://socksandpockets.neocities.org/newsletter.html"><span style="display:inline-flex;align-items:center;justify-content:center;width:88px;height:31px;color:#fff;background:#000;border:2px solid #ff007e;font:bold 9px Arial;text-align:center;">${(data.screenName || "club").slice(0, 12)}<br>OUTTA SITE CLUB</span></a>`;
  }

  const saved = localStorage.getItem("socksandpocketsMemberCard");
  if (saved) {
    const data = JSON.parse(saved);
    Object.entries(data).forEach(([key, value]) => {
      if (form.elements[key]) {
        form.elements[key].value = value;
      }
    });
    renderMember(data);
  } else {
    renderMember(Object.fromEntries(new FormData(form).entries()));
  }

  form.addEventListener("input", () => {
    renderMember(Object.fromEntries(new FormData(form).entries()));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    localStorage.setItem("socksandpocketsMemberCard", JSON.stringify(data));
    renderMember(data);
  });
}

// ===== interactive web zine =====
const zineArticles = {
  fresh: {
    title: "fresh! homepage as bedroom",
    body: "<p>The best homepages feel lived in. A good one has a few practical links, a pile of weird decorations, one section that only makes sense to the webmaster, and a visitor path that rewards nosiness.</p><p>Today's assignment: add one useful link and one totally unnecessary sparkle.</p>"
  },
  friends: {
    title: "friends! link trades & notes",
    body: "<p>Guestbooks, buttons, and webrings are tiny social contracts. They say: I was here, I saw your page, and I am leaving a little trail back to mine.</p><p>Trade links like friendship bracelets. Keep the good ones somewhere visible.</p>"
  },
  fashion: {
    title: "fashion! one weird accessory",
    body: "<p>Personal style rules also work for websites: one basic thing, one bright thing, and one detail that makes people pause.</p><p>For a page, that detail might be a hot pink headline, a suspicious pixel, or a link label that sounds like a secret.</p>"
  },
  fun: {
    title: "fun! tiny internet rituals",
    body: "<p>Check the poll. Pick a horoscope. Open the Sockpod. Click the thing that looks slightly out of place.</p><p>A web ritual does not need a login streak. It just needs to make the page feel alive when you return.</p>"
  }
};

function getReadZineArticles() {
  try {
    return JSON.parse(localStorage.getItem("socksandpocketsZineRead")) || [];
  } catch (error) {
    return [];
  }
}

function saveReadZineArticles(read) {
  localStorage.setItem("socksandpocketsZineRead", JSON.stringify([...new Set(read)]));
}

function updateZineProgress() {
  const progress = document.querySelector("#zineProgress");
  if (!progress) return;
  const read = getReadZineArticles();
  progress.textContent = `You read ${read.length} of ${Object.keys(zineArticles).length} stories!`;
}

function openZineArticle(id) {
  const article = zineArticles[id];
  const modal = document.querySelector("#zineModal");
  const title = document.querySelector("#zineModalTitle");
  const body = document.querySelector("#zineModalBody");
  if (!article || !modal || !title || !body) return;

  title.textContent = article.title;
  body.innerHTML = article.body;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  const read = getReadZineArticles();
  read.push(id);
  saveReadZineArticles(read);
  updateZineProgress();
}

function initWebZine() {
  const zineShell = document.querySelector(".webzine-shell");
  if (!zineShell) return;

  document.querySelectorAll("[data-zine-article]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openZineArticle(link.dataset.zineArticle);
    });
  });

  document.querySelector("#zineClose")?.addEventListener("click", () => {
    const modal = document.querySelector("#zineModal");
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  });

  document.querySelector("#zineModal")?.addEventListener("click", (event) => {
    if (event.target.id === "zineModal") {
      event.currentTarget.classList.remove("is-open");
      event.currentTarget.setAttribute("aria-hidden", "true");
    }
  });

  document.querySelector("#zinePrint")?.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Pretend printing... please wait for your sparkly inkjet.");
  });

  document.querySelector("#zineEmail")?.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Pretend email sent to a friend with 3 glitter stickers attached.");
  });

  document.querySelector("#zineReset")?.addEventListener("click", () => {
    localStorage.removeItem("socksandpocketsZineRead");
    updateZineProgress();
  });

  const quiz = document.querySelector("#zineQuiz");
  const quizResult = document.querySelector("#zineQuizResult");
  const savedResult = localStorage.getItem("socksandpocketsZineQuizResult");
  if (savedResult && quizResult) {
    quizResult.textContent = savedResult;
  }

  quiz?.addEventListener("submit", (event) => {
    event.preventDefault();
    const choice = new FormData(quiz).get("zineVibe");
    const results = {
      fresh: "You are FRESH!: first to notice new links, new colors, and new page drama.",
      friends: "You are FRIENDS!: guestbook signer, button trader, and certified link pal.",
      fashion: "You are FASHION!: one weird accessory away from becoming a whole layout.",
      fun: "You are FUN!: suspicious pixel clicker and keeper of the secret path."
    };
    const result = results[choice] || "Pick a section first.";
    quizResult.textContent = result;
    if (choice) {
      localStorage.setItem("socksandpocketsZineQuizResult", result);
    }
  });

  updateZineProgress();
}

function initMakers() {
  const buttonForm = document.querySelector("#buttonMaker");
  const blinkieForm = document.querySelector("#blinkieMaker");
  const pixelForm = document.querySelector("#pixelMaker");

  function renderSaves(type, anchor) {
    if (!anchor) {
      return;
    }

    const key = `socksandpockets-${type}-saves`;
    const saves = JSON.parse(localStorage.getItem(key) || "[]");
    let list = document.querySelector(`#${type}Saves`);

    if (!list) {
      list = document.createElement("div");
      list.id = `${type}Saves`;
      list.className = "saved-creations";
      anchor.insertAdjacentElement("afterend", list);
    }

    list.innerHTML = saves.length
      ? `<h3>saved locally</h3>${saves.map((item) => `<code>${item.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>`).join("")}`
      : `<h3>saved locally</h3><p>Nothing saved yet.</p>`;
  }

  function saveCreation(type, html) {
    const key = `socksandpockets-${type}-saves`;
    const saves = JSON.parse(localStorage.getItem(key) || "[]");
    saves.unshift(html);
    localStorage.setItem(key, JSON.stringify(saves.slice(0, 12)));
  }

  if (buttonForm) {
    const preview = document.querySelector("#buttonPreview");
    const code = document.querySelector("#buttonCode");
    buttonForm.addEventListener("input", () => {
      const data = Object.fromEntries(new FormData(buttonForm).entries());
      preview.textContent = data.text || "my site";
      preview.className = `site-button ${data.color || "pink"}`;
      code.value = `<a class="site-button ${data.color || "pink"}" href="${data.url || "#"}">${data.text || "my site"}</a>`;
    });
    buttonForm.addEventListener("submit", (event) => {
      event.preventDefault();
      saveCreation("button", code.value);
      renderSaves("button", code);
    });
    buttonForm.dispatchEvent(new Event("input"));
    renderSaves("button", code);
  }

  if (blinkieForm) {
    const preview = document.querySelector("#blinkiePreview");
    const code = document.querySelector("#blinkieCode");
    blinkieForm.addEventListener("input", () => {
      const data = Object.fromEntries(new FormData(blinkieForm).entries());
      preview.textContent = data.text || "webmaster online";
      preview.className = `blinkie ${data.color || "hot"}`;
      code.value = `<span class="blinkie ${data.color || "hot"}">${data.text || "webmaster online"}</span>`;
    });
    blinkieForm.addEventListener("submit", (event) => {
      event.preventDefault();
      saveCreation("blinkie", code.value);
      renderSaves("blinkie", code);
    });
    blinkieForm.dispatchEvent(new Event("input"));
    renderSaves("blinkie", code);
  }

  if (pixelForm) {
    const preview = document.querySelector("#pixelPreview");
    const code = document.querySelector("#pixelCode");
    pixelForm.addEventListener("input", () => {
      const data = Object.fromEntries(new FormData(pixelForm).entries());
      preview.className = `pixel-tile ${data.shape || "star"}`;
      code.value = `<span class="pixel-tile ${data.shape || "star"}" aria-label="${data.name || "pixel"}"></span>`;
    });
    pixelForm.addEventListener("submit", (event) => {
      event.preventDefault();
      saveCreation("pixel", code.value);
      renderSaves("pixel", code);
    });
    pixelForm.dispatchEvent(new Event("input"));
    renderSaves("pixel", code);
  }
}

initDailyPoll();
renderPollArchive();
initSockpod();
initSecrets();
renderSecretPassport();
initVault();
enhanceAimBuddy();
initMemberCard();
initMakers();
initWebZine();
