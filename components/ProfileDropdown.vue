<template>
    <Menu>
        <MenuButton>
            <div class="rounded-full bg-white p-1">
                <img src="https://s1.zerochan.net/Delta.%28Kage.No.Jitsuryokusha.Ni.Naritakute%29.600.3834699.jpg"
                    alt="" class="object-contain rounded-full w-5 h-5">
            </div>
        </MenuButton>
        <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-out" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <MenuItems class="absolute right-0 mt-2 mr-4 w-64 origin-top-right rounded-lg bg-gray-800 shadow-lg p-5">
                <div class="text-white mb-5">Hello
                    <span v-if="user != null" class="text-purple-400">
                        {{ user }}
                    </span>
                </div>
                <MenuItem class="mb-3" v-for="item in sidebarItems" :key="item" as="div" v-slot="{ close }">
                <button type="button"
                    class="text-left w-full text-sm font-light block py-2 px-5 rounded-full bg-gray-700 text-white"
                    v-if="item.id == 'server'" @click="openModal">
                    {{ item.name }}
                </button>
                <NuxtLink class="bg-gray-700 text-left text-sm font-light block py-2 px-5 rounded-full text-white"
                    v-if="item.id != 'server' && item.id != 'logout'" :to="item.route" @click="close">
                    {{ item.name }}
                </NuxtLink>
                <button type="button"
                    class="text-left w-full text-sm font-light block py-2 px-5 rounded-full bg-red-500 text-white"
                    v-if="item.id == 'logout'" @click="logOut(item.id)">
                    {{ item.name }}
                </button>
                </MenuItem>
            </MenuItems>
        </transition>
        <div v-if="isOpen">
            <ServerModal :isOpenModal="isOpen"></ServerModal>
        </div>
    </Menu>
</template>

<script setup >

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { getAuth, signOut } from "firebase/auth";

var sidebarItems = [
    { id: 'profile', name: 'Profile', route: '/profile' },
    { id: 'watch_list', name: 'Watch List', route: '/watch-list' },
    { id: 'continue_watch', name: 'Continue Watch', route: '/continue-watch' },
    { id: 'server', name: 'Server', route: '' },
    { id: 'logout', name: 'Logout', route: '/' },
]

var isOpen = false;

function openModal() {
    isOpen = true
}

function logOut(id) {
    if (id == 'logout') {
        // console.log('logout')
        const auth = getAuth();
        signOut(auth).then(() => {
            sessionStorage.removeItem('userId')
            window.location.href = '/'
        }).catch((error) => {
            console.log(error)
        });
    }
}

</script>

<script>
import { getAuth, signOut } from "firebase/auth";
export default {
    data() {
        return {
            user: 'User',
        }
    },
    mounted() {
        const auths = getAuth().currentUser;
        if (auths != null) {
            console.log('user', auths)
            this.user = auths?.displayName ?? 'User';
        }
    },
}
</script>

<style>

</style>