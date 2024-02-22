import { Fragment } from 'react';
import { Transition, Dialog, Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import PropTypes from 'prop-types';

import './App.css';
import { states, types } from './utils';

Modal.propTypes = {
  newEntityOpen: PropTypes.bool.isRequired,
  setNewEntityOpen: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  entity: PropTypes.object.isRequired,
  formState: PropTypes.object.isRequired,
  setFormState: PropTypes.func.isRequired,
  entities: PropTypes.array.isRequired,
  setEntities: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
  setSelected: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Modal({
  newEntityOpen,
  setNewEntityOpen,
  formState,
  setFormState,
  handleSubmit,
}) {
  return (
    <Transition.Root show={newEntityOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setNewEntityOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-visible rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <form className='bg-white'>
                  <div className='px-4 py-6 sm:p-8'>
                    <div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                      <div className='sm:col-span-full'>
                        <label
                          htmlFor='@id'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          @id
                        </label>
                        <div className='mt-2'>
                          <input
                            type='text'
                            name='@id'
                            id='@id'
                            disabled
                            className='bg-gray-100 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            value={formState['@id']}
                          />
                        </div>
                      </div>

                      <Listbox
                        value={formState['@type']}
                        onChange={(value) =>
                          setFormState({ ...formState, '@type': value })
                        }
                      >
                        {({ open }) => (
                          <div className='sm:col-span-full'>
                            <Listbox.Label className='block text-sm font-medium leading-6 text-gray-900'>
                              Type
                            </Listbox.Label>
                            <div className='mt-2'>
                              <Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'>
                                <span className='block truncate'>
                                  {formState['@type']}
                                </span>
                                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                                  <ChevronUpDownIcon
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                  />
                                </span>
                              </Listbox.Button>

                              <Transition
                                show={open}
                                as={Fragment}
                                leave='transition ease-in duration-100'
                                leaveFrom='opacity-100'
                                leaveTo='opacity-0'
                              >
                                <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                  {types.map((type, i) => (
                                    <Listbox.Option
                                      key={`${type}-${i}`}
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-gray-900',
                                          'relative cursor-default select-none py-2 pl-8 pr-4'
                                        )
                                      }
                                      value={type}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span
                                            className={classNames(
                                              selected
                                                ? 'font-semibold'
                                                : 'font-normal',
                                              'block truncate'
                                            )}
                                          >
                                            {type}
                                          </span>

                                          {selected ? (
                                            <span
                                              className={classNames(
                                                active
                                                  ? 'text-white'
                                                  : 'text-indigo-600',
                                                'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                              )}
                                            >
                                              <CheckIcon
                                                className='h-5 w-5'
                                                aria-hidden='true'
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </div>
                        )}
                      </Listbox>

                      <Listbox
                        value={formState.state}
                        onChange={(value) =>
                          setFormState({ ...formState, state: value })
                        }
                      >
                        {({ open }) => (
                          <div className='sm:col-span-full'>
                            <Listbox.Label className='block text-sm font-medium leading-6 text-gray-900'>
                              State
                            </Listbox.Label>
                            <div className='mt-2'>
                              <Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'>
                                <span className='block truncate'>
                                  {formState.state}
                                </span>
                                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                                  <ChevronUpDownIcon
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                  />
                                </span>
                              </Listbox.Button>

                              <Transition
                                show={open}
                                as={Fragment}
                                leave='transition ease-in duration-100'
                                leaveFrom='opacity-100'
                                leaveTo='opacity-0'
                              >
                                <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                  {states.map((state, i) => (
                                    <Listbox.Option
                                      key={`${state}-${i}`}
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-gray-900',
                                          'relative cursor-default select-none py-2 pl-8 pr-4'
                                        )
                                      }
                                      value={state}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span
                                            className={classNames(
                                              selected
                                                ? 'font-semibold'
                                                : 'font-normal',
                                              'block truncate'
                                            )}
                                          >
                                            {state}
                                          </span>

                                          {selected ? (
                                            <span
                                              className={classNames(
                                                active
                                                  ? 'text-white'
                                                  : 'text-indigo-600',
                                                'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                              )}
                                            >
                                              <CheckIcon
                                                className='h-5 w-5'
                                                aria-hidden='true'
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </div>
                        )}
                      </Listbox>
                    </div>
                  </div>
                  <div className='flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8'>
                    <button
                      type='button'
                      className='text-sm font-semibold leading-6 text-gray-900'
                      onClick={() => setNewEntityOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
