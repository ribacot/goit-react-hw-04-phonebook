import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiXSquare } from 'react-icons/fi';
import { IconContext } from 'react-icons';

import DeleteAll from 'components/deleteAll/DeleteAll';
import css from './ContactsList.module.css';

export const ContactsList = ({contacts,onDeleteAllContact,onDeleteContact}) => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <DeleteAll
        onDeleteAllContact={onDeleteAllContact}
        checkedEl={checked}
        onChange={e => setChecked(e.target.checked)}
      />
      <ul className={css.listContacts}>
        {contacts.map(({ name, id, number }) => (
          <li key={id} className={css.contact}>
            {name}:
            <span className={css.contact_tel}>
              {number}
              <button
                className={css.btn_del}
                type="button"
                disabled={checked}
                onClick={() => onDeleteContact(id)}
              >
                <IconContext.Provider value={{ size: '1.2em' }}>
                  <FiXSquare />
                </IconContext.Provider>
              </button>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

ContactsList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string).isRequired)
    .isRequired,
  onDeleteAllContact: PropTypes.func.isRequired,
};
