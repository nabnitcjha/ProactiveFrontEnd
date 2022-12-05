<template>
  <div class="row">
    <div class="col-lg-12">

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">teacher Info</h5>
          <hr class="hr-color">
          <form class="row g-3 needs-validation" novalidate>
            <div class="col-md-4">
              <label for="teacher_first_name" class="form-label"><img :src="icons.First_name" />&nbsp;First name</label>
              <input type="text" class="form-control" id="teacher_first_name" required v-model="teacher.First_name">
              <!-- <div class="valid-feedback">
                Looks good!
              </div> -->
              <div class="invalid-feedback">
                Please choose a fist name.
              </div>
            </div>

            <div class="col-md-4">
              <label for="teacher_last_name" class="form-label"><img :src="icons.Last_name" />&nbsp;Last name</label>
              <input type="text" class="form-control" id="teacher_last_name" required v-model="teacher.Last_name">
              <!-- <div class="valid-feedback">
                Looks good!
              </div> -->
              <div class="invalid-feedback">
                Please choose a last name.
              </div>
            </div>

            <div class="col-md-4">
              <label for="teacher_phone" class="form-label"><img :src="icons.Phone" />&nbsp;Phone</label>
              <input type="text" class="form-control" id="teacher_phone" required v-model="teacher.Phone">
              <!-- <div class="valid-feedback">
                Looks good!
              </div> -->
              <div class="invalid-feedback">
                Please choose a phone.
              </div>
            </div>

            <div class="col-md-4">
              <label for="teacher_email" class="form-label"><img :src="icons.Email" />&nbsp;Email</label>
              <input type="text" class="form-control" id="teacher_email" required v-model="teacher.Email">
              <!-- <div class="valid-feedback">
                Looks good!
              </div> -->
              <div class="invalid-feedback">
                Please choose a email.
              </div>
            </div>

            <div class="col-md-4">
              <label for="teacher_dob" class="form-label"><img :src="icons.Dob" />&nbsp;DOB</label>
              <input type="date" class="form-control" id="teacher_dob" required v-model="teacher.Dob">
              <!-- <div class="valid-feedback">
                Looks good!
              </div> -->
              <div class="invalid-feedback">
                Please choose a date of birth.
              </div>
            </div>

            <div class="col-md-4">
              <label for="teacher_country" class="form-label"><img :src="icons.Address" />&nbsp;Country</label>
              <input type="text" class="form-control" id="teacher_country" required v-model="teacher.Country">
              <!-- <div class="valid-feedback">
                Looks good!
              </div> -->
              <div class="invalid-feedback">
                Please choose a country.
              </div>
            </div>

            <div class="col-12">
              <button class="btn btn-success" @click.stop="addTeacher">Save</button>
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
} from "../../Assets/formIcons/index";
export default {
  data() {
    return {
      icons: {
        First_name: First_name,
        Last_name: Last_name,
        Phone: Phone,
        Email: Email,
        Dob: Dob,
        Address: Address,
        Country: Country,
        State: State
      },
      teacher: {
        First_name: '',
        Last_name: '',
        Phone: '',
        Email: '',
        Dob: '',
        Country: ''
      },
    };
  },
  methods: {
    callBack() {
      this.save();
    },
    addTeacher() {
      this.checkValidation(this.callBack)
    },
    async save() {
      let formData = new FormData();
      formData.append("user_info[first_name]", this.teacher.First_name);
      formData.append("user_info[last_name]", this.teacher.Last_name);
      formData.append("user_info[role]", 'teacher');
      formData.append("user_info[email]", this.teacher.Email);

      formData.append("teacher_info[phone]", this.teacher.Phone);
      formData.append("teacher_info[dob]", this.teacher.Dob);
      formData.append("teacher_info[full_name]", this.teacher.First_name + ' ' + this.teacher.Last_name);
      formData.append("teacher_info[country]", this.teacher.Country);

      let postResponse = {};
      let urlText = 'addTeacher';

      postResponse = await this.post(urlText, formData);
      this.teacher={};
    },
  }
};
</script>
