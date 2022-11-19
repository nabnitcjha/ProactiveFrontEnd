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
              <input type="text" class="form-control" id="Topic" required v-model="topic">
            </div>

            <div class="col-md-4">
              <label for="Subject" class="form-label">Subject</label>
              <multiselect v-model="selectedSubject" :options="subjects" :searchable="true" :close-on-select="false"
                :allow-empty="false" :preselect-first="true" label="name" placeholder="Select Subject" track-by="id">
              </multiselect>
            </div>

            <div class="col-md-4">
              <label for="Teacher" class="form-label">Teacher</label>
              <multiselect v-model="selectedTeacher" :options="teachers" :searchable="true" :close-on-select="false"
                :allow-empty="false" :preselect-first="true" label="name" placeholder="Select Teacher" track-by="id"
                @input="updateSelectedTeacher"></multiselect>
            </div>

            <div class="col-md-4">
              <label for="student_email" class="form-label">Student</label>
              <multiselect v-model="selectedStudent" :options="students" :searchable="true" :multiple="true"
                :close-on-select="false" :allow-empty="false" :preselect-first="true" label="name"
                placeholder="Select Student" track-by="id"></multiselect>
            </div>

            <div class="col-md-4 d-flex flex-column">
              <label for="Student_dob" class="form-label">Start Date</label>
              <date-picker v-model="classStartDate" type="date" placeholder="Select date" format="YYYY-MM-DD"
                :default-value="new Date()" :disabled-date="disabledBeforeToday"></date-picker>
            </div>

            <div class="col-md-4 d-flex flex-column">
              <label for="student_address" class="form-label">Start Time</label>
              <date-picker v-model="classStartTime" type="time" placeholder="start time" format="hh:mm a"
                :default-value="new Date()" :disabled-date="disabledBeforeToday"></date-picker>
            </div>
            <div class="col-md-4 d-flex flex-column">
              <label for="student_address" class="form-label">End Time</label>
              <date-picker v-model="classEndTime" type="time" placeholder="end time" format="hh:mm a"
                :default-value="new Date()" :disabled-date="disabledBeforeToday"></date-picker>
            </div>

            <div class="col-sm-12 col-lg-12 custom-checkbox" style="border: 1px solid #c4c4c4">
              <label for="repeat">Repeat</label>
              <div class="week-days col-12 d-flex justify-content-between mb-4">
                <div class="" v-for="(day, index) in weekDays" :key="index">
                  <input style="position: inherit" type="checkbox" class="custom-control-input" :id="index"
                    :checked="repeatDays.includes(day.id)" @click="selectStudent($event, day.id, day, index)" />
                  <label class="custom-control-label" :for="index">{{
                      day.name
                  }}</label>
                </div>
              </div>
              <div class="session-repeat col-4">
                <label for="repeat">Session Repeat</label>
                <input class="input-custom-height col-3 ml-4" type="number" v-model="sessionRepeat" min="1" max="100" />
              </div>
            </div>

            <div class="col-md-12">
              <textarea class="form-control" rows="5" id="topicName" placeholder="Description"
                v-model="event_message"></textarea>
            </div>

            <div class="col-12">
              <div class="form-group col-12">
                <button type="button" class="btn btn-success" @click="updateTimeTable" v-if="mode == 'edit'">
                  Update
                </button>
                <button type="button" class="btn btn-green" @click="addTimeTableRecord" v-else>
                  Save
                </button>
                <button type="button" class="btn btn-danger" @click="cancelTimeTableRecord">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      currentTeacherId: "",
      repeatDays: [],
      sessionRepeat: 1,
      weekDays: [
        { id: 0, name: "Sun" },
        { id: 1, name: "Mon" },
        { id: 2, name: "Tue" },
        { id: 3, name: "Wed" },
        { id: 4, name: "Thu" },
        { id: 5, name: "Fri" },
        { id: 6, name: "Sat" },
      ],
      topic: "",
      subjects: [],
      event_message: '',
      students: [],
      selectedSubject: [],
      teachers: [],
      slotTimes: [],
      selectedTeacher: [],
      selectedStudent: [],
      classStartDate: '',
      classEndDate: '',
      classStartTime: '',
      classEndTime: '',
      repeatLastDate: new Date(),
      disabledDates: {
        to: new Date(Date.now() - 8640000),
      },
    };
  },
  methods: {
    async getCurrentTimetableId() {
      let id = await this.currentEvent.id;
      this.currentTimetableId = id;
    },
    removeStudent(studentId) {
      let arr = [...this.selectedStudent];
      let x = this.selectedStudent;
      arr = arr.filter(function (item) {
        return item.id !== studentId;
      });
      this.selectedStudent = arr;
    },
    selectStudent(event, day, d, i) {
      console.log('d', d);
      console.log('i', i);
      if (event.target.checked) {
        let days = [...this.repeatDays];
        console.log('days', days)
        days.push(day);
        this.repeatDays = days;
      } else {
        let days = [...this.repeatDays];
        let items = days.filter((dayName) => dayName !== day);
        this.repeatDays = items;
      }
    },
    async updateTimeTable(e) {

      e.preventDefault();
      var startDate = new Date();
      var endDate = new Date();

      var startTime = new Date();
      var endTime = new Date();

      var time_am_pm = new Date();

      startDate = this.dateFormater(this.classStartDate);
      endDate = this.dateFormater(this.classStartDate);

      startTime = this.timeFormater(this.classStartTime);
      endTime = this.timeFormater(this.classEndTime);

      time_am_pm = this.start_end_time(this.classStartTime, this.classEndTime);

      startDate = this.timeAndDate(startDate, this.timeFormater(this.classStartTime));
      endDate = this.timeAndDate(endDate, this.timeFormater(this.classEndTime));


      let formData = {};
      formData["subject_id"] = this.selectedSubject.id;
      formData["teacher_id"] = this.selectedTeacher.id;
      formData["topic"] = this.topic;
      formData["students"] = this.selectedStudent;
      formData["event_message"] = this.event_message;
      formData["start_date"] = startDate;
      formData["end_date"] = endDate;
      formData["start_time"] = startDate;
      formData["end_time"] = endDate;
      formData["time_am_pm"] = time_am_pm;
      formData["timetable_id"] = this.currentTimetableId;

      axios.post("/api/updateSingleSlot", formData).then((res) => {
        location.reload();
      });
    },
    cancelTimeTableRecord() {
      if (this.$route.name == 'studentCalendarDetail') {
        location.reload();
      }
      if (this.$route.name == 'teacherCalendarDetail') {
        location.reload();
      }
      this.repeatDays = [];
      this.event_message = "";
      this.sessionRepeat = 1;
      this.classStartDate = "";
      this.classStartTime = "";
      this.classEndTime = "";
      this.topic = "";
      this.subjects = [];
      this.students = [];
      this.selectedSubject = [];
      this.grades = [];
      this.selectedGrade = [];
      this.teachers = [];
      this.slotTimes = [];
      this.selectedTeacher = [];
      this.selectedStudent = [];
    },
    async addTimeTableRecord(e) {

      let slotTimes = [...this.slotTimes];
      this.classStartDateBackUP = new Date(this.classStartDate);
      let repeatDays = this.sessionRepeat * 7;
      var startDate = new Date();
      var endDate = new Date();
      var startTime = new Date();
      var endTime = new Date();
      e.preventDefault();

      startDate = this.dateFormater(this.classStartDate);

      endDate = this.dateFormater(this.classStartDate);

      this.repeatLastDate.setDate(this.classStartDate.getDate() + repeatDays);

      let time_am_pm =
        (await this.single_dateFormater_AM_PM(this.classStartTime)) +
        " - " +
        (await this.single_dateFormater_AM_PM(this.classEndTime));
      startTime = this.single_dateFormater(this.classStartTime);
      endTime = this.single_dateFormater(this.classEndTime);

      startDate = this.timeAndDate(startDate, this.timeFormater(this.classStartTime));
      endDate = this.timeAndDate(endDate, this.timeFormater(this.classEndTime));




      slotTimes.push({
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        time_am_pm: time_am_pm,
      });

      let strtDate = this.classStartDate.setDate(
        this.classStartDate.getDate() + 1
      );
      this.classStartDate = new Date(strtDate);


      this.classEndDate = new Date(strtDate);


      while (this.classStartDate <= this.repeatLastDate) {

        let day = this.classStartDate.getDay();

        if (this.repeatDays.indexOf(day) !== -1) {
          let startDate = this.dateFormater(this.classStartDate);
          let start_time_am_pm = await this.single_dateFormater_AM_PM(
            this.classStartTime
          );

          let endDate = this.dateFormater(this.classEndDate);
          let end_time_am_pm = await this.single_dateFormater_AM_PM(
            this.classEndTime
          );

          let time_am_pm = start_time_am_pm + " - " + end_time_am_pm;

          startDate = this.timeAndDate(startDate, this.timeFormater(this.classStartTime));
          endDate = this.timeAndDate(endDate, this.timeFormater(this.classEndTime));

          slotTimes.push({
            startDate: startDate,
            endDate: endDate,
            startTime: startTime,
            endTime: endTime,
            time_am_pm: time_am_pm,
          });
        }

        let stDate = this.classStartDate.setDate(
          this.classStartDate.getDate() + 1
        );
        let eDate = this.classEndDate.setDate(this.classEndDate.getDate() + 1);
        this.classStartDate = new Date(stDate);
        this.classEndDate = new Date(eDate);
      }

      this.slotTimes = slotTimes;
      let formData = {};
      formData["subject_id"] = this.selectedSubject.id;
      formData["teacher_id"] = this.selectedTeacher.id;
      formData["students"] = this.selectedStudent;
      formData["topic"] = this.topic;
      formData["slotTimes"] = this.slotTimes;
      formData["event_message"] = this.event_message;

      formData["selected_day"] = this.repeatDays;
      formData["session_repeat"] = this.sessionRepeat;
      formData["pageType"] = this.titleInfo.pageType;
      formData["session_id"] = this.editSessionId;

      axios.post("/api/addTimeTable", formData).then((res) => {
        this.classStartDate = this.classStartDateBackUP;
        this.slotTimes = [];
        if (res.data.message == "teacher not available") {
          this.teacherNotAvailable(res.data.startDate, res.data.time_am_pm, res.data.current_time_am_pm);
        } else if (res.data.message == "student not available") {
          this.studentNotAvailable(res.data.startDate, res.data.time_am_pm, res.data.current_time_am_pm);
        } else {
          this.setPageTitle("Time Table");
          this.addStatus('Success');
          this.goBack();
        }
      });
      if (this.$route.name == 'studentCalendarDetail') {
        location.reload();
      }
      if (this.$route.name == 'teacherCalendarDetail') {
        location.reload();
      }

    },
    teacherNotAvailable(startDate, time_am_pm, current_time_am_pm) {
      this.$toast.open({
        message: "Teacher not available  -" + `${startDate}` + " (" + `${current_time_am_pm}` + " )</br></br>Teacher Current Class -" + `${startDate}` + " ( " + `${time_am_pm}` + " )",
        type: "error",
        duration: 5000,
        dismissible: true,
      });
    },
    studentNotAvailable(startDate, time_am_pm, current_time_am_pm) {
      this.$toast.open({
        message: "Student not available  -" + `${startDate}` + " (" + `${current_time_am_pm}` + " )</br></br>Student Current Class -" + `${startDate}` + " ( " + `${time_am_pm}` + " )",
        type: "error",
        duration: 5000,
        dismissible: true,
      });
    },
    async getSubjects(event) {
      this.subjects = await this.getRecord("subject", event, false);
      this.getAllTeachers();
    },
    getAllTeachers() {
      axios.get("/api/getAllTeachers").then((response) => {
        this.teachers = [];
        response.data.result.map((x) => {
          if (x.name != null) {
            this.teachers.push(x);
          }
        })

      });
    },

    updateSelectedTeacher() {
      if (this.titleInfo.pageType == 'edit') {
        if (this.currentTeacherIdBackup == this.selectedTeacher.id) {
          this.getData();
        } else {
          this.selectedStudent = '';
        }

      }
      this.currentTeacherId = this.selectedTeacher.id;
    },
    getAllStudents() {
      this.students = [];
      let formData = {};
      formData["teacherId"] = '';
      axios
        .post("/api/getStudentAccordingTeacher", formData)
        .then((response) => {
          response.data.result.map((stu) => {
            this.students.push({
              id: stu.id,
              name: stu.name,
            });
          });
        });
    },

    async getData() {

      let frmData = [];
      this.classTime = [];
      frmData = await this.getSpecificRecord(
        "timeTable",
        this.currentTimetableId
      );
      this.topic = frmData.topic;
      this.selectedSubject = frmData.subject;
      this.editSessionId = frmData.session_id;

      this.classStartDate = new Date(frmData.start_date);
      this.classStartTime = new Date(frmData.start_time);
      this.classEndTime = new Date(frmData.end_time);

      let classTime = [...this.classTime];

      this.classTime = classTime.push(new Date(frmData.start_date));
      this.classTime = classTime.push(new Date(frmData.end_date));
      if (frmData && frmData.selected_day && frmData.selected_day.length > 0) {
        let repeatDays = frmData.selected_day.split(',');
        this.repeatDays = repeatDays.map(day => parseInt(day));
      } else {
        this.repeatDays = [];
      }

      this.event_message = frmData.event_message;
      this.sessionRepeat = frmData.session_repeat;
      let teacherData = [];
      let studentData = [];
      if (frmData.teacher != null) {
        teacherData.push({
          id: frmData.teacher.id,
          name:
            frmData.teacher.first_name +
            " " +
            frmData.teacher.last_name,
        });
      }
      if (frmData.student != null) {
        frmData.student.map((std) => {
          studentData.push({
            id: std.id,
            name:
              std.first_name +
              " " +
              std.last_name,
          });
        })
      }

      this.selectedStudent = studentData;
      this.selectedTeacher = teacherData[0];
      if (this.titleInfo.pageType == 'edit') {
        this.currentTeacherId = teacherData[0].id;
        this.currentTeacherIdBackup = teacherData[0].id;
      }
      this.loading = false;
    },
  }
};
</script>
  