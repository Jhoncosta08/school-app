<template>
  <v-container fluid>
    <v-form @submit.prevent="addStudent">
      <v-text-field v-model="newStudentName" label="Student Name" required />
      <v-btn class="add-btn" type="submit" color="primary">Add Student</v-btn>
    </v-form>

    <v-divider></v-divider>

    <v-list>
      <v-list-item-group v-if="students.length">
        <v-list-item class="student-card" v-for="student in students" :key="student.id">
          <v-list-item-content>
            <v-list-item-title>{{ student.name }}</v-list-item-title>
            <v-list-item-subtitle>
              <ul>
                <li v-for="(subject, index) in student.subjects" :key="index">
                  {{ subject.name }} = {{ subject.score }}
                </li>
              </ul>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn color="blue" text @click="editStudent(student)">Edit</v-btn>
            <v-btn color="red" text @click="deleteStudent(student.id)">Delete</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
      <v-list-item v-else>
        <v-list-item-content>No students registered.</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      newStudentName: "",
      students: JSON.parse(localStorage.getItem("students")) || [],
    };
  },
  methods: {
    addStudent() {
      const newStudent = {
        id: Date.now(),
        name: this.newStudentName,
        subjects: [],
      };
      if (!this.newStudentName || this.newStudentName === "") {
        return alert("Student name cannot be empty!");
      }
      this.students.push(newStudent);
      this.saveStudents();
      this.newStudentName = "";
    },

    editStudent(student) {
      const updatedName = prompt("Edit student's name", student.name);
      if (updatedName) {
        student.name = updatedName;
        this.saveStudents();
      }
    },
    deleteStudent(studentId) {
      const confirmed = confirm('Are you sure you want to delete this student?');
      if (confirmed) {
        this.students = this.students.filter(student => student.id !== studentId);
        this.saveStudents();
      }
    },
    saveStudents() {
      localStorage.setItem('students', JSON.stringify(this.students));
    },
  },
};
</script>

<style scoped>

  .student-card {
    margin: 1rem 0;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  }

  .add-btn {
    margin-bottom: 1rem;
  }

</style>
