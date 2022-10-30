import { generateKey } from 'crypto'
import React from 'react'
import { Segment, Container, Grid, List, Header } from 'semantic-ui-react'

const Footer = () => (
  <Segment
    vertical
    as="footer"
    style={{
      padding: '4em 0em',
      marginTop: '3em',
      borderTop: '1px solid #f2f2f2',
    }}
  >
    <Container text>
      <div className="colophon">
        <p className="colophon-entry">
          Copyright © {new Date().getFullYear()}{' '}
        </p>
      </div>
    </Container>
  </Segment>
)

export default Footer
