enum LoadingStatus {
  None = 0,
  NotInitialized,
  LoadingDict,
  ImportingIntoDB,
  Loaded,
  Error
}

export default LoadingStatus;