import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import { Temporal } from '@js-temporal/polyfill'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  row: {
    flexDirection: 'row',
  },
  section: {
    marginVertical: 4,
    marginHorizontal: 6,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  item: {
    marginVertical: 4
  },
  header: {
    fontSize: 18
  },
  text: {
    fontSize: 12,
    paddingVertical: 1
  }
})

export default function RefrigerantsPDF ({ data }) {
  const formatDate = (date) => {
    const offsetZone = Temporal.TimeZone.from(date);
    const correctParsedOffsetDateTime = Temporal.Instant.from(date).toZonedDateTimeISO(offsetZone).toLocaleString();
    return correctParsedOffsetDateTime
  }

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>{`Refrigerant Report`}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>{`Main Information`}</Text>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>{`Serial Number: ${data.serial_number}`}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>{`Operator: ${data.operator}`}</Text>
            </View>
          </View>
          <Text style={styles.text}>{`Address: ${data.street}, ${data.city} ${data.zip_code}`}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>{`Full Charge`}</Text>
          {data.full_charge.map((item, i) => (
            <View style={styles.item}>
              <Text style={styles.text}>{`Date of revision: ${formatDate(item.time)}`}</Text>
              <Text style={styles.text}>{`Amount: ${item.value}`}</Text>
              <Text style={styles.text}>{`Method of calculating full charge: ${item.method}`}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>{`Servicing History`}</Text>
          {data.servicing.map((item, i) => (
            <View style={styles.item}>
              <Text style={styles.text}>{`Date of service: ${formatDate(item.time)}`}</Text>
              <Text style={styles.text}>{`Technician: ${item.technician}`}</Text>
              <Text style={styles.text}>{`Parts being serviced: ${item.parts}`}</Text>
              <Text style={styles.text}>{`Refrigerant Change: ${item.change}`}</Text>
              <Text style={styles.text}>{`Refrigerant Amount: ${item.amount}`}</Text>
              <Text style={styles.text}>{`Refrigerant Type: ${item.refrigerant_type}`}</Text>
              <Text style={styles.text}>{`Leak rate: ${item.leak_rate}`}</Text>
              <Text style={styles.text}>{`Leak rate method: ${item.method}`}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>{`Leak Inspection History`}</Text>
          {data.inspections.map((item, i) => (
            <View style={styles.item}>
              <Text style={styles.text}>{`Date of inspection: ${formatDate(item.time)}`}</Text>
              <Text style={styles.text}>{`Inspection method: ${item.method}`}</Text>
              <Text style={styles.text}>{`Location of leak: ${item.location}`}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>{`Verfication History`}</Text>
          {data.verification.map((item, i) => (
            <View style={styles.item}>
              <Text style={styles.text}>{`Date of inspection: ${formatDate(item.time)}`}</Text>
              <Text style={styles.text}>{`Location of leaks tested: ${item.location}`}</Text>
              <Text style={styles.text}>{`Types of verification tests: ${item.test}`}</Text>
              <Text style={styles.text}>{`Test Results: ${item.result}`}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}