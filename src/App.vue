<template>
  <div id="app">
    <div id="navbar">
      <div class="navbar-brand">
            <a class="navbar-item" >
              <router-link class="navbar-item" to="/">
                <img src="./assets/Intelipost.png" alt="Intelipost">
              </router-link>
            </a>
          
        <ul class="navbar-menu navbar-end">      
                <li class="navbar-item">
                  <router-link class="navbar-item" to="/register-transport-unit">Cadastrar Pacote</router-link>
                </li>
                <li class="navbar-item">
                  <router-link class="navbar-item" to="/register-invoice">Cadastrar Nota Fiscal</router-link>
                </li>
        </ul>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#navbar {
  margin-bottom: 25px;
  background-color: #fff;
}
</style>
