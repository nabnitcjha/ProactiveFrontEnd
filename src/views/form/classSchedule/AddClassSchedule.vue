<template>
  <div class="row">
    <div class="col-lg-12">

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Class Schedule</h5>
          <hr class="hr-color">
          <form class="row g-3 needs-validation" novalidate>
            <div class="col-md-4">
              <label for="Topic" class="form-label">Topic</label>
              <input type="text" class="form-control" id="Topic" required v-model="Topic">
            </div>

            <div class="col-md-4">
              <label for="Subject" class="form-label">Subject</label>
              <multiselect v-model="selectedSubject" :options="subjects" :searchable="true" :close-on-select="false"
                :allow-empty="false" :preselect-first="true" label="name" placeholder="Select Subject" track-by="id">
              </multiselect>
            </div>

            <div class="col-md-4">
              <label for="Teacher" class="form-label">Teacher</label>
              <multiselect v-model="selectedTeacher" :options="teachers" :searchable="true" :close-on-select="false"
                :allow-empty="false" :preselect-first="true" label="name" placeholder="Select Teacher" track-by="id"
                @input="updateSelectedTeacher"></multiselect>
            </div>

            <div class="col-md-4">
              <label for="student_email" class="form-label">Student</label>
              <multiselect v-model="selectedStudent" :options="students" :searchable="true" :multiple="true"
                :close-on-select="false" :allow-empty="false" :preselect-first="true" label="name"
                placeholder="Select Student" track-by="id"></multiselect>
            </div>

            <div class="col-md-4">
              <label for="Student_dob" class="form-label">Start Date</label>
              <date-picker v-model="classStartDate" type="date" placeholder="Select date" format="YYYY-MM-DD"
                :default-value="new Date()" :disabled-date="disabledBeforeToday"></date-picker>
            </div>

            <div class="col-md-4">
              <label for="student_address" class="form-label">Start Time</label>
              <date-picker v-model="classStartTime" type="time" placeholder="start time" format="hh:mm a"
                :default-value="new Date()" :disabled-date="disabledBeforeToday"></date-picker>
            </div>
            <div class="col-md-4">
              <label for="student_address" class="form-label">End Time</label>
              <date-picker v-model="classEndTime" type="time" placeholder="end time" format="hh:mm a"
                :default-value="new Date()" :disabled-date="disabledBeforeToday"></date-picker>
            </div>

            <div class="col-sm-12 col-lg-12"
              style="border: 1px solid #c4c4c4">
              <label for="repeat">Repeat</label>
              <div class="week-days col-12">
                <div class="" v-for="(day, index) in weekDays" :key="index">
                  <input style="position: inherit" type="checkbox" class="custom-control-input" :id="index"
                    :checked="repeatDays.includes(day.id)" @click="selectStudent($event, day.id, day, index)" />
                  <label class="custom-control-label" :for="index">{{
                      day.name
                  }}</label>
                </div>
              </div>
              <div class="session-repeat col-4">
                <label for="repeat">Session Repeat</label>
                <input class="input-custom-height col-3" type="number" v-model="sessionRepeat" min="1" max="100" />
              </div>
            </div>

            <div class="col-md-12">
              <textarea class="form-control" rows="5" id="topicName" placeholder="Description"
                v-model="event_message"></textarea>
            </div>


            <div class="col-12">
              <div class="form-group col-12">
              <button
                type="button"
                class="btn btn-success"
                @click="updateTimeTable"
                v-if="mode == 'edit'"
              >
                Update
              </button>
              <button
                type="button"
                class="btn btn-green"
                @click="addTimeTableRecord"
                v-else
              >
                Save
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="cancelTimeTableRecord"
              >
                Cancel
              </button>
            </div>
            </div>
          </form><!-- End Custom Styled Validation -->

        </div>
      </div>

    </div>
  </div>
</template>
  
<style>
body {
  padding: 1rem;
}
</style>
  
<script>
import {
  First_name,
  Last_name,
  Phone,
  Email,
  Dob,
  Address,
  Country,
  State,
} from "../../../Assets/formIcons/index";
export default {
  data() {
    return {
      icons: {
        Topic: First_name,
        Subject: Last_name,
        Teacher: Phone,
        Student: Email,
        Dob: Dob,
        Address: Address,
        Country: Country,
        State: State
      },
    };
  },
  methods: {
    addStudent() {
      this.checkValidation()
    },
  }
};
</script>
  