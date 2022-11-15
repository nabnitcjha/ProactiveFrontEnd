<template>
  <div class="row">
    <div class="col-lg-6">

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Custom Styled Validation with Tooltips</h5>
          <p>If your form layout allows it, you can swap the <code>.{valid|invalid}-feedback</code> classes for
            .<code>{valid|invalid}-tooltip</code> classes to display validation feedback in a styled tooltip. Be
            sure to have a parent with <code>position: relative</code> on it for tooltip positioning. In the
            example below, our column classes have this already, but your project may require an alternative
            setup. </p>

          <!-- Custom Styled Validation with Tooltips -->
          <form class="row g-3 needs-validation" novalidate @submit="addStudent">
            <div class="col-md-4 position-relative">
              <label for="validationTooltip01" class="form-label">First name</label>
              <input type="text" class="form-control" id="validationTooltip01" value="John" required>
              <div class="valid-tooltip">
                Looks good!
              </div>
            </div>
            <div class="col-md-4 position-relative">
              <label for="validationTooltip02" class="form-label">Last name</label>
              <input type="text" class="form-control" id="validationTooltip02" value="Doe" required>
              <div class="valid-tooltip">
                Looks good!
              </div>
            </div>
            <div class="col-md-4 position-relative">
              <label for="validationTooltipUsername" class="form-label">Username</label>
              <div class="input-group has-validation">
                <span class="input-group-text" id="validationTooltipUsernamePrepend">@</span>
                <input type="text" class="form-control" id="validationTooltipUsername"
                  aria-describedby="validationTooltipUsernamePrepend" required>
                <div class="invalid-tooltip">
                  Please choose a unique and valid username.
                </div>
              </div>
            </div>
            <div class="col-md-6 position-relative">
              <label for="validationTooltip03" class="form-label">City</label>
              <input type="text" class="form-control" id="validationTooltip03" required>
              <div class="invalid-tooltip">
                Please provide a valid city.
              </div>
            </div>
            <div class="col-md-3 position-relative">
              <label for="validationTooltip04" class="form-label">State</label>
              <select class="form-select" id="validationTooltip04" required>
                <option selected disabled value="">Choose...</option>
                <option>...</option>
              </select>
              <div class="invalid-tooltip">
                Please select a valid state.
              </div>
            </div>
            <div class="col-md-3 position-relative">
              <label for="validationTooltip05" class="form-label">Zip</label>
              <input type="text" class="form-control" id="validationTooltip05" required>
              <div class="invalid-tooltip">
                Please provide a valid zip.
              </div>
            </div>
            <div class="col-12">
              <button class="btn btn-primary" type="submit">Submit form</button>
            </div>
          </form><!-- End Custom Styled Validation with Tooltips -->

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

    addStudent(e) {
      e.preventDefault();
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