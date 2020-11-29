const access_token = ""; // insert your github personal access token

const query = {
  query: `{
        viewer {
            bio
            name
            avatarUrl
            twitterUsername
            followers {
              totalCount
            }
            following {
              totalCount
            }
            repositories(first: 20, orderBy: {field: CREATED_AT, direction: DESC}) {
                nodes {
                    name
                    description
                    stargazers {
                      totalCount
                    }
                    pushedAt
                    forks {
                      totalCount
                    }
                    pushedAt
                    url
                    languages(orderBy: {field: SIZE, direction: DESC}, first: 3) {
                      nodes {
                        name
                        color
                      }
                    }
                }
              totalCount
            }
            starredRepositories {
              totalCount
            }
        }
    }`,
};

const queryJSON = JSON.stringify(query);

const options = {
  method: "post",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${access_token}`,
  },
  body: queryJSON,
};

async function fetchData(url, options) {
  const response = await fetch(url, options);

  if (response.status === 200) {
    const data = await response.json();
    const img = document.createElement("img");
    const img_small = document.createElement("img");
    const arrayOfRepos = data.data.viewer.repositories.nodes;
    document.getElementById("my-name").textContent = data.data.viewer.name;
    document.getElementById("username").textContent =
      data.data.viewer.twitterUsername;
    document.getElementById("bio").textContent = data.data.viewer.bio;
    document.getElementById("followers").textContent =
      data.data.viewer.followers.totalCount;
    document.getElementById("following").textContent =
      data.data.viewer.following.totalCount;
    document.getElementById("starredRepo").textContent =
      data.data.viewer.starredRepositories.totalCount;
    document.getElementById("repo-number").textContent =
      data.data.viewer.repositories.totalCount;
    img.src = data.data.viewer.avatarUrl;
    img_small.src = data.data.viewer.avatarUrl;
    img.alt = "Change your avatar";
    document.getElementById("avatar").appendChild(img);
    document.getElementById("avatar-small").appendChild(img_small);
    arrayOfRepos.map((repo) => {
      // Dynamically creating DOM Elements
      const repositories = document.getElementById("repositories");
      const repoName = document.createElement("a");
      const repoDescription = document.createElement("div");
      const button = document.createElement("button");
      const labels = document.createElement("div");
      const stars = document.createElement("span");
      const forks = document.createElement("span");
      const pushedAt = document.createElement("span");
      const language = document.createElement("span");
      const languageColor = document.createElement("span");

      const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      const pushedAtDate = repo.pushedAt;
      const pushedAtMonth = pushedAtDate.split("").splice(5, 2).join("");
      const pushedAtDay = pushedAtDate.split("").splice(8, 2).join("");
      const pushedAtYear = pushedAtDate.split("").splice(0, 4).join("");

      // Adding content to DOM Elements
      repoName.textContent = repo.name;
      repoName.href = repo.url;
      repoDescription.textContent = repo.description;
      stars.innerHTML = `<svg class="octicon octicon-star text-gray-light" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
      <span>${repo.stargazers.totalCount}</span>`;
      forks.innerHTML = `<svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg><span>${repo.forks.totalCount}</span>`;
      pushedAt.textContent = `Updated on ${
        month[Number(pushedAtMonth) - 1]
      } ${pushedAtDay}, ${pushedAtYear}`;
      button.innerHTML = `<svg class="octicon octicon-star text-gray-light" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" fill="#586069" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
      <span>Star</span>`;
      language.textContent = repo.languages.nodes[0].name;
      languageColor.style.backgroundColor = repo.languages.nodes[0].color;

      // Adding classes
      repoName.classList.add("repo-name");
      repoDescription.classList.add("repo-description");
      stars.classList.add("repo-star");
      forks.classList.add("repo-forks");
      pushedAt.classList.add("pushedAt");
      language.classList.add("language");
      languageColor.classList.add("language-color");
      button.classList.add("button-star");

      // Creating variables for DOM elements with different multiple children
      const individualRepo = document.createElement("div");
      const individualRepoData = document.createElement("div");
      const individualRepoStar = document.createElement("div");

      individualRepo.classList.add("individualRepo");
      individualRepoData.classList.add("individualRepoData");
      individualRepoStar.classList.add("individualRepoStar");

      // Appending multiple elements to one DOM Element
      for (let i = 0; i < 4; i++) {
        individualRepoData.appendChild(repoName);
        individualRepoData.appendChild(repoDescription);
        labels.appendChild(languageColor);
        labels.appendChild(language);
        labels.appendChild(stars);
        labels.appendChild(forks);
        labels.appendChild(pushedAt);
        individualRepoStar.appendChild(button);
      }

      individualRepo.appendChild(individualRepoData);
      individualRepo.appendChild(individualRepoStar);
      individualRepoData.appendChild(labels);
      repositories.appendChild(individualRepo);
    });
  } else {
    throw new Error(response.statusText);
  }
}

fetchData("https://api.github.com/graphql", options);
