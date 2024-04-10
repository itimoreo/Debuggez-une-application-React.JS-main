import { render, screen, act } from '@testing-library/react';
import { DataProvider } from '../../contexts/DataContext';
import Slider from './index';

jest.useFakeTimers();

describe('Slider', () => {
  it('renders correctly and changes slide after timeout', () => {
    const data = {
      focus: [
        {
          title: "World economic forum",
          description: "Oeuvre à la coopération entre le secteur public et le privé.",
          date: "2022-02-29T20:28:45.744Z",
          cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
        },
        {
          title: "World Gaming Day",
          description: "Evenement mondial autour du gaming",
          date: "2022-03-29T20:28:45.744Z",
          cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
        },
        {
          title: "World Farming Day",
          description: "Evenement mondial autour de la ferme",
          date: "2022-01-29T20:28:45.744Z",
          cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
        },
      ],
    };

    render(
      <DataProvider value={{ data, error: null }}>
        <Slider />
      </DataProvider>
    );

    expect(screen.getByText('World economic forum')).toBeInTheDocument();
    expect(screen.getByText('Oeuvre à la coopération entre le secteur public et le privé.')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText('World Gaming Day')).toBeInTheDocument();
    expect(screen.getByText('Evenement mondial autour du gaming')).toBeInTheDocument();
  });
});