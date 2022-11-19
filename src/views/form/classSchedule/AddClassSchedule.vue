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
                <div class="invalid-feedback">
                  Please choose a Topic.
                </div>
              </div>
  
              <div class="col-md-4">
                <label for="Subject" class="form-label">Subject</label>
                <multiselect
                v-model="selectedSubject"
                :options="subjects"
                :searchable="true"
                :close-on-select="false"
                :allow-empty="false"
                :preselect-first="true"
                label="name"
                placeholder="Select Subject"
                track-by="id"
              ></multiselect>
                <div class="invalid-feedback">
                  Please choose a Subject.
                </div>
              </div>
  
              <div class="col-md-4">
                <label for="Teacher" class="form-label">Teacher</label>
                <multiselect
                v-model="selectedTeacher"
                :options="teachers"
                :searchable="true"
                :close-on-select="false"
                :allow-empty="false"
                :preselect-first="true"
                label="name"
                placeholder="Select Teacher"
                track-by="id"
                @input="updateSelectedTeacher"
              ></multiselect>
                <div class="invalid-feedback">
                  Please choose a teacher.
                </div>
              </div>
  
              <div class="col-md-4">
                <label for="student_email" class="form-label">Student</label>
                <multiselect
                v-model="selectedStudent"
                :options="students"
                :searchable="true"
                :multiple="true"
                :close-on-select="false"
                :allow-empty="false"
                :preselect-first="true"
                label="name"
                placeholder="Select Student"
                track-by="id"
              ></multiselect>
                <div class="invalid-feedback">
                  Please choose a Student.
                </div>
              </div>
  
              <div class="col-md-4">
                <label for="Student_dob" class="form-label">Start Date</label>
                <date-picker
                v-model="classStartDate"
                type="date"
                placeholder="Select date"
                format="YYYY-MM-DD"
                :default-value="new Date()"
                :disabled-date="disabledBeforeToday"
              ></date-picker>
                <div class="invalid-feedback">
                  Please choose a start date.
                </div>
              </div>
  
              <div class="col-md-4">
                <label for="student_address" class="form-label">Start Time</label>
                <date-picker
                v-model="classStartTime"
                type="time"
                placeholder="start time"
                format="hh:mm a"
                :default-value="new Date()"
                :disabled-date="disabledBeforeToday"
              ></date-picker>
                <div class="invalid-feedback">
                  Please choose a address.
                </div>
              </div>
              <h5 class="add-parent-title card-title ml-3">Parent Info</h5>
              <hr class="hr-parent ml-3">
              <!-- Parent Info Start -->
              <div class="parent-info col-12" v-for="(input, index) in dynamicParentList" :key="index">
                <div class="col-md-4">
                  <label for="parent_first_name" class="form-label"><img :src="icons.First_name" />&nbsp;First
                    name</label>
                  <input type="text" class="form-control" id="parent_first_name" required v-model="input.First_name"
                    @change="changeField($event, 'first_name', input.parent_id)">

                  <div class="invalid-feedback">
                    Please choose a fist name.
                  </div>
                </div>
  
                <div class="col-md-4">
                  <label for="parent_last_name" class="form-label"><img :src="icons.Last_name" />&nbsp;Last name</label>
                  <input type="text" class="form-control" id="parent_last_name" required v-model="input.Last_name"
                    @change="changeField($event, 'last_name', input.parent_id)">

                  <div class="invalid-feedback">
                    Please choose a last name.
                  </div>
                </div>
  
                <div class="col-md-4">
                  <label for="parent_phone" class="form-label"><img :src="icons.Phone" />&nbsp;Phone</label>
                  <input type="text" class="form-control" id="parent_phone" required v-model="input.Phone"
                    @change="changeField($event, 'phone', input.parent_id)">

                  <div class="invalid-feedback">
                    Please choose a phone.
                  </div>
                </div>
  
                <div class="col-md-4">
                  <label for="parent_email" class="form-label"><img :src="icons.Email" />&nbsp;Email</label>
                  <input type="text" class="form-control" id="parent_email" required v-model="input.Email"
                    @change="changeField($event, 'email', input.parent_id)">

                  <div class="invalid-feedback">
                    Please choose a email.
                  </div>
                </div>
                <div class="col-md-4 add-guardian" v-if="index == 0">
                  Add Guardians &nbsp;
                  <i class="bi bi-plus-circle add-guardian-icon" style="color: #8bc34a" @click.stop="addGuardian"></i>
                </div>
                <div class="col-md-4 remove-guardian" v-else>
                  Remove Guardians &nbsp;
                  <i class="bi bi-dash-circle remove-guardian-icon" style="color: red" @click.stop="removeParent(input.parent_id)"></i>
                </div>
                <div class="col-md-12 mt-4">
                  <hr class="hr-color" />
                </div>
              </div>
              <!-- Parent Info End -->
  
              <div class="col-12">
                <button class="btn btn-success" type="submit" @click.stop="addStudent">Save</button>
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
  