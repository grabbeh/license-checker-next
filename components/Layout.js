import React from 'react'
import Helmet from 'react-helmet'
import Text from '../components/Text'
import Link from '../components/Link'
import { ThemeProvider } from 'emotion-theming'
import theme from '../components/theme'
import '../index.css'

const Para = props => (
  <p {...props} style={{ fontSize: '18px', lineHeight: 1.6 }} />
)

const UpdatedLink = props => {
  return <Link href={props.href}>{props.children}</Link>
}

const UnorderedList = props => (
  <ul style={{ fontSize: '18px' }}>{props.children} </ul>
)

const ListItem = props => <li style={{ padding: '2px' }}>{props.children}</li>

const Header = () => <Text fontSize={3} fontWeight='bold' />

const components = {
  p: Para,
  ul: UnorderedList,
  H3: Header,
  a: UpdatedLink,
  li: ListItem
}

const Layout = props => {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width' />
        <title>License checker</title>
      </Helmet>

      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </div>
  )
}

export default Layout
