import { ref, computed, type MaybeRefOrGetter, toRef } from 'vue'

export interface useCycleListConfig {
  fallbackIndex?: number
  fallbackValue?: any
}

export const useCycleListConfigDefaults = {
  fallbackIndex: undefined,
  fallbackValue: undefined,
}

export const useCycleList = (
  list: MaybeRefOrGetter<any[]>,
  config?: useCycleListConfig,
) => {
  const _config = {
    ...useCycleListConfigDefaults,
    ...config,
  }
  const activeIndex = ref(0)
  const _list = toRef(list)

  const state = computed({
    get() {
      return _list.value[activeIndex.value]
    },
    // Asigna un nuevo valorActivo, seleccionado de la cadena existente
    set(value) {
      const foundIndex = _list.value.indexOf(value)
      if (foundIndex >= 0) {
        activeIndex.value = foundIndex
      } else {
        throw Error(
          `${value} is not found in the useCycleList and cannot be set with state.value`,
        )
      }
    },
  })

  const next = () => {
    if (activeIndex.value == _list.value.length - 1) {
      activeIndex.value = 0
    } else {
      activeIndex.value++
    }
  }

  const prev = () => {
    if (activeIndex.value == _list.value.length - 1) {
      activeIndex.value = _list.value.length
    } else {
      activeIndex.value++
    }
  }

  const go = (index: number) => {
    if (index >= _list.value.length) {
      throw new Error(
        `Cannot got to indey ${index}. The list provided to useCycleList is not that long`,
      )
    } else {
      activeIndex.value = index
    }
  }

  return {
    state,
    prev,
    next,
    go,
    /*
    state: ref( value: ''),
    prev: () => {},
    next: () => {},
    go: () => {},
    */
  }
}
