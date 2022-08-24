
import { deletedoctordata, getdoctordata, postdoctordata, putdoctordata } from "../../commene/api/doctor.api";
import { BASE_URL } from "../../Share/baseurl";
import * as ActionType from "../ActionType"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";



// getMedicines
export const getDoctor = () => async (dispatch) => {
    console.log("asdaasdasdasdasd");
    try {
        dispatch(loadingdoctor());
        const querySnapshot = await getDocs(collection(db, "doctors"));
    
        let data = [];
        console.log(data);
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() })
          // console.log(`${doc.id} => ${doc.data()}`);
    
        });
    
        dispatch({ type: ActionType.GET_DOCTOR, payload: data })

    } catch (error) {
        dispatch(errordoctor(error))
    }
}

// addmedicinedata
export const adddoctordata = (data) => async (dispatch) => {
    try {
        const docRef = await addDoc(collection(db, "doctors"), data);
    dispatch({ type: ActionType.ADD_DOCTOR, payload: { id: docRef.id, ...data } })

    } catch (error) {
        console.error("Error adding document: ", error);
        dispatch(errordoctor(error))
    }
}

// updatemedicine

export const updatedoctor = (data) => async (dispatch) => {
    console.log(data);
    try {
        putdoctordata(data)
        // .then((data) => dispatch(({ type: ActionType.UPDATE_DOCTOR, payload: data.data })))
        // .catch(error => dispatch(errorDoctor(error.message)))
    
        const DoctorRef = doc(db, "doctors", data.id);
    
        // Set the "capital" field of the city 'DC'
        await updateDoc(DoctorRef, {
          expiry : data.expiry,
          quantity : data.quantity,
          price : data.price,
          name : data.name
        });
    
        dispatch({ type: ActionType.UPDATAS_DOCTOR, payload: data})
    
      }
      catch (error) {
        dispatch(errordoctor(error))
      }
}

// Deletemedicine

export const Deletedoctor = (id) => async (dispatch) => {
    try {
        await deleteDoc(doc(db, "doctors", id));
    deletedoctordata(id)
    // .then(dispatch(({ type: ActionType.DELETE_DOCTOR, payload: id })))
    // .catch(error => dispatch(errorDoctor(error.message)))

    dispatch({ type: ActionType.REMOVE_DOCTOR, payload: id })

  }
  catch (error) {
    dispatch(errordoctor(error))
  }
}



export const loadingdoctor = () => (dispatch) => {
    dispatch({ type: ActionType.LOADING_DOCTOR })
}

export const errordoctor = (error) => (dispatch) => {
    dispatch({ type: ActionType.DOCTOR_ERROES, payload: error })
} 