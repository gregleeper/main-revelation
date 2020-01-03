const path = require(`path`)

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions
//   return graphql(`
//     {
//       allShopifyProduct {
//         edges {
//           node {
//             handle
//           }
//         }
//       }
//     }
//   `).then(result => {
//     result.data.allShopifyProduct.edges.forEach(({ node }) => {
//       createPage({
//         path: `/product/${node.handle}/`,
//         component: path.resolve(`./src/templates/ProductPage/index.js`),
//         context: {
//           // Data passed to context is available
//           // in page queries as GraphQL variables.
//           handle: node.handle,
//         },
//       })
//     })
//   })
// }

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const ProductPageTemplate = path.resolve(
    `./src/templates/ProductPage/index.js`
  )
  const CollectionsPageTemplate = path.resolve(
    `./src/templates/CollectionsPage/index.js`
  )
  const result = await graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            handle
          }
        }
      }
      allShopifyCollection {
        edges {
          node {
            id
            handle
            title
          }
        }
      }
    }
  `)
  const Pages = result.data.allShopifyProduct.edges
  Pages.forEach(({ node }) => {
    createPage({
      path: `/product/${node.handle}/`,
      component: ProductPageTemplate,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        handle: node.handle,
      },
    })
  })

  const Collections = result.data.allShopifyCollection.edges
  Collections.forEach(({ node }) => {
    createPage({
      path: `/${node.handle}/`,
      component: CollectionsPageTemplate,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        handle: node.handle,
      },
    })
  })
}
