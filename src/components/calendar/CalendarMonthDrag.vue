<template>
  <v-sheet height="600">
    <v-calendar
      ref="monthCalendar"
      v-model="value"
      color="primary"
      type="month"
      :events="events"
      :event-color="getEventColor"
      :event-ripple="false"
      @change="getEvents"
      @click:event="showEvent"
      @click:more="viewDay"
      @click:date="viewDay"
      @mousedown:event="startDrag"
      @mousedown:day="startTime"
      @mousemove:day="mouseMove"
      @mouseup:day="endDrag"
      @mouseleave.native="cancelDrag"
    >
      <template v-slot:event="{ event, timed, eventSummary }">
        <!-- <div class="v-event-draggable">
          <component :is="{ render: eventSummary }"></component>
        </div> -->

        <div
          v-if="timed"
          class="v-event-drag-bottom"
          @mousedown.stop="extendBottom(event)"
        ></div>
        <div class="custom-p">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#monthDragModal"
            @click="getSlotInfo(event)"
          >
            {{ event.name }}{{ " " }}{{ dateAndTimeFormater(event.start) }}
          </button>
        </div>
      </template>
    </v-calendar>
    <!-- modal start -->
    <div
      class="modal fade modal-tall"
      id="monthDragModal"
      tabindex="-1"
      aria-labelledby="monthDragModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="monthDragModalLabel">
              Slot Detail
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- start body -->
            <div class="card">
              <div class="card-header d-flex justify-content-between">
                <span>Study Resources</span>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item study-resource">
                  <div class="col-12 d-flex">
                    <label for="file" class="input input-file">
                      <div class="button">
                        <input
                          type="file"
                          class="form-control form-control-sm"
                          name="file"
                          @change="handleResourceFile"
                        />
                        Browse File
                      </div>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="upload study resources"
                        readonly=""
                      />
                    </label>
                    <button
                      type="button"
                      class="btn btn-success cstm-btn"
                      @click.stop="saveResourceFile"
                    >
                      save
                    </button>
                  </div>

                  <span>{{ resourceFileName }}</span>
                </li>
                <li class="list-group-item">Cras justo odio</li>
                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item">Vestibulum at eros</li>
              </ul>
            </div>
            <div class="card">
              <div class="card-header d-flex justify-content-between">
                <span>Assignment</span>
              </div>
              <div>
                <li class="list-group-item assignment">
                  <div class="col-12 d-flex">
                    <label for="file" class="input input-file">
                      <div class="button">
                        <input
                          type="file"
                          class="form-control form-control-sm"
                          name="file"
                          onchange="this.parentNode.nextSibling.value = this.value"
                        />
                        Browse File
                      </div>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="upload assignment"
                        readonly=""
                      />
                    </label>
                    <button type="button" class="btn btn-success cstm-btn">
                      Save
                    </button>
                  </div>
                </li>
              </div>
              <table class="card-table table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">File</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="card">
              <div class="card-header d-flex justify-content-between">
                <span>Assignment Answer</span>
              </div>
              <table class="card-table table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">File</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="card">
              <div class="card-header d-flex justify-content-between">
                <span>Zoom Link</span>
              </div>
              <ul class="list-group list-group-flush">
                <div class="form-group col-sm-12 col-lg-12 d-flex">
                  <div class="zoom-link">
                    <input
                      v-model="zoomLink"
                      type="text"
                      class="form-control remove-border"
                      id="zoomlink"
                      placeholder="add link"
                      @input="saveZoomLink"
                    />
                    <i class="bi bi-clipboard" @click.stop="copyZoomLink"></i>
                  </div>
                  <button
                    class="btn btn-warning btn-session pointer-hand col-3 mt-2 mx-auto go-to-link cstm-btn"
                    @click.stop="openLink"
                  >
                    Go
                  </button>
                </div>
              </ul>
            </div>
            <div class="card">
              <div class="card-header d-flex justify-content-between">
                <span>Completed Class Video</span>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"></li>
              </ul>
            </div>
            <!-- end body -->
          </div>

          <div class="modal-footer invisible">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal end -->
  </v-sheet>
</template>
<script>
import moment from "moment";
export default {
  data: () => ({
    rightSidebar: false,
    userType: "",
    isStudent: false,
    isTeacher: false,
    currentMonthName: "",
    selectedOpen: false,
    selectedEvent: {},
    selectedElement: null,
    dragAttempt: 0,
    type: "month",
    value: "",
    events: [],
    colors: ["#4CAF50", "#FF9800", "#757575"],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
    dragEvent: null,
    dragStart: null,
    createEvent: null,
    createStart: null,
    extendOriginal: null,
    assessment_file: "",
    currentSlotId: "",
    currentTeacherId: "",
    resourceFileName: "",
  }),

  methods: {
    async saveResourceFile() {
      let formData = new FormData();
      formData.append("teacher_id", this.currentTeacherId);
      formData.append("assessment_file", this.assessment_file);

      let urlText = "timetable/" + this.currentSlotId + "/resourceFile";
      let patchResponse = await this.post(urlText, formData);
    },
    handleResourceFile(e) {
      e.preventDefault();
      this.assessment_file =
        document.querySelector("input[type=file]").files[0];
      this.resourceFileName = this.assessment_file.name;
    },
    copyZoomLink() {
      /* Get the text field */
      var copyText = document.getElementById("zoomlink");

      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */

      /* Copy the text inside the text field */
      navigator.clipboard.writeText(copyText.value);

      /* Alert the copied text */
      // alert( copyText.value);
    },
    getSlotInfo(slot) {},
    deleteSlot() {
      this.$emit("delete-slot");
    },
    calendarTitle() {
      this.$emit("calendar-title", this.$refs.monthCalendar);
    },
    viewDay({ date }) {
      this.$emit("view-day", date);
    },
    startClass() {
      this.$emit("start-class");
    },
    openDetailModel() {
      this.$emit("open-detail-model");
    },
    closeModel() {
      this.$emit("close-model");
    },
    sendEmail() {
      this.$emit("send-email");
    },
    openEdit() {
      this.$emit("open-edit");
    },
    showEvent({ nativeEvent, event }) {
      this.currentSlotId = event.class_unique_id;
      this.currentTeacherId = event.teacher_id;
      this.$emit("current-zoom-link", event);
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    changeType(val) {
      this.$emit("change-type", val);
    },
    startDrag({ event, timed }) {
      if (event && !timed) {
        //console.log("we are in")
        this.dragEvent = event;
        this.dragTime = null;
        this.extendOriginal = null;
      }
      if (this.dragAttempt > 0) {
      }
      if (this.dragAttempt == 0) {
        this.dragAttempt = 1;
      }
    },
    startTime(tms) {
      //  console.log("we are in",tms)
      const mouse = this.toTime(tms);

      if (this.dragEvent) {
        const start = this.dragEvent.start;
        this.dragTime = mouse - start;
      }
    },
    extendBottom(event) {
      this.createEvent = event;
      this.createStart = event.start;
      this.extendOriginal = event.end;
    },
    async mouseMove(tms) {
      const mouse = this.toTime(tms);
      if (this.dragEvent) {
        const start = this.dragEvent.start;
        const end = this.dragEvent.end;
        const duration = end - start;
        const newStartTime = mouse - this.dragTime;
        const newStart = this.roundTime(newStartTime);
        const newEnd = newStart + duration;
        let todayDate = this.dateFormater(new Date());
        let targetDate = this.dateFormater(new Date(newStart));

        if (moment(targetDate).isBefore(todayDate)) {
          this.isDisable = true;
        } else {
          this.isDisable = false;
          this.dragEvent.start = new Date(newStart);
          this.dragEvent.end = new Date(newEnd);
        }
      }
    },

    async endDrag() {
      if (!this.isDisable) {
        let formData = {};
        let urlText = "timetable/" + this.dragEvent.id + "/drag";

        formData["id"] = this.dragEvent.id;
        formData["start_date"] = this.dateAndTimeFormater(this.dragEvent.start);
        formData["end_date"] = this.dateAndTimeFormater(this.dragEvent.end);

        let patchResponse = await this.post(urlText, formData);
      }

      this.dragTime = null;
      this.dragEvent = null;
      this.createEvent = null;
      this.createStart = null;
      this.extendOriginal = null;
    },
    cancelDrag() {
      if (this.createEvent) {
        if (this.extendOriginal) {
          this.createEvent.end = this.extendOriginal;
        } else {
          const i = this.events.indexOf(this.createEvent);
          if (i !== -1) {
            this.events.splice(i, 1);
          }
        }
      }

      this.createEvent = null;
      this.createStart = null;
      this.dragTime = null;
      this.dragEvent = null;
    },
    roundTime(time, down = true) {
      const roundTo = 15; // minutes
      const roundDownTime = roundTo * 60 * 1000;

      return down
        ? time - (time % roundDownTime)
        : time + (roundDownTime - (time % roundDownTime));
    },
    toTime(tms) {
      return new Date(
        tms.year,
        tms.month - 1,
        tms.day,
        tms.hour,
        tms.minute
      ).getTime();
    },
    getEventColor(event) {
      const rgb = parseInt(event.color.substring(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;

      return event === this.dragEvent
        ? `rgba(${r}, ${g}, ${b}, 0.7)`
        : event === this.createEvent
        ? `rgba(${r}, ${g}, ${b}, 0.7)`
        : event.color;
    },
    async getEvents({ start, end }) {
      this.$emit("set-focus", this.value);

      let formData = {};
      const events = [];
      this.userType = this.getLoginInfo.user.role[0];

      if (this.userType == "teacher") {
        formData["mode"] = "teacher";
        formData["teacher_id"] = this.getLoginInfo.user.teacher.id;
      } else if (this.userType == "student") {
        formData["mode"] = "student";
        formData["student_id"] = this.getLoginInfo.user.student.id;
      } else if (this.userType == "parent") {
        formData["mode"] = "parent";
        formData["parent_id"] = this.getLoginInfo.user.parent.id;
      } else {
        formData["mode"] = "admin";
      }

      let postResponse = {};
      let urlText = "getTimetables";
      postResponse = await this.get(urlText);
      this.slots = postResponse.data.data;
      this.slots.map((data) => {
        events.push({
          id: data.id,
          name: data.topic,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          start: new Date(data.start_date),
          end: new Date(data.end_date),
          time: data.duration,
          event_message: data.event_message,
          teacher_id: data.teacher_id,
          class_unique_id: data.class_unique_id,
          zoomLink: data.zoomLink,
          subject_id: data.subject_id,
        });
      });

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    rndElement(arr) {
      return arr[this.rnd(0, arr.length - 1)];
    },
  },
  mounted() {
    this.currentMonthName = this.$refs.monthCalendar.title;
    this.calendarTitle();
  },
};
</script>
<style>
.input-file {
  position: relative;
  display: block;
  font-weight: 400;
}

.input-file .button {
  position: absolute;
  top: 4px;
  right: 4px;
  float: none;
  height: 22px;
  margin: 0;
  padding: 0 14px;
  font-size: 13px;
  line-height: 22px;
  background-color: #3276b1;
  opacity: 0.8;
  transition: opacity 0.2s;
  -o-transition: opacity 0.2s;
  -ms-transition: opacity 0.2s;
  -moz-transition: opacity 0.2s;
  -webkit-transition: opacity 0.2s;
  outline: 0;
  border: 0;
  text-decoration: none;
  color: #fff;
  cursor: pointer;
}

.input-file .button input {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
  font-size: 30px;
  cursor: pointer;
  opacity: 0;
}
.input input {
  display: block;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  width: 100%;
  height: 28px;
  padding: 8px 10px;
  outline: 0;
  border-width: 1px;
  border-style: solid;
  border-radius: 0;
  background: #fff;
  font: 13px/16px "Open Sans", Helvetica, Arial, sans-serif;
  color: #404040;
  appearance: normal;
  -moz-appearance: none;
  -webkit-appearance: none;
}
h1 {
  font-family: "Indie Flower", cursive;
  font-size: 32px;
  color: #03a9f4;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
