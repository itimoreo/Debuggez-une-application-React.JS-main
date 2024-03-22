import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null); // Initialiser à null pour le type non sélectionné
  const [currentPage, setCurrentPage] = useState(1);

  // S'assurer que le type est pris en compte dans le filtrage
  const filteredEvents = (data?.events || []).filter((event, index) => {
    const inCurrentPage = (currentPage - 1) * PER_PAGE <= index && index < PER_PAGE * currentPage;
    return (type === 'Toutes' || !type || event.type === type) && inCurrentPage;
  });
  
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType === "Toutes" ? null : evtType); // Gérer la sélection de 'Toutes' comme null
  };

  const pageNumber = Math.ceil((filteredEvents.length || 0) / PER_PAGE); // Utiliser Math.ceil pour arrondir au nombre supérieur
  const typeList = ['Toutes', ...new Set(data?.events.map((event) => event.type).filter(eventType => eventType !== 'Toutes'))];
  
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "Loading..."
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={typeList}
            onChange={(value) => changeType(value)}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber)].map((_, n) => (
              <a
                key={`page-${n + 1}`}
                href="#events"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(n + 1);
                }}
              >
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
