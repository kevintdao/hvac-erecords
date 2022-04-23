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
    marginVertical: 1
  },
  section: {
    marginVertical: 4,
    marginHorizontal: 6,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  task: {
    marginVertical: 4
  },
  header: {
    fontSize: 18
  },
  text: {
    fontSize: 12
  }
})

export default function RecordPDF ({ data, visits }) {
  const formatDate = (date) => {
    const offsetZone = Temporal.TimeZone.from(date);
    const correctParsedOffsetDateTime = Temporal.Instant.from(date).toZonedDateTimeISO(offsetZone).toLocaleString();
    return correctParsedOffsetDateTime
  }

  return (
    <Document>
      {visits.map((item, i) => (
        <Page size='A4' style={styles.page} key={item.visit.id}>
          <View style={styles.section}>
            <Text style={styles.header}>{`Visit ${item.visit.id}`}</Text>
            <Text style={styles.text}>{`Start time: ${formatDate(item.visit.start_time)}`}</Text>
            <Text style={styles.text}>{`End time: ${formatDate(item.visit.end_time)}`}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.header}>Unit</Text>
            <Text style={styles.text}>{`External ID: ${data.external_id}`}</Text>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.text}>{`Category: ${data.category}`}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.text}>{`Manufacturer: ${data.manufacturer}`}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.text}>{`Serial Number: ${data.serial_number}`}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.text}>{`Model Number: ${data.model_number}`}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.text}>{`Production Date: ${data.production_date}`}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.text}>{`Installation Date: ${data.installation_date}`}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.header}>Plan</Text>
            <Text style={styles.text}>{`Title: ${item.plan.profile_title}`}</Text>
            <Text style={styles.text}>{`Description: ${item.plan.profile_description}`}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.header}>Technician</Text>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.text}>{`First name: ${item.technician.first_name}`}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.text}>{`Last name: ${item.technician.last_name}`}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.text}>{`Affiliation: ${item.technician.affiliation}`}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.text}>{`License number: ${item.technician.license_number}`}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.header}>Task</Text>
            {item.tasks.map(task => (
              <View style={styles.task} key={task.id}>
                <Text style={styles.text}>{`Title: ${task.task_title}`}</Text>
                <Text style={styles.text}>{`Description: ${task.task_description}`}</Text>
                <Text style={styles.text}>
                  {task.task_rule.type == 'Text' ? `Input: ${task.response}` :
                  task.task_rule.type == 'Selection' ? `Input: ${task.task_rule.options[task.selection]}` :
                  task.task_rule.type == 'Numeric' ? `Input: ${task.value}` :
                  ''
                  }
                </Text>
              </View>
            ))}
          </View>
        </Page>
      ))}
    </Document>
  )
}