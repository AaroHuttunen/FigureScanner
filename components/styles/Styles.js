import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({

  // Main Menu styles.
  mainMenuContainer: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    alignItems: 'center',
    paddingTop: 20,
  },
  logoImage: {
    width: width * 0.75,
    height: height * 0.5,
    resizeMode: 'contain',
  },
  mainMenuButton: {
    backgroundColor: '#D3D3D3',
    width: width * 0.75,
    },
  mainMenuButtonText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1b1b1b',
  },

  // Figure Screen.
  figureScreenContainer: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    alignItems: 'center',
  },
  figureScreenButton: {
    backgroundColor: '#D3D3D3',
    marginVertical: 10,
    alignItems: 'center',
    padding: 10,
    margin: 5,
  },
  buttonGroup: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginBottom: 5,
  },
  editForm: {
    width: '100%',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  stat: {
    width: '33%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 5,
  },
  selectedStatBorder: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
  },
  statText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  inputButtonsContainer: {
    alignItems: 'center',
  },
  inputButton: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1b1b1b',
  },
  scanButton: {
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    width: '45%',
    padding: 10,
    marginHorizontal: 5,
  },
  scanButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1b1b1b',
  },

  // Global.
  header: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    margin: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1b1b1b',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  input: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  body: {
    width: '100%',
    padding: 10,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Figure List Screen.
  figureListItem: {
    backgroundColor: '#D3D3D3',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  figureListItemText: {
    fontSize: 18,
    color: '#1b1b1b',
  },

  // Figure Template Screen.
  developmentMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  developmentMessageText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
  },

});

export default styles;