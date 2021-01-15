import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  ALLAUTHORS, ADDAUTHORS, UPDATEAUTHORS, GETAUTHORBOOKS,
} from './graphql'


const Home = () => {
  const { data, loading, error } = useQuery(ALLAUTHORS)

  // adding author
  const [addAuthor, { error: addAuthorError, loading: addAuthorLoading }] = useMutation(ADDAUTHORS,
    {
      update: (client, { authordata }) => {
        try {
          const temp = client.readQuery({ query: ALLAUTHORS })
          temp.allAuthors = [...temp.allAuthors, authordata.createAuthor]

          client.writeQuery({ query: ALLAUTHORS, temp })
        } catch (err) {
          console.log(err)
          throw new Error('update failed')
        }
      },
      variables: {
        input: {
          firstName: 'version2.0',
          lastName: 'testing',
          email: 'testing@gmail.com',
          age: 40,
          numBooksPublished: 2,
        },
      },
      refetchQueries: () => [{ query: ALLAUTHORS }],
    })

  // display author books
  //   const { data: authorBooks, loading: authorBooksLoading, error: authorBooksError } = useQuery(GETAUTHORBOOKS)


  // update author
  //   const [updateAuthor, { error: updateAuthorError, loading: updateAuthorLoading }] = useMutation(UPDATEAUTHORS,
  //     {
  //       variables: {
  //         id: '9a4d851b-7c82-4954-8524-590b6ddd1153',
  //         input: {
  //           firstName: 'KarenKaren',
  //           lastName: 'Liiiiiii',
  //           email: 'karen5.0@gmail.com',
  //           //   age: 100,
  //           //   numBooksPublished: 2,
  //         },
  //       },
  //       refetchQueries: () => [{ query: ALLAUTHORS }],
  //     })

  // display Author's books

  // display Publisher's books

  // error printing
  // if (updateAuthorError) {
  //   console.log(updateAuthorError)
  //   return <p> There was an error with updating an Author</p>
  // }
  if (addAuthorError) {
    console.log(addAuthorError)

    return <p> There was an error with adding an Author</p>
  }
  //   if (authorBooksError) {
  //     console.log(authorBooksError)

  //     return <p> There was an error with getting Author books</p>
  //   }
  if (error) {
    console.log(error)
    return <p> ERROR occurred with Allauthors</p>
  }


  return (
    <>
      <button type="button" onClick={addAuthor}>Add Me</button>

      {loading || addAuthorLoading ? 'loading...' : data.allAuthors.map(author => (

        <>
          <p>
            {' '}
            {author.firstName}
            {' '}
            {author.lastName}
          </p>

        </>
      ))}
    </>
  )
}

export default Home
