<template>
    <div class="row">
      <div class="col-lg-12">
  
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Add Student and Parent Information</h5>
            <form class="row g-3 needs-validation" novalidate>
              <div class="col-md-4">
                <label for="student_first_name" class="form-label">First name</label>
                <input type="text" class="form-control" id="student_first_name" required>
                <div class="valid-feedback">
                  Looks good!
                </div>
                <div class="invalid-feedback">
                  Please choose a fist name.
                </div>
              </div>
  
              <div class="col-md-4">
                <label for="student_last_name" class="form-label">Last name</label>
                <input type="text" class="form-control" id="student_last_name" required>
                <div class="valid-feedback">
                  Looks good!
                </div>
                <div class="invalid-feedback">
                  Please choose a last name.
                </div>
              </div>
  
              <div class="col-md-4">
                <label for="student_phone" class="form-label">Phone</label>
                <input type="text" class="form-control" id="student_phone" required>
                <div class="valid-feedback">
                  Looks good!
                </div>
                <div class="invalid-feedback">
                  Please choose a phone.
                </div>
              </div>
  
              <div class="col-md-4">
                <label for="student_email" class="form-label">Email</label>
                <input type="text" class="form-control" id="student_email" required>
                <div class="valid-feedback">
                  Looks good!
                </div>
                <div class="invalid-feedback">
                  Please choose a email.
                </div>
              </div>
  
              <div class="col-md-4">
                <label for="Student_dob" class="form-label">DOB</label>
                <input type="date" class="form-control" id="Student_dob" required>
                <div class="valid-feedback">
                  Looks good!
                </div>
                <div class="invalid-feedback">
                  Please choose a date of birth.
                </div>
              </div>
  
              <div class="col-md-4">
                <label for="student_address" class="form-label">Address</label>
                <input type="text" class="form-control" id="student_address" required>
                <div class="valid-feedback">
                  Looks good!
                </div>
                <div class="invalid-feedback">
                  Please choose a address.
                </div>
              </div>
              <div class="col-12">
                <button class="btn btn-primary" type="submit" @click.stop="addStudent">Submit form</button>
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
  export default {
    data() {
      return {
  
      };
    },
    methods: {
      addStudent() {
        this.checkValidation()
      },
      checkValidation() {
        var needsValidation = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(needsValidation)
          .forEach(function (form) {
            form.addEventListener('submit', function (event) {
              if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
              }
  
              form.classList.add('was-validated')
            }, false)
          })
      }
    }
  };
  </script>