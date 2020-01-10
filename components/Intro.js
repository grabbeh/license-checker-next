import React from 'react'
import Box from './Box'
import Link from 'next/link'

const Intro = () => {
  return (
    <Box>
      <h3>License checker</h3>

      <Box>
        License checker takes the dependencies in your package.json file and
        gives you a full picture of your dependency tree
      </Box>

      <Box>See some examples:</Box>

      <p>
        <Link href='/?url=https://raw.githubusercontent.com/expressjs/express/master/package.json'>
          <a>Express</a>
        </Link>
      </p>
      <p>
        <Link href='/?url=https://raw.githubusercontent.com/request/request/master/package.json'>
          <a>Request</a>
        </Link>
      </p>
      <p>
        {' '}
        <Link href='/?url=https://raw.githubusercontent.com/isaacs/node-glob/master/package.json'>
          <a>Glob</a>
        </Link>
      </p>

      <h3>Issues</h3>

      <Box>
        <p>
          - Any dependencies which are name-spaced will not be picked up due to
          issues with NPM registry data
        </p>
      </Box>
    </Box>
  )
}

export default Intro
