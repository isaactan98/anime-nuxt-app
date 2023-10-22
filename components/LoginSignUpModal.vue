<template>
    <div>
        <div>
            <button class=" bg-violet-700 text-white px-4 py-2 rounded-lg text-sm" @click="openModal">Login</button>
        </div>
        <transition enter-active-class="ease-out duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100"
            leave-active-class="ease-in duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-show="isOpen">
                <div class="fixed inset-0 min-h-screen bg-black bg-opacity-50" @click="closeModal"></div>
                <div class="fixed inset-0 z-50">
                    <div class="flex min-h-screen items-center justify-center p-4 text-center md:w-1/3 mx-auto">
                        <div v-if="formSelection == 'login'" class="bg-slate-800 rounded-lg shadow-lg p-4 w-full">
                            <div class="flex justify-between">
                                <h1 class="text-2xl font-bold text-white">Login</h1>
                                <button class="text-2xl font-bold text-white" @click="closeModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div class="mt-4">
                                <label for="email" class="block text-sm font-bold text-white">Email</label>
                                <input type="email" name="email" id="email" v-model="email"
                                    class="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:border-violet-700"
                                    autocomplete="off">
                            </div>
                            <div class="mt-4">
                                <label for="password" class="block text-sm font-bold text-white">Password</label>
                                <input type="password" name="password" id="password" v-model="password"
                                    class="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:border-violet-700">
                            </div>
                            <div class="mt-4 text-center">
                                <button
                                    class="bg-violet-700 text-white px-4 py-2 rounded-lg text-sm flex gap-1 justify-center mx-auto"
                                    @click="loginFunction">
                                    <SpiningLoading v-if="isClicked"></SpiningLoading>
                                    Login
                                </button>
                            </div>
                            <div class="mt-4">
                                <p class="text-sm text-white">Don't have an account? <span @click="formSelection = 'signup'"
                                        class="text-violet-500 cursor-pointer">
                                        Sign Up
                                    </span></p>
                                <button class="text-white mt-3" @click="formSelection = 'reset'">
                                    <p class="text-sm">Reset Password?</p>
                                </button>
                            </div>
                            <div v-if="errorMessage" class="w-full text-center text-red-500 mt-4 text-sm">
                                {{ errorMessage }}
                            </div>
                        </div>
                        <div v-if="formSelection == 'signup'" class="bg-slate-800 rounded-lg shadow-lg p-4 w-full">
                            <div class="flex justify-between">
                                <h1 class="text-2xl font-bold text-white">Sign Up</h1>
                                <button class="text-2xl font-bold text-white" @click="closeModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div class="mt-4">
                                <label for="email" class="block text-sm font-bold">Email</label>
                                <input type="email" name="email" id="email" v-model="email"
                                    class="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:border-violet-700"
                                    autocomplete="off">
                            </div>
                            <div class="mt-4">
                                <label for="password" class="block text-sm font-bold text-white">Password</label>
                                <input type="password" name="password" id="password" v-model="password"
                                    class="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:border-violet-700">
                            </div>
                            <div class="mt-4">
                                <button
                                    class="bg-violet-700 text-white px-4 py-2 rounded-lg text-sm flex gap-1 justify-center mx-auto"
                                    @click="signUpFunction">
                                    <SpiningLoading v-if="isClicked"></SpiningLoading> Sign Up
                                </button>
                            </div>
                            <div class="mt-4">
                                <p class="text-sm text-white">Already have an account? <span
                                        @click="formSelection = 'login'" class="text-violet-500 cursor-pointer">Login</span>
                                </p>
                            </div>
                            <div v-if="errorMessage" class="w-full text-center text-red-500 mt-4 text-sm">
                                {{ errorMessage }}
                            </div>
                        </div>
                        <div v-if="formSelection == 'reset'" class="bg-slate-800 rounded-lg shadow-lg p-4 w-full">
                            <div class="flex justify-between">
                                <h1 class="text-2xl font-bold text-white">Login</h1>
                                <button class="text-2xl font-bold text-white" @click="closeModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div class="mt-4">
                                <label for="email" class="block text-sm font-bold text-white">Email</label>
                                <input type="email" name="email" id="email" v-model="email"
                                    class="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:border-violet-700"
                                    autocomplete="off" placeholder="Email for password reset">
                            </div>
                            <div class="mt-4 text-center">
                                <button
                                    class="bg-violet-700 text-white px-4 py-2 rounded-lg text-sm flex gap-1 justify-center mx-auto"
                                    @click="resetPassword">
                                    <SpiningLoading v-if="isClicked"></SpiningLoading>
                                    Reset Password
                                </button>
                                <p class="text-sm mt-4 text-white">Already have an account? <span
                                        @click="formSelection = 'login'" class="text-violet-700 cursor-pointer">Login</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-out"
            leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
            <ErrorToast v-if="success" :type="'success'" :message="'Password reset email has been sent.'" />
        </transition>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

export default {
    data() {
        return {
            formSelection: 'login',
            login: true,
            isOpen: false,
            email: '',
            password: '',
            errorMessage: '',
            isClicked: false,
            success: false
        }
    },
    props: {
        isOpenModal: Boolean
    },
    mounted() {

    },
    methods: {
        openModal() {
            this.isOpen = true
            this.email = ''
            this.password = ''
        },
        closeModal() {
            this.isOpen = false
            this.email = ''
            this.password = ''
        },
        loginFunction() {
            console.log('login')
            this.isClicked = true
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user)
                    this.isClicked = false
                    sessionStorage.setItem('userId', user.uid)
                    window.location.href = '/'
                })
                .catch((error) => {
                    console.log('error: ', error)
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    this.errorMessage = errorMessage

                    console.log(errorCode, errorMessage)

                    this.isClicked = false
                });

        },
        signUpFunction() {
            console.log('sign up', this.email, this.password)
            this.isClicked = true
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user)
                    this.isClicked = false
                    sessionStorage.setItem('userId', user.uid)
                    window.location.href = '/'

                })
                .catch((error) => {
                    console.log('error sign up: ', error)
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    console.log(errorCode, errorMessage)

                    this.errorMessage = errorMessage
                    this.isClicked = false
                });
        },
        resetPassword() {
            this.isClicked = true
            console.log('reset password')
            const auth = getAuth();
            sendPasswordResetEmail(auth, this.email).then((s) => {
                this.isClicked = false
                this.success = true
                setTimeout(() => {
                    this.success = false
                }, 3000);
                console.log(s)
            }).catch((e) => {
                this.isClicked = false
                console.error(e)
            })
        }
    }
}
</script>

<style></style>