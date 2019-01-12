<template>
  <div>
    <transition :name="transition">
      <div class="modal" :class="{ 'bordered': borders, 'modal-md': size === 'md', 'modal-sm': size === 'sm', 'modal-xs': size === 'xs', 'modal-full': size === 'full' }" v-if="isModalOpen">
        <header class="modal-header" v-if="$slots.header">
          <slot name="header" />
        </header>
        <main class="modal-body" v-if="$slots.main">
          <slot name="main" />
        </main>
        <footer class="modal-footer" v-if="$slots.footer">
          <slot name="footer" />
        </footer>
      </div>
    </transition>
    <transition name="fade-in">
      <div class="overlay" v-if="isModalOpen" @click="$emit('close');"></div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class Modal extends Vue {
  @Prop({type: Boolean, required: true}) isModalOpen!: boolean;
  @Prop({type: String, required: true}) transition!: string;
  @Prop({type: Boolean, required: false, default: false}) borders!: boolean;
  @Prop({type: String, required: false}) size!: string;

  @Watch('isModalOpen')
  onIsModalToggled() {
    const bodyEl: HTMLElement = document.querySelector('body')!;
    if (this.isModalOpen === true) {
      bodyEl.classList.add('no-scroll');
    } else {
      bodyEl.classList.remove('no-scroll');
    }
  };
};
</script>
