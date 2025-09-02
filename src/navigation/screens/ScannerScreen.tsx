import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

export function ScannerScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Barcode Scanner</ThemedText>
      <ThemedText>Scan barcodes to get product information.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
