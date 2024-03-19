import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Field from '../../components/Field';
import Select from '../../components/Select';
import Button, { BUTTON_TYPES } from '../../components/Button';

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); });

const FIELD_TYPES = {
  TEXTAREA: 'textarea',
};

const ContactForm = ({ onSuccess, onError }) => {
  const [formFields, setFormFields] = useState({
    nom: '',
    prenom: '',
    type: '',
    email: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      try {
        await mockContactApi();
        setSending(false);
        setMessageSent(true);
        setFormFields({
          nom: '',
          prenom: '',
          type: '',
          email: '',
          message: ''
        });
        onSuccess();

        // Cachez le message de confirmation après 5 secondes
        setTimeout(() => {
          setMessageSent(false);
        }, 5000);
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" value={formFields.nom} onChange={(e) => setFormFields({...formFields, nom: e.target.value})} />
          <Field placeholder="" label="Prénom" value={formFields.prenom} onChange={(e) => setFormFields({...formFields, prenom: e.target.value})} />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={(value) => setFormFields({...formFields, type: value})}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" value={formFields.email} onChange={(e) => setFormFields({...formFields, email: e.target.value})} />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col" style={{ height : '100%'}}>
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={formFields.message}
            onChange={(e) => setFormFields({...formFields, message: e.target.value})}
          />
          {messageSent && <p>Vous avez envoyé votre message</p>}
        </div>
      </div>
    </form>
  );
};

ContactForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default ContactForm;