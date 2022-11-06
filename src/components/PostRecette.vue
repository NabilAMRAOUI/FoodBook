
<script>
export default {
    data() {
        return {
            // bool est utilisé pour afficher la liste des posts quand clique sur le bouton
            bool: false,
            addlike: 0,
            listPost:[],
            com:""
           

        };
    },
    emits: ["eventCom","someEvent","sendComment"],

    
    //Ici ce sont les données liés à un post
    props: ["auteur", "titre", "recette", "date", "heure", "nblike", "nbcom", "click", "msgBody", "key","listcom"],

    methods: {
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

      console.log(this.listPost);
     
    },
        
       
        //Fonction pour afficher ou non la div contenant la liste des posts
        clickCom: function () {
            let token = JSON.parse(localStorage.getItem("tokenUserLog"));
            if (token == null) {
                alert("Vous devez vous connectez pour pouvoir commenter")
            } else {
                if (this.bool == true) {
                    this.bool = false;
                } else
                    this.bool = true;
            }
        },

      



    
},
}

</script>

<template>
    <div class="complete">

    

    <div class="post">

        <div class="tittle">
            {{titre}}

        </div>
        <div class="recette">
            <p>
                {{recette}}
            </p>

        </div>
        <div class="footerpost">
            <div class="like">
                <form action="">


                    <button @click.prevent="$emit('someEvent')">
                        <i class="fa-solid fa-heart"></i>
                    </button>
                </form>
                <div class="nblike">
                    {{nblike}} <i class="fa-solid fa-heart"></i>
                </div>
            </div>
            <div class="com">
                <button @click="clickCom"  class="buttoncom">
                    <i class="fa-solid fa-comments"></i>
                </button>
                <div class="nbcom">
                    {{nbcom}} commentaires
                </div>

            </div>



        </div>
    </div>
    <div v-if="bool" class="listcomcontainer">
        <form action="">
            <input v-model="this.com" type="text" placeholder="A vos commentaires!">
            <button @click.prevent="$emit('sendComment',this.com)" class="buttoncomvalid">
                <i class="fa-solid fa-share"></i>
            </button>
        </form>
        <div  v-for="item in listcom" class="listcom">

            <div class="auteurdate">

                <h1>{{item.firstname}}</h1> a écrit   :

            </div>
            <p>
                {{item.content}}
            </p>

        </div>





    </div>
</div>
</template>


<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

body {
    margin: 0;
}

$colorPrimary: #A52A2A;
$colorGreyLight: #D3D3D3;
$colorGreyMedium: #A9A9A9;
$colorGreyDark: #353535;
$taillewidhtpost: 370px;

.post {
    width: $taillewidhtpost;
    text-align: center;
    height: 300px;
    background-color: $colorGreyLight;
    padding: 20px;
    margin: 5px 20px;
    border-radius: 10px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
}

.tittle {
    color: $colorPrimary;
    height: 10%;
    width: 100%;
    font-size: larger;
}

.cardContainer {
    display: flex;
    flex-direction: row;
    margin-top: 30px;
}

.recette {
    height: 70%;
    width: 100%;
    background-color: white;
    border-radius: 10px;

    p {
        padding: 10px;
    }

}

.footerpost {
    height: 20%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;

}

.com {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.like {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;



}

button {
    width: 40px;
    height: 40px;
    margin: 5px;
    justify-content: flex-end;
    display: block;
    color: #fff;
    background: $colorGreyDark;
    font-size: 1em;
    font-weight: bold;
    outline: none;
    border: none;
    border-radius: 5px;
    transition: 0.2s ease-in;
    cursor: pointer;

    &:hover {
        color: $colorPrimary;
        background: white;
        border: $colorGreyDark 1px solid;

    }
}


.nblike {

    align-items: center;
    vertical-align: flex-start;
    width: 40%;
    color: #A52A2A;
}

.com {

    align-items: center;
    vertical-align: flex-start;
    width: 40%;
    color: $colorGreyDark;
}

.listcomcontainer {
    width: $taillewidhtpost;
    height: auto;
    border: 1px solid $colorPrimary;
    padding: 20px;
    border-radius: 10px;
    margin-left: 20px;
    margin-bottom: 20px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
}

.listcom {
    display: flex;
    flex-direction: column;
    border: 1px solid $colorPrimary;
    // padding: 5px;
    border-radius: 10px;
    margin:5px;

    h1 {
        font-size: 15px;
        margin-right: 10px;
    }

}

.auteurdate {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 12px;

}

input {
    width: 85%;
    height: 40px;
    border: 1px solid $colorGreyDark;
    border-radius: 10px;
    outline: none;
    padding: 5px;

}

form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

}




</style>