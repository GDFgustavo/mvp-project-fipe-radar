import {
  Document,
  Page,
  Text,
  View,
  PDFDownloadLink,
  Font,
  Image
} from '@react-pdf/renderer'
import { styles } from './styles'
import CustomButton from '../../Buttons/CustomButton'

import fipeLogo from '../../../assets/fipe-logo-black.png'
import { PdfIcon } from '../../SvgIcons'
Font.register({
  family: 'Open Sans',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.ttf',
      fontWeight: 400
    },
    {
      src: 'https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVc.ttf',
      fontWeight: 600
    },
    {
      src: 'https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVc.ttf',
      fontWeight: 700
    }
  ]
})

const FipeResultPdf = ({ vehicles }) => {
  return (
    <div>
      <PDFDownloadLink
        document={
          <Document>
            <Page
              size={vehicles.length === 1 ? 'A4' : [595.28, 1200]}
              style={styles.page}
            >
              <Text style={styles.watermark}>FIPE RADAR</Text>

              <View style={styles.header}>
                <Image src={fipeLogo} style={styles.logo} />
                <View style={styles.headerText}>
                  <Text style={styles.title}>Relatório de Veículos</Text>
                  <Text style={styles.subtitle}>Consulta FIPE Completa</Text>
                </View>
              </View>

              <View style={styles.reportInfo}>
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>Data de Emissão</Text>
                  <Text style={styles.infoValue}>
                    {new Date().toLocaleDateString('pt-BR')}
                  </Text>
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>Total de Veículos</Text>
                  <Text style={styles.infoValue}>{vehicles.length}</Text>
                </View>
              </View>

              {vehicles.map((vehicle, index) => (
                <View key={index} style={styles.card}>
                  <View style={styles.vehicleHeader}>
                    <Text style={styles.vehicleTitle}>
                      {vehicle.brand} {vehicle.model}
                    </Text>
                  </View>

                  <View style={styles.tableHeader}>
                    <Text style={styles.tableCellHeader}>Campo</Text>
                    <Text style={styles.tableCellHeader}>Valor</Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Marca</Text>
                    <Text style={[styles.tableCell, styles.highlightCell]}>
                      {vehicle.brand}
                    </Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Modelo</Text>
                    <Text style={[styles.tableCell, styles.highlightCell]}>
                      {vehicle.model}
                    </Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Ano/Combustível</Text>
                    <Text style={styles.tableCell}>
                      {vehicle.modelYear} ({vehicle.fuel})
                    </Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Código FIPE</Text>
                    <Text style={styles.tableCell}>{vehicle.codeFipe}</Text>
                  </View>

                  <View
                    style={[styles.tableRow, { backgroundColor: '#f8fafc' }]}
                  >
                    <Text style={[styles.tableCell, { fontWeight: 600 }]}>
                      Preço
                    </Text>
                    <Text style={[styles.tableCell, styles.priceCell]}>
                      {vehicle.price}
                    </Text>
                  </View>
                </View>
              ))}

              <View style={styles.footer}>
                <Text>
                  Emitido por FIPE Radar • {new Date().getFullYear()} •
                  Documento confidencial
                </Text>
              </View>
            </Page>
          </Document>
        }
        fileName={`fiperadar_consulta.pdf`}
        style={{
          textDecoration: 'none'
        }}
      >
        <CustomButton size="medium">
          <PdfIcon />
          Baixar PDF
        </CustomButton>
      </PDFDownloadLink>
    </div>
  )
}

export default FipeResultPdf
