<template>
  <v-container fluid>
    <v-form @submit.prevent="addExam">
      <v-select
          v-model="selectedStudent"
          :items="students"
          item-text="name"
          item-value="id"
          label="Select Student"
          required
      />
      <v-select
          v-model="selectedSubject"
          :items="subjects"
          item-text="name"
          item-value="id"
          label="Select Subject"
          required
      />
      <v-text-field
          v-model="score"
          label="Enter Score"
          type="number"
          min="0"
          max="10"
          required
      />
      <v-btn type="submit" color="primary">Save Exam</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      students: JSON.parse(localStorage.getItem("students")) || [],
      subjects: JSON.parse(localStorage.getItem("subjects")) || [],
      selectedStudent: null,
      selectedSubject: null,
      score: null,
    };
  },
  methods: {
    addExam() {
      if (this.selectedStudent && this.selectedSubject && this.score !== null) {
        const student = this.students.find((s) => s.id === this.selectedStudent);
        const subject = this.subjects.find((s) => s.id === this.selectedSubject);

        const existingSubject = student.subjects.find((s) => s.id === subject.id);
        if (existingSubject) {
          existingSubject.score = this.score;
        } else {
          student.subjects.push({ ...subject, score: this.score });
        }
        localStorage.setItem("students", JSON.stringify(this.students));
        this.selectedStudent = null;
        this.selectedSubject = null;
        this.score = null;
      } else {
        alert("Please select a student, subject, and enter a score.");
      }
    },
  },
};
</script>
