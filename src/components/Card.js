import React, { useState, useEffect } from 'react';
import { gql } from 'graphql-request';
import { client } from '../graphqlClient';
import { Link, useParams } from 'react-router-dom';

const SEARCH_WORD_BY_ID = gql`
  query getWordById($id: ID!) {
    searchWordById(_id: $id) {
      _id
      word
      definitions {
        etymologies
        definitions
        examples
        lexicalCategory
      }
    }
  }
`;

const Card = () => {
  const [word, setword] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    const variables = {
      id: id,
    };
    client
      .request(SEARCH_WORD_BY_ID, variables)
      .then((res) => setword(res.searchWordById))
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  console.log(word);
  return (
    <div style={{ padding: '20px' }}>
      <h1>Card</h1>
      <h3>{word?.word}</h3>
      {word?.definitions?.map((def) => {
        return (
          <div>
            <h3>{def.etymologies ? 'Etymologies' : ''}</h3>
            <p>{def.etymologies}</p>
            <h3>Definition</h3>
            <p>{def.definitions}</p>
            <h3>Examples</h3>
            <p>{def.examples}</p>
          </div>
        );
      })}
      <Link to="/">Home</Link>
    </div>
  );
};

export default Card;
