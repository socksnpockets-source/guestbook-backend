const currentDate = document.querySelector("#currentDate");
const guestbookForm = document.querySelector("#guestbookForm");
const guestbookEntries = document.querySelector("#guestbookEntries");

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
    const response = await fetch("/entries");

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
      message: "Could not load entries. Please refresh in a moment."
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
      const response = await fetch("/entries", {
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
