<template>
  <fragment>
    <v-app>
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="64">
            <v-toolbar flat>
              <v-btn
                outlined
                class="mr-4"
                color="grey darken-2"
                @click.stop="setToday"
              >
                Today
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click.stop="prev">
                <v-icon small> mdi-chevron-left </v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click.stop="next">
                <v-icon small> mdi-chevron-right </v-icon>
              </v-btn>
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <v-toolbar-title v-else>
                {{ calendarTitle }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    color="grey darken-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right> mdi-menu-down </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click.stop="type = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click.stop="type = 'week'">
                    <v-list-item-title>Week</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click.stop="type = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click.stop="type = '4day'">
                    <v-list-item-title>4 days</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <calendar-month-drag-component
            v-if="type == 'month'"
            @change-type="currentType"
            @open-edit="openEdit"
            @send-email="sendEmail"
            @close-model="closeModel"
            @open-detail-model="openDetailModel"
            @view-day="monthViewDay"
            @calendar-title="calTitle"
            @set-focus="setFocus"
            @calendar-today-title="calendarTodayTitle"
            @start-class="startClass"
            @current-zoom-link="saveCurrentZoomLink"
            @delete-slot="deleteSlot"
            :focus="focus"
          ></calendar-month-drag-component>

          <v-sheet height="600" v-else>
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="events"
              :event-color="getEventColor"
              :type="type"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="updateRange"
              @mousedown:event="startDrag"
              @mousedown:time="startTime"
              @mousemove:time="mouseMove"
              @mouseup:time="endDrag"
              @mouseleave.native="cancelDrag"
            >
              <template v-slot:event="{ event, timed, eventSummary }">
                <div class="v-event-draggable">
                  <component :is="{ render: eventSummary }"></component>
                </div>
                <div
                  v-if="timed"
                  class="v-event-drag-bottom"
                  @mousedown.stop="extendBottom(event)"
                ></div>
                <div class="custom-p">
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#dayDragModal"
                  >
                    {{ event.name }}{{ " "
                    }}{{ dateAndTimeFormater(event.start) }}
                  </button>
                </div>
              </template>
            </v-calendar>
            <!-- modal start -->
            <div
              class="modal fade modal-tall"
              id="dayDragModal"
              tabindex="-1"
              aria-labelledby="dayDragModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="dayDragModalLabel">
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
                        <li class="list-group-item">
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
                              placeholder="upload study resources"
                              readonly=""
                            />
                          </label>
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
                            <i
                              class="bi bi-clipboard"
                              @click.stop="copyZoomLink"
                            ></i>
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
                    <button type="button" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- modal end -->
          </v-sheet>
        </v-col>
      </v-row>
    </v-app>
  </fragment>
</template>
<script>
import CalendarMonthDragComponent from "./CalendarMonthDrag.vue";
import { loginInfoStore } from "../../stores/loginInfo";
import { mapState } from "pinia";
export default {
  data: () => ({
    userType: "",
    showDeleteModel: false,
    currentEvent: {},
    currentZoomLink: "",
    showStartModel: false,
    monthCalendar: {},
    calendarTitle: "",
    startDragAttempt: 0,
    show: true,
    sessionId: "",
    event_message: "",
    openMeetwith: false,
    titleInfo: {},
    openDetail: false,
    editOpen: false,
    isStudent: false,
    isTeacher: false,
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},
    zoomLink: "",
    selectedElement: null,
    selectedOpen: false,
    events: [],
    slots: [],
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
  components: {
    "calendar-month-drag-component": CalendarMonthDragComponent,
  },
  computed: {
    ...mapState(loginInfoStore, ["getLoginInfo"]),
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {

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
    async confirmDelete() {
      let isDelete = "";
      isDelete = await this.deleteRecord(
        "SingleTimetable",
        this.current_timetable_id
      );
      if (isDelete.status == "ok") {
        this.closeModel();
        location.reload();
      }
    },
    deleteSlot() {
      this.showDeleteModel = true;
      this.userType = " this slot";
    },
    saveCurrentZoomLink(val) {
      this.currentEvent = val;
      this.zoomLink = val.zoomLink;
      this.current_timetable_id = val.id;
    },
    startClass() {
      this.showStartModel = true;
    },
    emptyLink() {
      this.$toast.open({
        message: "Link is not added",
        type: "warning",
        duration: 5000,
        dismissible: true,
      });
    },
    openLink() {
      if (this.zoomLink != null) {
        window.open(this.zoomLink);
      } else {
        this.emptyLink();
      }
    },
    zoomSaveSuccessfully() {
      this.$toast.open({
        message: "link save successfully",
        type: "success",
        duration: 5000,
        dismissible: true,
      });
    },
    saveZoomLink(e) {
      let formData = {};
      formData["zoomLink"] = e.target.value;
      formData["timetable_id"] = this.current_timetable_id;

      axios.post("/api/saveZoomLink", formData).then((response) => {
        this.zoomSaveSuccessfully();
      });
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
    calendarTodayTitle(val) {
      this.calendarTitle = val;
    },
    setFocus(val) {
      this.focus = val;
    },
    calTitle(val) {
      this.calendarTitle = val.title;
      this.monthCalendar = val;
    },
    currentType(type) {
      this.type = type;
    },
    closeModel() {
      this.showStartModel = false;
      this.selectedOpen = false;
      this.openDetail = false;
      this.editOpen = false;
      this.showDeleteModel = false;
      // location.reload();
    },
    startDrag({ event, timed }) {
      if (event && timed) {
        this.dragEvent = event;
        this.dragTime = null;
        this.extendOriginal = null;
      }

      if (this.startDragAttempt > 0) {
        let x = event.start;
        let y = this.start_end_time(event.start, event.end);
      }
      if (this.startDragAttempt == 0) {
        this.startDragAttempt = 1;
      }
    },
    startTime(tms) {
      const mouse = this.toTime(tms);

      if (this.dragEvent && this.dragTime === null) {
        const start = this.dragEvent.start;

        this.dragTime = mouse - start;
      } else {
        this.createStart = this.roundTime(mouse);
      }
    },
    async mouseMove(tms) {
      const mouse = this.toTime(tms);

      if (this.dragEvent && this.dragTime !== null) {
        const start = this.dragEvent.start;
        const end = this.dragEvent.end;
        const duration = end - start;
        const newStartTime = mouse - this.dragTime;
        const newStart = this.roundTime(newStartTime);
        const newEnd = newStart + duration;

        // this.dragEvent.start = newStart
        // this.dragEvent.end = newEnd

        this.dragEvent.start = new Date(newStart);
        this.dragEvent.end = new Date(newEnd);
        let formData = {};
        let urlText = "timetable/" + this.dragEvent.id + "/drag";

        formData["id"] = this.dragEvent.id;
        formData["start_date"] = this.timeAndDate(this.dragEvent.start);
        formData["end_date"] = this.timeAndDate(this.dragEvent.end);

        let patchResponse = await this.post(urlText, formData);
      } else if (this.createEvent && this.createStart !== null) {
        const mouseRounded = this.roundTime(mouse, false);
        const min = Math.min(mouseRounded, this.createStart);
        const max = Math.max(mouseRounded, this.createStart);

        this.createEvent.start = min;
        this.createEvent.end = max;
      }
    },

    extendBottom(event) {
      this.createEvent = event;
      this.createStart = event.start;
      this.extendOriginal = event.end;
    },
    endDrag() {
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
    getEvents({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`).getTime();
      const max = new Date(`${end.date}T23:59:59`).getTime();
      const days = (max - min) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const timed = this.rnd(0, 3) !== 0;
        const firstTimestamp = this.rnd(min, max);
        const secondTimestamp = this.rnd(2, timed ? 8 : 288) * 900000;
        const start = firstTimestamp - (firstTimestamp % 900000);
        const end = start + secondTimestamp;

        events.push({
          name: this.rndElement(this.names),
          color: this.rndElement(this.colors),
          start,
          end,
          timed,
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    rndElement(arr) {
      return arr[this.rnd(0, arr.length - 1)];
    },
    goToDetailPage() {
      this.$root.changeRoute(
        "/student-session-detail/" + this.$route.params.student_id
      );
      this.openMeetwith = false;
    },
    openDetailModel() {
      this.sessionId = this.selectedEvent.session_id;
      this.event_message = this.selectedEvent.event_message;
      this.openMeetwith = true;
    },
    modalClose() {
      this.openMeetwith = false;
      this.closeModel();
    },
    openEdit() {
      this.selectedOpen = false;
      this.editOpen = true;
      this.titleInfo = { pageType: "edit" };
    },
    sendEmail() {
      let y = this.selectedEvent;
      this.addStatus("Email send successfully");
    },
    monthViewDay(date) {
      this.focus = date;
      this.type = "day";
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
      this.calendarTitle = this.monthCalendar.title;
    },
    async prev() {
      if (this.type == "month") {
        let pre = await this.monthCalendar.prev();
        this.calendarTitle = this.monthCalendar.title;
      } else {
        this.$refs.calendar.prev();
      }
    },
    async next() {
      if (this.type == "month") {
        let nex = await this.monthCalendar.next();
        this.calendarTitle = this.monthCalendar.title;
      } else {
        this.$refs.calendar.next();
      }
    },
    showEvent({ nativeEvent, event }) {
      this.currentEvent = event;
      this.zoomLink = event.zoomLink;
      this.current_timetable_id = event.id;
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
    async updateRange() {
      // this.show = true;
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

      // axios.post("/api/getSlots", formData).then((response) => {
      //   this.slots = response.data.result;
      //   this.slots.map((data) => {
      //     events.push({
      //       id: data.id,
      //       name: data.topic,
      //       color: this.colors[this.rnd(0, this.colors.length - 1)],
      //       start: new Date(data.start_date),
      //       end: new Date(data.end_date),
      //       timed: data.start_date,
      //       event_message: data.event_message,
      //       students: data.student,
      //       teacher: data.teacher,
      //       session_id: data.session_id,
      //       zoomLink: data.zoomLink,
      //       teacher: data.teacher,
      //       subject: data.subject,
      //     });
      //   });
      // });

      this.events = events;
      this.show = false;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
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
