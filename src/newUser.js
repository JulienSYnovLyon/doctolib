import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function newUser()
{

    const auth = getAuth();
createUserWithEmailAndPassword(auth, 'test@test.com', 'Azerty121')
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}

export default newUser