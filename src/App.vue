<template>
  <div id="app">
    <div id="navbar">
      <ul class="navbar-menu">
        <li class="navbar-item">
          <router-link class="navbar-item" to="/">Entregas</router-link>
        </li>
        <li class="navbar-item">
          <router-link class="navbar-item" to="/register-transport-unit">Cadastrar Entregas</router-link>
        </li>
        <li class="navbar-item">
          <router-link class="navbar-item" to="/register-invoice">Cadastrar Notas Fiscais </router-link>
        </li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
</style>
