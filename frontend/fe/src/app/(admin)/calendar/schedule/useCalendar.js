import { useEffect, useState } from 'react';
import { Draggable } from '@fullcalendar/interaction';
import { defaultEvents } from './data';

const useCalendar = () => {
  const [show, setShow] = useState(false);
  const onOpenModal = () => setShow(true);
  const [isEditable, setIsEditable] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState();
  const [dateInfo, setDateInfo] = useState();
  const onCloseModal = () => {
    setEventData(undefined);
    setDateInfo(undefined);
    setShow(false);
  };

  useEffect(() => {
    // Fetch data from the API and convert it into FullCalendar events format
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://be-cloud-computing-management-task-production.up.railway.app/api/tasks/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tasksData = await response.json();

        // Convert tasks to FullCalendar event format
        const fullCalendarEvents = tasksData.map(task => ({
          title: task.task_name,
          start: task.created_at.split('T')[0], // Format as YYYY-MM-DD
          end: task.due_date.split('T')[0], // Format as YYYY-MM-DD
          description: task.description,
          status: task.status,
          className: task.priority === 'Tinggi' ? 'bg-danger' : task.priority === 'Sedang' ? 'bg-warning' : 'bg-success',
        }));

        setEvents(fullCalendarEvents); // Set the events for FullCalendar
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();  // Call the function to fetch tasks when the component mounts
  }, []);

  const onDateClick = arg => {
    setDateInfo(arg);
    onOpenModal();
    setIsEditable(false);
  };

  const onEventClick = arg => {
    const event = {
      id: String(arg.event.id),
      title: arg.event.title,
      className: arg.event.classNames[0]
    };
    setEventData(event);
    setIsEditable(true);
    onOpenModal();
  };

  const onDrop = arg => {
    const dropEventData = arg;
    const title = dropEventData.draggedEl.title;
    if (title) {
      const newEvent = {
        id: String(events.length + 1),
        title: title,
        start: dropEventData ? dropEventData.dateStr : new Date(),
        className: dropEventData.draggedEl.dataset.class
      };
      const modifiedEvents = [...events];
      modifiedEvents.push(newEvent);
      setEvents(modifiedEvents);
    }
  };

  const onAddEvent = data => {
    const modifiedEvents = [...events];
    const event = {
      id: String(modifiedEvents.length + 1),
      title: data.title,
      start: Object.keys(dateInfo ?? {}).length !== 0 ? dateInfo?.date : new Date(),
      className: data.category
    };
    modifiedEvents.push(event);
    setEvents(modifiedEvents);
    onCloseModal();
  };

  const onUpdateEvent = data => {
    console.info(data);
    setEvents(events.map(e => {
      if (e.id === eventData?.id) {
        return {
          ...e,
          title: data.title,
          className: data.category
        };
      } else {
        return e;
      }
    }));
    onCloseModal();
    setIsEditable(false);
  };

  const onRemoveEvent = () => {
    const modifiedEvents = [...events];
    const idx = modifiedEvents.findIndex(e => e.id === eventData?.id);
    modifiedEvents.splice(idx, 1);
    setEvents(modifiedEvents);
    onCloseModal();
  };

  const onEventDrop = arg => {
    const modifiedEvents = [...events];
    const idx = modifiedEvents.findIndex(e => e.id === arg.event.id);
    modifiedEvents[idx].title = arg.event.title;
    modifiedEvents[idx].className = arg.event.classNames;
    modifiedEvents[idx].start = arg.event.start;
    modifiedEvents[idx].end = arg.event.end;
    setEvents(modifiedEvents);
    setIsEditable(false);
  };

  const createNewEvent = () => {
    setIsEditable(false);
    onOpenModal();
  };

  return {
    createNewEvent,
    show,
    onDateClick,
    onEventClick,
    onDrop,
    onEventDrop,
    events,
    onCloseModal,
    isEditable,
    eventData,
    onUpdateEvent,
    onRemoveEvent,
    onAddEvent
  };
};

export default useCalendar;
