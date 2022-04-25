<template>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #2c3e50;
  border: 4px solid rgb(0, 166, 144);
  border-radius: 10px;
  height: auto;

  width: 100%;
  max-width: 500px;
  padding-top: 20px;
  padding-bottom: 20px;
}

#nav {
  padding: 30px;
}
a {
  text-decoration: none;
  color: #006ad4;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.item-slot {
  width: 100%;
  max-width: 450px;
  display: flex;
  justify-content: center;
  box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.351);
  border-radius: 5px;
  position: relative;
}
</style>
