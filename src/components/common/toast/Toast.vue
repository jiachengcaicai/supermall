<template>
  <div class="toast" v-show="isShowToast">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    data() {
      return {
        defaultMessage: '默认文字',
        message: '',
        isShowToast: false,
        duration: 3000,
        timer: null,
      }
    },
    methods: {
      show(message = this.defaultMessage,
           duration = this.duration
      ) {
        console.log(message, duration);
        this.isShowToast = true
        this.message = message

        if(this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.isShowToast = false
          this.message = this.defaultMessage
        }, duration)
      }
    }
  }

</script>

<style scoped>
  .toast {
    position: fixed;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color:rgba(240, 240, 240);
    color: var(--color-high-text);
    z-index: 11;
    padding: 8px 10px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
  }
</style>
