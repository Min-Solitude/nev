import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthPayload, AuthState } from './auth.type'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { toast } from 'react-toastify'
import history from '../../store/history'
import { auth, db, provider, storage } from '../../../configs'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const initialState: AuthState = {
    accessToken: '',
    account: {
        uid: '',
        displayName: '',
        photoURL: '',
        email: '',
        member: false
    },
    loading: false,
}

// REGISTER
export const authRegister = createAsyncThunk('auth/authRegister', async (payload: AuthPayload) => {
    const { email, password } = payload

    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    return user
})

// LOGIN WITH ACCOUNT
export const authLoginWithAccount = createAsyncThunk('auth/authLoginWithAccount', async (payload: AuthPayload) => {
    const { email, password } = payload

    const { user } = await signInWithEmailAndPassword(auth, email, password)

    return user
})

// LOGIN WITH GOOGLE
export const authLoginWithGoogle = createAsyncThunk('auth/authLoginWithGoogle', async () => {
    const { user } = await signInWithPopup(auth, provider)

    return user
})

// UPDATE DISPLAY NAME
export const authUpdateDisplayName = createAsyncThunk('auth/authUpdateDisplayName', async (payload: string) => {

    const user = auth.currentUser as any;



    if (user) {
        await updateProfile(user, {
            displayName: payload
        })

    }

    return payload;

})

// UPDATE PHOTO URL
export const authUpdatePhotoURL = createAsyncThunk('auth/authUpdatePhotoURL', async (payload: any) => {
    const user = auth.currentUser
    if (user) {
        const imageRef = ref(storage, `users/${user.uid}/${payload.path}`)
        await uploadBytes(imageRef, payload, {})
        const downloadURL = await getDownloadURL(imageRef)

        await updateProfile(user, {
            photoURL: downloadURL
        })

        return downloadURL
    }
})

// REGISTER MEMBER
export const authRegisterMember = createAsyncThunk('auth/authRegisterMember', async (payload: string) => {

    const user = auth.currentUser

    if (user) {
        await setDoc(doc(db, 'members', user.uid), {
            uid: user.uid,
        })
    }

    return payload
})

export const checkMember = createAsyncThunk('auth/checkMember', async (payload: string) => {

    const docRef = doc(db, 'members', payload)

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return true
    } else {
        return false
    }

})




const reducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleLogout: (state: AuthState) => {
            state.accessToken = ''
            state.account = {
                uid: '',
                displayName: '',
                photoURL: '',
                email: '',
                member: false
            }
            history.push('/auth')
        }
    },
    extraReducers: (builder) => {
        // REGISTER
        builder.addCase(authRegister.rejected, (state, action) => {
            state.loading = false
            toast.error('Đăng ký thất bại')
        })
        builder.addCase(authRegister.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(authRegister.fulfilled, (state, action) => {
            state.loading = false
        })

        // LOGIN WITH ACCOUNT
        builder.addCase(authLoginWithAccount.rejected, () => {
            toast.error('Đăng nhập thất bại')
        })
        builder.addCase(authLoginWithAccount.fulfilled, (state, action: any) => {
            state.accessToken = action.payload.accessToken

            state.account = {
                uid: action.payload.uid,
                displayName: action.payload.displayName,
                photoURL: action.payload.photoURL,
                email: action.payload.email,
                member: action.payload.member
            }

            history.push('/')
        })

        // LOGIN WITH GOOGLE
        builder.addCase(authLoginWithGoogle.rejected, () => {
            toast.error('Đăng nhập thất bại')
        })
        builder.addCase(authLoginWithGoogle.fulfilled, (state, action: any) => {
            state.accessToken = action.payload.accessToken

            state.account = {
                uid: action.payload.uid,
                displayName: action.payload.displayName,
                photoURL: action.payload.photoURL,
                email: action.payload.email,
                member: action.payload.member
            }

            history.push('/')
        })

        // UPDATE DISPLAY NAME
        builder.addCase(authUpdateDisplayName.rejected, () => {
            toast.error('Cập nhật thất bại')
        })
        builder.addCase(authUpdateDisplayName.fulfilled, (state, action: any) => {
            state.account.displayName = action.payload
        })

        // UPDATE PHOTO URL
        builder.addCase(authUpdatePhotoURL.rejected, () => {
            toast.error('Cập nhật thất bại')
        })
        builder.addCase(authUpdatePhotoURL.fulfilled, (state, action: any) => {
            state.account.photoURL = action.payload
        })

        // REGISTER MEMBER
        builder.addCase(authRegisterMember.rejected, () => {
            toast.error('Cập nhật thất bại')
        })
        builder.addCase(authRegisterMember.fulfilled, (state, action: any) => {
            state.account.member = true
        })

        // CHECK MEMBER
        builder.addCase(checkMember.fulfilled, (state, action) => {
            state.account.member = action.payload
        })
    }
})

export const AuthAction = reducer.actions
export const AuthReducer = reducer.reducer
