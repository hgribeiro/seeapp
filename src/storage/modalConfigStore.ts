export function changeModalVisibleStore(): {
  visiable: boolean
  changeVisiable: (isVisiable: boolean) => void
} {
  return {
    visiable: false,
    changeVisiable(isVisiable) {
      this.visiable = isVisiable
    },
  }
}
