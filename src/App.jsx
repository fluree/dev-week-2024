import { useEffect, useState, useCallback } from 'react';

import axios from 'axios';
import './App.css';
import { Table } from './Table';
import { Modal } from './Modal';
import { Header } from './Header';
import Notification from './Notification';
import { getOrSetId, states, types } from './utils';

const apiKey = import.meta.env.VITE_API_KEY;
const ledger = import.meta.env.VITE_LEDGER;

function generateQueryBody(ledger) {
  return {
    from: ledger,
    where: {
      '@id': '?s',
      state: '?state',
    },
    select: {
      '?s': ['*'],
    },
  };
}

function generateTransactionBody(ledger, insertObj, deleteObj = null) {
  const transaction = {
    ledger,
    insert: insertObj,
  };
  if (deleteObj) {
    transaction.delete = deleteObj;
  }
  return transaction;
}

function issueQuery(queryBody, apiKey) {
  return axios.post('https://data.flur.ee/fluree/query', queryBody, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey,
    },
  });
}

const defaultState = {
  '@id': getOrSetId(),
  '@type': types[0],
  state: states[5],
};

function App() {
  const [entities, setEntities] = useState([]);
  const [newEntityOpen, setNewEntityOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [formState, setFormState] = useState(defaultState);

  const refreshData = useCallback(
    () =>
      issueQuery(generateQueryBody(ledger), apiKey)
        .then((response) => {
          setEntities(response.data);
          setSelected(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        }),
    [setEntities, setSelected]
  );

  useEffect(() => {
    if (entities.length > 0) return;
    refreshData();
  }, [entities, refreshData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const previousEntity = entities.find((x) => x['@id'] === formState['@id']);
    let deleteObj = null;
    if (previousEntity) {
      deleteObj = previousEntity;
    }
    const transaction = generateTransactionBody(ledger, formState, deleteObj);
    return axios
      .post('https://data.flur.ee/fluree/transact', transaction, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: apiKey,
        },
        timeout: 3500,
      })
      .then(() => {
        setNewEntityOpen(false);
        setFormState(defaultState);
      })
      .then(() => refreshData())
      .catch((error) => {
        console.log(error);
        setNewEntityOpen(false);
        setFormState(defaultState);
        setShowNotification(true);
      });
  };

  return (
    <>
      <div className='min-h-full'>
        <Header />
        <div className='py-10'>
          <main>
            <Table
              {...{
                setNewEntityOpen,
                setFormState,
                entities,
              }}
            />
          </main>
        </div>
      </div>
      <Modal
        {...{
          newEntityOpen,
          setNewEntityOpen,
          formState,
          setFormState,
          entities,
          selected,
          setSelected,
          handleSubmit,
        }}
      />
      <Notification
        {...{ show: showNotification, setShow: setShowNotification }}
      />
    </>
  );
}

export default App;
