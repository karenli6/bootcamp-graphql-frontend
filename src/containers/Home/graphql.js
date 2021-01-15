import gql from 'graphql-tag'

export const ALLAUTHORS = gql`
    query allAuthors {
        allAuthors{
            id
            firstName
            lastName
        }

    }

`
export const ADDAUTHORS = gql`
    mutation addAuthor($input: addAuthorInput!) {
        addAuthor(input: $input) {
            
            firstName 
            lastName
            email
            age
            numBooksPublished
        }
    }

`

export const UPDATEAUTHORS = gql`
    mutation updateAuthor($id: ID!, $input: editAuthorInput!) {
        updateAuthor(id: $id, input: $input) {
            
            firstName 
            lastName
            email
            age
            numBooksPublished
        }
    }

`


export const GETAUTHORBOOKS = gql`
    query getAuthorBooks($id: ID!) {
        getAuthorBooks(id: "d27123af-befe-4596-8136-ac184b222a45") {
            
            title
            authorId
        }
    }

`
