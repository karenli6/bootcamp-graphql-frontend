import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  ALLAUTHORS, ADDAUTHORS, UPDATEAUTHORS,
} from './graphql'


const Home = () => {
  // REACT
  // input form - was having some issues with useReducer here :(
  const [idval, setId] = useState('')

  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [ageNum, setAgeNum] = useState('')
  const [emailAdd, setEmailAdd] = useState('')
  const [books, setBooks] = useState(0)
  const [address, setAddress] = useState('')
  const resetAll = () => {
    setId('')
    setFirst('')
    setLast('')
    setAgeNum('')
    setEmailAdd('')
    setBooks('')
    setAddress('')
  }
  const handleChangeId = element => {
    setId(element.target.value)
  }

  const handleChangeFirst = element => {
    setFirst(element.target.value)
  }

  const handleChangeLast = element => {
    setLast(element.target.value)
  }

  const handleChangeAge = element => {
    setAgeNum(element.target.value)
  }

  const handleChangeEmail = element => {
    setEmailAdd(element.target.value)
  }

  const handleChangeBooks = element => {
    setBooks(element.target.value)
  }

  const handleChangeAddress = element => {
    setAddress(element.target.value)
  }


  // REACT


  const {
    data, refetch: refetchAuthors, loading, error,
  } = useQuery(ALLAUTHORS)


  // updating an author
  const [updateAuthor] = useMutation(UPDATEAUTHORS)

  const editAuthor = async () => {
    await updateAuthor({
      variables: {
        id: idval,
        input: {
          firstName: first,
          lastName: last,
          email: emailAdd,
          // eslint-disable-next-line radix
          age: parseInt(ageNum),
          numBooksPublished: books,
          addressId: address,
        },
      },

    })

    resetAll()
    refetchAuthors()
  }


  // adding new author
  const [addAuthor] = useMutation(ADDAUTHORS)

  const createNewAuthor = async () => {
    await addAuthor({
      variables: {
        input: {
          firstName: first,
          lastName: last,
          email: emailAdd,
          // eslint-disable-next-line radix
          age: parseInt(ageNum),
          numBooksPublished: books,
          addressId: address,
        },
      },

    })

    resetAll()
    refetchAuthors()
  }


  if (error) {
    console.log(error)
    return <p> ERROR occurred with Allauthors</p>
  }


  return (
    <>

      <div>
      Welcome to the Directory of Authors
      </div>
      <div>
        <p>Input information for author:</p>

        <form>
          {/* <label>First Name</label> */}
          {/* <input type="text" value={first} onChange={handleChangeFirst} /> */}
          <p>ID</p>
          <input type="text" value={idval} onChange={handleChangeId} />
          <br />
          <p>First Name</p>
          <input type="text" value={first} onChange={handleChangeFirst} />
          <br />
          <p>Last Name</p>
          <input type="text" value={last} onChange={handleChangeLast} />
          <br />
          <p>Email</p>
          <input type="text" value={emailAdd} onChange={handleChangeEmail} />
          <br />
          <p>Age</p>
          <input type="text" value={ageNum} onChange={handleChangeAge} />
          <br />
          <p>Number of Books Published</p>
          <input type="text" value={books} onChange={handleChangeBooks} />
          <br />
          <p>Address ID</p>
          <input type="text" value={address} onChange={handleChangeAddress} />
          <br />


          <button type="button" onClick={createNewAuthor}>ADD new author</button>
          <br/>
          <button type="button" onClick={editAuthor}>UPDATE this author</button>

        </form>

      </div>


      {loading ? 'loading...'

        : data.allAuthors.map(author => (

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
