import React from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default ({ element }, pluginOptions) => {
  const httpLink = createHttpLink({
    uri: `https://main-revelation.myshopify.com/api/graphql`,
  })

  const middlewareLink = setContext(() => ({
    headers: {
      'X-Shopify-Storefront-Access-Token': 'f141809daaea393e06748aaa1fdc8bfc',
    },
  }))

  const client = new ApolloClient({
    link: middlewareLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
