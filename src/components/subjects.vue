<template>
  <v-container fluid>
    <v-form @submit.prevent="addSubject">
      <v-text-field v-model="newSubjectName" label="Subject Name" required />
      <v-btn class="add-btn" type="submit" color="primary">Add Subject</v-btn>
    </v-form>

    <v-divider></v-divider>

    <v-list>
      <v-list-item-group v-if="subjects.length">
        <v-list-item class="subject-card" v-for="subject in subjects" :key="subject.id">
          <v-list-item-content>
            <v-list-item-title>{{ subject.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-list-item v-else>
        <v-list-item-content>No subjects registered.</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      newSubjectName: "",
      subjects: JSON.parse(localStorage.getItem("subjects")) || [],
    };
  },
  methods: {
    addSubject() {
      const newSubject = {
        id: Date.now(),
        name: this.newSubjectName,
      };
      this.subjects.push(newSubject);
      localStorage.setItem("subjects", JSON.stringify(this.subjects));
      this.newSubjectName = "";
    },
  },
};
</script>

<style scoped>

  .subject-card {
    margin: 1rem 0;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  }

  .add-btn {
    margin-bottom: 1rem;
  }

</style>
