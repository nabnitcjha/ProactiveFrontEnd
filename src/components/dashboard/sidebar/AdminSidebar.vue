<template>
    <ul class="sidebar-nav" id="sidebar-nav">

<li class="nav-item">
  <a class="nav-link ">
    <i class="bi bi-grid"></i>
    <span>Dashboard</span>
  </a>
</li><!-- End Dashboard Nav -->

<li class="nav-item">
  <a class="nav-link collapsed hand"  @click.stop="$root.changeRoute('/add-student')">
    <i class="bi bi-person"></i>
    <span>Student</span>
  </a>
</li><!-- End Student Nav -->

<li class="nav-item">
  <a class="nav-link collapsed hand"  @click.stop="$root.changeRoute('/add-teacher')">
    <i class="bi bi-person"></i>
    <span>Teacher</span>
  </a>
</li><!-- End Teacher Nav -->

<li class="nav-item">
  <a class="nav-link collapsed hand"  @click.stop="$root.changeRoute('/add/class-schedule')">
    <i class="bi bi-person"></i>
    <span>Class Schedule</span>
  </a>
</li><!-- End Class Schedule Nav -->


<li class="nav-item">
  <a class="nav-link collapsed">
    <i class="bi bi-send"></i>
    <span>Send SMS</span>
  </a>
</li><!-- End Send SMS Nav -->

<li class="nav-item">
  <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
    <i class="bi bi-gear"></i><span>Setting</span><i class="bi bi-chevron-down ms-auto"></i>
  </a>
  <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
    <li>
      <a>
        <i class="bi bi-circle"></i><span>Register Student</span>
      </a>
    </li>
    <li>
      <a>
        <i class="bi bi-circle"></i><span>Register Teacher</span>
      </a>
    </li>
    <li>
      <a @click.stop="$root.changeRoute('/add-subject')" class="hand">
        <i class="bi bi-circle"></i><span>Subject</span>
      </a>
    </li>
   
  </ul>
</li><!-- End Setting Nav -->
</ul>
</template>