import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import LoadingStatus from '../model/LoadingStatus';

type Props = {
  status: LoadingStatus;
  progress: number;
};
const LoadingProgress: React.FC<Props> = (props) => {
  return <>
    {props.status === LoadingStatus.LoadingDict &&
      <p>Loading Dictionary File...</p>
    }
    {props.status === LoadingStatus.ImportingIntoDB &&
      <p>Importing into IndexedDB...</p>
    }
    {props.status === LoadingStatus.Loaded &&
      <p>Done!</p>
    }
    <ProgressBar animated now={props.progress} />
  </>;
};

export default LoadingProgress;