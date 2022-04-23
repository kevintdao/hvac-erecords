import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
})

export default function RecordPDF ({ data }) {
  console.log(data)
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.section}>
          <Text>{data[0].visit.id}</Text>
        </View>
      </Page>
    </Document>
  )
}