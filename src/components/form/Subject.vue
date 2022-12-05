<template>
  <div class="row">
    <div class="col-lg-12">

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Subject Info</h5>
          <hr class="hr-color">
          <form class="row g-3 needs-validation" novalidate>
            <div class="col-md-4">
              <label for="subject_first_name" class="form-label"><img :src="icons.First_name" />&nbsp;First name</label>
              <input type="text" class="form-control" id="subject_first_name" required v-model="subject.name">
              <!-- <div class="valid-feedback">
                Looks good!
              </div> -->
              <div class="invalid-feedback">
                Please choose a fist name.
              </div>
            </div>

            <div class="col-12">
              <button class="btn btn-success" @click.stop="addSubject">Save</button>
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
  First_name
} from "../../Assets/formIcons/index";
export default {
  data() {
    return {
      icons: {
        First_name: First_name
      },
      subject: {
        name: ''
      },
    };
  },
  methods: {
    callBack() {
      this.save();
    },
    addSubject() {
      this.checkValidation(this.callBack)
    },
    async save() {
      let formData = new FormData();

      formData.append("subject_info[name]", this.subject.name);
      let postResponse = {};
      let urlText = 'addSubject';

      postResponse = await this.post(urlText, formData);
      this.subject = {};
    },
  }
};
</script>
