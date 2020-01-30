<template>
  <div class="home">
    <Masthead></Masthead>
    <ResumeList :list="workList" listTitle="Work Experience"></ResumeList>
    <ResumeList :list="educationList" listTitle="Education"></ResumeList>
  </div>
</template>

<script>
// @ is an alias to /src
import Masthead from '@/components/home/Masthead.vue';
import ResumeList from '@/components/home/ResumeList.vue';
import resumeData from '@/assets/resume-data.json';

export default {
  name: 'home',
  components: {
    Masthead,
    ResumeList,
  },
  computed: {
    workList() {
      return resumeData.work;
    },
    educationList() {
      return resumeData.education;
    },
  },
};
</script>
