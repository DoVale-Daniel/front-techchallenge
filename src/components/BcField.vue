<template>
  <div class="form-field">
    <label v-if="label" class="form__label">{{ label }}</label>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BcField',
  props: {
    label: String
  }
}
</script>
