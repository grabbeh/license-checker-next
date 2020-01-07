import React, { useState } from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink
} from '@react-pdf/renderer'
import Button from './Button'
import Box from './Box'
import { FaRegFilePdf } from 'react-icons/fa'

const styles = StyleSheet.create({
  section: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    fontSize: 10,
    fontFamily: 'Courier'
  },
  header: {
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
    fontWeight: 'bold',
    fontSize: 30
  },
  page: {
    margin: 20
  }
})

const GeneratePDF = ({ deps }) => {
  let [show, setShow] = useState()
  const generate = () => (
    <Document>
      <Page wrap style={styles.page}>
        {deps.map((d, i) => {
          return d.licenses.map(({ text }, index) => (
            <View key={i * index}>
              <View style={styles.header}>
                <Text>{d.name}</Text>
              </View>
              <View style={styles.section}>
                <Text>{text || 'None provided'}</Text>
              </View>
            </View>
          ))
        })}
      </Page>
    </Document>
  )
  return (
    <Box>
      {!show && (
        <Box
          onClick={() => {
            setShow(true)
          }}
        >
          <Button>
            Generate PDF
            <FaRegFilePdf style={{ marginLeft: '5px', lineHeight: '1.5' }} />
          </Button>
        </Box>
      )}
      {show && (
        <PDFDownloadLink document={generate()} fileName='LICENCES.pdf'>
          {({ blob, url, loading, error }) => (
            <Button>{loading ? 'Loading...' : 'Download'}</Button>
          )}
        </PDFDownloadLink>
      )}
    </Box>
  )
}

export default GeneratePDF
