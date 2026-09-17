export const orderStatusLabels = ['new', 'cooking', 'packaging', 'delivering', 'completed']

export const board = ref(
  Object.fromEntries(
    orderStatusLabels.map(status => [status, []])
  )
)