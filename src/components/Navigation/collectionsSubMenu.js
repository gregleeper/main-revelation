import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

const CollectionsSubMenu = props => {
  const data = useStaticQuery(
    graphql`
      query {
        allShopifyCollection {
          nodes {
            id
            title
            handle
          }
        }
      }
    `
  )
  console.log(data)

  return (
    <div className="dropdown-menu">
      {data.allShopifyCollection.nodes.map(collection => (
        <Link
          className="dropdown-item"
          to={`/${collection.handle}`}
          onClick={props.toggleMenu}
          key={collection.id}
        >
          {collection.title}
        </Link>
      ))}
    </div>
  )
}

// const MenuLink = styled(props => <Link {...props} />)`
//   color: black;
//   font-size: 15px;
//   :hover {
//     text-decoration: none;
//     color: black;
//   }
//   position: relative;
// `

const StyledSubMenu = styled.ul`
  li {
    margin: 0;
    padding: 0;
    display: block;
    position: absolute;
    background: #7348a8;
  }
  height: 400px;
`

export default CollectionsSubMenu
