<template>
 <div>
    <div class="image-main">
      <img src="../img/logo.png">
      <h1>FOODBOOK</h1>
      <p>votre réseau social culinaire préferé</p> 
    </div>
  </div>

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
  .image-main{
    background-image: url(../img/main.jpg);
    background-position: center;
    background-size: cover;
    text-align: center;
    display: flex;
    flex-direction: column;
    height: 500px;
    border-top: 0;
    width: 100vw;
    align-items: center;
    justify-content: center;
    border-bottom: 5px solid rgb(7, 69, 2);
  h1{
    
    display: flex;
    text-align: center;
    font-size: 3em;
    color: rgb(7, 69, 2);
    margin: 0;
    
    font-family: 'mardesauve', sans-serif;
  }
  p{

    font-size: x-large;
    font-weight: 700;
    font-style: italic;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-transform: uppercase;
    text-shadow: -2px 3px 0px white;
  }
  img{
    width: 150px;
    height: 150px;
    border-radius: 75px;
  }  
}
</style>