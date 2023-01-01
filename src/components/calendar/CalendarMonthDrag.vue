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
                <span>Teacher Notes</span>
                <button type="button" class="btn btn-default btn-sm">
                  <i class="bi bi-file-plus"></i>
                </button>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Cras justo odio</li>
                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item">Vestibulum at eros</li>
              </ul>
            </div>
            <div class="card">
              <div class="card-header d-flex justify-content-between">
                <span>Assignment</span>
                <button type="button" class="btn btn-default btn-sm">
                  <i class="bi bi-file-plus"></i>
                </button>
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
                <button type="button" class="btn btn-default btn-sm">
                  <i class="bi bi-file-plus"></i>
                </button>
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
                <button type="button" class="btn btn-default btn-sm">
                  <i class="bi bi-file-plus"></i>
                </button>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Cras justo odio</li>
                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item">Vestibulum at eros</li>
              </ul>
            </div>
            <div class="card">
              <div class="card-header d-flex justify-content-between">
                <span>Class Video</span>
                <button type="button" class="btn btn-default btn-sm">
                  <i class="bi bi-file-plus"></i>
                </button>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Cras justo odio</li>
                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item">Vestibulum at eros</li>
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
  }),

  methods: {
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
          timed: data.start_date,
          event_message: data.event_message,
          students: data.student,
          teacher: data.teacher,
          session_id: data.session_id,
          zoomLink: data.zoomLink,
          teacher: data.teacher,
          subject: data.subject,
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
