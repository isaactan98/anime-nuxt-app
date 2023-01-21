<template>
    <div class="min-h-screen p-4 container mx-auto md:w-2/3">
        <div class="text-white min-h-[10vh] flex items-center">
            <h1 class="text-2xl font-extrabold text-purple-500">
                Profile
            </h1>
        </div>
        <div v-if="user.email != null && user.email != ''">
            <div class="bg-gray-800 p-5 rounded-lg mx-auto">
                <div class="mb-4">
                    <label for="" class="block text-zinc-400 text-xs">EMAIL</label>
                    <input type="email" name="" id="" v-model="user.email"
                        class="w-full bg-transparent text-xl text-white py-2">
                </div>
                <div class="mb-4">
                    <label for="" class="block text-zinc-400 text-xs">DISPLAY NAME</label>
                    <input type="email" name="" id="" v-model="user.name"
                        class="w-full bg-transparent text-xl text-white py-2">
                </div>
                <div class="mb-4">
                    <label for="" class="block text-zinc-400 text-xs">JOINED DATE</label>
                    <div class=" w-full bg-transparent text-xl text-white py-2">{{ user.joinedDate }}</div>
                </div>
                <button type="button"
                    class="px-5 py-3 bg-purple-500 shadow-lg shadow-purple-500 text-white w-full mx-auto rounded-lg flex items-center justify-center"
                    @click="updateProfile">
                    <SpiningLoading v-if="isSaving" class="mr-3"></SpiningLoading> Save
                </button>
            </div>
        </div>
        <div v-else class=" text-white">
            Loading...
        </div>
        <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-out" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <div class="w-full mt-4" v-show="success">
                <div class=" text-white bg-green-600 px-3 py-4 rounded-lg">
                    Successfully updated profile
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { getAuth, updateProfile, updateEmail } from "firebase/auth";

export default {
    data() {
        return {
            user: {
                name: '',
                email: '',
                uid: '',
                joinedDate: ''

            },
            isSaving: false,
            success: false
        }
    },
    mounted() {
        this.getUser();
        useHead({
            title: 'Profile',
            meta: [
                {
                    name: 'description',
                    content: 'Profile page'
                }
            ]
        })
    },
    methods: {
        getUser() {
            const auth = getAuth();
            auth.onAuthStateChanged((user) => {
                if (user) {
                    this.user.name = user.displayName;
                    this.user.email = user.email;
                    this.user.uid = user.uid;
                    this.user.joinedDate = new Date(user.metadata.creationTime).toLocaleDateString();
                }
            });
        },
        updateProfile() {
            this.isSaving = true;
            const auth = getAuth();
            // console.log(auth.currentUser)
            if (auth.currentUser.email != this.user.email) {
                updateEmail(auth.currentUser, this.user.email).then(() => {
                    console.log('email updated')
                    this.isSaving = false;
                    this.success = true;
                }).catch((error) => {
                    console.log(error)
                });
            }
            else if (auth.currentUser.displayName != this.user.name) {
                updateProfile(auth.currentUser, {
                    displayName: this.user.name
                }).then(() => {
                    console.log('name updated')
                    this.isSaving = false;
                    this.success = true;
                }).catch((error) => {
                    console.log(error)
                });
            }
            else {
                this.isSaving = false;
            }

            setInterval(() => {
                this.success = false;
            }, 5000);
        },

    }
}
</script>

<style>

</style>