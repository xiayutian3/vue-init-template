
import { mapState, mapActions } from 'vuex'

// module1 mixin
export const module1Mixin = {
  computed: {
    ...mapState({
      name: state => state.module1.name
    })
  },
  methods: {
    ...mapActions([
      'setIsEditMode'
    ])
  }
}

// module2 mixin
