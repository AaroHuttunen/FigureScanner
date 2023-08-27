import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  // Main Menu styles.
  mainMenuButton: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 30,
    paddingHorizontal: 30,
    marginVertical: 10,
    width: 300,
    alignItems: 'center',
  },
  mainMenuButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1b1b1b',
  },
  mainMenuContainer: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    alignItems: 'center',
    paddingTop: 20,
  },
  logoImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    margin: 20,
  },
  mainMenuButtonContainer: {
    alignItems: 'center',
    width: '80%',
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
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1b1b1b',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  // Figure Screen.
  figureScreenButton: {
    backgroundColor: '#D3D3D3',
    marginVertical: 10,
    alignItems: 'center',
    padding: 10,
    margin: 5,
  },
  figureScreenContainer: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    alignItems: 'center',
  },
  buttonGroup: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scanButton: {
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 5,
    borderColor: '#ffffff',
    width: 80,  
    height: 80,
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  scanButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1b1b1b',
  },
  editForm: {
    width: '100%',
    alignItems: 'center',
  },
  inputButtons: {
    flexDirection: 'row',
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
  statText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  inputButton: {
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 5,
    borderColor: '#ffffff',
    width: 60,  
    height: 60,
    paddingTop: 12,
    marginLeft: 5,
    marginRight: 5,
  },
  inputButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1b1b1b',
  },
  inputButtonsContainer: {
    alignItems: 'center',
  },
  selectedStatBorder: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default styles;
