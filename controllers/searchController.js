const fetch = require("node-fetch");
const keys = require("../private/token");

module.exports = {
  search: function (req, res) {
    const key = req.params.key;
    let query = buildQuery(key, "", "first: 10");
    executeQuery(query)
      .then((r) => r.json())
      .then((data) => {
        let dataData = data.data;
        let search = dataData.search;
        res.send(search);
      });
  },

  search2: function (req, res) {
    const searchParams = req.body;
    let query = buildQuery(
      searchParams.key,
      searchParams.before,
      searchParams.after
    );
    executeQuery(query)
      .then((r) => r.json())
      .then((data) => {
        let dataData = data.data;
        let search = dataData.search;
        res.send(search);
      });
  },
};

function executeQuery(query) {
  return fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `bearer ${keys.rumsToken}`,
    },
    body: query,
  });
}

function buildQuery(key, before, after) {
  let query = `{ 
        search(query: "${key}", type: REPOSITORY, ${before} ${after}) {
            edges {
                node {
                    ... on Repository {
                    id
                    name
                    stargazers {
                        totalCount
                    }
                    description
                    url
                        owner {
                            id
                            ... on User {
                                id
                                name
                                avatarUrl
                                followers {
                                    totalCount
                                }
                            }
                        }
                    }
                }
                cursor
            }
            repositoryCount
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor  
            }
        }  
    }`;

  return JSON.stringify({ query });
}
