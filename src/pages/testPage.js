import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

const TestPage = () => {
  const GET_SHIRT = gql`
    {
      collectionByHandle(handle: "hugoton-volleyball") {
        id
      }
    }
  `

  const { loading, error, data } = useQuery(GET_SHIRT)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  return <h1>data: {console.log(data.collections)}</h1>
}

export default TestPage
