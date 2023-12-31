import IonIcon from '@reacticons/ionicons'
import { useEffect, useState } from 'react'
import Button from '../../components/Button'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import View from '../../motion/View'
import { authLoginWithGoogle } from '../../redux/reducers/auth'
import history from '../../redux/store/history'
import Login from './Login'
import Register from './Register'

const Auth = () => {
    const checkAccessToken = useAppSelector((state) => state.auth.accessToken)
    const [isLogin, setIsLogin] = useState<boolean | null>(true)
    const [isShowFormLogin, setIsShowFormLogin] = useState<boolean>(false)
    const isWelcome = sessionStorage.getItem('isWelcome')
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (checkAccessToken) {
            history.push('/')
        }
    }, [checkAccessToken, isWelcome])

    const handleLoginGoogle = () => {
        dispatch(authLoginWithGoogle())
    }


    return (
        <View className=' bg-black text-white font-medium min-h-screen flex justify-center items-center '>
            <View className='flex flex-col lg:flex-row  justify-center items-center gap-8 w-full'>
                {isShowFormLogin ? (
                    <View className=' flex-1 flex w-full flex-col items-center gap-8'>
                        <Button
                            className='flex justify-center items-center '
                            type='button'
                            onClick={() => setIsShowFormLogin(false)}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, type: 'spring', bounce: 0.5 }}
                        >
                            <IonIcon name='close-outline' className='text-gray-500 text-[1.6rem]' />
                        </Button>
                        {isLogin ? <Login /> : <Register close={() => setIsLogin(true)} />}
                        <Button onClick={() => setIsLogin(!isLogin)}>
                            <span className='text-[0.8rem] font-light underline text-[#4b4b4b]'>
                                {isLogin ? 'Đăng ký' : 'Đăng nhập'}
                            </span>
                        </Button>
                    </View>
                ) : null}
                {
                    !isShowFormLogin && (
                        <View
                            className={
                                isShowFormLogin ? 'flex gap-6 items-center flex-1 justify-center' : 'flex gap-6 items-center '
                            }
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <View className='group flex flex-col items-center gap-2 cursor-pointer'
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2, delay: 0.2 }}
                            >
                                <span className='opacity-0 group-hover:opacity-[1] duration-200 text-gray-600 text-[0.8rem] -translate-y-4 group-hover:-translate-y-2'>
                                    Nev
                                </span>
                                <button
                                    className='w-[3.5rem] h-[3.5rem] rounded-2xl border border-gray-800 group-hover:-translate-y-2 duration-200 flex justify-center items-center gap-2 bg-gray-900 shadow-md '
                                    onClick={() => history.push('https://www.nevsolit.website/')}
                                >
                                    <span className='text-[1.4rem] text-gray-300 duration-200 '>N</span>
                                </button>
                            </View>

                            <View className='group flex flex-col items-center gap-2 cursor-pointer'
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2, delay: 0.4 }}
                            >
                                <span className='opacity-0 group-hover:opacity-[1] duration-200 text-gray-600 text-[0.8rem] -translate-y-4 group-hover:-translate-y-2'>
                                    Google
                                </span>
                                <button
                                    className='w-[3.5rem] h-[3.5rem] rounded-2xl border border-gray-800 group-hover:-translate-y-2 duration-200 flex justify-center items-center gap-2 bg-gray-900 shadow-md '
                                    onClick={handleLoginGoogle}
                                >
                                    <IonIcon name='logo-google' className='text-[1.4rem] text-gray-300 duration-200 ' />
                                </button>
                            </View>

                            <View className='group flex flex-col items-center gap-2 cursor-pointer'
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2, delay: 0.6 }}
                            >
                                <span className='opacity-0 group-hover:opacity-[1] duration-200 text-gray-600 text-[0.8rem] -translate-y-4 group-hover:-translate-y-2'>
                                    Login
                                </span>
                                <button
                                    className='w-[3.5rem] h-[3.5rem] rounded-2xl border border-gray-800 group-hover:-translate-y-2 duration-200 flex justify-center items-center gap-2 bg-gray-900 shadow-md '
                                    onClick={() => setIsShowFormLogin(true)}
                                >
                                    <IonIcon name='person' className='text-[1.4rem] text-gray-300 duration-200 ' />
                                </button>
                            </View>
                        </View>
                    )
                }
            </View>
        </View>
    )
}
export default Auth
