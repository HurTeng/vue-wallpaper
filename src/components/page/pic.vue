<template>
  <transition name="fade">
    <div v-show="showFlag" class="details">
      <div>
        <img :src="pic" @click="hide"/>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'pic',
    props: {
      pic: {
        type: String
      }
    },
    data() {
      return {
        showFlag: false
      };
    },
    created() {
    },
    methods: {
      show() {
        this.showFlag = true;
      },
      hide() {
        this.showFlag = false;
      }
    }
  };
</script>

<style scoped>
  .details {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 30;
    width: 100%;
    height: 100%;
    background-color: #ffffff
  }

  .details .fade-enter-active, .fade-leave-active {
    transition: all 0.2s linear;
    transform: translate3d(0, 0, 0);
  }

  .details .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  img {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
  }

</style>
