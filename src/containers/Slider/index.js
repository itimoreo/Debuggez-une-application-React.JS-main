import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // Vérifiez si data?.focus est défini avant de l'utiliser
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ) || [];

  // Suppression de la fonction nextCard et intégration de son contenu dans useEffect

  useEffect(() => {
    // Création d'un timer qui met à jour l'index toutes les 5 secondes
    const timer = setTimeout(
      // Vérification que l'index ne dépasse pas la longueur du tableau - 1
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );

    // Nettoyage du timer lorsque le composant est démonté ou lorsque l'index change
    return () => clearTimeout(timer);
  }, [index, byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Nous utilisons une clé unique pour chaque élément de la liste
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      {/* Nous avons déplacé la création des boutons de pagination en dehors de la boucle map */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((_, radioIdx) => {
            // Nous désactivons la règle ESLint pour cette ligne spécifique
            // eslint-disable-next-line react/no-array-index-key
            const key = `${radioIdx}`;
            return (
              <input
                key={key}
                type="radio"
                name="radio-button"
                checked={index === radioIdx}
                onChange={() => setIndex(radioIdx)} // Nous ajoutons un gestionnaire d'événements onChange
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Slider;
