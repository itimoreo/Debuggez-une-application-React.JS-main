import { render, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from './index';

jest.mock('./index', () => ({
  mockContactApi: jest.fn(),
}));

describe('ContactForm', () => {
  it('renders correctly and can submit form', async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { getByLabelText, getByText } = render(<ContactForm onSuccess={onSuccess} onError={onError} />);

    fireEvent.change(getByLabelText('Nom'), { target: { value: 'Test Nom' } });
    fireEvent.change(getByLabelText('Prénom'), { target: { value: 'Test Prénom' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Message'), { target: { value: 'Test Message' } });

    fireEvent.click(getByText('Envoyer'));

    await waitFor(() => expect(onSuccess).toHaveBeenCalled());

    expect(getByText('Vous avez envoyé votre message')).toBeInTheDocument();
  });
});