<template>
  <fragment>
    <delete-modal
      @confirm-delete="confirmDelete"
      @close-modal="closeModel"
      :showDeleteModel="showDeleteModel"
      :userType="userType"
    ></delete-modal>
    <vs-modal v-model="showStartModel" class="modal-ac">
      <div slot="modal-header" class="modal-header">
        <span class="hp-3-title">Meet with | Join with </span>
        <v-icon @click.stop="modalClose"> mdi-close-circle</v-icon>
      </div>
      <div slot="modal-body" class="modal-body">
        <div class="form-group col-sm-12 col-lg-12">
          <div class="zoom-link">
            <input
              v-model="zoomLink"
              type="text"
              class="form-control remove-border"
              id="zoomlink"
              placeholder="add link"
              @input="saveZoomLink"
            />
            <i class="fa fa-copy" @click.stop="copyZoomLink"></i>
          </div>
          <div
            class="button btn-session pointer-hand col-3 mt-2 mx-auto go-to-link"
            @click.stop="openLink"
          >
            Go to Link
          </div>
        </div>
      </div>
      <div slot="modal-footer" class="modal-footer"></div>
    </vs-modal>
    <vs-modal v-model="openMeetwith" class="modal-ac">
      <div slot="modal-header" class="modal-header">
        <span class="hp-3-title"
          ><b style="color: green">Sesseion Description :</b>
          {{ event_message }}
        </span>
        <v-icon @click.stop="modalClose"> mdi-close-circle</v-icon>
      </div>

      <div slot="modal-footer" class="modal-footer">
        <button
          type="button"
          class="btn btn-success"
          @click.stop="goToDetailPage"
        >
          Yes
        </button>
        <button type="button" class="btn btn-danger" @click.stop="modalClose">
          No
        </button>
      </div>
    </vs-modal>
    <vs-modal v-model="editOpen" class="modal-ac update-modal">
      <div slot="modal-header" class="modal-header">
        <span class="hp-3-title">Update Slot </span>
        <v-icon @click.stop="modalClose"> mdi-close-circle</v-icon>
      </div>
      <div slot="modal-body" class="modal-body">
        <time-table
          :titleInfo="titleInfo"
          :currentEvent="currentEvent"
        ></time-table>
      </div>
      <div slot="modal-footer" class="modal-footer" style="visibility: hidden">
        <button
          type="button"
          class="btn btn-success"
          @click.stop="goToDetailPage"
        >
          Yes
        </button>
        <button type="button" class="btn btn-danger" @click.stop="modalClose">
          No
        </button>
      </div>
    </vs-modal>
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
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
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
                {{ event.name }}{{ " " }}{{ time_am_pm(event.start) }}
              </div>
            </template>
          </v-calendar>
          <v-menu
            v-model="selectedOpen"
            :activator="selectedElement"
            offset-x
            v-if="type != 'month'"
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon @click.stop="openEdit">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click.stop="sendEmail">
                  <v-icon>mdi-email</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span
                  v-html="selectedEvent.teacher.first_name"
                  v-if="isTeacher && selectedEvent.teacher != null"
                ></span
                ><br />
                <span v-html="selectedEvent.event_message"></span>
                <br />
                <span v-html="selectedEvent.start"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click.stop="deleteSlot">
                  Cancel
                </v-btn>
                <v-btn text color="secondary" @click.stop="openDetailModel">
                  Detail
                </v-btn>
                <v-btn text color="secondary" @click.stop="startClass">
                  Zoom
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </fragment>
</template>
<script>
export default {
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
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
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
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
    updateRange({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>
