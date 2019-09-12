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

  return (
    props.isMenuOpen && (
      <StyledSubMenu>
        {data.allShopifyCollection.nodes.map(collection => (
          <li key={collection.id}>
            <MenuLink
              to={`/${collection.handle}`}
              style={{ fontSize: '1.1rem' }}
              onClick={props.toggleMenu}
            >
              {collection.title}
            </MenuLink>
          </li>
        ))}
      </StyledSubMenu>
    )
  )
}

const MenuLink = styled(props => <Link {...props} />)`
  font-size: 0.7rem;
  color: white;
  :hover {
    text-decoration: none;
    color: white;
  }
  margin-left: 10px;
`

const StyledSubMenu = styled.ul`
  li {
    margin: 0;
    padding: 0;
    display: block;
    position: absolute;
    background: #32a8a8;
  }
`

export default CollectionsSubMenu
