function createCard(title, description, pictureUrl, start, end) {
  return `
        <div class="card">
          <img src="${pictureUrl}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
            <p>${start}-${end}</p>
          </div>
        </div>
      `;
}

window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/conferences/";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      const data = await response.json();

      for (let conference of data.conferences) {
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        if (detailResponse.ok) {
          const details = await detailResponse.json();
          console.log(details);
          const title = details.conference.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const starts = new Date(details.conference.starts);
          const start = starts.toLocaleDateString();
          const ends = new Date(details.conference.ends);
          const end = ends.toLocaleDateString();

          const html = createCard(title, description, pictureUrl, start, end);
          const column = document.querySelector(".col");
          column.innerHTML += html;
        }
      }
    }
  } catch (e) {
    // Figure out what to do if an error is raised
    console.error("error");
  }
});
