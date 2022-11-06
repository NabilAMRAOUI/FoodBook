<template>
   <header>
    <div class="navBar">
      <nav class="navCss">
        <img class="logoNav" src="../img/logo.png">
        <RouterLink class="routerLink" to="/">Home</RouterLink>
        <a href="#cardContainer">Posts</a>
        <RouterLink v-if="isUserConnected" class="routerLink" to="/ProfileEdit">Mon Profil</RouterLink>
        <RouterLink v-if="isUserConnected" class="routerLink" to="/" @click="disconected">Se déconnecter</RouterLink>
        <RouterLink v-else class="routerLink" to="/inscription">join/log</RouterLink> 
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style lang="scss" scoped>
    @font-face {
      font-family: "mardesauve";
      src: url('fonts/marde sauve.otf');
    }
    @font-face {
    font-family: "OperatorMono";
    src: url(fonts/OperatorMono-BoldItalic.otf);
    }
    *{
    box-sizing: border-box;
    
    }

    #app{
    width: 100vw;
    padding: 0;
    margin: 0;
    
    }
    body{
    display: flex;
    margin: 0;
    width: 100vw;
    
    }
    .navBar{
    background-color: #D3D3D3;
    color: black;
    font-weight: bold;
    font-size: 1.7em;
    width: 100vw;
    height: 60px;
    border-bottom: 5px solid rgb(7, 69, 2);
    text-transform: uppercase;

    a{
        text-decoration: none;
        color: black;
    }
    
    
    
    .navCss{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        
        
    }

    
    .routerLink{
        display: flex;
        text-decoration: none;
        align-items: center;
        justify-content: space-between;

        &:hover {
        background-color: rgb(7, 69, 2);
        color: white;
        border-radius: 5px;
        }
    
    }
    a:hover {
        background-color: rgb(7, 69, 2);
        color: white;
        border-radius: 5px;
        }
    
    .logoNav{
        display: flex;
        width: 50px;
        height: 50px;
        border-radius: 75px;
        margin-top: 2px;
    }

    }

</style>

<script>
  export default {
    data() {
      return {
        isUserConnected: !!localStorage.getItem("tokenUserLog"),
      }
    },
    mounted: function(){
      this.$router.afterEach(() => {
        this.isUserConnected = !!localStorage.getItem("tokenUserLog");
      });
    },
    methods: {
      disconected: function(){
        localStorage.clear()
      }
    }
  }
</script>