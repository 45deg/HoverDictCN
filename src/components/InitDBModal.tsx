import React, { useState, useEffect } from 'react';
import CEDict from '../CEDict';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import LoadingProgress from './LoadingProgress';
import LoadingStatus from '../model/LoadingStatus';

type Context = {
  db: CEDict
};

const InitDBModalWithContext: React.FC<Context> = ({ db }) => {
  let [status, setStatus] = useState(LoadingStatus.None);
  let [progress, setProgress] = useState(0);

  let isLoading =
    status === LoadingStatus.ImportingIntoDB ||
    status === LoadingStatus.LoadingDict;

  // Get Count
  useEffect(() => {
    let getCount = async () => {
      let count = await db.entries.count();
      setStatus(count === 0 ? LoadingStatus.NotInitialized : LoadingStatus.Loaded);
    }
    getCount();
  }, []);

  // Load Dictionary
  useEffect(() => {
    let cancel = axios.CancelToken.source();
    if (isLoading) {
      const requestApi = async () => {
        let res = await axios.get(CEDict.DICTIONARY_PATH, {
          responseType: 'text',
          timeout: 10000,
          cancelToken: cancel.token,
          onDownloadProgress: (e: ProgressEvent) => {
            setProgress(100 * e.loaded / e.total);
          }
        });
        setStatus(LoadingStatus.ImportingIntoDB);
        setProgress(0);
        await db.importDictionary(res.data, setProgress);
        setStatus(LoadingStatus.Loaded);
      };

      setStatus(LoadingStatus.LoadingDict);
      requestApi();
    }
    return () => {
      cancel.cancel();
    }
  }, [isLoading]);

  // Import Dictionary

  return <Modal
    onHide={() => { }}
    show={status !== LoadingStatus.Loaded && status !== LoadingStatus.None}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter">
        Import
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {status === LoadingStatus.NotInitialized && <p>
        Imports Chinese-English Dictionary DataBase at first. (<i>It may takes a long time.</i>)
      </p>}
      {isLoading &&
        <LoadingProgress progress={progress} status={status} />}
    </Modal.Body>
    <Modal.Footer>
      <Button
        disabled={isLoading}
        onClick={() => setStatus(LoadingStatus.LoadingDict)}>Continue</Button>
    </Modal.Footer>
  </Modal>
}

const InitDBModal: React.FC = () => {
  return <CEDict.Context.Consumer>{db =>
    <InitDBModalWithContext db={db} />
  }</CEDict.Context.Consumer>;
}

export default InitDBModal;