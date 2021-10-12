<template>
  <div class="w-[600px] mx-auto min-h-[100vh] flex flex-col items-center justify-center bg-airblue-light">
    <h1 class="text-5xl text-airblue-darker"> Login </h1>
    <form class="mt-10" @submit.prevent="sendForm">
      <fieldset>
        <legend> Base info </legend>
        <base-input
          v-model="name"
          label="Name"
          type="text"
        />
      </fieldset>
      <fieldset class="mt-5">
        <legend> Absolutely necessary stuff </legend>

        <base-select
          v-model="favoriteSoft"
          :options="softwareOptions"
          label="your fav soft"
        />
        <base-checkbox
          v-model="isAlright"
          label="Are you alright?"
        />
        <base-radio-group
          v-model="gender"
          :options="genders"
          name="Gender"
        />

      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      favoriteSoft: '',
      isAlright: false,
      softwareOptions: [
        'Anki',
        'RemNote',
        'Supermemo'
      ],
      gender: 'man',
      genders: [
        {
          label: 'Boyo',
          value: 'man'
        },
        {
          label: 'Lady',
          value: 'woman'
        }
      ]
    }
  },
  methods: {
    sendForm() {
      // bla bla
    }
  },
}
</script>

<style lang="scss" scoped>
legend {
  @apply text-2xl;
}
</style>
