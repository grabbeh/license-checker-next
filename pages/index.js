import React, { useState, useEffect } from 'react'
import Intro from '../components/Intro'
import axios from 'axios'
import Box from '../components/Box'
import Text from '../components/Text'
import Layout from '../components/Layout'
import Tabs from '../components/Tabs'
import Tab from '../components/Tab'
import TabList from '../components/TabList'
import TabPanels from '../components/TabPanels'
import Table from '../components/Table'
import Tree from '../components/TreeStructure'
import InputSideBar from '../components/InputSideBar'
import ResultsSideBar from '../components/ResultsSideBar'
import Loading from '../components/Loading'
import AttributionList from '../components/AttributionList'
import TreeVis from '../components/TreeVis'
import Flex from '../components/Flex'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const Index = props => {
  const router = useRouter()
  let [data, setData] = useState(null)
  let [flat, setFlat] = useState(null)
  let [error, setError] = useState(null)
  let [loading, setLoading] = useState(false)
  if (props.data) {
    setData(props.data)
    setFlat(props.data.flat)
  }

  useEffect(() => {
    let { url } = router.query
    if (url) {
      setLoading(true)
      axios
        .post('http://localhost:4000/api/process-package-json', { url })
        .then(r => {
          setData(r.data)
          setFlat(r.data.flat)
          setLoading(false)
        })
        .catch(err => {
          let error = 'Server error'
          if (typeof err.response.data === 'string') error = err.response.data
          setError(error)
          setLoading(false)
        })
    }
  }, [])
  /*
  useEffect(() => {
    const { data, error } = useSWR(
      url ? ['/http://localhost:3000/api/process-package-json', url] : null
    )
    if (error) {
      setError(error)
    }
    setData(data)
    setFlat(data.flat)
  }, [])*/

  return (
    <Layout>
      <Box>
        <Flex flexWrap='wrap'>
          <Box p={[2, 3]} width={[1, 0.4, 1 / 4]} minHeight={[1, '100vh']}>
            <Box mb={2}>
              <Text fontSize={4} fontWeight='bold'>
                Licence checker
              </Text>
            </Box>
            <InputSideBar setLoading={setLoading} setResponse={setData} />
            {data && (
              <ResultsSideBar
                dependencies={data.flat}
                name={data.tree.data.name}
              />
            )}
          </Box>
          <Box
            py={[2, 3]}
            px={[2, 4]}
            width={[1, 0.6, 3 / 4]}
            minHeight='100vh'
          >
            {!error && !data && (
              <Box>
                <Intro />
              </Box>
            )}
            {!data && <Loading />}
            {error && error}
            {data && (
              <Tabs>
                <TabList>
                  <Tab>
                    <Text fontSize={2}>Tree</Text>
                  </Tab>
                  <Tab>
                    <Text fontSize={2}>Table</Text>
                  </Tab>
                  <Tab>
                    <Text fontSize={2}>Attribution</Text>
                  </Tab>
                  <Tab>
                    <Text fontSize={2}>Visualisation</Text>
                  </Tab>
                </TabList>
                <TabPanels>
                  <Tree tree={data.tree.children} />
                  <Table dataRows={data.flat} />
                  <AttributionList setDependencies={setFlat} deps={data.flat} />
                  <TreeVis tree={data.tree} />
                </TabPanels>
              </Tabs>
            )}
          </Box>
        </Flex>
      </Box>
    </Layout>
  )
}

export default Index
/*
Index.getInitialProps = async props => {
  let { url } = props.query
  const res = await axios('http://localhost:3000/api/process-package-json', {
    url
  })
  const data = await res.json()
  console.log(`Show data fetched. Count: ${data.length}`)
  return { data }
}*/
