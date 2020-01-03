import React from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'

const LinkWithPrevUrl = ({ children, state, ...rest }) => (
  <Location>
    {({ location }) => (
      //make sure user's state is not overwritten
      <Link {...rest} state={{ prevUrl: location.pathname, ...state }}>
        {children}
      </Link>
    )}
  </Location>
)

export { LinkWithPrevUrl as Link }
