<script setup>
import PostRecette from '../components/PostRecette.vue';
import { getPosts } from "../lib/posts";
</script>

<script>


export default{
    data() {
        
        return {
            userProfilList: {},
            listPost: [],
            array: "test"
        };
    },
    methods: {
        

        showPost: async function () {
            this.listPost = await getPosts();
            
           
             const _id = this.userProfilList._id
            const IDconnecté = this.userProfilList.userId
            
            
            
        },
        // getPosts: async function (){
            
        //     this.listPost = await getPosts();
        //     console.log("listpost", this.listPost);
        // },
        
        // getPosts: async function () {
        //     const options = {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //     };
        //     const response = await fetch("https://social-network-api.osc-fr1.scalingo.io/foodbook/posts?page=0&limit=10", options);
        //     const data = await response.json();
        //     this.listPost = data.posts;
            
            
        // },

        modifyProfile: async function () {
            let token = JSON.parse(localStorage.getItem("tokenUserLog"));
            // console.log(token);
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${token}`,
                },
            };
            const response = await fetch("https://social-network-api.osc-fr1.scalingo.io/foodbook/user", options);
            const data = await response.json();
            // console.log("data:", data);
            // console.log("userProfilList", this.userProfilList);
            this.userProfilList = data;
        },
        modifyInfoProfile: async function () {
            let token = JSON.parse(localStorage.getItem("tokenUserLog"));
            // console.log(token);
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${token}`,
                },
                Body: JSON.stringify({
                    firstName: this.userProfilList.firstName,
                    lastName: this.userProfilList.lastName,
                    email: this.userProfilList.email,
                    age: this.userProfilList.age
                })
            };
            const response = await fetch("https://social-network-api.osc-fr1.scalingo.io/foodbook/user", options);
            const data = await response.json();
            // console.log("data:", data);
            this.result = data.success;
            // console.log("userProfilList", this.userProfilList);

        },
       
    },
    mounted: function() {
        this.modifyProfile()
        this.showPost()
    }
    
};



</script>



<template>
    <div class="formProfil">
        <h1>Votre Profil</h1>
        <!-- <form type="submit" @submit.prevent="modifyProfile()" @click="modifyProfile()">
            <button >afficher son Profil</button>
        </form> -->

        
        <form class="form" @submit.prevent="modifyInfoProfile()" >
            
            <label for="">Modifier votre nom:<input type="text" placeholder="nom"  v-model="this.userProfilList.lastname"></label>
            <label for="">Modifier votre prénom: <input type="text" placeholder="prénom"  v-model="this.userProfilList.firstname"></label>
            <label for="">Modifier votre email: <input type="text" placeholder="email" v-model="this.userProfilList.email"></label>
            <button>Modifier son profil</button>
        </form>
    </div>
    <div class="userposts">
        <!-- <button @click.prevent="showPost">teeeest</button> -->
        <h2>Les posts que j'ai créé:</h2>
        <div class="perso">

            <template v-for="item in this.listPost">
                <PostRecette v-if= "this.userProfilList._id == item.userId "
                :titre="item.title" :recette="item.content" :nblike="item.likes.length" :nbcom="item.comments.length"
                :key="item._id" :listcom="item.comments" />
                
            </template>
        </div>
        
    </div>
    
</template>

<style lang="scss" scoped>
$colorPrimary: #A52A2A;
.formProfil{
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: lightgray;
    justify-content: center;
    
    button{
        border-radius: 10px;
        background-color: rgb(7, 69, 2);
        color: white;
        margin-bottom: 20px;

    }
    .form{
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: space-between;
    text-align: center;
    justify-content: center;
    input{
        display: flex;
        margin-bottom: 20px;
        justify-content: center;
    }
    
    
    }
}
.userposts{
    display: flex;
    flex-direction: column;
    
}
.perso{
   
    margin: 5px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
h2{
    font-size: 15px;
}
</style>