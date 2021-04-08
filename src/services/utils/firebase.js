import firebase from 'firebase'
// import keyCofig from '../../../firebaseKey.json'

// punyaku
// const config = {
//   apiKey: 'AIzaSyCZbDalQpP24Kd_zFZe0GK8zOYyAyXTfGA',
//   authDomain: 'fir-otp-f5459.firebaseapp.com',
//   projectId: 'fir-otp-f5459',
//   databaseURL: 'https://fir-otp-f5459.firebaseio.com',
//   storageBucket: 'fir-otp-f5459.appspot.com',
//   messagingSenderId: '446877541909',
//   appId: '1:446877541909:web:d47983213440ee0ee9101c'
// }

let config = {
  apiKey: 'AIzaSyBqqgN6F7ckscELjfw_pq4_mnvfegEGyr4',
  authDomain: 'app-ta.firebaseapp.com',
  databaseURL: 'https://app-ta.firebaseio.com',
  projectId: 'app-ta',
  storageBucket: 'app-ta.appspot.com',
  messagingSenderId: '732436037901',
  appId: '1:732436037901:web:4172f74c8d59180e6bf044'
}


if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
  firebase.auth().languageCode = 'id'
}

export default firebase
