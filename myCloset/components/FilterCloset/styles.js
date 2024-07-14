import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  filterCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  accordion: {
    backgroundColor: 'white',
    marginVertical: 8,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryText,
  },
  accordionIcon: {
    margin: 0,
  },
  checkboxItem: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  checkboxLabel: {
    fontSize: 14,
    color: COLORS.secondaryText,
  },
  header: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
    color: "#333",
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  chip: {
    margin: 4,
  },
  divider: {
    marginVertical: 16,
    backgroundColor: 'gray',
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColorCircle: {
    borderColor: COLORS.tertiary,
  },
  applyButton: {
    marginTop: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.tertiary
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '88%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  resultItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    color: "#ccc",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 8,
  },
  resultImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  closeButton: {
    marginTop: 16,
    
  },
  resultsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
