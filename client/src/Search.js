import React, { useState } from "react";
import {
  Button,
  InputGroup,
  FormControl,
  ListGroup,
  ListGroupItem,
  Image,
} from "react-bootstrap";
import API from "./utils/API";
import SearchResult from "./ViewModels/SearchResult";

const Search = () => {
  const [key, setKey] = useState("");
  const [result, setResult] = useState(SearchResult.CreateEmptySearchResult());

  function handleSearch() {
    console.log(`searching for ${key}`);
    API.search(key)
      .then((res) => {
        console.log(res.data);
        let searchResult = new SearchResult(res.data);
        console.log(searchResult);
        setResult(searchResult);
      })
      .catch((err) => console.log(err));
  }

  function handleChange(event) {
    const { value } = event.target;
    setKey(value);
  }

  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          value={key}
          onChange={handleChange}
          placeholder="search"
          aria-label="search"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button onClick={handleSearch} variant="outline-secondary">
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <h3>{result.repositoryCount} repository results</h3>

      <ListGroup>
        {result.repoResults.map((repoResult) => (
          <ListGroup.Item key={repoResult.cursor}>
            <div>
              <Image height={64} width={64} src={repoResult.avatar} fluid />
            </div>
            <p>{repoResult.description}</p>
            <a href={repoResult.repoUrl}>{repoResult.repoUrl}</a>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {/* <ul>
        {result.repoResults.map((repoResult) => (
          <li key={repoResult.cursor}>{repoResult.description}</li>
        ))}
      </ul> */}

      <Button>{"<"}</Button>
      <Button>{">"}</Button>
    </div>
  );
};

export default Search;
