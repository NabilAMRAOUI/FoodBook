<script>



export default  {

  data() {
    return {
      infoUser: { lastName: "", firstName: "", email: "", password: "", result: null, token: "", },
      ListUser: [],


    };
  },
  methods: {

    // Requete pour s'enregistrer
    GetRegister: async function () {

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.infoUser.email,
          password: this.infoUser.password,
          firstname: this.infoUser.firstName,
          lastname: this.infoUser.lastName,
        }),
      };
      const response = await fetch("https://social-network-api.osc-fr1.scalingo.io/foodbook/register", options);
      const data = await response.json();
      console.log("data", data)
      this.result = data.success;
      console.log("infoUser", this.infoUser)

    },

    // Requete pour se connecter
    GetLogin: async function () {

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.infoUser.email,
          password: this.infoUser.password,

        }),
      };
      const response = await fetch("https://social-network-api.osc-fr1.scalingo.io/foodbook/login", options);
      const data = await response.json();
      console.log("data", data)
      this.infoUser.result = data.success;
      this.infoUser.token = data.token;
      console.log("infoUser", this.infoUser)
      if (data.success == true) {

        // Mise dans le local storage
        localStorage.setItem("tokenUserLog", JSON.stringify(this.infoUser.token));
        alert("Connexion réussie")
        // redirrige vers la page des posts
        this.$router.push('/thefoodbook');

      } else
        alert("Identifiant ou mot de passe erroné")


    },



  },
};


</script>

<template>



  <body>
  
    <div class="main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div class="signup">
        <form @submit.prevent="GetRegister()">
          <label for="chk" aria-hidden="true">Inscription</label>
          <input v-model="this.infoUser.lastName" type="text" name="txt" placeholder="Nom" />
          <input v-model="this.infoUser.firstName" type="text" name="txt" placeholder="Prenom" />
          <input v-model="this.infoUser.email" type="email" name="email" placeholder="Email" />
          <input v-model="this.infoUser.password" type="password" name="pswd" placeholder="Mot De Passe" />
          <button type="submit">Valider</button>

        </form>
      </div>

      <div class="login">

        <form @submit.prevent="GetLogin()" >
         
          <label for="chk" aria-hidden="true">Connexion</label>
          <input v-model="this.infoUser.email" type="email" name="email" placeholder="Email" />
          <input v-model="this.infoUser.password" type="password" name="pswd" placeholder="Mot De Passe" />
          <button>Connexion</button>
          

        </form>
      </div>
    </div>

  </body>
</template>





<style scoped lang=scss>
body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: "Jost", sans-serif;
  background: linear-gradient(to bottom, white, lightgray, #24243e);
}

.main {
  width: 350px;
  height: 500px;
  background: #a9a9a9;
  overflow: hidden;
  /* background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38")
    no-repeat center/ cover; */
  border-radius: 10px;
  box-shadow: 5px 20px 50px #000;
}

#chk {
  display: none;
}

.signup {
  position: relative;
  width: 100%;
  height: 100%;
}

label {
  color: #2b2a2a;
  font-size: 2.3em;
  justify-content: center;
  display: flex;
  margin: 60px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s ease-in-out;
}

input {
  width: 60%;
  height: 20px;
  background: #f8f5f5;
  justify-content: center;
  display: flex;
  margin: 20px auto;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 5px;
}

button {
  width: 60%;
  height: 40px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: #fff;
  background: #655151;
  font-size: 1em;
  font-weight: bold;
  margin-top: 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: 0.2s ease-in;
  cursor: pointer;
}

button:hover {
  background: #989799;
}

.login {
  height: 460px;
  background: #a52a2a;
  border-radius: 60% / 10%;
  transform: translateY(-180px);
  transition: 0.8s ease-in-out;
}

.login label {
  color: #faf6f6;
  transform: scale(0.6);
}

#chk:checked~.login {
  transform: translateY(-500px);
}

#chk:checked~.login label {
  transform: scale(1);
}

#chk:checked~.signup label {
  transform: scale(0.6);
}
</style>
