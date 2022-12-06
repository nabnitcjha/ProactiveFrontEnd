<template>
  <div class="row">
    <div class="col-lg-12">

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Student Info</h5>
          <hr class="hr-color">
          <form class="row g-3 needs-validation" novalidate>
            <div class="col-md-4">
              <label for="student_first_name" class="form-label"><img :src="icons.First_name" />&nbsp;First name</label>
              <input type="text" class="form-control" id="student_first_name" required v-model="student.First_name">
              <!-- <div class="valid-feedback">
                Looks good!
              </div> -->
              <div class="invalid-feedback">
                Please choose a fist name.
              </div>
            </div>

            <div class="col-md-4">
              <label for="student_last_name" class="form-label"><img :src="icons.Last_name" />&nbsp;Last name</label>
              <input type="text" class="form-control" id="student_last_name" required v-model="student.Last_name">
              <!-- <div class="valid-feedback">
                Looks good!
              </div> -->
              <div class="invalid-feedback">
                Please choose a last name.
              </div>
            </div>

            <div class="col-md-4">
              <label for="student_phone" class="form-label"><img :src="icons.Phone" />&nbsp;Phone</label>
              <input type="text" class="form-control" id="student_phone" required v-model="student.Phone">
              <!-- <div class="valid-feedback">
                Looks good!
              </div> -->
              <div class="invalid-feedback">
                Please choose a phone.
              </div>
            </div>

            <div class="col-md-4">
              <label for="student_email" class="form-label"><img :src="icons.Email" />&nbsp;Email</label>
              <input type="text" class="form-control" id="student_email" required v-model="student.Email">
              <!-- <div class="valid-feedback">
                Looks good!
              </div> -->
              <div class="invalid-feedback">
                Please choose a email.
              </div>
            </div>

            <div class="col-md-4">
              <label for="Student_dob" class="form-label"><img :src="icons.Dob" />&nbsp;DOB</label>
              <input type="date" class="form-control" id="Student_dob" required v-model="student.Dob">
              <!-- <div class="valid-feedback">
                Looks good!
              </div> -->
              <div class="invalid-feedback">
                Please choose a date of birth.
              </div>
            </div>

            <div class="col-md-4">
              <label for="student_country" class="form-label"><img :src="icons.Address" />&nbsp;Country</label>
              <input type="text" class="form-control" id="student_country" required v-model="student.Country">
              <!-- <div class="valid-feedback">
                Looks good!
              </div> -->
              <div class="invalid-feedback">
                Please choose a country.
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
                <!-- <div class="valid-feedback">
                Looks good!
              </div> -->
                <div class="invalid-feedback">
                  Please choose a fist name.
                </div>
              </div>

              <div class="col-md-4">
                <label for="parent_last_name" class="form-label"><img :src="icons.Last_name" />&nbsp;Last name</label>
                <input type="text" class="form-control" id="parent_last_name" required v-model="input.Last_name"
                  @change="changeField($event, 'last_name', input.parent_id)">
                <!-- <div class="valid-feedback">
                Looks good!
              </div> -->
                <div class="invalid-feedback">
                  Please choose a last name.
                </div>
              </div>

              <div class="col-md-4">
                <label for="parent_phone" class="form-label"><img :src="icons.Phone" />&nbsp;Phone</label>
                <input type="text" class="form-control" id="parent_phone" required v-model="input.Phone"
                  @change="changeField($event, 'phone', input.parent_id)">
                <!-- <div class="valid-feedback">
                Looks good!
              </div> -->
                <div class="invalid-feedback">
                  Please choose a phone.
                </div>
              </div>

              <div class="col-md-4">
                <label for="parent_email" class="form-label"><img :src="icons.Email" />&nbsp;Email</label>
                <input type="text" class="form-control" id="parent_email" required v-model="input.Email"
                  @change="changeField($event, 'email', input.parent_id)">
                <!-- <div class="valid-feedback">
                Looks good!
              </div> -->
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
                <i class="bi bi-dash-circle remove-guardian-icon" style="color: red"
                  @click.stop="removeParent(input.parent_id)"></i>
              </div>
              <div class="col-md-12 mt-4">
                <hr class="hr-color" />
              </div>
            </div>
            <!-- Parent Info End -->

            <div class="col-12">
              <button class="btn btn-success" @click.stop="addStudent">Save</button>
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
      student: {
        First_name: '',
        Last_name: '',
        Phone: '',
        Email: '',
        Dob: '',
        Country: ''
      },
      dynamicParentList: [
        {
          First_name: '',
          Last_name: '',
          Phone: '',
          Email: '',
          parent_id: 1,
        },
      ],
    };
  },
  methods: {
    callBack() {
      this.save();
    },
    addStudent() {
      this.checkValidation(this.callBack)
    },
    async save() {
      let dynamic_parent_list = this.dynamicParentList.map((data) => {
        return {
          'first_name': data.First_name,
          'last_name': data.Last_name,
          'full_name': data.First_name + ' ' + data.Last_name,
          'role': 'parent',
          'phone': data.Phone,
          'email': data.Email
        }
      });

      let formData = new FormData();
      formData.append("user_info[first_name]", this.student.First_name);
      formData.append("user_info[last_name]", this.student.Last_name);
      formData.append("user_info[role]", 'student');
      formData.append("user_info[email]", this.student.Email);

      formData.append("student_info[phone]", this.student.Phone);
      formData.append("student_info[dob]", this.student.Dob);
      formData.append("student_info[full_name]", this.student.First_name + ' ' + this.student.Last_name);
      formData.append("student_info[country]", this.student.Country);

      formData.append("parent_info", JSON.stringify(dynamic_parent_list));

      let postResponse = {};
      let urlText = 'addStudent';

      postResponse = await this.post(urlText, formData);
      this.student ={};
      this.dynamicParentList = [];

    },
    changeField(event, type, parent) {
      let dynamicParentList = [...this.dynamicParentList];
      let item = dynamicParentList.find(
        (parentItem) => parentItem.parent_id === parent
      );
      let updatedItem = {
        ...item,
        type: event.target.value,
      };

      item = updatedItem;
      this.dynamicParentList = dynamicParentList;
    },
    addGuardian() {
      let dynamicList = [...this.dynamicParentList];
      dynamicList.push({
        parent_id: this.dynamicParentList.length + 1,
        first_name: "",
        last_name: "",
        phone: "",
        email: ""
      });
      this.dynamicParentList = dynamicList;
    },
    removeParent(parent_id) {
      this.dynamicParentList = this.dynamicParentList.filter(
        (parentItem) => parentItem.parent_id !== parent_id
      );
    },
  }
};
</script>
