<template>
  <div class="container">
    <header>
      <h1 v-if="title" class="title">{{ title }}</h1>
    </header>

    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: 'BcPageBase',
  props: {
    title: String
  }
}
</script>

<style lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.page {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.form {
  text-align: left;

  &__label {
    display: inline-block;
    margin-left: 7px;
  }

  &__input {
    width: 100%;
    display: block;
    padding: 10px;
    border: 2px solid #dadada;
    border-radius: 5px;
    background-color: #fff;
  }
}

.form__input {
 
}
</style>
