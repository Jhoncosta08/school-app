<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>School System</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/students" text>Students</v-btn>
      <v-btn to="/subjects" text>Subjects</v-btn>
      <v-btn to="/exams" text>Exams</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
