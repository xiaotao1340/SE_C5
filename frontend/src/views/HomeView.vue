<template>
  <v-app>
  <v-app-bar
    color="primary"
    density="compact"
    collapse :elevation="2"
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>IOT-WEB</v-app-bar-title>
      <v-btn icon href="/login">
            <v-tooltip
            activator="parent"
            location="end"
            >Log in</v-tooltip>
            <v-icon>mdi-login</v-icon>
        </v-btn>
  </v-app-bar>
      <v-navigation-drawer
      v-model="drawer"
      floating
      temporary
      rounded
      >
        <v-list-item
          prepend-icon="mdi-account"
          :title="username"
        ></v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home" title="Home" value="home" href="/"></v-list-item>
        </v-list>
      </v-navigation-drawer>
  <router-view></router-view>
</v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      username: '未登录'
    }
  },

  methods: {
    goTo (name) {
      this.$router.push({
        name: name
      })
    }
  }
}
</script>
