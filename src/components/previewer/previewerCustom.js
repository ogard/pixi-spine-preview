import { CustomPIXIComponent } from 'react-pixi'
import PreviewerDisplay from './previewerDisplay'
import { SPINE_ACTION } from '../../redux/constants'

export default CustomPIXIComponent({
  customDisplayObject(props) {
    const { width, height } = props
    const previewerDisplay = new PreviewerDisplay({ width, height })
    return previewerDisplay
  },
  customApplyProps(previewerDisplay, oldProps, newProps) {
    if (newProps.spineData && oldProps.spineData == null) {
      previewerDisplay.setSpine(newProps.spineData)
    }
    if (oldProps.spineData && newProps.spineData == null) {
      previewerDisplay.destroy()
    }
    if (
      newProps.spineAction === SPINE_ACTION.PLAY &&
      newProps.spineAction !== oldProps.spineAction &&
      oldProps.selectedAnimation
    ) {
      previewerDisplay.setAnimation(oldProps.selectedAnimation, true)
    }
    if (
      newProps.spineAction === SPINE_ACTION.PAUSE &&
      oldProps.spineAction === SPINE_ACTION.PLAY &&
      oldProps.selectedAnimation
    ) {
      previewerDisplay.setAutoUpdate(false)
    }
    if (
      newProps.spineAction === SPINE_ACTION.PLAY &&
      oldProps.spineAction === SPINE_ACTION.PAUSE &&
      oldProps.selectedAnimation
    ) {
      previewerDisplay.setAutoUpdate(true)
    }
    if (
      newProps.spineAction === SPINE_ACTION.STOP &&
      newProps.spineAction !== oldProps.spineAction &&
      oldProps.selectedAnimation
    ) {
      previewerDisplay.destroy()
      previewerDisplay.setSpine(oldProps.spineData)
    }
    if (oldProps.selectedAnimation && newProps.spineData && newProps.selectedAnimation !== oldProps.selectedAnimation) {
      previewerDisplay.destroy()
      previewerDisplay.setSpine(oldProps.spineData)
    }
    if (newProps.spineAdjustments !== oldProps.spineAdjustments && newProps.spineData) {
      if (newProps.spineAdjustments.speed !== oldProps.spineAdjustments.speed)
        previewerDisplay.setTimeScale(newProps.spineAdjustments.speed)
      if (newProps.spineAdjustments.opacity !== oldProps.spineAdjustments.opacity)
        previewerDisplay.setAlpha(newProps.spineAdjustments.opacity)
    }
  },
})
