<template>
    <div class="min-h-screen p-4 container mx-auto md:w-3/4">
        <div class="text-white min-h-[10vh] flex items-center">
            <h1 class="text-2xl font-extrabold text-purple-500">
                Profile
            </h1>
        </div>
        <div v-if="user.email != null && user.email != ''" class="flex items-center">
            <div class="bg-gray-800 py-10 pl-10 pr-10 md:pr-0 rounded-3xl mx-auto grid md:grid-cols-5">
                <!-- <div class="flex justify-center items-center mb-8 rounded-full md:col-span-2">
                    <img src="https://s1.zerochan.net/Delta.%28Kage.No.Jitsuryokusha.Ni.Naritakute%29.600.3834699.jpg"
                        alt="" class="object-contain rounded-full w-16 h-16 p-1 bg-white shadow-md shadow-indigo-600">
                </div> -->
                <div class="md:col-span-3 font-bold">
                    <div class="mb-4">
                        <label for="" class="block text-zinc-400 text-xs mb-2">EMAIL</label>
                        <input type="email" name="" id="" v-model="user.email"
                            class="w-full bg-transparent text-xl text-white py-2 rounded-xl">
                    </div>
                    <div class="mb-4">
                        <label for="" class="block text-zinc-400 text-xs mb-2">DISPLAY NAME</label>
                        <input type="text" name="" id="" v-model="user.name" maxlength="12"
                            class="w-full bg-transparent text-xl text-white py-2 rounded-xl">
                    </div>
                    <div class="mb-4">
                        <label for="" class="block text-zinc-400 text-xs">JOINED DATE</label>
                        <div class=" w-full bg-transparent text-xl text-white py-2">{{ user.joinedDate }}</div>
                    </div>
                    <button type="button"
                        class="px-5 py-3 bg-purple-500 hover:bg-purple-600 shadow-lg shadow-purple-500 text-white w-full mx-auto rounded-lg flex items-center justify-center"
                        @click="updateProfile">
                        <SpiningLoading v-if="isSaving" class="mr-3"></SpiningLoading> Save
                    </button>
                </div>
                <div class="md:col-span-2 flex items-center">
                    <div class=" mt-12 md:mt-0">
                        <img src="https://shadow-garden.jp/assets/img/character/chara4_main1.png" alt="">
                    </div>
                </div>
            </div>
            <!-- <div class="hidden md:flex md:w-1/3 justify-center items-center">
                <img src="https://shadow-garden.jp/assets/img/character/chara4_main1.png" alt="">
            </div> -->
        </div>
        <div v-else class=" text-white">
            Loading...
        </div>
        <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-out"
            leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
            <ErrorToast v-if="success" :type="'success'" :message="'Successfully update profile'" />
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
                    // console.log('email updated')
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
                    // console.log('name updated')
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

<style></style>