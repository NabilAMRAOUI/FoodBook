
<!-- style CSS -->
<!-- Affichage de plusieurs posts sur la page avec menu page1 sur 10-->
<!-- Affichage  des infos du profil sur les likes et commentaires-->



<script setup>
import PostRecette from "../components/PostRecette.vue";
// import { getPosts } from "../lib/posts";
</script>

<script>
export default {
  data() {
    return {
      listPost: [],
      ifcreateposte: false,
      posteOK: false,
      infoPost: {
        titre: "",
        recette: "",
      },
      listCom: [],
    };
  },

  methods: {
   
    newPost: function () {
      let token = JSON.parse(localStorage.getItem("tokenUserLog"));
      console.log(token)
      if (token == null) {
        alert("Vous devez vous connecter pour pouvoir poster")
        console.log("tata")
        
      } 
      else {
        
        if (this.ifcreateposte == true) {
          this.ifcreateposte = false;
        } else this.ifcreateposte = true;
        console.log("toto")
      }
    },
    postAffiche: function (e) {
      e.preventDefault();
      this.posteOK = true;
      if (this.posteOK == true) {
        this.ifcreateposte = false;
      } else this.posteOK = true;
    },
    // Requete pour lire les posts
    getPosts: async function () {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        "https://social-network-api.osc-fr1.scalingo.io/foodbook/posts?page=0&limit=10",
        options
      );
      const data = await response.json();

      this.listPost = data.posts;
      console.log("toto")

    },

    // Requete pour créer un post
    createPost: async function () {
      //Reccupère le token qui est dans le local storage
      let token = JSON.parse(localStorage.getItem("tokenUserLog"));

      const infoPost = {
        titre: this.infoPost.titre,
        recette: this.infoPost.recette,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          title: infoPost.titre,
          content: infoPost.recette,
        }),
      };
      const response = await fetch(
        "https://social-network-api.osc-fr1.scalingo.io/foodbook/post",
        options
      );
      const data = await response.json();

      if (data.success) {
        await this.getPosts();
        
      } else {
        alert("Veuillez vous inscrire");
      }

      this.listPost.push(infoPost);
      this.ifcreateposte=false;
    
    },
    addComment: async function (reccupid, reccupcom) {

      let token = JSON.parse(localStorage.getItem("tokenUserLog"));

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${token}`,
        },
        body: JSON.stringify({
          postId: `${reccupid}`,
          content: `${reccupcom}`,
        }),
      };
      const response = await fetch(
        "https://social-network-api.osc-fr1.scalingo.io/foodbook/post/comment",
        options
      );
      const data = await response.json();
      await this.getPosts()

    },
    // Requete pour liker les posts
    likePosts: async function (reccupid) {
      //Reccupère le token qui est dans le local storage
      let token = JSON.parse(localStorage.getItem("tokenUserLog"));
      if(token!=null){

        
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`,
          },
          body: JSON.stringify({
            postId: `${reccupid}`,
          }),
        };
        const response = await fetch(
          "https://social-network-api.osc-fr1.scalingo.io/foodbook/post/like",
          options
          );
          const data = await response.json();
          console.log(data);
          if(data.success==false){
            alert("Vous avez déjà liker ce post")
          } else {

            await this.getPosts()
          }
          
        } else {
          alert("Vous devez vous connecter pour pouvoir liker")
        }
    },

  },

  computed: {
  
  },
  mounted: function () {
    this.getPosts();
  },
};
</script>

<template>
  <div class="inputcreate">

    <button @click="newPost" type="submit">Créer un post</button>
    <div  v-if="ifcreateposte" >
      <form @submit.prevent="createPost()" action="" class="newpost">
        <input v-model="this.infoPost.titre" type="text" placeholder="Titre" />
        <input v-model="this.infoPost.recette" type="text" placeholder="Recette" class="inprecette"/>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  </div>
  <div class="container">

    
    <PostRecette @some-event="likePosts(item._id)" @send-comment="(com) => addComment(item._id,com)"
      v-for="item in this.listPost" :titre="item.title" :recette="item.content" :nblike="item.likes.length" :nbcom="item.comments.length"
      :key="item._id" :listcom="item.comments" />
    </div>
</template>

<style lang="scss" scoped>
button {
  width: 100px;
  height: 50px;
  border-radius: 10px;
  background-color: rgb(7, 69, 2);
  color: white;
  font-size: 0, 6em;
}

.inputcreate{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding:20px;
  margin:10px;
}
.newpost{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding:20px;
  margin:10px;
  input{
    margin:10px;
    width: 400px;

  }
  .inprecette{
    height: 150px;

  }
 
  
}

.container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    
  }
 
</style>
