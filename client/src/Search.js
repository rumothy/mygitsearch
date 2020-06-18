import React, { useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import API from "./utils/API";

const Search = () => {
  const [key, setKey] = useState("");
  function handleSearch() {
    console.log(`searching for ${key}`);
    API.search(key)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  function handleChange(event) {
    const { value } = event.target;
    setKey(value);
  }

  return (
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
  );
};

export default Search;
