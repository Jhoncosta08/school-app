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
          <v-list-item-action>
            <v-btn color="blue" text @click="editSubject(subject)">Edit</v-btn>
            <v-btn color="red" text @click="deleteSubject(subject.id)">Delete</v-btn>
          </v-list-item-action>
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
      if (!this.newSubjectName || this.newSubjectName === "") {
        return alert("Subject name cannot be empty!");
      }
      this.subjects.push(newSubject);
      this.saveSubjects();
      this.newSubjectName = "";
    },
    editSubject(subject) {
      const updatedName = prompt("Edit subject name", subject.name);
      if (updatedName) {
        subject.name = updatedName;
        this.saveSubjects();
      }
    },
    deleteSubject(subjectId) {
      const confirmed = confirm('Are you sure you want to delete this subject?');
      if (confirmed) {
        this.removeSubjectFromStudents(subjectId);
        this.subjects = this.subjects.filter(subject => subject.id !== subjectId);
        this.saveSubjects();
      }
    },
    removeSubjectFromStudents(subjectId) {
      const students = JSON.parse(localStorage.getItem('students')) || [];
      students.forEach(student => {
        student.subjects = student.subjects.filter(subject => subject.id !== subjectId);
      });
      localStorage.setItem('students', JSON.stringify(students));
    },
    saveSubjects() {
      localStorage.setItem('subjects', JSON.stringify(this.subjects));
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
