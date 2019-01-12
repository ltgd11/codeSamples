Vue.JS sample one

This is a simple component I wrote to display any message that needs to be shown to the user
Originally it was written with Vanilla.js but was later re-written in Typescript to follow with the tech stack that had been decided on
That rewrite is the code below

<template>
  <div v-if="showMessage" id="wrapper" class="wrapper" @mousedown="checkType">
    <transition name="notification">
      <div :class="[`alert-${alertType}`, outlined ? 'alert-outline' : '']" class="alert">
        <button :class="[outlined ? `text-${alertType}` : 'text-white']" @click="$emit('close')">x</button>
        <p class="title">
          <template v-if="alertType === 'danger'">{{ message.code }}: </template>
          {{ message.title }}
        </p>
        <p>{{ message.body }}</p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { NotificationMessage } from '@/types'


export default class Notification extends Vue {
  @Prop({ type: Object, required: true }) message: NotificationMessage;
  @Prop({ type: Boolean, required: false, default: true }) outlined: boolean;
  @Prop(Boolean) showMessage: boolean;

  get alertType(): string {
    if (this.message.code === 500 || this.message.code === 503) {
      return 'danger'
    } else if (this.message.code === 400) {
      this.autoCloseAlert(5000)
      return 'warning'
    } 
    this.autoCloseAlert(5000)
    return 'success'
  }

  close(): void {
    this.$emit('close')
  }

  autoCloseAlert(time): void {
    setTimeout(() => {
      this.close()
    }, time)
  }

  checkType(): void {
    const self = this
    document.onmousemove = function checkDirection(e) {
      const start = e.clientX
      let pos1 = 0
      let pos3 = 0
      let elmnt: any = document.getElementById('wrapper')
      const offset = elmnt.offsetLeft
      elmnt = elmnt || window.event
      pos3 = elmnt.clientX
      document.onmouseup = function closeDragElement() {
        document.onmouseup = null
        document.onmousemove = null
      }
      document.onmousemove = function elementDrag(e: any) {
        e = e || window.event
        pos1 = pos3 - e.clientX
        pos3 = e.clientX
        if (start - e.clientX < -10) {
          setTimeout(() => {
            elmnt.style.left = `${offset}px`
          }, 500)
          self.close()
        }
        if (start - e.clientX < 0) {
          elmnt.style.left = `${elmnt.offsetLeft - pos1}px`
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.notification-enter-active {
  transition: opacity 0.35s;
}
.notification-enter {
  opacity: 0;
}
.notification-leave-active {
  transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1);
}
.notification-leave-to {
  transform: translateX(600px);
}

.wrapper {
  position: fixed;
  top: 15px;
  right: 15px;
  min-width: 100px;
  z-index: 9999;
}

.d-none {
  display: none !important;
}

.alert {
  padding: 15px;
  display: inline-block;
  text-align: left;
  position: relative;
  cursor: pointer;

  .title {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 5px;
  }

  p {
    margin: 0;
    font-size: 0.75rem;
    font-weight: normal;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    position: absolute;
    top: 1px;
    right: 5px;
    font-size: 1rem;
    font-weight: bold;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
