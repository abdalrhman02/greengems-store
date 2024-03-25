
import { db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

// Check User Role
export const checkPermissions = async (userId) => {
    try {
        const userDocRef = doc(db, 'users', userId);
        const userDocSnapshot = await getDoc(userDocRef);
    
        if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            const userRole = userData.role;
    
            if (userRole === 'Admin') {
                console.log('Your are ADMIN');
            } else if (userRole === 'User') {
                console.log('You are USER');
            } else {
                console.log('Not user or admin either ?!');
            }
        } else {
            console.log('User document does not exist.');
        }
    } catch (error) {
        console.error('Error checking permissions:', error);
    }
};